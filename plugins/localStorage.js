

import createPersistedState from 'vuex-persistedstate'

// 每个nuxt的插件都会暴露一个函数
// 插件的第一个参数是默认的nuxt对象
export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}