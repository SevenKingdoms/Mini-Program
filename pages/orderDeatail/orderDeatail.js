Page({
    data: {
        orderNum: 123456789,
        dineNum: 5,
        tableNum: 3,
        orderTime: '2017-1-16 11:42',
        hasData: true,
        navTab: ["全部", "已支付", "待支付", "已完成", "待处理"],
        moneyInfo: [100,100,100,100,100,100,100,100],
        nickName: '薄凉竟是德',
        phoneNum: '12345678910',
        url: '',
        statusText: ['待支付'],
    },
    onLoad:function(options) {
        //页面初始化 options为页面跳转所带来的参数
        wx.setNavigationBarTitle({
            title: '订单详情',
        })
    },
    onReady:function() {

    },
    onShow:function() {

    },
    onHide:function() {

    },
    onUnload:function() {
        
    }
})