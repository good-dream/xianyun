<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
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
