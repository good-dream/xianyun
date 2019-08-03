<template>
  <div class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

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
      </div>
    </el-row>
  </div>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsListItem from "@/components/air/flightsListItem.vue";

export default {
  // 组件注册
  components: {
    FlightsListHead,
    FlightsListItem
  },
  data() {
    return {
      // 保存后台返回来的数据列表
      flightsData: {},
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
  methods: {
    // 获取分页的数据
    getDataList() {
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
    }
  },
  mounted() {
    // 请求列表数据
    this.$axios({
      url: "/airs",
      method: "GET",
      params: this.$route.query //请求参数在地址栏中拼接
    }).then(res => {
      // 将请求回来的数据渲染的页面中
      console.log(res);
      // 保存总的大数据
      this.flightsData = res.data;

      // 总条数
      this.total = this.flightsData.flights.length;

      // 切换出当前页面要显示的数据(显示前2条)
      this.dataList = this.flightsData.flights.slice(0, 2);
    });
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
