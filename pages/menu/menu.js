//foods.js

Page({
    data: {
        foods: [
            {
                name: "巨无霸",
                image: "../../assets/icon/巨无霸.png",
                price: 100,
                introduction: "好吃"
            }, 
            {
                name: "吉士蛋堡",
                image: "../../assets/icon/吉士蛋堡.png",
                price: 100,
                introduction: "美味"
            },
            {
                name: "麦香鸡",
                image: "../../assets/icon/麦香鸡.png",
                price: 100,
                introduction: "香辣"
            }
        ],
        tags: ["汉堡", "甜品", "饮料"],
        basket: {
            image: "../../assets/icon/basket.jpg"
        }
    },

    bindViewTap: function () {
        wx.navigateTo({
            url: '../userCenter/userCenter'
        })
    }
})