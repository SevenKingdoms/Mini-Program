//获取应用实例
const app = getApp();

Page({
  //订单创建时间具体，merchant_phone, user_phone, person_num
  data: {
    hasData: true,
    navTab: ["全部", "已支付", "待支付"],
    currentNavtab: 0,
    startPoint: [],
    orders: [
      {
        "publish_at": "2018-08-10 13:00:00",
        "order_id": 109,
        "desk_id": 2,
        "merchant_id": 1,
        "merchant_phone": 13719175479,
        "open_id": "abc",
        "person_num": 2,
        "user_phone": 13719175479,
        "food_id": [1, 2, 10],
        "total_price": 180,
        "pay_state": true,
        "remark": "不要辣"
      }, {
        "publish_at": "2018-08-10 13:00:00",
        "order_id": 109,
        "desk_id": 2,
        "merchant_id": 1,
        "merchant_phone": 13719175479,
        "open_id": "abc",
        "person_num": 3,
        "user_phone": 13719175479,
        "food_id": [1, 2, 10],
        "total_price": 180,
        "pay_state": false,
        "remark": "不要辣"
      }
    ],
    merchants: [
      {
        "merchant_id": 2,
        "avatar": "../../assets/images/merchant.jpeg",
        "name": "兰州不拉面",
        "address": "广州大学城",
        "opentime": "休息中",
        "state": false,
        "phone": "13719175479",
        "score": 4.5,
        "announcement": ["xxx"],
        "onsales": ["xxx优惠十元"]
      },{
        "merchant_id": 2,
        "avatar": "../../assets/images/merchant.jpeg",
        "name": "兰州不拉面",
        "address": "广州大学城",
        "opentime": "休息中",
        "state": false,
        "phone": "13719175479",
        "score": 4.5,
        "announcement": ["xxx"],
        "onsales": ["xxx优惠十元"]
      }
    ],
    allOrderIndex: [],
    paySuccess: [],
    payFail: []
  },
  onShow: function() {
    this.sortByTime();
    this.classifyOrder();
  },
  sortByTime: function() {
    var all = [];
    for(var i = 0; i < this.data.orders.length; i++) {
      all.push(i);
    }
    this.setData({
      allOrderIndex: all
    })
  },
  classifyOrder: function() {
    var success = [];
    var fail = [];
    for(var i = 0; i < this.data.orders.length; i++) {
      if(this.data.orders[i].pay_state) {
        success.push(i);
      }
      else {
        fail.push(i);
      }
    }
    this.setData({
      paySuccess: success,
      payFail: fail
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
    } else {
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
  touchMerchantAvatar: function(e) {
    console.log(e.currentTarget.dataset.merchantIdx);
    app.globalData.merchantInfo = this.data.merchants[e.currentTarget.dataset.merchantIdx];
    wx.navigateTo({
      url: "../merchantDetails/merchantDetails"
    })
  },
  goDeatailEvent: function () {
    wx.navigateTo({
        url: '../orderDetails/orderDetails'
    })
  }
})
