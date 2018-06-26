//menu.js

const app = getApp();

Page({
    data: {
        merchantInfo: {},
        stage: null,
        searchFlag: false
    },

    onLoad: function() {
        var that = this;
        // if(!app.globalData.merchantInfo || !app.globalData.stage) {
        //     wx.switchTab({
        //         url: '../merchantList/merchantList'
        //     })
        // }
    },

    onShow: function() {
        var that = this;
        //获取选中的商家的信息
        that.setData({
            merchantInfo: app.globalData.merchantInfo,
            stage: app.globalData.stage
        })
        wx.setNavigationBarTitle({
            title: that.data.merchantInfo.name,
            success: function(res) {
                // success
                console.log(that.data.merchantInfo.avatar);
            }
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