import store from "@/store";

export const totalCommon={
    methods: {
        hasAuth(perm) {
            let perms = store.getters.GET_PERMS;
            return perms.indexOf(perm) >= 0
        }
    }
}
