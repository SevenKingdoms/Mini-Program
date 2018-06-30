// pages/payment/payment.js
const network = require('../../utils/network.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:null,
    cartList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    const app = getApp();
    this.setData({
      cartList: app.globalData.cartList
    }, );
    
    var acturalCartList = [];
    for(var i = 0; i < this.data.cartList.length; i++) {
      if(this.data.cartList[i].count != 0) {
        acturalCartList.push(this.data.cartList[i]);
      }
    };
    let total = 0;
    this.data.cartList.map(x=>total+=x.food.price*x.count);
    this.setData({
      sum: total,
      acturalCartList: acturalCartList,
    });

    console.log(this.data.cartList);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  navigateToPayResult: function() {
    /*wx.navigateTo({
      url: '../paystate/paystate',
    })*/
    var paystate = Math.round(Math.random());
    network.POST({
      url: '/orders',
      params: {
        "merchant_id": this.data.cartList,
        "merchant_name": "兰州牛肉",
        "merchant_tel": "12341234123",
        "open_id": "abc",
        "desk_id": 2,
        "num_of_people": 3,
        "paid": true,
        "foods": [
          "汉堡, 12.5, 1, https://api.kuaidian.com/a.png",
          "芝士蛋糕, 22.5, 2, https://api.kuaidian.com/a.png"
        ],
        "remark": "不要辣"
      },
      success: function(res) {
        
      }
    })
    wx.redirectTo({
      url: '../paystate/paystate',
    })
  }
})