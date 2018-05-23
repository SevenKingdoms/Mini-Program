//logs.js
//const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    restaurant: {
      name: {},
      url: {},
    }
  },

  onLoad: function () {
    // 从数据库获取所有的商家
  },

  choseRestaurant: function() {
    wx.navigateTo({
      url: '../restaurantDetail/restaurantDetail'
    })
  }
})
