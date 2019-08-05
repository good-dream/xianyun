// 保存数据的属性
export const state = () => {
    return {
        history: []
    }
}

// 设置state的值
// 同步修改数据 mutations
export const mutations = {
    setHistory(state,arr){
        state.history=arr;

        console.log(state.history)
    }
}

