import store from '@/store'
import requestUtil from '@/utils/request'

async function getUserInfo(){
    let result=await requestUtil.get("/acl/user/info");
    let data=result.data;
    if(data.code==200){
        console.log("userInfo="+data.currentUser)
        store.commit("SET_USERINFO",data.currentUser)
    }
}

getUserInfo();
