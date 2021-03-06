const app = getApp();
const util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: []
  },

//查看
  view_click:function(e){
    if (e.target.dataset.id == 1) {
      wx.navigateTo({
        url: '../messageList_system/messageList_system',
      })
    }else if (e.target.dataset.id==2){
      wx.navigateTo({
        url: '../messageList/messageList',
      })
    } else if (e.target.dataset.id == 3) {
      wx.navigateTo({
        url: '../messageList_comments/messageList_comments',
      })
    }
  },
//打开
  openClick:function(e){
    const that = this;
    var message = that.data.message
    var index = e.currentTarget.dataset.index 
    that.data.message[index].state = !that.data.message[index].state    
    that.setData({
      message: message
    })
    if (!that.data.message[index].state)
    util.getMessageByID({ itemid: that.data.message[index].id},function(ret){
      console.log("信息已读",ret)
      that.data.message[index].isread=ret.isread;
    },null)
  },

  refresh: function () {
    app.getopenid(function () {
      that.setData({
        business_card: app.globalData.DTuserInfo
      })
      console.log("现在的userinfo", that.data.business_card)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.refresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var message = []
    // setTimeout(()=>{
    util.myMessage({}, function (ret) {
      console.log(1111,ret);
    
      for (var i in ret) {
        var article = ret[i].content;
        if (article) {
            WxParse.wxParse('article', 'html', article, that, 5);
           message.push({
             id: ret[i].itemid,
             title: ret[i].title,
             state:true,
             content: article, 
             time: util.formatTime(new Date(parseInt(ret[i].addtime) * 1000)),
             isread: ret[i].isread
           })
        }
     }
      that.setData({
        message: message
      })
      
      }, null)
    // }, 2000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that.refresh()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("页面卸载")
    wx.setStorageSync("data-mine_massage", that.data)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})