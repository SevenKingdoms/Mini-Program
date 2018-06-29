//menu.js

const app = getApp();

Page({
  data: {
    merchantInfo: {},
    searchFlag: false,
    filter: "",
    cart: {}
  },
  onLoad: function() {
  },
  onShow: function() {
    //获取选中的商家的信息
    this.setData({
      merchantInfo: app.globalData.merchantInfo
    })
    this.getData();
  },
  getData: function() {
    this.getFoodsDict()
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
    const foods = ALLFoods.data;
    var typeToFoodDict = {}

    foods.map(food => {
      const typesOfDict = Object.keys(typeToFoodDict)
      const typesNew = food.type.split(',')

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
    const index = event.currentTarget.dataset.index
    const food_id = this.data.typeToFoodDictFiltered[this.data.typeActive][index].food_id
    const cart = this.data.cart

    if (cart[food_id] > 0) {
      cart[food_id] -= 1
    }
    this.setData({
      cart
    })
  },
  addCurrentFood: function(event) {
    const index = event.currentTarget.dataset.index
    const food_id = this.data.typeToFoodDictFiltered[this.data.typeActive][index].food_id
    const cart = this.data.cart
    const cartFoodIds = Object.keys(cart)

    if (cartFoodIds.includes(food_id.toString())) {
      cart[food_id] += 1
    } else {
      cart[food_id] = 1
    }
    this.setData({
      cart
    })
  }
})

// GEThttps://ancestree.site/api/foods?merchant_id=?
const ALLFoods = {
  "status": "OK",
  "message": "成功获取",
  "data": [
    {
      "food_id": 1,
      "merchant_id": 1,
      "name": "巨无霸",
      "image": "https://api.kuaidian.com/a.png",
      "type": "汉堡,新品",
      "price": 100.5,
      "introduction": "由牛肉组成由牛肉组成由牛肉组成由牛肉组成由牛肉组成"
    }, {
      "food_id": 2,
      "merchant_id": 1,
      "name": "巨无霸1",
      "image": "https://api.kuaidian.com/a.png",
      "type": "汉堡",
      "price": 20,
      "introduction": "由青菜组成"
    }
  ]
}
