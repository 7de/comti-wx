import wepy from 'wepy'
export default {
  // 返回首页
  goHome() {
    wepy.reLaunch({
      url: '/pages/home'
    })
  },
  // 返回授权
  goauthorize() {
    wepy.reLaunch({
      url: '/pages/authorize'
    })
  },
  // 返回授权 能返回之前页
  goAuthorize() {
    wepy.navigateTo({
      url: '/pages/authorize'
    })
  },
  // 返回上一级
  goBack() {
    wepy.navigateBack({
      delta: 1
    })
  },
  // 返回页头
  goTop() {
    wepy.pageScrollTo({
      scrollTop: 0
    })
  }
}