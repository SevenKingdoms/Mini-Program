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
        "avatar": "../../assets/icon/merchant.jpeg",
        "name": "兰州拉面",
        "address": "广州大学城",
        "opentime": "营业中",
        "announcement": [
          "xxx"
        ],
        "onsales": [
          "xxx优惠十元"
        ]
      },{
        "avatar": "../../assets/icon/merchant.jpeg",
        "name": "兰州不拉面",
        "address": "广州大学城",
        "opentime": "休息中",
        "announcement": [
          "xxx"
        ],
        "onsales": [
          "xxx优惠十元"
        ]
      }
    ]
  },

  onLoad: function () {
    var that = this;
    // 从数据库获取所有的商家
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
  }
})
