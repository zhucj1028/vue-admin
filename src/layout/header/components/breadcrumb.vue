<template>
  <el-icon><HomeFilled /></el-icon>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">
      <span class="redirect" v-if="parentName && index>0">{{parentName}}&nbsp;&nbsp;/&nbsp; </span>
      <span class="no-redirect" v-if="index===breadcrumbList.length-1">{{item.name}}</span>
      <span class="redirect" v-else >{{item.name}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref,watch } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import {HomeFilled} from '@element-plus/icons-vue'

const route=useRoute();
const router=useRouter();
const parentName=ref("")

const breadcrumbList=ref([]);

const handleRedirect=(path)=>{
  router.push(path)
}

const initBreadcrumbList=()=>{
  breadcrumbList.value=route.matched;
  parentName.value=route.meta.parentName;
}

watch(route,()=>{
  initBreadcrumbList();
},{deep:true,immediate:true})

</script>

<style lang="scss" scoped>
.no-redirect{
  cursor:text;
}
.redirect{
  color:#666;
  font-weight:600;
  cursor:pointer;
  &:hover{
    color:#304156
  }
}
</style>
