<template>
  <div class="flight-item">
    <div @click="isShow=!isShow">
      <!-- 显示的机票信息 -->
      <!-- align:垂直居中 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          <span>{{data.flight_no}}</span>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-bwteen" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <!-- 这个用时多少时间要手动算出来 -->
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ¥
          <span class="sell-price">{{data.seat_infos[0].org_settle_price_child}}</span>起
        </el-col>
      </el-row>
    </div>

    <!-- 隐藏的座位信息列表 -->
    <div class="flight-recommend" v-if="isShow">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推挤</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span>
              | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">￥{{ item.org_settle_price }}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 声明组件可以接受哪些属性
  // props除了可以等于数组,还可以等于对象
  // 好处就是可以知道该属性的类型,还有不传值时候还有默认值
  props: {
    data: {
      type: Object, //表示数据类型
      default: ()=>{}//如果调用组件时候不传该属性,会取这个默认值
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  // 计算属性
  computed: {
    // 计算相隔时间
    rankTime() {
      // 获取到达时间数组
      const arr = this.data.arr_time.split(":");
      // 获取出发时间数组
      const dep = this.data.dep_time.split(":");
      // 判断当到达时间已超过凌晨(24小时)的情况
      // 涉及到隐式转换
      if (arr[0] < dep[0]) {
        arr[0] += 24;
      }

      const end = arr[0] * 60 + +arr[1];
      const start = dep[0] * 60 + +dep[1];

      // 旅途经过多长时间
      const dis = end - start;
      const hours = Math.floor(dis / 60);
      const min = dis % 60;

      return `${hours}小时${min}分钟`;
    }
  }
};
</script>

<style scoped lang='less'>
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
