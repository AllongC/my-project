<template>
  <view class="cart-page">
    <!-- 1.0 地址信息 start -->
    <view class="address-show" v-if="address">
      <view class="address-top">
        <view class="top-name">收货人:{{ address.userName }}</view>
        <view class="top-phone">{{ address.telNumber }}</view>
      </view>
      <view class="address-bottom">{{ detailAddress }}</view>
    </view>
    <view class="address-no" @click="getAddress" v-else>+添加收货地址</view>
    <!-- 1.0 地址信息 end -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      address: null
    };
  },
  computed: {
    detailAddress() {
      if (this.address) {
        const detail =
          this.address.provinceName +
          this.address.cityName +
          this.address.countyName +
          this.address.detailInfo;
        return detail;
      }
    }
  },
  methods: {
    getAddress() {
      wx.chooseAddress({
        complete: res => {
          //cityName: "广州市"
          // countyName: "海珠区"
          // detailInfo: "新港中路397号"
          // errMsg: "chooseAddress:ok"
          // nationalCode: "510000"
          // postalCode: "510000"
          // provinceName: "广东省"
          // telNumber: "020-81167888"
          // userName: "张三";
          this.address = res;
        }
      });
    }
  }
};
</script>

<style lang="scss" >
.cart-page {
  padding: 10rpx 20rpx;
  .address-no {
    height: 100rpx;
    padding: 0rpx 10rpx;
    font-size: 24rpx;
    text-align: center;
    line-height: 100rpx;
    border: 1rpx solid $mainColor;
    color: $mainColor;
  }
  .address-show {
    color: black;
    font-size: 40rpx;
    .address-top {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>