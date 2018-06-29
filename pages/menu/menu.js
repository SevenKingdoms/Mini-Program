//menu.js

const app = getApp();

Page({
    data: {
			merchantInfo: {},
			searchFlag: false
    },
    onLoad: function() {
      // if(!app.globalData.merchantInfo) {
      //     wx.switchTab({
      //         url: '../merchantList/merchantList'
      //     })
      // }
    },
    onShow: function() {
      //获取选中的商家的信息
      this.setData({
        merchantInfo: app.globalData.merchantInfo
      })
    },
    navigateToDetail: function() {
      wx.navigateTo({
        url: '../merchantDetails/merchantDetails'
      })
    },
    touchSearch: function() {
      this.setData({
        searchFlag: true
      })
    },
    touchClose: function() {
			this.setData({
					searchFlag: false
      })
    }
})