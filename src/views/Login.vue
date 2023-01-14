<template>
  <div class="login">

    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">后台管理</h3>

      <el-form-item prop="username">

        <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="账号"
        >
           <template #prefix><svg-icon icon="user" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon="password" /></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon="validCode" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
            size="large"
            type="primary"
            style="width:100%;"
            @click.prevent="handleLogin"
        >
          <span>登 录</span>

        </el-button>

      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <b>
        Copyright &copy; {{getYear()}} 总要抱点妄想 All Rights Reserved<br>
        <a target="_blank" style="color:white" href="https://beian.miit.gov.cn/">黔ICP备2020011449号</a>
      </b>
    </div>
  </div>
</template>

<script setup>

  import { ref } from 'vue'
  import Cookies from "js-cookie";
  import { encrypt, decrypt } from "@/utils/jsencrypt";
  import requestUtil from '@/utils/request'
  import {ElMessage} from 'element-plus'
  import qs from 'qs'
  import store from '@/store'
  import router from "@/router";

  const codeUrl = ref("");

  const loginRef=ref(null);

  const loginForm = ref({
    username: "",
    password: "",
    rememberMe: false,
    code: "",
    uuid: ""
  });

  const loginRules = {
    username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
    password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
    code: [{ required: true, trigger: "change", message: "请输入验证码" }]
  };

  const getCode=async ()=>{

     let result=await requestUtil.get("/captcha");
     console.log(result)
     loginForm.value.uuid=result.data.uuid;
     codeUrl.value=result.data.base64Img;
  }

  const handleLogin=()=>{

    loginRef.value.validate(async (valid)=>{
      if(valid){
        // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
        if (loginForm.value.rememberMe) {
          Cookies.set("username", loginForm.value.username, { expires: 30 });
          Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 });
          Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
        } else {
          // 否则移除
          Cookies.remove("username");
          Cookies.remove("password");
          Cookies.remove("rememberMe");
        }

        try{
          let result=await requestUtil.post("login?"+qs.stringify(loginForm.value));
          let data=result.data;
          if(data.code==200){
            const token = data.authorization
            const menuList=data.menuList;
            const perms=data.perms;
            const currentUser=data.currentUser;
            console.log("menuList="+menuList);
            // console.log("token="+token);
            store.commit('SET_TOKEN', token)

            store.commit('SET_MENULIST',menuList);

            store.commit('SET_PERMS',perms);

            store.commit("SET_USERINFO",currentUser);

            // bindRoute(menuList);

            router.replace("/")
            // ElMessage.success("登录成功")

           // window.sessionStorage.setItem("token",data.token);
          //  window.sessionStorage.setItem("userInfo",JSON.stringify(form.value))
          //  router.replace("/")
          }else{
            ElMessage.error(data.msg);
          }
        }catch(err){
          console.log("error:"+err);
          ElMessage.error("服务器出错，请联系管理员！");
        }
      }else{
        console.log("验证失败")
      }
    })
  }

  function getCookie() {
    const username = Cookies.get("username");
    const password = Cookies.get("password");
    const rememberMe = Cookies.get("rememberMe");
    loginForm.value = {
      username: username === undefined ? loginForm.value.username : username,
      password: password === undefined ? loginForm.value.password : decrypt(password),
      rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
    };
  }

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

  if(token){
    console.log("动态绑定路由")
    bindRoute(menuList); // 动态绑定路由
  }

  //获取当前年份
  const getYear = () => {
    let timeNow = new Date();
    return timeNow.getFullYear();
  };

  getCode();
  getCookie();

</script>

<style lang="scss" scoped>
a{
  color:white
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;



    input {
      display: inline-block;
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }

}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 80px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}


</style>
