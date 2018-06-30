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
    var that = this;
    var food = "";
    for(var i = 0; i < that.data.acturalCartList.length; i++) {
      food += that.data.acturalCartList[i].food.name;
      food += ", ";
      food += that.data.acturalCartList[i].food.price;
      food += ", ";
      food += that.data.acturalCartList[i].count;
      food += ", ";
      food += that.data.acturalCartList[i].food.image;
      food += "|"
    }
    console.log(food);
    that.setData({
      food: food,
    })
    var phone = that.data.phone;
    var deskId = that.data.deskId;
    var member = that.data.member;
    if(phone === null || deskId == null || member === null) {
      wx.showToast({
        title: '手机号或桌号或人数不能为空',
        icon: 'none',
      });
      console.log('toastshown')
    } else{
      // if(Math.random() <= 0.5) {
      //   that.setData({
      //     paystatus: false
      //   })
      // } else {
      //   that.setData({
      //     paystatus: true
      //   })
      // }
      that.setData({
        paystatus: false
      })
      network.POST({
        url: '/orders',
        params: {
          "merchant_id": app.globalData.merchantInfo.id,
          "merchant_name": app.globalData.merchantInfo.name,
          "merchant_tel": app.globalData.merchantInfo.tel,
          "open_id": app.globalData.userInfo.openid,
          "desk_id": parseInt(that.data.deskId),
          "num_of_people": parseInt(that.data.member),
          "paid": that.data.paystatus,
          "foods": that.data.food,
          "remark": that.data.remark
        },
        success: function (res) {
          if (res.data.status === 'OK') {
            console.log(res.data.data);
            app.globalData.order_id = res.data.data.id;
            wx.redirectTo({
              url: '../paystate/paystate?paid=' + that.data.paystatus,
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