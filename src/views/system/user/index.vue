<template>
  <div class="app-container">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入用户名..." v-model="queryForm.query" clearable></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initUserList">搜索</el-button>
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
      <el-table-column prop="avatar" label="头像" width="80" align="center">
        <template v-slot="scope">
          <img :src="scope.row.avatar" width="50" height="50"/>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="100" align="center"/>
      <el-table-column prop="roles" label="拥有角色" width="200" align="center">
        <template v-slot="scope">
          <el-tag size="small" type="warning" v-for="item in scope.row.sysRoleList"> {{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200" align="center"/>
      <el-table-column prop="phonenumber" label="手机号" width="120" align="center"/>
      <el-table-column prop="status"  label="是否禁用" width="200" align="center">
        <template v-slot="{row}">
<!--如果是超级管理员则不可禁用-->
          <el-switch v-model="row.status" v-if="row.id === 1" disabled @change="statusChangeHandle(row)" active-value="1"
                     inactive-value="0"></el-switch>
          <el-switch v-model="row.status" v-else @change="statusChangeHandle(row)" active-value="1"
                     inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200" align="center"/>
      <el-table-column prop="loginDate" label="最后登录时间" width="200" align="center"/>
      <el-table-column prop="action" label="操作" fixed="right" align="center">
        <template v-slot="scope">
          <el-button type.link="text" text @click="handleRoleDialogValue(scope.row.id,scope.row.sysRoleList)" v-if="scope.row.username!=='admin' && hasAuth('system:user:role')">分配角色
          </el-button>
          <el-popconfirm v-if="scope.row.username!=='admin'" title="您确定要对这个用户重置密码吗？" @confirm="handleResetPassword(scope.row.id)">
            <template #reference>
              <el-button type.link="text" text v-if="hasAuth('system:user:resetPwd')">重置密码</el-button>
            </template>
          </el-popconfirm>
          <el-button v-if="scope.row.username!=='admin' && hasAuth('system:user:edit')" type.link="text" text @click="handleDialogValue(scope.row.id)">编辑</el-button>
          <el-popconfirm v-if="scope.row.username!=='admin'" title="您确定要删除这条记录吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type.link="text" text style="color: #f5222d" v-if="hasAuth('system:user:delete')">删除</el-button>
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
          @initUserList="initUserList">
  </Dialog>
  <RoleDialog v-model="roleDialogVisible" :sysRoleList="sysRoleList" :roleDialogVisible="roleDialogVisible" :id="id"
              @initUserList="initUserList">
  </RoleDialog>

</template>

<script setup>
import {Search, Delete, DocumentAdd} from '@element-plus/icons-vue'
import {ref} from 'vue'
import api from '@/api/user';
import {ElMessage} from 'element-plus'
import Dialog from './components/dialog'
import RoleDialog from './components/roleDialog'

// 管理员不可选择
function selectable(row,index) {
  if (index === 0 || row.username === 'admin') {
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

const roleDialogVisible = ref(false)

const dialogTitle = ref('')

const multipleSelection = ref([])

const delBtnStatus = ref(true)

const handleSelectionChange = (selection) => {
  multipleSelection.value = selection;
  delBtnStatus.value = selection.length === 0;
}

const initUserList = async () => {
  const res = await api.initUserTable(queryForm.value);
  tableData.value = res.data.userList;
  total.value = res.data.total;
}

initUserList();

const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1;
  queryForm.value.pageSize = pageSize;
  initUserList();
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum;
  initUserList();
}

const statusChangeHandle = async (row) => {
  let res = await api.changeStatus(row.id, row.status);
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '执行成功!'
    })
  } else {
    ElMessage({
      type: 'error',
      message: res.data.msg,
    })
    initUserList();
  }
}

const handleDialogValue = (userId) => {
  if (userId) {
    id.value = userId;
    dialogTitle.value = "用户修改"
  } else {
    id.value = -1;
    dialogTitle.value = "用户添加"
  }
  dialogVisible.value = true
}

const handleRoleDialogValue = (userId, roleList) => {
  id.value = userId;
  sysRoleList.value = roleList;
  roleDialogVisible.value = true
}

const handleDelete = async (id) => {
  var ids = []
  if (id) {
    ids.push(id)
  } else {
    multipleSelection.value.forEach(row => {
      ids.push(row.id)
    })
  }
  const res = await api.deleteUser(ids);
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '执行成功!'
    })
    await initUserList();
  } else {
    ElMessage({
      type: 'error',
      message: res.data.msg,
    })
  }
}

const handleResetPassword = async (id) => {
  const res = await api.restPassword(id);
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '执行成功!'
    })
    initUserList();
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
