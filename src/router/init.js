
// 动态绑定路由
import router from "@/router/index";
import store from '@/store'

const bindRoute=(menuList)=>{
    console.log(menuList)
    let newRoutes=router.options.routes;
    menuList.forEach(menu=>{
        if(menu.children){
            menu.children.forEach(m=>{
                // 菜单转成路由
                let route=menuToRoute(m,menu.name);
                if(route){
                    newRoutes[0].children.push(route); // 添加到路由管理
                }
            })
        }
    })
    // 重新添加到路由
    newRoutes.forEach(route=>{
        router.addRoute(route);
    })
}

// 菜单转成路由
const menuToRoute = (menu,parentName) => {

    if (!menu.component) {
        return null
    }else{
        let route = {
            name: menu.name,
            path: menu.path,
            meta:{
                parentName:parentName
            }
        }
        route.component = () => import('@/views/' + menu.component +'.vue')

        return route
    }
}

const menuList=store.getters.GET_MENULIST;
const token=store.getters.GET_TOKEN;

console.log(typeof menuList);
if(token){
    console.log("动态绑定路由")
    bindRoute(menuList); // 动态绑定路由
}

