<template>
  <!-- modle:表单数据对象 -->
  <!-- rules:表单校验规则(需在data中设置) -->
  <!-- ref:获取dom元素 -->
  <el-form ref="form" class="form" :model="form" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <!-- prop:该属性设置为需校验的字段名 -->
    <el-form-item class="form-item" prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-form-item>
      <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form:{
        username:'',
        password:''
      },
      // 表单规则
      rules: {
        username:[
          {
            required:true, //是否必填,true为必填
            message:'用户名不能为空',
            trigger:'blur'  //触发时机:失去焦点
          }
        ],
        password:[
          {
            required:true,
            message:'密码不能为空',
            trigger:'blur'
          }
        ]
      }
    };
  },
  methods:{
    // 提交登录
    handleLoginSubmit(){
      this.$refs.form.validate(valid=>{
        console.log(valid)
        if(valid){
          // 提交登录接口
          this.$axios({
            url:'/accounts/login',
            method:'POST',
            data:this.form
          }).then(res=>{
            // 把后台返回来的数据(里面包含token的状态保持),保存在store,但要使用mutations里面的方法

            // mutations下的方法都必须使用commit来调用
            // 第一个参数是调用的方法名(),第二个参数就是数据
            // console.log(res)
            this.$store.commit('user/setUserInfo',res.data)

            // 登录成功后跳转到首页
            this.$router.push('/')

          })
        }
      })
    }
  }
};
</script>

<style lang='less' scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
