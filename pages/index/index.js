//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad: function () {
    console.log('onload')
    var that = this
    that.getLocation();
  },

  //获取经纬度方法
  getLocation:function(){
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + "lon:"+longitude);
        
        that.getCity(latitude, longitude);
      }
     })
  },
  //获取程序信息
getCity:function(latitude, longitude){
  var that = this
  var url = "https://api.map.baidu.com/reverse_geocoding/v3/";
  var params = {
    ak:"ECsP0zu6VvR0mhxIGRtGrkGKBUwE0XAC",
    output: "json",
    location:latitude + "," + longitude
  }
  wx.request({
    url: url,
    data: params,
    success:function(res){
      console.log(JSON.stringify(res));
      var city = res.data.result.addressComponent.city;
      var district = res.data.result.addressComponent.district;
      var street = res.data.result.addressComponent.street;

      //传输数据
      that.setData({
        city: city,
        district: district,
        street: street,
      })
      var descCity = city.substring(0, city.length -1);
      that.getWeather(descCity);
    },
    fail: function(res){},
    complete:function(res){},

  })
},

//获取天气信息
getWeather:function(city){
  var that = this
  var url = "https://free-api.heweather.net/s6/weather/"
  var params = {
    location: city,
    key: "3f4186b8370346d89fa433f6e59c4d09"
  }
  wx.request({
    url: url,
    data: params,
    success:function(res){
     // console.log(JSON.stringify(res));
      var tmp = res.data.HeWeather6[0].now.tmp;
      var txt = res.data.HeWeather6[0].now.cond_txt;
      var code = res.data.HeWeather6[0].now.cond_code;
      var vis = res.data.HeWeather6[0].now.vis;
      var dir = res.data.HeWeather6[0].now.wind_dir;
      var sc = res.data.HeWeather6[0].now.wind_sc;
      var hum = res.data.HeWeather6[0].now.hum;
      var fl = res.data.HeWeather6[0].now.fl;
      var daily_forecast = res.data.HeWeather6[0].daily_forecast;
      var lifestyle = res.data.HeWeather6[0].lifestyle;
      that.setData({
        tmp: tmp,
        txt: txt,
        code: code,
        vis: vis,
        dir : dir,
        sc: sc,
        hum: hum,
        fl: fl,
        daily_forecast: daily_forecast,
        lifestyle: lifestyle

      })
    },
    fail: function(res){},
    complete: function(res){},
  })
}

})
