//获取应用实例
const app = getApp();
const network = require("../../utils/network.js");


Page({
  //订单创建时间具体，merchant_phone, user_phone, person_num
  data: {
    hasData: true,
    navTab: ["全部", "已支付", "待支付"],
    currentNavtab: 0,
    startPoint: [],
    orders: [],
    createTime: [],
    totalPrice: [],
    paySuccess: [],
    payFail: [],
    DetailOrdertInfo: []
  },
  onLoad: function() {
    network.setToken(app.globalData.token);
  },
  onShow: function() {
    this.getOrders();
  },
  getOrders: function() {
    var that = this;
    // const orderUrl = "/orders?open_id=" + app.globalData.userInfo.openid;
    // network.GET({
    //   url: orderUrl,
    //   success: function(res) {
    //     if(res.data.status == "OK") {
    //       console.log("=> ordersInfo:");
    //       console.log(res.data.data);
    //       that.setData({
    //         orders: res.data.data
    //       })
    //       that.preProcessOrders();
    //     } else {
    //       console.log("请刷新一次");
    //     }
    //   }
    // })
    that.setData({
      orders: allOrders.data
    })
    that.preProcessOrders();
    console.log("=> ordersInfo:");
    console.log(that.data.orders);
  },
  //按时间顺序排序和找出成功支付和待支付的订单
  preProcessOrders: function() {
    let success = [];
    let fail = [];
    let time = [];
    let sum = [];
    let tmpOrders = this.data.orders;
    tmpOrders.sort(function (x, y) {
      const xDate = new Date(x.create_at);
      const yDate = new Date(y.create_at);
      if(xDate < yDate) {
        return 1;
      } else {
        return -1;
      }
    })
    tmpOrders.map(order => {
      const date = new Date(order.create_at);
      let eachOrderPrice = 0;
      if(order.paid) {
        success.push(order);
      } else {
        fail.push(order);
      }
      time.push(
        date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() 
      )
      order.foods.map(x => {
        let food = x.split(", ");
        eachOrderPrice += food[1] * food[2];
      })
      sum.push(eachOrderPrice);
    })
    this.setData({
      orders: tmpOrders,
      createTime: time,
      paySuccess: success,
      payFail: fail,
      totalPrice: sum
    })
  },
  catchtouchstart:function(e){
    this.setData({
      startPoint: [e.changedTouches[0].clientX,e.changedTouches[0].clientY]
    })
  },
  catchtouchend:function(e){
    // var currentNum = parseInt(this.data.currentNavtab);
    var currentNum = this.data.currentNavtab;
    var endPoint = [e.changedTouches[0].clientX,e.changedTouches[0].clientY];
    var startPoint = this.data.startPoint;
    if(endPoint[0] < startPoint[0]) {
      if(Math.abs(endPoint[0] - startPoint[0]) >= Math.abs(endPoint[1] - startPoint[1]) && currentNum< this.data.navTab.length -1) {
        currentNum=currentNum + 1;  
      }
    } else if(endPoint[0] > startPoint[0]){
      if(Math.abs(endPoint[0] - startPoint[0]) >= Math.abs(endPoint[1] - startPoint[1]) && currentNum > 0) {
        currentNum -= 1;
      }
    }
    this.setData({
      currentNavtab: currentNum
    });
  },
  switchNavTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  // //打电话 可以去掉
  // callEvent: function (e) {
  //   console.log(e)
  //   wx.makePhoneCall({
  //       phoneNumber: this.data.phoneNum
  //     })
  // },
  touchMerchant: function(e) {
    console.log(e.currentTarget.dataset.tel);
    // app.globalData.merchantInfo = this.data.merchants[e.currentTarget.dataset.merchantIdx];
    wx.navigateTo({
      url: "../merchantDetails/merchantDetails"
    })
  },
  goDeatailEvent: function (e) {
    const index = e.currentTarget.dataset.idx;
    let detailOrder = null;
    if(this.data.currentNavtab == 0) {
      detailOrder = this.data.orders[index];
    } else if(this.data.currentNavtab == 1) {
      detailOrder = this.data.paySuccess[index];
    } else {
      detailOrder = this.data.payFail[index];
    }
    app.globalData.detailOrderInfo = {
      order: detailOrder,
      createTime: this.data.createTime[index],
      totalPrice: this.data.totalPrice[index]
    }
    wx.navigateTo({
        url: '../orderDetails/orderDetails'
    })
  }
})

const allOrders = {
  "status": "OK",
  "message": "成功获取",
  "data": [
      {
          "id": 23,
          "merchant_id": 1,
          "merchant_name": "兰州牛肉",
          "merchant_tel": "12341234123",
          "open_id": "abc",
          "desk_id": 2,
          "num_of_people": 3,
          "paid": true,
          "foods": ["汉堡, 12.5, 1, https://api.kuaidian.com/a.png", "芝士蛋糕, 22.5, 2, https://api.kuaidian.com/a.png"],
          // "foods": "汉堡,12.5,1,芝士蛋糕,22.5,2",
          "remark": "不要辣",
          "create_at": "Thu Jun 28 2018 23:52:21 GMT+0800 (CST)"
      }, {
          "id": 33,
          "merchant_id": 1,
          "merchant_name": "兰州不牛肉",
          "merchant_tel": "12341234123",
          "open_id": "abc",
          "desk_id": 2,
          "num_of_people": 3,
          "paid": false,
          "foods": ["汉堡, 12.5, 1, https://api.kuaidian.com/a.png", "芝士蛋糕, 22.5, 2, https://api.kuaidian.com/a.png"],
          "remark": "不要辣",
          "create_at": "Thu Jun 28 2018 23:52:21 GMT+0800 (CST)"
      }
  ]
}