
// 保存数据的属性 state
// 用户信息
// 这里要使用函数方式,不然会出现告警
export const state = () => {
  return {
    // 建一个对象保存后台返回来的数据放到本地存储中,下面调用方法会用到state
    userInfo: {
      token: '',
      user: {
      }
    }
  }
}

// 同步修改数据 mutations
export const mutations = {
  // state就是上面的state,这个参数是固定默认的
  // data:该数据为点击登录按钮后发送请求,后台反馈回来的数据;调用下面的方法时候传入数据
  // 把后台反馈回来的数据存储在本地(主要储存token值)
  setUserInfo(state, data) {
    state.userInfo = data;
  },

  // 清除用户数据
  clearUserInfo(state){
    state.userInfo={
      token:'',
      user:{}
    }
  }
}

// 异步修改数据 actions
export const actions = {

}

