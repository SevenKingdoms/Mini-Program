// pages/payment/payment.js
const app = getApp();

Page({
  data: {

  },
  onLoad: function (options) {
    // 支付的数据在 app.globalData.cartList 中
    console.log(app.globalData.cartList);
  },
  onShow: function () {

  }
})
