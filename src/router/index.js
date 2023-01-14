import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../layout'),
    redirect:'/index',
    children:[
      {
        path: '/index',
        name: '首页',
        component: () => import('../views/index/index')
      },{
        path: '/userCenter',
        name: '个人中心',
        component: () => import('../views/userCenter/index')
      }
    //   {
    //     path:'/sys/user',
    //     name:'用户管理',
    //     component:User
    //   },
    //   {
    //     path:'/sys/role',
    //     name:'角色管理',
    //     component:Role
    //   },
    //   {
    //     path:'/sys/menu',
    //     name:'菜单管理',
    //     component:Menu
    //   },
    //   {
    //     path:'/bsns/department',
    //     name:'部门管理',
    //     component:Department
    //   },
    //   {
    //     path:'/bsns/post',
    //     name:'岗位管理',
    //     component:Post
    //   }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
