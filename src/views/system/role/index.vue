<template>
  <div class="app-container">

    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入角色名..." v-model="queryForm.query" clearable></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initRoleList">搜索</el-button>
      <el-button type="primary" :icon="DocumentAdd" @click="handleDialogValue()" v-if="hasAuth('system:user:add')">新增
      </el-button>
      <el-popconfirm title="您确定批量删除这些记录吗？" @confirm="handleDelete(null)">
        <template #reference>
          <el-button type="primary" :disabled="delBtnStatus" :icon="Delete" v-if="hasAuth('system:user:delete')">删除
          </el-button>
        </template>
      </el-popconfirm>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :selectable="selectable" width="55"/>
      <el-table-column prop="name" label="角色名" width="100" align="center"/>
      <el-table-column prop="code" label="权限字符" width="200" align="center"/>
      <el-table-column prop="createTime" label="创建时间" width="200" align="center"/>
      <el-table-column prop="remark" label="备注"/>
      <el-table-column prop="action" label="操作" width="400" fixed="right" align="center">
        <template v-slot="scope">
          <!--Admin不允许操作权限-->
          <el-button type.link="text" text @click="handleMenuDialogValue(scope.row.id)" v-if="hasAuth('system:role:menu') && scope.row.code !== 'admin'">分配权限
          </el-button>
          <el-button v-if="scope.row.code!=='admin' && hasAuth('system:role:edit')" type.link="text" text @click="handleDialogValue(scope.row.id)">编辑
          </el-button>
          <el-popconfirm v-if="scope.row.code!=='admin'" title="您确定要删除这条记录吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type.link="text" text style="color: #f5222d" v-if="hasAuth('system:role:delete')">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:currentPage="queryForm.pageNum"
        v-model:page-size="queryForm.pageSize"
        :page-sizes="[10, 20, 30, 40,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
  <Dialog v-model="dialogVisible" :dialogVisible="dialogVisible" :id="id" :dialogTitle="dialogTitle"
          @initRoleList="initRoleList"></Dialog>

  <MenuDialog v-model="menuDialogVisible" :menuDialogVisible="menuDialogVisible" :id="id"
              @initRoleList="initRoleList"></MenuDialog>


</template>

<script setup>
import {Search, Delete, DocumentAdd} from '@element-plus/icons-vue'
import {ref} from 'vue'
import api from '@/api/role';
import {ElMessage} from 'element-plus'
import Dialog from './components/dialog'
import MenuDialog from './components/menuDialog'

// 管理员不可选择
function selectable(row,index) {
  if (index === 0 || row.code === 'admin') {
    return false;
  } else {
    return true
  }
}

const queryForm = ref({
  query: '',
  pageNum: 1,
  pageSize: 10
})

const total = ref(0)

const tableData = ref([])

const id = ref(-1)

const sysRoleList = ref([])

const imageDialogValue = ref({})

const dialogVisible = ref(false)

const menuDialogVisible = ref(false)

const dialogTitle = ref('')

const multipleSelection = ref([])

const delBtnStatus = ref(true)

const handleSelectionChange = (selection) => {
  multipleSelection.value = selection;
  delBtnStatus.value = selection.length === 0;
}

const initRoleList = async () => {
  const res = await api.initRoleData(queryForm.value);
  tableData.value = res.data.roleList;
  total.value = res.data.total;
}

initRoleList();

const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1;
  queryForm.value.pageSize = pageSize;
  initRoleList();
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum;
  initRoleList();
}

const handleDialogValue = (roleId) => {
  if (roleId) {
    id.value = roleId;
    dialogTitle.value = "角色修改"
  } else {
    id.value = -1;
    dialogTitle.value = "角色添加"
  }
  dialogVisible.value = true
}

const handleMenuDialogValue = (roleId) => {
  if (roleId) {
    id.value = roleId;
  }
  menuDialogVisible.value = true
}

const handleDelete = async (id) => {
  var ids = [];
  if (id) {
    ids.push(id)
  } else {
    multipleSelection.value.forEach(row => {
      ids.push(row.id)
    })
  }
  const res = await api.delete(ids);
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '执行成功!'
    })
    await initRoleList();
  } else {
    ElMessage({
      type: 'error',
      message: res.data.msg,
    })
  }
}

</script>

<style lang="scss" scoped>

.header {
  padding-bottom: 20px;
  box-sizing: border-box;
}

.el-pagination {
  float: right;
  padding: 20px;
  box-sizing: border-box;
}

::v-deep th.el-table__cell {
  word-break: break-word;
  background-color: #f8f8f9 !important;
  color: #515a6e;
  height: 40px;
  font-size: 13px;

}

.el-tag--small {
  margin-left: 5px;
}

</style>
