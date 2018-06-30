//menu.js

const app = getApp();
const network = require('../../utils/network.js')

Page({
  data: {
    ALLFoods: null,
    merchantInfo: {},
    searchFlag: false,
    filter: "",
    cartDict: {
      sum: 0,
      total: 0.0
    },
    cartList: [],
    cartUp: false
  },
  onLoad: function() {
    network.setToken(app.globalData.token);
  },
  onShow: function() {
    if(!app.globalData.merchantInfo) {
      wx.switchTab({
        url: '../merchantList/merchantList'
      })
    }
    //获取选中的商家的信息
    this.setData({
      merchantInfo: app.globalData.merchantInfo
    })
    console.log(app.globalData.merchantInfo)
    if(this.data.merchantInfo) {
      this.getData();
    }
  },
  getData: function() {
    var that = this;
    const path = '/foods?merchant_id=' + this.data.merchantInfo.id;
    network.GET({
      url: path,
      success: function(res) {
        if(res.data.status === "OK") {
          console.log(res.data.data);
          that.setData({
            ALLFoods: res.data.data
          })
          that.getFoodsDict()
        }
      }
    })
  },
  // bind search input
  bindFilterInput: function(e) {
    const filter = e.detail.value
    this.setData({
      filter: filter
    })
    this.filterFoods()
  },
  // filter
  filterFoods: function() {
    const filter = this.data.filter
    const typeToFoodDictFiltered = Object.assign({}, this.data.typeToFoodDict)
    const typeActive = this.data.typeActive

    typeToFoodDictFiltered[typeActive] = typeToFoodDictFiltered[typeActive].filter(food => {
      return food.name.includes(filter) || food.introduction.includes(filter)
    })
    this.setData({
      typeToFoodDictFiltered
    })
  },
  navigateToDetail: function() {
    wx.navigateTo({
      url: '../merchantDetails/merchantDetails'
    })
  },
  touchSearch: function() {
    this.setData({
      searchFlag: true
    })
  },
  touchClose: function() {
    this.setData({
      searchFlag: false
    })
  },
  getFoodsDict: function() {
    const foods = this.data.ALLFoods;
    var typeToFoodDict = {}

    foods.map(food => {
      const typesOfDict = Object.keys(typeToFoodDict);
      const typesNew = food.type.split(',');

      typesNew.map(type => {
        if (typesOfDict.includes(type)) {
          typeToFoodDict[type].push(food)
        } else {
          typeToFoodDict[type] = [food]
        }
      })
    })
    console.log("=> typeToFoodDict:");
    console.log(typeToFoodDict);
    this.setData({
      typeToFoodDict,
      typeToFoodDictFiltered: typeToFoodDict,
      typeList: Object.keys(typeToFoodDict),
      typeActive: Object.keys(typeToFoodDict)[0]
    })
  },
  tapType: function(event) {
    const type = event.currentTarget.dataset.type
    this.setData({
      typeActive: type
    })
    this.filterFoods()
  },
  rmCurrentFood: function(event) {
    if(this.data.merchantInfo.open) {
      const index = event.currentTarget.dataset.index
      const food = this.data.typeToFoodDictFiltered[this.data.typeActive][index]
      const food_id = food.food_id
      const cartDict = this.data.cartDict
  
      if (cartDict[food_id].count > 0) {
        cartDict[food_id].count -= 1
        cartDict.sum--
        cartDict.total -= food.price
      }
      console.log(cartDict);
      this.setData({
        cartDict
      })
      this.cartToCartList()
    } else {
      wx.showToast({
        title: '本店铺已打烊，请明天再来',
        icon: 'none',
      })
    }
  },
  addCurrentFood: function(event) {
    if(this.data.merchantInfo.open) {
      const index = event.currentTarget.dataset.index
      const food = this.data.typeToFoodDictFiltered[this.data.typeActive][index]
      const food_id = food.food_id
      const cartDict = this.data.cartDict
      const cartFoodIds = Object.keys(cartDict)
  
      if (cartFoodIds.includes(food_id.toString())) {
        cartDict[food_id].count += 1
      } else {
        cartDict[food_id] = {
          food: food,
          count: 1
        }
      }
      cartDict.sum++
      cartDict.total += food.price
      console.log(cartDict);
      this.setData({
        cartDict
      })
      this.cartToCartList()
    } else {
      wx.showToast({
        title: '本店铺已打烊，请明天再来',
        icon: 'none',
      })
    }
    
  },
  cartToCartList: function() {
    const cartDict = this.data.cartDict
    var cartList = []
    for (var key in cartDict) {
      if (key !== 'sum' && key !== 'total') {
        cartList.push(cartDict[key])
      }
    }
    this.setData({
      cartList
    })
  },
  toggleCart: function() {
    const cartUp = this.data.cartUp
    this.setData({
      cartUp: !cartUp
    })
  },
  cleanCart: function() {
    this.setData({
      cartDict: {
        sum: 0,
        total: 0.0
      },
      cartList: []
    })
    this.toggleCart()
  },
  gotoPayPage: function() {
    app.globalData.cartList = this.data.cartList
    wx.navigateTo({
      url: '../payment/payment'
    })
  }
})

// // GEThttps://ancestree.site/api/foods?merchant_id=?
// const ALLFoods = {
//   "status": "OK",
//   "message": "成功获取",
//   "data": [
//     {
//       "food_id": 1,
//       "merchant_id": 1,
//       "name": "巨无霸",
//       "image": "https://api.kuaidian.com/a.png",
//       "type": "汉堡,新品",
//       "price": 100.5,
//       "introduction": "由牛肉组成由牛肉组成由牛肉组成由牛肉组成由牛肉组成"
//     }, {
//       "food_id": 2,
//       "merchant_id": 1,
//       "name": "巨无霸1",
//       "image": "https://api.kuaidian.com/a.png",
//       "type": "汉堡",
//       "price": 20,
//       "introduction": "由青菜组成"
//     }
//   ]
// }
