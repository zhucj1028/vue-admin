<template>
<div>
  <el-row class="header">
    <el-button type="success" v-if="hasAuth('system:post:test')" @click="getTest">新增</el-button>
  </el-row>
</div>
</template>

<script>
import api from '@/api/permission';

export default {
data(){
  return {}
},
methods: {
  getTest() {
    api.getTest().then(response => {
      console.log(response.data())
    });
  },
}
}
</script>

<style scoped>

</style>
