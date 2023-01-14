<template>
  <div class="navbar">
      <Breadcrumb />
      <div class="navbar-right">
      <Avatar/>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from './components/breadcrumb.vue'
import Avatar from './components/avatar.vue'
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 8px 0px #f0f2f5;
  padding: 0 21px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
