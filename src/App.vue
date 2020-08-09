<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style>
@import url("style/iconfont.wxss");
/*每个页面公共css */
view,
navigator,
image {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #666;
  font-size: 24rpx;
}
image {
  width: 100%;
}
</style>
