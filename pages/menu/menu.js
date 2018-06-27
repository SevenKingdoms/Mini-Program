//menu.js

const app = getApp();

Page({
    data: {
        merchantInfo: {},
        searchFlag: false
    },

    onLoad: function() {
        var that = this;
        // if(!app.globalData.merchantInfo) {
        //     wx.switchTab({
        //         url: '../merchantList/merchantList'
        //     })
        // }
    },

    onShow: function() {
        var that = this;
        //获取选中的商家的信息
        that.setData({
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