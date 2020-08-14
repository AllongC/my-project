<template>
  <view class="cart-page">
    <!-- 1.0 地址信息 start -->
    <view class="address">
      <view class="address-show" v-if="address">
        <view class="address-top">
          <view class="top-name">收货人:{{ address.userName }}</view>
          <view class="top-phone">{{ address.telNumber }}</view>
        </view>
        <view class="address-bottom">{{ detailAddress }}</view>
      </view>
      <view class="address-no" @click="getAddress" v-else>+添加收货地址</view>
    </view>
    <!-- 1.0 地址信息 end -->

    <!-- 2.0 购物车 start -->
    <view class="cart">
      <view class="cart-title">优购生活馆</view>
      <view class="cart-item" v-for="(item, index) in cartList" :key="index">
        <view class="cart-check">
          <checkbox-group @change="changeVal(index)">
            <checkbox
              color="#eb4450"
              :checked="item.checked"
              style="transform:scale(0.7)"
            ></checkbox>
          </checkbox-group>
        </view>
        <view class="cart-img">
          <image :src="item.goods_small_logo" mode="scaleToFill"></image>
        </view>
        <view class="cart-info">
          <view class="info-name">{{ item.goods_name }}</view>
          <view class="info-price">
            <view class="price">￥{{ item.goods_price }}</view>
            <view class="num">
              <text @click="add(-1, index)">-</text>
              {{ item.count }}
              <text @click="add(1, index)">+</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 2.0 购物车 end -->

    <!-- 3.0 结算 start -->
    <view class="close">
      <view class="close-all">
        <checkbox-group @change="checkAll">
          <checkbox
            color="#eb4450"
            :checked="checked"
            style="transform:scale(0.7)"
            ><text>全选</text></checkbox
          >
        </checkbox-group>
      </view>
      <view class="close-price">
        <view class="close-price-top"
          >合计：<text>￥ {{ money }}</text></view
        >
        <view class="close-price-bottom">包含运费</view>
      </view>
      <view class="close-buy">结算({{ count }})</view>
    </view>
    <!-- 3.0 结算 end -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      address: null,
      cartList: []
    };
  },
  watch: {
    cartList: {
      handler(newCart) {
        uni.setStorageSync("goodsList", newCart);
      },
      deep: true
    }
  },
  onShow() {
    this.cartList = uni.getStorageSync("goodsList");
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
    },
    checked() {
      return this.cartList.length
        ? this.cartList.every(item => item.checked)
        : false;
    },
    count() {
      let count = 0;
      this.cartList.forEach(item => {
        if (item.checked) count++;
      });
      return count;
    },
    money() {
      let money = 0;
      this.cartList.forEach(item => {
        if (item.checked) money += item.count * item.goods_price;
      });
      return money;
    }
  },
  methods: {
    getAddress() {
      wx.chooseAddress({
        complete: res => {
          this.address = res;
        }
      });
    },
    changeVal(index) {
      this.cartList[index].checked = !this.cartList[index].checked;
    },
    checkAll() {
      this.cartList.forEach(item => {
        item.checked = true;
      });
    },
    add(num, index) {
      if (num == -1 && this.cartList[index].count == 1) {
        console.log("是否要删除");
        uni.showModal({
          title: "提示",
          content: "是否要移除该商品",
          complete: res => {
            if (res.confirm) this.cartList.splice(index, 1);
          }
        });
      } else {
        this.cartList[index].count += num;
      }
    }
  }
};
</script>

<style lang="scss" >
.cart-page {
  padding-bottom: 100rpx;
  .address-no {
    margin: 10rpx 20rpx;
    height: 100rpx;
    padding: 0rpx 10rpx;
    font-size: 24rpx;
    text-align: center;
    line-height: 100rpx;
    border: 1rpx solid $mainColor;
    color: $mainColor;
  }
  .address-show {
    margin: 10rpx 20rpx;
    color: black;
    font-size: 40rpx;
    .address-top {
      display: flex;
      justify-content: space-between;
    }
  }
  .cart {
    border-top: 10rpx solid $mainColor;
    .cart-title {
      font-size: 34rpx;
      height: 100rpx;
      line-height: 100rpx;
      padding-left: 20rpx;
      color: black;
      border-bottom: 1rpx solid #e4e4e4;
    }
    .cart-item {
      padding: 10rpx 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200rpx;
      border-bottom: 1rpx solid #eeeeee;
      .cart-check {
        width: 40rpx;
      }
      .cart-img {
        flex: 3;
        text-align: center;
        image {
          width: 196rpx;
          height: 142rpx;
        }
      }
      .cart-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 4;
        .info-name {
          @include hidden(2);
        }
        .info-price {
          display: flex;
          justify-content: space-between;
          .price {
            font-weight: 600;
            color: $mainColor;
          }
          .num {
            color: black;
            text {
              margin: 0rpx 20rpx;
              display: inline-block;
              height: 42rpx;
              width: 30rpx;
              line-height: 42rpx;
              text-align: center;
              border: 1px solid #666;
            }
          }
        }
      }
    }
  }
  .close {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0px;
    left: 0px;
    border-top: 1rpx solid #eeeeee;
    height: 100rpx;
    width: 750rpx;
    .close-all {
      flex: 3;
      text {
        font-size: 45rpx;
        margin-left: 10rpx;
        color: black;
      }
    }
    .close-price {
      flex: 4;
      text-align: right;
      padding-right: 10rpx;
      .close-price-top {
        font-weight: 600;
        text {
          color: $mainColor;
        }
      }
    }
    .close-buy {
      flex: 3;
      height: 100rpx;
      background-color: $mainColor;
      line-height: 100rpx;
      color: white;
      text-align: center;
      font-size: 30rpx;
    }
  }
}
</style>