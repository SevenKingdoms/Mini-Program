//merchantList.js
//const util = require('../../utils/util.js')
const app = getApp();
const QQMapWX = require('../../assets/qqmap/qqmap-wx-jssdk.js');
const network = require('../../utils/network.js')
var qqmapsdk;

//标签，营业时间，事件处理未完成   api：评分，state， remark，phone
Page({
  data: {
    address: null,
    scanResult: null,
    filter: "",
    score: [],
    tags: ['美食', '甜点', '自助餐', '日本料理'],
    merchants: [],
    merchantsFiltered: [],
    starPath: [
      "../../assets/icons/normalStar.png",
      "../../assets/icons/selectStar.png",
      "../../assets/icons/halfStar.png"
    ]
  },
  onLoad: function () {
    var that = this;
    // 从数据库获取所有的商家
    //初始化globaldata中的商家信息,和token
    app.globalData.merchantInfo = that.data.merchants[0];
    network.setToken(app.globalData.token);
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
    this.getMerchants();
    this.setScore();
  },
  getMerchants: function() {
    var that = this;
    network.GET({
      url: "/merchants",
      success: function(res) {
        if(res.data.status == "OK") {
          console.log("=> merchantsInfo:");
          console.log(res.data.data);
          that.setData({
            merchants: res.data.data,
            merchantsFiltered: res.data.data
          })
        } else {
          console.log("请刷新一次");
        }
      }
    })
  },
  setScore: function() {
    let tempscore = [];
    for(let i = 0; i < 100; i++) {
      tempscore.push(Math.random() + 4);
    }
    console.log(tempscore);
    this.setData({
      score: tempscore
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
  bindFilterInput: function(e) {
    this.setData({
      filter: e.detail.value
    })
    this.filterMerchants(this.data.filter);
  },
  filterMerchants: function(filter) {
    let filterMerchants = this.data.merchants

    filterMerchants = filterMerchants.filter(merchant => {
      return merchant.name.includes(filter);
    })
    this.setData({
      merchantsFiltered: filterMerchants
    })
  },
  touchTag: function(e) {
    this.setData({
      filter: e.currentTarget.dataset.tag
    })
    this.filterMerchants(this.data.filter);
  },
  // confirmStage: function() {
  //   // console.log(this.data.merchants);
  //   var tempStages = [];
  //   for(var i = 0; i < this.data.merchants.length; i++) {
  //     if(this.data.merchants[i].opentime === "营业中") {
  //       tempStages[i] = "营业中"
  //     }
  //     else {
  //       tempStages[i] = "休息中"
  //     }
  //   }
  //   this.setData({
  //     stages: tempStages
  //   })
  //   console.log(this.data.stages);
  // },
  touchMerchant: function(e) {
    app.globalData.merchantInfo = this.data.merchants[e.currentTarget.dataset.merchantIdx];
    wx.switchTab({
      url: '../menu/menu'
    })
  }
})
