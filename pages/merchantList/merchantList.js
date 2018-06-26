//merchantList.js
//const util = require('../../utils/util.js')
const app = getApp();
var QQMapWX = require('../../qqmap/qqmap-wx-jssdk.js');
var qqmapsdk;

//标签，营业时间，事件处理未完成
Page({
  data: {
    address: {},
    scanResult: {},
    input: {},
    tags: ['美食', '甜点', '自助餐', '日本料理'],
    chosenTag: {},
    merchants: [
      {
        "merchant_id": 1,
        "avatar": "../../assets/images/merchant.jpeg",
        "name": "兰州拉面",
        "address": "广州大学城",
        "opentime": "营业中",
        "announcement": ["xxx"],
        "onsales": ["xxx优惠十元"]
      },{
        "merchant_id": 2,
        "avatar": "../../assets/images/merchant.jpeg",
        "name": "兰州不拉面",
        "address": "广州大学城",
        "opentime": "休息中",
        "announcement": ["xxx"],
        "onsales": ["xxx优惠十元"]
      }
    ],
    stages: ["营业中"]
  },

  onLoad: function () {
    var that = this;
    // 从数据库获取所有的商家
    //初始化globaldata中的商家信息
    app.globalData.merchantInfo = that.data.merchants[0];
    app.globalData.stage = that.data.stages[0];
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'FO6BZ-RJXW4-L6DUL-DQ3HK-FLDQJ-A6BQK'
    })
    //获取当前位置坐标
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        //腾讯地图逆解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: addressRes => {
            that.setData({
              address: addressRes.result.formatted_addresses.recommend
            })
          }
        })
      }
    })
  },

  onShow: function() {
    this.confirmStage();
  },

  scanCode: function() {
    wx.scanCode({
      success: res => {
        this.setData({
          scanResult: res
        })
        console.log(res);
      }
    })
  },

  inputConfirm: function(e) {
    this.setData({
      input: e.detail.value
    })
    console.log(this.data.input);
  },
  
  touchTag: function(e) {
    this.setData({
      chosenTag: e.currentTarget.dataset.tag
    })
    console.log(this.data.chosenTag);
  },

  confirmStage: function() {
    // console.log(this.data.merchants);
    var tempStages = [];
    for(var i = 0; i < this.data.merchants.length; i++) {
      if(this.data.merchants[i].opentime === "营业中") {
        tempStages[i] = "营业中"
      }
      else {
        tempStages[i] = "休息中"
      }
    }
    this.setData({
      stages: tempStages
    })
    console.log(this.data.stages);
  },

  touchMerchant: function(e) {
    app.globalData.merchantInfo = e.currentTarget.dataset.merchant;
    app.globalData.stage = e.currentTarget.dataset.stage;
    wx.switchTab({
      url: '../menu/menu'
    })
  }
})
