import request from '@/utils/request'

// 获取验证码
export default {
    //修改用户头像
    updateAvatar(formValue) {
        return request.post('acl/user/updateAvatar',formValue)
    },
    //修改用户密码
    updateUserPwd(formValue) {
        return request.post('acl/user/updateUserPwd',formValue)
    },
    //修改保存用户
    save(formValue) {
        return request.post('acl/user/save',formValue)
    },

}
//import api from '@/api/userCenter'
//import api from '@/api/userCenter'
