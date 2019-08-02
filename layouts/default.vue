<template>
  <div>
    <Header/>
    <!-- nuxt组件占位符,相当于router-view -->
    <nuxt />

    <Footer/>
  </div>
</template>
<script>
// 导入头部组件,vue文件扩展名可以省略
import Header from '@/components/header'
import Footer from '@/components/footer'


export default {
  
  // 注册组件
  components:{
    Header,
    Footer
  }

}
</script>



<style>
/* 公共样式,不要加scoped */

  /* 初始化 */
  *{
    margin:0;
    padding:0;
  }
  /* 去掉小点点 */
  ul,ol,li {
    list-style:none;
  }
  /* a标签的颜色继承和去掉下划线 */
  a {
    color:inherit;
    text-decoration: none;
  }
  /* 去掉字体斜体 */
  em,i {
    font-style:normal;
  }
  /* 去掉外边框和外轮廓线 */
  input {
    border:none;
    outline:none;
  }
</style>
