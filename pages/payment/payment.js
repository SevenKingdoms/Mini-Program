// pages/payment/payment.js
const network = require('../../utils/network.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:null,
    remark: '',
    phone: null,
    deskId: null,
    member: null,
    cartList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.setToken(app.globalData.token);
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
    var food = [];
    for(var i = 0; i < this.data.acturalCartList.length; i++) {
      food[i] = this.data.acturalCartList[i].food.name;
      food[i] += ", ";
      food[i] += this.data.acturalCartList[i].food.price;
      food[i] += ", ";
      food[i] += this.data.acturalCartList[i].count;
      food[i] += ", ";
      food[i] += this.data.acturalCartList[i].food.image;
    }
    this.setData({
      food: food,
    })
    var phone = this.data.phone;
    var deskId = this.data.deskId;
    var member = this.data.member;
    if(phone === null || deskId == null || member === null) {
      wx.showToast({
        title: '手机号或桌号或人数不能为空',
        icon: 'none',
      });
      console.log('toastshown')
    } else{
      var paystatus = Math.round(Math.random());
      network.POST({
        url: '/orders',
        params: {
          "merchant_id": app.globalData.merchantInfo.id,
          "merchant_name": app.globalData.merchantInfo.name,
          "merchant_tel": app.globalData.merchantInfo.tel,
          "open_id": app.globalData.userInfo.openid,
          "desk_id": parseInt(deskId),
          "num_of_people": parseInt(member),
          "paid": paystatus,
          "foods": food,
          "remark": this.data.remark
        },
        success: function (res) {
          if (res.data.status === 'OK') {
            wx.redirectTo({
              url: '../paystate/paystate?paid=' + paystatus,
            })
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none',
          })
        } 
      })
      
    }
  
    
  },

  /* 完成输入备注 */
  remarkInputFinish: function(e) {
    this.setData({
      remark: e.detail.value,
    })
  },
  /* 完成输入手机 */
  phoneInputFinish: function (e) {
    this.setData({
      phone: e.detail.value,
    })
  },

    /* 完成输入桌号 */
  deskInputFinish: function (e) {
    this.setData({
      deskId: e.detail.value,
    })
  },

    /* 完成输入人数 */
  memberInputFinish: function (e) {
    this.setData({
      member: e.detail.value,
    })
  }

})