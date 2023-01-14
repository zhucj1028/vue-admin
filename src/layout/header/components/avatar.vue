<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="squareUrl" />
      &nbsp;&nbsp;{{ currentUser.username }}&nbsp;<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>

    <template #dropdown>
      <el-dropdown-menu>
         <el-dropdown-item>
          <router-link :to="{name:'个人中心'}">个人中心</router-link>
        </el-dropdown-item>
        <el-dropdown-item @click="logout">安全退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import api from '@/api/login';
import { ArrowDown } from '@element-plus/icons-vue'


const store=useStore()

const currentUser=ref(store.getters.GET_USERINFO);

const squareUrl=ref(currentUser.value.avatar)

var username = currentUser.username;

const logout=async ()=>{
  let result = await api.logout();

  if(result.data.code===200){
    store.commit("RESET_TABS");
    store.dispatch('logout')
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
