
const app = getApp();
const network = require('../../utils/network.js');

Page({
  data: {
    orderInfo: null,
    foods: [],
    cartDict: [],
    paid: true
  },
  onLoad: function(options) {
    network.setToken(app.globalData.token)
  },
  onReady:function() {

  },
  onShow:function() {
    this.setData({
      orderInfo: app.globalData.detailOrderInfo
    })
    this.splitFood();
    console.log(this.data.orderInfo);
  },
  splitFood: function() {
    let foods = [];
    let cartDict = [];
    const originFood = this.data.orderInfo.order.foods;
    originFood.map(x => {
      const temp = x.split(", ");
      foods.push(temp);
      cartDict.push({
        count: parseInt(temp[2]),
        food: {
          name: temp[0],
          price: temp[1],
          image: temp[3]
        }
      })
    })
    this.setData({
      foods: foods,
      cartDict: cartDict
    })
    console.log(cartDict);
  },
  touchMerchant: function(e) {
    console.log(e.currentTarget.dataset.merchantIdx);
    app.globalData.merchantInfo = this.data.merchants[e.currentTarget.dataset.merchantIdx];
    wx.navigateTo({
      url: "../merchantDetails/merchantDetails"
    })
  },
  touchUnpay: function(e) {
    if(!e.currentTarget.dataset.state) {
      if(Math.random() <= 0.5) {
        this.setData({
          paid: false
        })
      }
      network.POST({
        url: "/orders",
        params: {
          "merchant_id": app.globalData.merchantInfo.id,
          "merchant_name": app.globalData.merchantInfo.name,
          "merchant_tel": app.globalData.tel,
          "open_id": app.globalData.userInfo.openid,
          "desk_id": this.data.orderInfo.order.desk_id,
          "num_of_people": this.data.orderInfo.order.num_of_people,
          "paid": this.data.paid,
          "foods": this.data.orderInfo.order.foods,
          "remark": "不要辣"
        },
        success: function(res) {
          if (res.data.status === "OK") {
            console.log(res)
            that.getToken()
          } else {
            console.log(res)
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
      wx.navigateTo({
        url: '../payment/payment'
      })
    }
  }
})