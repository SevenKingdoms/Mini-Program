
const app = getApp();

Page({
  data: {
    orderInfo: null,
    foods: [],
    cartDict: []
  },
  onLoad: function(options) {

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
      app.globalData.cartList = this.data.cartDict;
      wx.navigateTo({
        url: '../payment/payment'
      })
    }
  }
})