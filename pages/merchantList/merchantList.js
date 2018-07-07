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
    filter: "",
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
          that.preProcessMerchants();
        } else {
          console.log("请刷新一次");
        }
      }
    })
  },
  preProcessMerchants: function() {
    const tmpMerchants = this.data.merchantsFiltered;
    const date = new Date();
    let hour = date.getHours();
    const minute = date.getMinutes();
    tmpMerchants.map(merchant => {
      let time = merchant.open_time.split("-").map(x=>x.split(":"));
      time = time.map(x => x.map(y => parseInt(y)));
      if(time[0][0] < time[1][0]) {
        if(time[0][0] > hour || (time[0][0] == hour && time[0][1] > minute)) {
          merchant.open = false;
        }
        else if(time[1][0] < hour || (time[1][0] == hour && time[1][1] < minute)) {
          merchant.open = false;
        }
      } else {
        time[1][0] += 24;
        if(hour < time[0][0]) {
          hour += 24;
        }
        if(time[0][0] > hour || (time[0][0] == hour && time[0][1] > minute)) {
          merchant.open = false;
        }
        else if(time[1][0] < hour || (time[1][0] == hour && time[1][1] < minute)) {
          merchant.open = false;
        }
      }
    })
    this.setData({
      merchantsFiltered: tmpMerchants
    })
  },
  scanCode: function() {
    wx.scanCode({
      success: res => {
        const scanResult = "/merchants/" + res.result;
        console.log(scanResult);
        network.GET({
          url: scanResult,
          success: function(res) {
            if(res.data.status == "OK") {
              console.log("=> merchantsInfo:");
              console.log(res.data.data);
              app.globalData.merchantInfo = res.data.data;
              wx.switchTab({
                url: '../menu/menu'
              })
            } else {
              console.log("请刷新一次");
            }
          }
        })
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
  touchMerchant: function(e) {
    app.globalData.merchantInfo = this.data.merchantsFiltered[e.currentTarget.dataset.merchantIdx];
    wx.switchTab({
      url: '../menu/menu'
    })
  }
})
