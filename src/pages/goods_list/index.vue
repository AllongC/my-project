<template>
  <view>
    <!-- 1.0 搜索框 start-->
    <search-input></search-input>
    <!-- 1.0 搜索框 end-->

    <!-- 2.0 tap栏 start-->
    <view>
      <uni-segmented-control
        :current="current"
        :values="items"
        @clickItem="onClickItem"
        style-type="text"
        active-color="#eb4450"
      ></uni-segmented-control>
      <view class="content">
        <view v-if="current === 0">
          <navigator v-for="item in goodList" :key="item.goods_id">
            <view class="goods">
              <view class="goods-image">
                  <image :src="item.goods_small_logo||'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1278875451,2756440706&fm=26&gp=0.jpg'" mode="widthFix"></image>
              </view>
              <view class="goods-info">
                  <view class="goods-title">{{item.goods_name}}</view>
                  <view class="goods-price">￥{{item.goods_price}}</view>
              </view>
            </view>
          </navigator>
        </view>
        <view v-if="current === 1">选项卡2的内容</view>
        <view v-if="current === 2">选项卡3的内容</view>
      </view>
    </view>
    <!-- 2.0 tap栏 end-->
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import SearchInput from "@/components/searchInput";
export default {
  components: {
    uniSegmentedControl,
    SearchInput
  },
  data() {
    return {
      items: ["综合", "售量", "价格"],
      current: 0,
      goodList: [],
      data: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  onLoad(options) {
    const { id } = options;
    this.data.cid = id;
    uni
      .request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
        data: this.data
      })
      .then(res => {
        this.goodList = res[1].data.message.goods;
        console.log(this.goodList);
      });
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .segmented-control__text {
  color: #999;
  font-size: 24rpx !important;
}
.goods {
  display: flex;
  height: 300rpx;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  padding: 30rpx;
  .goods-image {
    flex: 1;
    image{
        width: 184rpx;
        height: 184rpx;
    }
  }
  .goods-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    flex: 2;
    .goods-title{
        @include hidden(2)
    }
    .goods-price{
        color: $mainColor;
    }
  }
}
</style>