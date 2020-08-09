<template>
  <view class="container">
    <navigator>
      <view class="search">搜索</view>
    </navigator>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  height: 90rpx;
  padding: 15rpx;
  background-color: $mainColor;
  .search {
    background-color: white;
    height: 100%;
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 10rpx;
  }
}
</style>