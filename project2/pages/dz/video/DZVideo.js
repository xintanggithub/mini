// pages/dz/video/DZVideo.js 
const app = getApp();
var startX = -1, endX;
var moveFlag = true;// 判断执行滑动事件 

Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    pageIndex: Math.floor(Math.random() * 2395),
    loadState: false,
    loadMore: false,
    response: [],
    topNum: 2,
    floorstatus: false,
    currentData: "",
    showPlay: false,
    content: "可以试试左右滑动了"
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.getVideoList(true)
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {

  },

  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {

  },

  /** 
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function () {

  },

  /** 
   * 生命周期函数--监听页面卸载 
   */
  onUnload: function () {

  },

  /** 
   * 页面相关事件处理函数--监听用户下拉动作 
   */
  onPullDownRefresh: function () {
    if (!this.data.loadState && !this.data.showPlay) {
      //显示刷新动画 
      wx.showNavigationBarLoading();
      wx.stopPullDownRefresh();
      this.getVideoList(true)
    }
    //隐藏刷新动画 
    // wx.hideNavigationBarLoading(); 
  },

  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {
    if (!this.data.loadState && !this.data.loadMore) {
      this.getVideoList(false)
    }
  },

  /** 
   * 用户点击右上角分享 
   */
  onShareAppMessage: function () {

  },
  getVideoList(refresh) {
    loadState: true
    if (refresh) {
      this.data.pageIndex = Math.floor(Math.random() * 2395)
    } else {
      this.data.pageIndex++
    }
    wx.request({
      url: 'https://api.apiopen.top/getJoke?page=' + this.data.pageIndex + '&count=10',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        if (refresh) {
          this.data.response = []
          wx.hideNavigationBarLoading();
        }
        var newlist = res.data.result
        console.log(newlist)
        this.setData({
          response: this.data.response.concat(newlist),
          loadState: false,
          loadMore: false
        })
      },
      fail: err => {
        if (refresh) {
          wx.hideNavigationBarLoading();
        }
        console.log(err)
        loadState: false
        this.setData({
          loadMore: false
        })
      }
    })
  },
  goTop: function (e) {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  openDetail: function (item) {
    var itemData = item.currentTarget.dataset['index']
    if (itemData.type == 'video'){
      wx.navigateTo({
        url: 'detail/VideoDetail?url=' + itemData.video,
      })
    }else{
      wx.previewImage({
        urls: [itemData.images],
      }) 
    }
  },
  closePlay: function (e) {

  },
  move: function (e) {
  },
  vdTap: function (e) {
    console.log('来至视频组件的点击')
  },
  touchStart: function (e) {
    startX = e.touches[0].pageY; // 获取触摸时的原点 
    moveFlag = true;
  },
  // 触摸移动事件 
  touchMove: function (e) {
    endX = e.touches[0].pageY; // 获取触摸时的原点 
    console.log('endX = ' + endX)
    console.log('startX = ' + startX)
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log('下')
        this.move2right();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log('上')
        this.move2left();
        moveFlag = false;
      }
    }

  },
  // 触摸结束事件 
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件 
    startX = -1
  },

  move2left() {
    var that = this;
    startX = -1
    that.setData({
      content: "move2left下滑动",
    });
  },
  move2right() {
    var that = this;
    startX = -1
    that.setData({
      content: "move2right上滑动",
      showPlay: false
    });
  },
  cancel: function (e) {
    this.setData({
      showPlay: false
    })
  },
  imageLoadError: function (e) {
    var index=e.currentTarget.dataset.index
    console.log('index = '  + index)
    var images = 'response[' + index + '].images'
    var thumbnail = 'response[' + index + '].thumbnail'
    this.setData({
      [images]: '/asstes/img/ic_error_rotation.png',
      [thumbnail]: '/asstes/img/ic_error_rotation.png'
    })
  }
})