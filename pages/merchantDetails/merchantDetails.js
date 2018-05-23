//restaurantDetails.js

Page({
    data: {
        address: "大学城麦当劳",
        announcement: ["尽量自助点餐"],
        onsales: ["巨无霸买一送一"],
        icon: "../icon/mcdonald.png",
        name: "麦当劳"
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    }
})
