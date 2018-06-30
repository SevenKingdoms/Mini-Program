
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
          "merchant_id": this.data.orderInfo.order.merchant_id,
          "merchant_name": this.data.orderInfo.order.merchant_name,
          "merchant_tel": this.data.orderInfo.order.merchant_tel,
          "open_id": this.data.orderInfo.order.open_id,
          "desk_id": this.data.orderInfo.order.desk_id,
          "num_of_people": this.data.orderInfo.order.num_of_people,
          "paid": this.data.paid,
          "foods": this.data.orderInfo.order.foods,
          "remark": "不要辣"
        },
        success: function(res) {
          if (res.data.status === "OK") {
            console.log(res)
          } else {
            console.log(res)
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
      wx.navigateTo({
        url: '../paystate/paystate?paid=' + this.data.paid
      })
    }
  }
})