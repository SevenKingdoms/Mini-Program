//merchantDetails.js

const app = getApp();

Page({
    data: {
        merchantInfo: {},
        isTouchInfo: true,
        remarks: [
            {
                avatar: "../../assets/icon/avatar.jpeg",
                name: "isanbel",
                score: 4.2,
                remark: "默认好评",
                publish_at: "2018-06-22"
            }, {
                avatar: "../../assets/icon/avatar.jpeg",
                name: "isanbel",
                score: 4.2,
                remark: "下午茶时间",
                publish_at: "2018-06-22"
            }
        ]
    },
    
    onShow: function() {
        var that = this;
        this.setData({
            merchantInfo: app.globalData.merchantInfo
        })
    },

    touchInformation: function() {
        this.setData({
            isTouchInfo: true
        })
    },

    touchRemark: function() {
        this.setData({
            isTouchInfo: false
        })
    }
})
