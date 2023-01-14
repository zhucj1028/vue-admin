<template>
  <div class="app-container">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入姓名..."></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">搜索</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scope">
          <el-button>编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {Search} from '@element-plus/icons-vue'
import {ref} from "vue";

const tableData = ref([])


</script>

<style scoped>
.header {
  padding-bottom: 20px;
  box-sizing: border-box;
}


</style>
