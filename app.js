//app.js

const base64 = require('./utils/base64.min.js').Base64
const network = require('./utils/network.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          this.getOpenid(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = Object.assign(res.userInfo, this.globalData.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getOpenid: function(code) {
    const that = this;
    network.GET({
      url: "/openid?code=" + code,
      success: function(res) {
        if (res.data) {
          var data = JSON.parse(res.data.data)
          that.globalData.userInfo = Object.assign({openid: data.openid}, that.globalData.userInfo)
          console.log("=> userInfo:");
          console.log(that.globalData.userInfo)
        } else {
          console.log('获取OpenID失败！' + res.errMsg)
        }
        that.getToken();
      }
    })
  },
  getToken: function() {
    let userInfo = this.globalData.userInfo
    const that = this;
    network.GET({
      url: "/jwt",
      params: {
          username: userInfo.openid,
          type: 1
      },
      success: function(res) {
        if (res.data.status === "OK") {
          let token = res.data.data.token
          let claims = JSON.parse(base64.atob(token.split('.')[1]))
          console.log("=> token: " + token);
          console.log("=> claims: ");
          console.log(claims);
          that.globalData.token = token;
          network.setToken(token);
        } else {
          that.register()
          console.log(res)
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  register: function() {
    let userInfo = this.globalData.userInfo
    const that = this;
    network.POST({
      url: "/register",
      params: {
          open_id: userInfo.openid,
          nick_name: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          tel: "",
      },
      success: function(res) {
        if (res.data.status === "OK") {
          console.log(res)
          that.getToken()
        } else {
          console.log(res)
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    token: null,
    // merchantInfo: null,
    // stage: null
    merchantInfo:
    {
      "merchant_id": 1,
      "avatar": "../../assets/images/merchant.jpeg",
      "name": "兰州拉面",
      "address": "广州大学城",
      "opentime": "营业中",
      "state": true,
      "announcement": ["xxx"],
      "onsales": ["xxx优惠十元"]
    }
  }
})
