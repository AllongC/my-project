<template>
  <view class="category">
    <!-- 1.0 搜索框  start-->
    <search-input />
    <!-- 1.0 搜索框  end-->

    <!-- 2.0 分类内容 start-->
    <view class="main">
      <view class="main-left">
        <view
          v-for="(item,index) in titleList"
          :key="index"
          :class="['item',currentId==index?'active':'']"
          @click="chageCurrent(index)"
        >{{item}}</view>
      </view>
      <scroll-view  class="main-right" scroll-y :scroll-top="scrollTop">
        <view class="product" v-for="(item,index) in productList" :key="index">
            <view class="product-title">
              <text>/</text>
              <text>{{item.cat_name}}</text>
              <text>/</text>
            </view>
            <view class="product-all">
              <view class="product-shop" v-for="(item,index) in item.children" :key="index">
                <navigator :url="'/pages/goods_list/index?id='+item.cat_id">         
                  <image :src="item.cat_icon" mode="widthFix"></image>
                  <view>{{item.cat_name}}</view>
                </navigator>
              </view>
            </view>
        </view>
      </scroll-view >
    </view>
    <!-- 2.0 分类内容 end-->
  </view>
</template>

<script>
import SearchInput from "@/components/searchInput";

let dataAll = [];

export default {
  components: {
    SearchInput
  },
  data() {
    return {
      titleList: [],
      productList: [],
      currentId: 0,
      scrollTop:0
    };
  },
  onLoad() {
    const local = wx.getStorageSync('local')||null;
    if(local){
      if(Date.now()-local.time>1000*60){
        wx.removeStorageSync('local');
        this.getProduct();
        }else{
        dataAll = local.dataAll;
        console.log(Date.now()-local.time>1000*60);
        this.titleList = dataAll.map(item => item.cat_name);
        this.productList = dataAll[0].children;
      }
    }else{
      this.getProduct();
    }
  },
  methods: {
    //获取当前下标
    chageCurrent(index) {
      this.currentId = index;
      this.productList = dataAll[index].children;
      this.scrollTop = Math.random()/1000
    },
    //获取列表信息
    getProduct(){
       uni
      .request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
      })
      .then(res => {
        dataAll = res[1].data.message;
        this.titleList = dataAll.map(item => item.cat_name);
        this.productList = dataAll[0].children;
        wx.setStorageSync('local', {dataAll:dataAll,time:Date.now()});
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main {
    display: flex;
    flex: 1;
    .main-left {
      height: 100%;
      width: 200rpx;
      overflow: auto;
      text-align: center;
      .item {
        line-height: 100rpx;
      }
      .active {
        color: $mainColor;
        border-left: 2px solid $mainColor;
      }
    }
    .main-right {
      height: 100%;
      flex: 1;
      overflow: auto;
      .product-title {
        line-height: 100rpx;
        text-align: center;
        text:nth-child(2) {
          margin: 0rpx 10rpx;
        }
      }
      .product-all{
        display: flex;
        flex-wrap: wrap;
      }
      .product-shop{
        width: 33.33%;
        text-align: center;
        padding: 5rpx;
        image{
          width: 104rpx;
          height: 106rpx;
        }
      }
    }
  }
}
</style>