export default {
  debug: true,



  isAdmin: false, 
  

  customLoginPagePath: "/pages/login/login",

  customHomePagePath: "/pages/index/index",
  
  loginTypes: [

    'univerify',


    'weixin',

    'username',



    'smsCode'
  ],

  agreements: {
    serviceUrl: 'https://example.com/agreement', 
    privacyUrl: 'https://example.com/privacy', 
    scope: [
      'register', 'login'
    ]
  },
  
  "mp-weixin": {
    "oauth": {
      "weixin": {
        "appid": "wx64b3a851f619fc04", 
        "appsecret": "c5c9c4047bf0c292e28f5019a950b18d" 
      }
    }
  },
  
  appid: {
    weixin: {
      h5: 'wx64b3a851f619fc04',
      web: 'wx64b3a851f619fc04'
    }
  },
  
  passwordStrength: 'medium',
  setPasswordAfterLogin: false
}
