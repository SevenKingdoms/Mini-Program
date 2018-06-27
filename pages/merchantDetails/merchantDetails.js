//merchantDetails.js

const app = getApp();

Page({
    data: {
        merchantInfo: {},
        isTouchInfo: true,
        comments: [
            {
                avatar: "../../assets/images/avatar.jpeg",
                name: "isanbel",
                score: 4.2,
                comment: "默认好评",
                publish_at: "2018-06-22"
            }, {
                avatar: "../../assets/images/avatar.jpeg",
                name: "isanbel",
                score: 4.2,
                comment: "下午茶时间",
                publish_at: "2018-06-22"
            }
        ],
        starPath: [
            "../../assets/icons/normalStar.png",
            "../../assets/icons/selectStar.png",
            "../../assets/icons/halfStar.png"
        ]
    },
    
    onShow: function() {
        var that = this;
        //获取选中的商家的信息
        that.setData({
            merchantInfo: app.globalData.merchantInfo
        })
        wx.setNavigationBarTitle({
            title: that.data.merchantInfo.name,
            success: function(res) {
                // success
                console.log(that.data.merchantInfo.avatar);
            }
        })
    },

    touchInformation: function() {
        this.setData({
            isTouchInfo: true
        })
    },

    touchComment: function() {
        this.setData({
            isTouchInfo: false
        })
    }
})
