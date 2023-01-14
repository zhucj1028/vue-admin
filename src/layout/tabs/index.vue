<template>
  <el-tabs v-model="editableTabsValue"  class="demo-tabs"
           closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane style="padding: 11px 10px;" v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import {ref, watch, computed} from 'vue'
import store from "@/store";
import {useRoute, useRouter} from 'vue-router'

const route = useRoute();
const router = useRouter();

const editableTabsValue = ref(store.state.editableTabsValue)
const editableTabs = ref(store.state.editableTabs)

const refreshTabs = () => {
  editableTabsValue.value = store.state.editableTabsValue
  editableTabs.value = store.state.editableTabs
}

const removeTab = (targetName) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value

  if (activeName === '/index') {
    return
  }

  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  store.state.editableTabsValue = editableTabsValue.value
  store.state.editableTabs = editableTabs.value
  router.push({path: activeName})
}

const clickTab = (target) => {
  router.push({name: target.props.label})
}

watch(editableTabsValue, () => {
  store.state.editableTabsValue = editableTabsValue.value
}, {deep: true, immediate: true})

watch(store.state, () => {
  refreshTabs();
}, {deep: true, immediate: true})

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-main {
  padding: 0px;
}
.tab-css {
  box-shadow: rgb(235 235 235) 0px 2px 0px 9px;
  margin: 10px;
  padding-left: 15px;
  background-color: white;
}

.el-tabs {
  height: 50px
}

.demo-tabs > .el-tabs__header {
  padding-left: 15px;
  padding-top: 10px;
}

</style>
