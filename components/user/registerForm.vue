<template>
  <el-form ref="form" :model="form" class="form" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <!-- 昵称 -->
    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPassword">
      <el-input type="password" v-model="form.checkPassword" placeholder="确认密码"></el-input>
    </el-form-item>

    <el-button type="primary" @click="handleRegSubmit" class="submit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //验证再次输入密码
    // rule 当前的规则
    // value 输入框的值
    // callback回调函数,必须要调用,不调用就不会验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据对象
      form: {
        username: "",
        captcha: "", //验证码
        nickname: "", //昵称
        password: "",
        checkPassword: "" //确认密码
      },
      // 表单规则rules(对象)
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "手机验证码不能为空",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        //自定义验证规则(element-ui的另外一个模板)(验证密码是否一致)
        checkPassword: [
          {
            validator: validatePass, //该变量是一个回调函数,且在data函数里面定义
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 点击手机发送验证码
    handleSendCaptcha() {
      // 判断手机号码是否为空
      if (!this.form.username) {
        this.$message.warning("手机号码不能为空");
        return;
      }
      // 发送验证码
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        //获取成功返回的信息(验证码)
        console.log(res);
        const { code } = res.data; //解构赋值
      });
    },
    // 点击发送注册
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // ES6的标准语法,解构出特定的属性后,剩余的属性可以用... +变量名访问
          const { checkPassword, ...props } = this.form;

          // 调用注册的接口
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res => {
            
            // mutations下的方法都必须使用commit()来调用
            // 第一个参数是调用的方法名(要说清楚在哪个js文件下),第二个参数就是数据
            this.$store.commit("user/setUserInfo", res.data);

            // 跳转到首页
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
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
