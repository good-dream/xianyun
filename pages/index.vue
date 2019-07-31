<template>
  <div class="container">
    <!-- 轮播图 -->
    <!-- interval:间隔时间
    arrow:出现箭头-->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <!-- 里面加一个带有背景图片的属性的div -->
        <div
          class="banner-image"
          :style="`
                background:url(${ $axios.defaults.baseURL + item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">

        <!-- tab切换栏 -->
        <el-row type="flex" class="search-tab">
          <!-- 绑定class,给每个tab栏一个高亮 -->
          <span
            v-for="(item, index) in options"
            :key="index"
            :class="{ active: current == index  }"
            @click="handleClick(index)"
          >
            <i>{{ item.title }}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder=" options[current].placeholder " 
          v-model='searchValue'
          @keyup.enter='handleSearch'/>
          <i class="el-icon-search" @click='handleSearch'></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// nuxt默认把axios添加到原型
// import axios from 'axios'
// Vue.prototype.$axios=axios;


export default {
  data() {
    return {
      // 搜索框的值
      searchValue:'',
      // 记录当前的状态下标
      current:0,
      // 轮播图数据图片(在生命周期钩子函数中用axios发起请求获取到图片数据)
      banners: [],
      options: [
        {
          title: "攻略",
          placeholder: "请输入城市"
        },
        {
          title: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          title: "机票",
          placeholder: ""
        }
      ]
    };
  },
  methods: {
    // 把index的值赋值给current
    handleClick(index){
      // 判断当点击机票时跳转
      if(index===2){
        this.$router.push('/air')
      }
      this.current=index;
    },
    handleSearch(){
      
    }
  },
  // 生命周期hook函数
  mounted(){
    // $开头的属性是vue实例对象的约定用法
    this.$axios({
      url:"/scenics/banners"
    }).then(res=>{
      // data是一个数组
      const {data}=res.data;
      this.banners=data;
    })
  }
};
</script>

<style scoped lang='less'>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

// 在scoped下,修改第三方组件的样式(在scoped下默认会给样式添加个随机字符串),需要加个/deep/
  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    // 层级(越大优先级越高)
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    //transparent:透明的
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;
        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rbga(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }
    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
