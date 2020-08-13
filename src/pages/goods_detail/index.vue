<template>
  <view class="detail" v-if="goodsList">
    <!-- 1.0 轮播图 start -->
    <swiper autoplay circular indicator-dots>
      <swiper-item
        v-for="(item, index) in goodsList.pics"
        :key="item.pics_id"
        @click="showImage(index)"
      >
        <image :src="item.pics_mid"></image>
      </swiper-item>
    </swiper>
    <!-- 1.0 轮播图 end -->

    <!-- 2.0 收藏 start -->
    <view class="detail-collect">
      <view class="goods-price">￥{{ goodsList.goods_price }}</view>
      <view class="goods-info">
        <view class="goods-name">{{ goodsList.goods_name }}</view>
        <view class="goods-icon">
          <view class="iconfont icon-shoucang"></view>
          <view>收藏</view>
        </view>
      </view>
    </view>
    <!-- 2.0 收藏 end -->

    <!-- 3.0 图文详细 start -->
    <view class="detail-content">
      <view class="content-title">图文详细</view>
      <view class="content">
        <rich-text :nodes="goodsList.goods_introduce"></rich-text>
      </view>
    </view>
    <!-- 3.0 图文详细 end -->

    <!-- 4.0 底部固定 start -->
    <view class="bottom">
      <view class="bottom-contact bottom-icon">
        <view class="iconfont .icon-kefu"></view>
        <view class="bottom-font">联系客服</view>
        <button open-type="contact"></button>
      </view>
      <view class="bottom-share bottom-icon">
        <view class="iconfont .icon-yixianshi-"></view>
        <view class="bottom-font">分享</view>
        <button open-type="share"></button>
      </view>
      <navigator
        class="bottom-contact bottom-icon"
        url="/pages/cart/index"
        open-type="switchTab"
      >
        <view class="iconfont .icon-gouwuche"></view>
        <view class="bottom-font">购物车</view>
      </navigator>
      <view class="add-cart" @click="addCart">加入购物车</view>
      <view class="buy">立即购买</view>
    </view>
    <!-- 4.0 底部固定 end -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: null,
      goods_id: null
    };
  },
  async onLoad(options) {
    this.goods_id = options.id || 43988;
    const res = await this.request({
      url: "/goods/detail",
      data: {
        goods_id: this.goods_id
      }
    });
    this.goodsList = res;
  },
  methods: {
    showImage(index) {
      const current = this.goodsList.pics[index].pics_big_url;
      const urls = this.goodsList.pics.map(item => item.pics_big_url);
      wx.previewImage({
        current,
        urls
      });
    },
    addCart() {
      const goodsList = uni.getStorageSync("goodsList") || [];
      const index = goodsList.findIndex(
        goods => goods.goods_id == this.goodsList.goods_id
      );
      if (index == -1) {
        this.goodsList.count = 1;
        goodsList.push(this.goodsList);
      } else {
        goodsList[index].count++;
      }
      uni.setStorageSync("goodsList", goodsList);
      wx.showToast({
        title: "加入成功",
        icon: "success",
        mask: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  padding-bottom: 100rpx;
}
swiper {
  height: 580rpx;
  overflow: hidden;
  image {
    height: 750rpx;
  }
}
.detail-collect {
  color: #666;
  .goods-price {
    color: $mainColor;
    font-weight: 600;
    font-size: 36rpx;
    padding: 10rpx;
  }
  .goods-info {
    display: flex;
    height: 100rpx;
    width: 750rpx;
    padding: 10rpx;
    border-bottom: 6rpx solid #e4e4e4;
    .goods-name {
      flex: 8;
      border-right: 2rpx solid #999;
      @include hidden(2);
    }
    .goods-icon {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 2;
      text-align: center;
      .icon-shoucang {
        font-size: 30rpx;
      }
    }
  }
}
.detail-content {
  .content-title {
    font-weight: 600;
    font-size: 36rpx;
    color: $mainColor;
    padding: 10rpx;
  }
}
.bottom {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100rpx;
  text-align: center;
  width: 750rpx;
  background-color: white;
  .iconfont {
    font-size: 40rpx;
  }
  .bottom-icon {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    button {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
  .bottom-font {
    color: balck;
    margin-top: 5rpx;
    font-size: 22rpx;
  }
  .add-cart {
    flex: 2;
    color: white;
    line-height: 100rpx;
    font-weight: 600;
    font-size: 26rpx;
    background-color: #ffa500;
  }
  .buy {
    flex: 2;
    color: white;
    line-height: 100rpx;
    font-weight: 600;
    font-size: 26rpx;
    background-color: $mainColor;
  }
}
</style>