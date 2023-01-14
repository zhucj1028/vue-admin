<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px" class="sidebar-container"><Menu/></el-aside>
      <el-container style="background-color: #f0f2f5">
        <el-header><Header/></el-header>
        <div class="multi-tab">
          <Tabs style="background-color: white;"/>
        </div>
        <el-main class="layout-content" style="margin: 10px;background-color: white">
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from '@/layout/menu'
import Header from '@/layout/header'
import Tabs from '@/layout/tabs'

</script>

<style lang="scss" scoped>

  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .sidebar-container {
    background-color: #2d3a4b;
    height: 100%;
  }

  .el-container{
    height:100%
  }

  .el-header{
    padding-left: 0px;
    padding-right: 0px;
  }

  :deep(ul.el-menu){
    border-right-width: 0px
  }

  .layout {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 0;
    background: #f0f2f5;
  }

  .multi-tab{
    background: #f0f2f5;
    border-left: 10px solid #f0f2f5;
    border-top: 10px solid #f0f2f5;
    border-right: 10px solid #f0f2f5;
  }
  .layout-content{
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    min-height: 0;
  }

</style>
