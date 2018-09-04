// pages/reclassifyCard/reclassifyCard.js
const app = getApp();
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList:[],
    name:null,
    id:null,
  },

  visitingCard: function () {
    var param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      ywlb_id:that.data.id
    };
    util.reclassifyCard(param, function (ret) {
      console.log('分类名片列表', ret)
      that.setData({
        messageList: ret.data
      })
    });
  },

  //查看
  messageList_click: function (e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if(options.name){
      that.setData({
        name:options.name,
        id:options.id
      })
      wx.setNavigationBarTitle({
        title: options.name
      })
    }



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that.visitingCard();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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