import request from '@/utils/request'

export default {
    getTest() {
        return request.get('/test/demo');
    },
    //初始化表数据
    initTableData() {
        return request.post('acl/menu/list');
    },
    //刪除菜单
    delete(id) {
        return request.get(`acl/menu/delete/${id}`)
    },
    //编辑菜单
    editTable(id) {
        return request.get(`acl/menu/${id}`);
    },
    //新添菜单
    saveTable(formValue) {
        return request.post('acl/menu/save', formValue);
    },
}
