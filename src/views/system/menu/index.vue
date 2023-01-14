<template>
  <div class="app-container">

    <el-row class="header">
      <el-button type="primary" :icon="DocumentAdd" @click="handleDialogValue()" v-if="hasAuth('system:user:add')">新增
      </el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border stripe default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="菜单名称" width="180"/>
      <el-table-column prop="orderNum" label="排序" width="70" align="center"/>
      <el-table-column prop="perms" label="权限标识" width="250"/>
      <el-table-column prop="path" label="组件路径" width="250"/>
      <el-table-column prop="menuType" label="菜单类型" width="120" align="center">
        <template v-slot="scope">
          <el-tag size="small" v-if="scope.row.menuType === 'M'" type="danger" effect="dark">目录</el-tag>
          <el-tag size="small" v-else-if="scope.row.menuType === 'C'" type="success" effect="dark">菜单</el-tag>
          <el-tag size="small" v-else-if="scope.row.menuType === 'F'" type="warning" effect="dark">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"/>
      <el-table-column prop="action" label="操作" width="300" fixed="right" align="center">
        <template v-slot="scope">
          <el-button type.link="text" text @click="handleDialogValue(scope.row.id)"
                     v-if="hasAuth('system:user:edit')">编辑</el-button>
          <el-popconfirm title="您确定要删除这条记录吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type.link="text" text style="color: #f5222d" v-if="hasAuth('system:user:delete')">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Dialog v-model="dialogVisible" :tableData="tableData" :dialogVisible="dialogVisible" :id="id"
          :dialogTitle="dialogTitle" @initMenuList="initMenuList"></Dialog>
</template>

<script setup>
import {DocumentAdd} from '@element-plus/icons-vue'
import {ref} from 'vue'
import api from '@/api/permission';
import {ElMessage} from 'element-plus'
import Dialog from './components/dialog'

const tableData = ref([])
const id = ref(-1)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const handleDialogValue = (menuId) => {
  if (menuId) {
    id.value = menuId;
    dialogTitle.value = "菜单修改"
  } else {
    id.value = -1;
    dialogTitle.value = "菜单添加"
  }
  dialogVisible.value = true
}

const initMenuList = async () => {
  const res = await api.initTableData();
  tableData.value = res.data.treeMenu;
}


initMenuList();


const handleDelete = async (id) => {
  const res = await api.delete(id);
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '执行成功!'
    })
    initMenuList();
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
