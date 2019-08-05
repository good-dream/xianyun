<template>
  <div class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 组件传值: -->
        <!-- data 是不会被修改的列表数据 -->
        <!-- setDataList  用于修改过滤后的数组列表(组件传递事件) -->
        <FlightsFilters :data='cacheFlightsData' @getDataList='getDataList' />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 后台返回的信息,机票列表展示 -->
          <!-- 在父组件这里做遍历,然后把data传到子组件里面去 -->
          <!-- 对当前页面要展示信息进行遍历,把每个item传入到子组件中使用 -->
          <FlightsListItem 
          v-for='(item,index) in dataList' 
          :key='index'
          :data='item'/>

          <!-- 分页 -->
          <!-- size-change:修改条数时候触发 -->
          <!-- current-change:修改页数时候触发 -->
          <!-- current-page:当前页面 -->
          <!-- page-size:当前页面显示的条数 -->
          <!-- total:总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </div>
</template>

<script>
// 引入组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsListItem from "@/components/air/flightsListItem.vue";
import FlightsFilters from '@/components/air/flightsFilters.vue';
import FlightsAside from '@/components/air/flightsAside.vue'

export default {
  // 组件注册
  components: {
    FlightsListHead,
    FlightsListItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      // 保存后台返回来的数据列表
      // 当传值到子组件的时候,发现为空(报错);由于是该值由异步请求后才有数值(需要时间),可先给该值给个默认,如下
      flightsData: { //航班总数据
        flights:[],
        info:{},
        options:{}
      },

      // 缓存的数据(用来在子组件过滤操作)
      cacheFlightsData:{
        flights:[],
        info:{},
        options:{}
      },


      // 总条数
      total: 0,
      // 保存当前显示的列表数据
      dataList: [],
      // 当前页面(页码)
      pageIndex: 1,
      // 当前页面显示条数
      pageSize: 2
    };
  },
  // watch是监听属性,可以监听实例下所有的属性变化  this.xxx
  // 点击历史记录,需要监听url的变化,重新发起请求
  watch:{
    // 监听路由信息的变化
    $route(){
      // 请求新的数据
      this.pageIndex=1;
      this.getData();
    }
  },
  methods: {
    // 获取分页的数据
    getDataList(arr) {

      // 过滤组件调用时候,返回的过滤后的数据
      if(arr){
        // 替换掉列表数据
        this.flightsData.flights=arr;
        // 这步是把当前修改后的数据的分页显示出来
        this.total=arr.length;
      }

      // 修改dataList的数据
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );
    },

    // 修改显示条数时候触发
    handleSizeChange(value) {
      // 修改分页条数
      this.pageSize = value;
      // 获取分页的数据
      this.getDataList();
    },

    // 切换页数时候触发
    handleCurrentChange(value) {
      // 修改页数
      this.pageIndex=value;

      // 获取分页数据
      this.getDataList();
    },

    // 获取列表数据
    getData(){
      this.$axios({
      url: "/airs",
      method: "GET",
      params: this.$route.query //请求参数在地址栏中拼接
    }).then(res => {
      // 将请求回来的数据渲染的页面中
      console.log(res);
      // 保存总的大数据
      this.flightsData = res.data;

      // 缓存一份新的列表数据,这个列表不会被修改
      // 而flightsData会被修改
      this.cacheFlightsData={...res.data};

      // 总条数
      this.total = this.flightsData.flights.length;

      // 切换出当前页面要显示的数据(显示前2条)
      this.dataList = this.flightsData.flights.slice(0, 2);
    });
    }
  },
  mounted() {
    // 请求列表数据
    this.getData();
  }
};
</script>

<style scoped lang='less'>
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
