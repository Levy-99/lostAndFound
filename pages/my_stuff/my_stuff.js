wx.cloud.init()
const db=wx.cloud.database()

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    hide: true,
    temp_open_id:""
  },

  ok: function(e) {
    console.log(e)
    var self = this
    wx.showModal({
      title: '提示',
      content: '您确定已经对接该物品吗？',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          console.log(id)
          //console.log(e.currentTarget.dataset.id)
          db.collection('posts').doc(id).get({
            success(res) {
              console.log(res.data)
              var path = res.data.filepath
              if (path != "cloud://zly-8af2f7.7a6c-zly-8af2f7/lost.png" && path != "cloud://zly-8af2f7.7a6c-zly-8af2f7/ava.png") {
                console.log('not')
                console.log(path)
                wx.cloud.deleteFile({
                  fileList: [path[0]],
                  success: res => {
                    // handle success
                    console.log(res.fileList)
                  },
                  fail: console.error
                })
                db.collection('posts').doc(id).remove({
                  success(res) {
                    console.log(res.data)
                  }
                })
                wx.showLoading({
                  title: '加载中',
                  success(res) {
                    self.setData({
                      hide: false
                    })
                  }
                })
                setTimeout(function () {
                  self.onLoad()
                  wx.hideLoading()
                  self.setData({
                    hide: true
                  })
                }, 1500)
              }
              else {
                console.log('yes')
                console.log(path)
                db.collection('posts').doc(id).remove({
                  success(res) {
                    console.log(res.data)
                  }
                })
                wx.showLoading({
                  title: '加载中',
                  success(res) {
                    self.setData({
                      hide: false
                    })
                  }
                })
                setTimeout(function () {
                  self.onLoad()
                  wx.hideLoading()
                  self.setData({
                    hide: true
                  })
                }, 1500)
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  del: function (e) {
    console.log(e)
    var self = this
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          console.log(id)
          //console.log(e.currentTarget.dataset.id)
          db.collection('posts').doc(id).get({
            success(res) {
              console.log(res.data)
              var path=res.data.filepath
              if (path != "cloud://zly-8af2f7.7a6c-zly-8af2f7/lost.png" && path != "cloud://zly-8af2f7.7a6c-zly-8af2f7/ava.png")  
              {
                console.log('not')
                console.log(path)
                wx.cloud.deleteFile({
                  fileList: [path[0]],
                  success: res => {
                    // handle success
                    console.log(res.fileList)
                  },
                  fail: console.error
                })
                db.collection('posts').doc(id).remove({
                  success(res) {
                    console.log(res.data)
                  }
                })
                wx.showLoading({
                  title: '加载中',
                  success(res) {
                    self.setData({
                      hide: false
                    })
                  }
                })
                setTimeout(function () {
                  self.onLoad()
                  wx.hideLoading()
                  self.setData({
                    hide: true
                  })
                }, 1500)
              }
              else
              {
                console.log('yes')
                console.log(path)
                db.collection('posts').doc(id).remove({
                  success(res) {
                    console.log(res.data)
                  }
                })
                wx.showLoading({
                  title: '加载中',
                  success(res) {
                    self.setData({
                      hide: false
                    })
                  }
                })
                setTimeout(function () {
                  self.onLoad()
                  wx.hideLoading()
                  self.setData({
                    hide: true
                  })
                }, 1500)
              }
            }
          })
          
        } else if (res.cancel) {
        }
      }
    })
    
    
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
    var self = this;
    var temp2 = this.data.inputVal
    console.log(temp2)
    db.collection('posts').orderBy("datedetail","desc").where({
      _openid: getApp().globalData.openid,
    })
      .get({
        success(res) {
          var temp = {}
          var temp1 = {}
          temp = res.data
          console.log(temp)
          console.log(temp2)
          for (var i = 0; i < temp.length; i++) {
            if (temp[i].stuff_name.indexOf(temp2) != -1) {
              temp1[i] = temp[i]
            }
          }
          console.log(temp1)
          self.setData({
            currentList: temp1,
          })
        }
      })
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

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var self = this
    wx.showLoading({
      title: '加载中',
      success(res) {
        self.setData({
          hide: true
        })
      }
    })
    db.collection('posts').orderBy("datedetail","desc").where({
      _openid: getApp().globalData.openid,
    })
      .get({
        success(res) {
          console.log(getApp().globalData.openid)
          console.log(res.data)
          self.setData({
            currentList: res.data,
          })
          setTimeout(function () {
            wx.hideLoading()
            self.setData({
              hide: false
            })
          }, 2000)
        }
        
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
    var self = this
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
    this.setData({
      loading: true
    })
    var self = this;
    db.collection('posts').where({
      _openid: getApp().globalData.openid,
    })
      .get({
        success(res) {
          console.log(getApp().globalData.openid)
          console.log(res.data)
          self.setData({
            currentList: res.data,
            loading: false
          })
          // setTimeout(function () {
          //   wx.hideLoading()
          //   self.setData({
          //     hide: false
          //   })
          // }, 2000)
        }

      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})