//merchantDetails.js

Page({
    data: {
        merchant: {
            address: "大学城麦当劳",
            announcement: ["尽量自助点餐"],
            onsales: ["巨无霸买一送一"],
            icon: "../../assets/icon/mcdonald.png",
            name: "麦当劳"
        }
    },
    
    bindViewTap: function () {
        wx.navigateTo({
            url: '../menu/menu'
        })
    }
})
