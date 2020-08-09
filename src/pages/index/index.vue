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
      navList: []
    };
  },
  onLoad() {
    this.getBananer();
    this.getNav();
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
</style>
