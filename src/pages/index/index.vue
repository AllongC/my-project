<template>
  <view>
    <!-- 1.0  搜索框  sart-->
    <searchInput />
    <!-- 1.0  搜索框  end-->

    <!-- 2.0 轮播图 start-->
    <swiper autoplay circular indicator-dots>
      <swiper-item v-for="item in bananers" :key="item.goods_id">
        <image :src="item.image_src" mode="widthFix" />
      </swiper-item>
    </swiper>
    <!-- 2.0 轮播图 end-->

    <!-- 3.0 导航 start -->
    <view class="nav">
      <navigator v-for="item in navList" :key="item.goods_id">
        <image :src="item.image_src" mode="widthFix" />
      </navigator>
    </view>
    <!-- 3.0 导航 end -->

    <!-- 4.0 楼层 start  -->
    <view class="fool" v-for="(item,index) in foolList" :key="index">
      <view class="title">
        <image :src="item.floor_title.image_src" mode="widthFix" />
      </view>
      <view class="bottom">
        <image
          v-for="(item,index) in item.product_list"
          :key="index"
          :src="item.image_src"
          :mode="index==0?'widthFix':'scaleToFill'"
        />
      </view>
    </view>
    <!-- 4.0 楼层 end -->
  </view>
</template>

<script>
import searchInput from "@/components/searchInput";
export default {
  components: {
    searchInput
  },
  data() {
    return {
      bananers: [],
      navList: [],
      foolList: []
    };
  },
  onLoad() {
    this.getBananer();
    this.getNav();
    this.getfool();
  },
  methods: {
    getBananer() {
      uni
        .request({
          url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
        })
        .then(res => {
          this.bananers = res[1].data.message;
        });
    },
    getNav() {
      uni
        .request({
          url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
        })
        .then(res => {
          this.navList = res[1].data.message;
        });
    },
    getfool() {
      uni
        .request({
          url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
        })
        .then(res => {
          this.foolList = res[1].data.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
swiper {
  height: 340rpx;
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  navigator {
    flex: 1;
    padding: 30rpx;
  }
}
.fool {
  .title {
    margin: 10rpx 0rpx;
    image {
      width: 750rpx;
    }
  }
  .bottom {
    overflow: hidden;
    image {
      float: left;
      width: 33.33%;
      height: 202rpx;
      padding: 4rpx;
    }
  }
}
</style>
