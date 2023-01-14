import { createStore } from 'vuex'
import router from '@/router'
import qs from 'qs'

export default createStore({
  state: {
   // token: '',
  //  menuList:[],
    hasRoutes: false,
    editableTabsValue:'/index',
    editableTabs:[
      {
        title: '首页',
        name: '/index'
      }
    ]
  },
  getters: {
    GET_TOKEN: state => {
      return sessionStorage.getItem("token")
    },
    GET_MENULIST:state => {
      return JSON.parse(sessionStorage.getItem("menuList"))
    },
    GET_PERMS:state=>{
      return JSON.parse(sessionStorage.getItem("perms"))
    },
    GET_USERINFO:state=>{
      return JSON.parse(sessionStorage.getItem("userInfo"))
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      // state.token = token
      sessionStorage.setItem("token", token)
    },
    RESET_TOKEN:(state)=>{
      //state.token=''
      sessionStorage.setItem("token", "")
    },
    SET_MENULIST:(state,menuList)=>{
      //state.menuList=menuList;
      sessionStorage.setItem("menuList", JSON.stringify(menuList))
    },
    SET_PERMS:(state,perms)=>{
      sessionStorage.setItem("perms", JSON.stringify(perms))
    },
    SET_USERINFO:(state,userInfo)=>{
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    ADD_TABS:(state,tab)=>{
      if(state.editableTabs.findIndex(e=>e.name===tab.path)===-1){
        state.editableTabs.push({
          title: tab.name,
          name:tab.path
        });
      }
      state.editableTabsValue=tab.path
    },
    RESET_TABS:(state)=>{
      state.editableTabsValue='/index';
      state.editableTabs=[
        {
          title: '首页',
          name: '/index'
        }
      ]
    },
    SET_ROUTES_STATE:(state,hasRoutes)=>{
      state.hasRoutes=hasRoutes
    }
  },
  actions: {
    // 安全退出
    logout(){
      window.sessionStorage.clear();
      this.state.hasRoutes=false
      router.replace('/login')
    }
  },
  modules: {
  }
})
