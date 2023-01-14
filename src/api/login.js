import request from '@/utils/request'

// 获取验证码
export default {
    logout() {
        return request.get('/logout')
    },
}
