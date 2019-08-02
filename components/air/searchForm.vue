<template>
  <div class="search-form">
    <!-- 头部tab切换栏 -->

    <el-row type="flex" class="search-tab">
      <!-- 绑定一个class,当点击tab栏时高亮 -->
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:index===currentTab}"
        @click="handleSearchTab(item,index)"
      >
        <!-- i标签用来绑定获取tabs数组里面图标样式 -->
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <!-- tab栏对应下面的表单 -->

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- 这个架构在输入框--远程搜索那里 -->
        <!-- fetch-suggestions: 当每次在输入框中输入文字时候会触发该事件 -->
        <!-- select：选中下拉列表的选项时候触发的事件 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          @select="handleDepartSelect"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          @select="handleDestSelect"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          icon: "iconfont icondancheng",
          name: "单程"
        },
        {
          icon: "iconfont iconshuangxiang",
          name: "往返"
        }
      ],
      // 当前tab栏的默认是哪个高亮
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert("暂时不支持往返", "提示", {
          type: "warning"
        });
      }
    },

    // (出发城市)每次输入值时候触发
    // value:输入框的值
    // cb:回调函数(callback),必须是函数,接收的参数格式是固定的,必须是一个数组,数组的每项是一个对象
    queryDepartSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }

      // 获取城市列表
      this.$axios({
        url: "/airs/city",
        // 设置get请求的参数(跟进接口文档得知传的参数为name)
        params: {
          name: value
        }
      }).then(res => {
        // 返回来的数据没有用户输入的值(value),需要给返回数据里面的data属性里面的每个对象添加value值
        const { data } = res.data;

        // 1.循环遍历给每一项数据添加一个value属性
        const newData = [];
        data.forEach(v => {
          // 让里面每个对象里面的name属性值去掉'市'字,然后赋值给对象里面的value值
          v.value = v.name.replace("市", "");
          // 最终newdata新数组里面有res.data里面的属性+value属性
          newData.push(v);
        });
        // 2.设置第一个为选中的默认值(要考虑到用户没有点击下拉选项时的情况)
        this.form.departCity = newData[0].value;
        // 目的是拿到departCode值,好让提交表单时获取到信息拼接成地址跳转
        this.form.departCode = newData[0].sort;

        cb(newData);
      });
    },

    // (到达城市)输入值时候触发
    // value是选中的值,cb是回调函数,接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }

      this.$axios({
        url: "/airs/city",
        // 设置get请求的参数(接口文档里面有规定)
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;

        // 循环给每一项数据添加一个value属性
        const newData = [];
        data.forEach(v => {
          v.value = v.name.replace("市", "");
          newData.push(v);
        });

        // 设置第一个为选中的默认值
        this.form.destCity = newData[0].value;
        this.form.destCode = newData[0].sort;

        cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // 赋值给出发城市
      this.form.departCity = item.value;
      // 赋值给出发城市的代码
      this.form.departCode = item.sort;
    },

    // 到达城市下拉选择时触发
    handleDestSelect(item) {
      // 赋值给到达城市
      this.form.destCity = item.value;
      // 赋值给到达城市的代码
      this.form.destCode = item.sort;
    },
    // 确认出发日期
    // 要用到moment模块(第三方模块需下载)和format()方法,规定时间表达方式
    // moment(数据).format(格式)
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    // 提交表单触发
    handleSubmit() {
      // 表单验证
      if (!this.form.departCity) {
        this.$alert("出发城市不能为空", "提示", {
          type: "warning"
        });
        return;
      }

      if (!this.form.destCity) {
        this.$alert("到处城市不能为空", "提示", {
          type: "warning"
        });
        return;
      }

      if (!this.form.departDate) {
        this.$alert("出发时间不能为空", "提示", {
          type: "warning"
        });
        return;
      }

      // 跳转到机票列表页
      this.$router.push({
        path: "/air/flights",
        // url的5个参数
        query: this.form
      });
    },
    // 出发和到达城市互换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      // 先解构赋值获取到相应的值,然后相互交换值
      this.form.departCity = destCity;
      this.form.departCode = destCode;

      this.form.destCity = departCity;
      this.form.destCode = departCode;
    }
  }
};
</script>

<style scoped lang='less'>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
