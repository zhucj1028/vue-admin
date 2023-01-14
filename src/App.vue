<template>
  <router-view/>
</template>
<script setup>

import { ref ,watch} from 'vue'
import store from "@/store";
import { useRoute,useRouter } from 'vue-router'
const route=useRoute();
const router=useRouter();
const whitePath=['/login','/index','/']


watch(route,(to,from)=>{
   if (whitePath.indexOf(to.path)===-1) {
    let obj = {
      name: to.name,
      path: to.path
    }
    store.commit("ADD_TABS", obj)
  }
},{deep:true,immediate:true})

</script>
<style>
html,body,#app{
  height: 100%;
}

.app-container{
  padding:20px
}
</style>
