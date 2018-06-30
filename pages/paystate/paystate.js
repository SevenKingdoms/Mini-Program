// pages/payment/paystate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paid: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.paid === "true") {
      this.setData({
        paid: true
      })
    } else {
      this.setData({
        paid: false
      })
    }
  },
  returnFront: function() {
    wx.switchTab({
      url: '../merchantList/merchantList'
    })
  },
  overview: function() {
    wx.redirectTo({
      url: '../orderDetails/orderDetails'
    })
  }
})