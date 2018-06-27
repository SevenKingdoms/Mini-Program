/* network.js
 * 一个微信 http 请求的封装
 * for more: https://blog.csdn.net/qq_27187991/article/details/70222558
 */

// set token in js files which using the network (app.js not included):
// const app = getApp()
// network.setToken(app.globalData.token)

const API_PATH = "https://ancestree.site/api"
var token = ""

function setToken(inputToken) {
  token = inputToken
}

var requestHandler = {
  url: "",
  params: {},
  success: function(res){
    // success
  },
  fail: function() {
    // fail
  },
}

//GET请求
function GET(requestHandler) {
  request('GET',requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST',requestHandler)
}

function request(method,requestHandler) {
  var params = requestHandler.params;

  console.log(token);

  wx.request({
    url: API_PATH + requestHandler.url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Authorization": "Bearer " + token
    }, // 设置请求的 header
    success: function(res){
      //注意：可以对参数解密等处理
      requestHandler.success(res)
    },
    fail: function() {
      requestHandler.fail()
    },
    complete: function() {
      // complete
    }
  })
}

module.exports = {
 GET: GET,
 POST: POST,
 setToken: setToken
}
