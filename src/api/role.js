import request from '@/utils/request'

export default {
    //初始化表數據
    initRoleData(formValue) {
        return request.post('acl/role/list', formValue);
    },
    //刪除菜单
    delete(id) {
        return request.post('acl/role/delete', id)
    },
    //根据ID获取角色
    getRole(id) {
        return request.get(`acl/role/${id}`);
    },
    //添加或者修改
    saveOrEdit(formValue) {
        return request.post('acl/role/save', formValue);
    },
    //分页查询
    pageList() {
        return request.get('acl/menu/list')
    },
    //获取当前角色的权限菜单
    getRoleMenu(id) {
        return request.get(`acl/role/menus/${id}`);
    },
    //更新菜单
    updateMenus(id, ids) {
        return request.post(`acl/role/updateMenus/${id}`, ids);
    },

}
