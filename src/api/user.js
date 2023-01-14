import request from '@/utils/request'

export default {
    //初始化表数据
    initUserTable(formValue) {
        return request.post('acl/user/list', formValue);
    },
    //修改状态
    changeStatus(id, status) {
        return request.get(`acl/user/updateStatus/${id}` + `/status/${status}`)
    },
    //删除用户
    deleteUser(id) {
        return request.post('acl/user/delete', id);
    },
    //重置密码
    restPassword(id) {
        return request.get(`acl/user/resetPassword/${id}`);
    },
    //验证用户名
    checkUserName(username) {
        return request.post('acl/user/checkUserName', {username: username});
    },
    //根据ID查询
    getUserById(id) {
        return request.get(`acl/user/${id}`);
    },
    //添加用户
    saveUser(formValue) {
        return request.post('acl/user/save', formValue);
    },
    //查询所有角色数据
    getRoleAll() {
        return request.get('acl/role/listAll');
    },
    //用户角色授权
    grantRole(id, role) {
        return request.post(`acl/user/grantRole/${id}`, role)
    },

}


