wx.cloud.init()
const db=wx.cloud.database()
Page({

  data: {
    currentList: [],
    time: 0,
    isNone: false,
    loading: false,
    inputShowed: false,
    inputVal: "",
    imgUrls: ['/images/1-lost-final.png', '/images/2-found-final.png'],
    index: 1
  },



  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  search: function (e) {
    wx.navigateTo({
      url: '/pages/search/search?query=' + this.data.inputVal.replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>]/g, '').replace(/[\?]/g, '？'),
    })
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  detailTap: function (e) {
    var detail = e.currentTarget.dataset.anchorobj
    console.log(detail)
    if (detail.generalsubmit == 0 || detail.filepath[0] == "cloud://zly-8af2f7.7a6c-zly-8af2f7/ava.png" || detail.filepath[0] == "cloud://zly-8af2f7.7a6c-zly-8af2f7/lost.png") {
      detail.display = false
    } else {
      detail.display = true
    }

    let str = JSON.stringify(detail)
    wx.navigateTo({
      url: '/pages/show/show?check=0&obj=' + str,
    })
  },

  onPullDownRefresh: function () {
    this.setData({
      loading: true
    })
    var self = this;
    wx.cloud.callFunction({
      name: 'getdata',
      data: {
      },
      success(res) {
        console.log(res.result.data)
        self.setData({
          currentList: res.result.data,
          loading: false
        })
      },
      fail: console.error
    })
  },

  onReachBottom: function () {
  },

  filter_time: function (e) {
    var time = e.currentTarget.dataset.time
    switch (time) {
      case 'today':
        wx.navigateTo({
          url: '/pages/filter/filter?time=0',
        })
        break;
      case 'yesterday':
        wx.navigateTo({
          url: '/pages/filter/filter?time=1',
        })
        break;
      case 'week':
        wx.navigateTo({
          url: '/pages/filter/filter?time=2',
        })
        break;
      case 'ago':
        wx.navigateTo({
          url: '/pages/filter/filter?time=3',
        })
        break;
    }
  },
  showAllKind: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    if (index == 0) {
      wx.navigateTo({
        url: '/pages/specific_kind/specific_kind?index=0'
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/specific_kind/specific_kind?index=1'
      })
    }

  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      index: e.detail.current + 1
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.navigateTo({
      url: '/pages/login/login',
    })
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
    var self = this;
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getdata',
      data: {
      },
      success(res) {
        console.log(res.result.data)
        self.setData({
          currentList: res.result.data
        })
      },
      fail: console.error
    })   
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})