
const app = getApp();
const network = require('../../utils/network.js');

Page({
  data: {
    orderInfo: null,
    foods: [],
    cartDict: [],
    paid: true,
    price: null,
    time: ""
  },
  onLoad: function(options) {
    network.setToken(app.globalData.token)
  },
  onReady:function() {

  },
  onShow:function() {
    if(!app.globalData.detailOrderInfo) {
    this.getOrder();
    } else {
      this.setData({
        orderInfo: app.globalData.detailOrderInfo
      })
      this.preProcessOrder()
    }
  },
  getOrder: function() {
    var that = this;
    const path = '/orders/' + app.globalData.order_id;
    network.GET({
      url: path,
      success: function(res) {
        if(res.data.status == "OK") {
          console.log("=> orderInfo:");
          console.log(res.data.data);
          that.setData({
            orderInfo: res.data.data
          })
          that.preProcessOrder();
        } else {
          console.log("请刷新一次");
        }
      }
    })
  },
  preProcessOrder: function() {
    const date = new Date(this.data.orderInfo.create_at);
    let sum = 0;
    let time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    this.splitFood();
    this.data.foods.map(food => sum += food[1] * food[2])
    this.setData({
      price: sum,
      time: time
    })
  },
  splitFood: function() {
    let foods = [];
    let cartDict = [];
    const originFood = this.data.orderInfo.foods.split("|");
    originFood.pop();
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
    console.log("=> cartDict");
    console.log(cartDict);
  },
  touchMerchant: function(e) {
    var that = this;
    const path = '/merchants/' + e.currentTarget.dataset.tel
    network.GET({
      url: path,
      success: function(res) {
        if(res.data.status === "OK") {
          app.globalData.merchantInfo = res.data.data;
        }
      }
    })
    wx.navigateTo({
      url: "../merchantDetails/merchantDetails"
    })
  },
  touchUnpay: function(e) {
    if(!e.currentTarget.dataset.state) {
      // if(Math.random() <= 0.5) {
      //   this.setData({
      //     paid: false
      //   })
      // }
      this.setData({
        'orderInfo.paid': this.data.paid,
        'orderInfo.open_id': app.globalData.userInfo.openid,
        'orderInfo.create_at': new Date()
      })
      network.POST({
        url: '/orders',
        params: this.data.orderInfo,
        success: function(res) {
          if (res.data.status === "OK") {
            app.globalData.order_id = res.data.data.order_id;
            console.log("=> orderInfo");
            console.log(res.data.data);
          } else {
            console.log(res)
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
      wx.redirectTo({
        url: '../paystate/paystate?paid=' + this.data.paid
      })
    }
  }
})