<template>
  <view>
    <!-- 1.0  搜索框  sart-->
    <searchInput />
    <!-- 1.0  搜索框  end-->

    <!-- 2.0 轮播图 start-->
    <swiper autoplay circular indicator-dots>
      <swiper-item v-for="item in bananers" :key="item.goods_id">
        <image :src="item.image_src" mode="widthFix"></image>
      </swiper-item>
    </swiper>
    <!-- 2.0 轮播图 end-->

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
    };
  },
  onLoad() {
    this.getBananer();
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
    }
  }
};
</script>

<style lang="scss" scoped>
swiper{
  height: 340rpx;
}
</style>
