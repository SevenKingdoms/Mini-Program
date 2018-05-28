//userCenter.js

Page({
    data: {
        user: {
            nick_name: "快点",
            avatar: "../../assets/icon/avatar.jpg",
            tel: "13719175459"
        }
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../foods/foods'
        })
    }
})
