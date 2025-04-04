(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/login/login"],{

/***/ 140:
/*!***********************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ 141));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 141:
/*!****************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/login/login.vue ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=b237504c& */ 142);
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ 144);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.vue?vue&type=style&index=0&lang=scss& */ 146);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/login/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 142:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/login/login.vue?vue&type=template&id=b237504c& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=template&id=b237504c& */ 143);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 143:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/login/login.vue?vue&type=template&id=b237504c& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniEasyinput: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput */ "uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue */ 441))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 144:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/login/login.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=script&lang=js& */ 145);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 145:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/login/login.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 27));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    // 注册组件
  },
  data: function data() {
    return {
      redirectUrl: '',
      isSupport: false,
      // 是否支持一键登录
      statusBarHeight: 0,
      mobile: '',
      // 手机号输入
      account: '',
      // 账号输入（用户名或手机号）
      password: '',
      // 密码输入
      confirmPassword: '',
      // 确认密码
      verificationCode: '',
      // 验证码
      countdown: 0,
      // 验证码倒计时
      showLoginOptionsModal: false,
      // 是否显示其他登录方式弹窗
      showPhoneVerifyModal: false,
      // 是否显示手机号验证码登录弹窗
      showPhonePasswordModal: false,
      // 是否显示手机号密码登录弹窗
      showRegisterModal: false,
      // 是否显示注册弹窗
      captchaData: null,
      // 图形验证码数据
      showCaptchaModal: false,
      // 是否显示图形验证码弹窗
      captchaCode: '',
      // 图形验证码输入
      loginState: {
        code: '',
        // 微信登录code
        openid: '',
        // 用户openid
        sessionKey: '' // 会话密钥
      },

      selectedLoginMethod: "" // 用户选择的登录方式
    };
  },
  onLoad: function onLoad(options) {
    // 获取状态栏高度
    var systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;

    // 获取重定向页面
    if (options.redirect) {
      this.redirectUrl = decodeURIComponent(options.redirect);
    }

    // 检查是否支持一键登录
    this.checkSupport();

    // 进入页面就开始静默登录
    this.silentLogin();
  },
  methods: {
    // 检查是否支持一键登录
    checkSupport: function checkSupport() {
      var _this = this;
      // 获取服务商
      uni.getProvider({
        service: 'oauth',
        success: function success(res) {
          console.log('支持的服务商:', res.provider);

          // 预登录
          if (res.provider.includes('univerify')) {
            _this.preLogin();
          }
        }
      });
    },
    // 预登录
    preLogin: function preLogin() {},
    // 显示手机号登录弹窗
    showPhoneLoginModal: function showPhoneLoginModal(type) {
      // 重置输入
      this.mobile = '';
      this.password = '';
      this.confirmPassword = '';
      this.verificationCode = '';

      // 根据类型显示不同弹窗
      if (type === 'phoneVerify') {
        this.showPhoneVerifyModal = true;
      } else if (type === 'phonePassword') {
        this.showPhonePasswordModal = true;
      } else if (type === 'register') {
        this.showRegisterModal = true;
      }
    },
    // 关闭所有登录弹窗
    closeLoginModals: function closeLoginModals() {
      this.showLoginOptionsModal = false;
      this.showPhoneVerifyModal = false;
      this.showPhonePasswordModal = false;
      this.showRegisterModal = false;
      this.showCaptchaModal = false;

      // 重置输入
      this.mobile = '';
      this.password = '';
      this.confirmPassword = '';
      this.verificationCode = '';
    },
    // 获取验证码
    getVerificationCode: function getVerificationCode() {
      console.log('获取验证码');

      // 手机号码验证
      if (!this.mobile || !/^1\d{10}$/.test(this.mobile)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return;
      }

      // 显示加载提示
      uni.showLoading({
        title: '发送中...'
      });
      console.log('手机号码通过验证，准备发送');

      // 直接调用最终方法
      this.sendSmsDirectly(this.mobile);
    },
    // 直接发送短信验证码
    directSendSmsCode: function directSendSmsCode() {
      var phoneStr = String(this.mobile).trim();
      console.log('手机号(直接方式):', phoneStr, 'typeof:', (0, _typeof2.default)(phoneStr), 'length:', phoneStr.length);
      if (!phoneStr || phoneStr.length !== 11) {
        console.error("手机号格式不正确:", phoneStr);
        uni.hideLoading();
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }

      // 使用我们的新方法发送短信
      this.sendSmsDirectly(phoneStr);
    },
    // 使用图形验证码方式获取验证码
    getVerificationCodeWithCaptcha: function getVerificationCodeWithCaptcha() {
      var _this2 = this;
      uni.showLoading({
        title: '获取验证码中',
        mask: true
      });

      // 先获取图形验证码
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });

      // 必须提供scene参数
      uniIdCo.createCaptcha({
        scene: 'login-by-sms' // 必须提供scene参数
      }).then(function (res) {
        console.log('获取图形验证码成功:', res);

        // 尝试手动提取captchaId (有些版本存储在不同位置)
        var captchaId = '';
        if (res.captchaId) {
          captchaId = res.captchaId;
        } else if (res.data && res.data.captchaId) {
          captchaId = res.data.captchaId;
        }

        // 手动添加captchaId
        if (captchaId) {
          res.captchaId = captchaId;
          console.log('成功提取captchaId:', captchaId);
        } else {
          console.log('无法提取captchaId，将使用备用方式');
        }

        // 隐藏加载
        uni.hideLoading();

        // 显示图形验证码弹窗
        _this2.captchaData = res;
        _this2.showCaptchaModal = true;
      }).catch(function (err) {
        uni.hideLoading();
        console.error('获取图形验证码失败:', err);

        // 直接使用短信发送
        _this2.sendSmsDirectly(_this2.mobile);
      });
    },
    // 验证手机号格式
    validatePhoneNumber: function validatePhoneNumber(phoneNumber) {
      if (!phoneNumber) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
        return false;
      }

      // 简单验证手机号
      if (!/^1\d{10}$/.test(phoneNumber)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return false;
      }
      return true;
    },
    // 验证密码
    validatePassword: function validatePassword(password) {
      if (!password) {
        uni.showToast({
          title: '请输入密码',
          icon: 'none'
        });
        return false;
      }
      if (password.length < 6) {
        uni.showToast({
          title: '密码长度不能少于6位',
          icon: 'none'
        });
        return false;
      }
      return true;
    },
    // 验证验证码
    validateVerificationCode: function validateVerificationCode(code) {
      if (!code) {
        uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        });
        return false;
      }

      // 简单验证验证码是否为4-6位数字
      if (!/^\d{4,6}$/.test(code)) {
        uni.showToast({
          title: '请输入正确的验证码',
          icon: 'none'
        });
        return false;
      }
      return true;
    },
    // 确认手机号验证码登录
    confirmPhoneVerifyLogin: function confirmPhoneVerifyLogin() {
      var _this3 = this;
      // 验证输入
      if (!this.validatePhoneNumber(this.mobile) || !this.validateVerificationCode(this.verificationCode)) {
        return;
      }

      // 关闭弹窗
      this.closeLoginModals();

      // 显示加载
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      console.log('手机号验证码登录 - 手机号:', this.mobile, '验证码:', this.verificationCode);

      // 使用importObject方式调用云对象
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      uniIdCo.loginBySms({
        mobile: this.mobile,
        code: this.verificationCode
      }).then(function (res) {
        console.log('手机号验证码登录成功:', res);
        uni.hideLoading();

        // 保存用户信息
        _this3.saveUserInfo(res);

        // 显示登录成功提示
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });

        // 触发登录成功事件
        uni.$emit('user:login', res.userInfo || res);
        uni.$emit('login:success', res.userInfo || res);

        // 刷新页面或跳转
        setTimeout(function () {
          _this3.$emit('login-success', res);
          // 登录成功后进行页面跳转
          _this3.navigateAfterLogin();
        }, 1500);
      }).catch(function (err) {
        uni.hideLoading();
        console.error('验证码登录失败:', err);

        // 记录详细错误信息
        console.log('错误代码:', err.errCode);
        console.log('错误消息:', err.message);
        console.log('错误详情:', JSON.stringify(err));

        // 根据错误类型提供具体提示
        var errorMsg = err.message || '登录失败';

        // 处理常见错误类型
        if (err.errCode === 'uni-id-mobile-verify-code-error') {
          errorMsg = '验证码错误或已过期';
          // 清空验证码字段
          _this3.verificationCode = '';
        } else if (err.errCode === 'uni-id-account-not-exists') {
          errorMsg = '该手机号未注册，请先注册账号';
        } else if (err.errCode === 'uni-id-account-banned') {
          errorMsg = '账号已被禁用';
        }

        // 显示错误提示
        uni.showModal({
          title: '登录失败',
          content: errorMsg,
          showCancel: false
        });
      });
    },
    // 确认手机号密码登录
    confirmPhonePasswordLogin: function confirmPhonePasswordLogin() {
      var _this4 = this;
      if (!this.account) {
        uni.showToast({
          title: '请输入账号',
          icon: 'none'
        });
        return;
      }
      if (!this.password) {
        uni.showToast({
          title: '请输入密码',
          icon: 'none'
        });
        return;
      }

      // 显示加载
      uni.showLoading({
        title: '登录中...'
      });

      // 判断账号是用户名还是手机号
      var isPhone = /^1\d{10}$/.test(this.account);
      console.log('登录信息 - 账号:', this.account, '是手机号:', isPhone);

      // 使用uni-id-co登录
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      console.log('使用uni-id-co云对象方式登录');

      // 根据账号类型调用不同的登录方法
      var loginPromise;
      if (isPhone) {
        loginPromise = uniIdCo.login({
          // 同时提供mobile和username字段，增加登录成功率
          mobile: this.account,
          username: this.account,
          // 也作为用户名尝试登录
          password: this.password
        });
      } else {
        loginPromise = uniIdCo.login({
          username: this.account,
          password: this.password
        });
      }
      loginPromise.then(function (res) {
        uni.hideLoading();
        console.log('账号密码登录成功:', res);

        // 确保先保存token
        if (res.token) {
          uni.setStorageSync('uni_id_token', res.token);
          uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
          console.log('保存了token:', res.token);

          // 立即使用token获取完整用户信息
          uniCloud.callFunction({
            name: 'getUserInfoByToken',
            data: {
              uniIdToken: res.token
            }
          }).then(function (result) {
            console.log('获取完整用户信息结果:', result);
            if (result.result && result.result.code === 0 && result.result.userInfo) {
              // 获取到完整用户信息，进行保存和更新
              var userInfo = result.result.userInfo;
              console.log('获取到完整用户信息:', userInfo);

              // 保存到storage
              uni.setStorageSync('userInfo', userInfo);
              uni.setStorageSync('uni-id-pages-userInfo', userInfo);

              // 保存到全局变量
              getApp().globalData.userInfo = userInfo;

              // 触发登录事件，通知其他页面
              uni.$emit('user:login', userInfo);
              uni.$emit('login:success', userInfo);

              // 显示登录成功提示
              uni.showToast({
                title: '登录成功',
                icon: 'success'
              });

              // 关闭登录弹窗
              _this4.closeLoginModals();

              // 刷新页面或跳转
              setTimeout(function () {
                _this4.$emit('login-success', userInfo);
                // 登录成功后进行页面跳转
                _this4.navigateAfterLogin();
              }, 1500);
            } else {
              // 获取完整用户信息失败，使用基本信息
              console.error('获取完整用户信息失败，使用基本信息:', result);
              _this4.saveUserInfo(res);
            }
          }).catch(function (err) {
            console.error('获取完整用户信息出错:', err);
            // 发生错误时仍使用基本信息
            _this4.saveUserInfo(res);
          });
        } else {
          // 没有token的情况，使用基本信息
          _this4.saveUserInfo(res);
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('登录失败:', err);

        // 记录详细错误信息
        console.log('错误代码:', err.errCode);
        console.log('错误消息:', err.message);
        console.log('错误详情:', JSON.stringify(err));

        // 根据错误类型提供具体提示
        var errorMsg = err.message || '登录失败';

        // 处理常见错误类型
        if (err.errCode === 'uni-id-password-error') {
          errorMsg = '密码错误，请重试';
          // 清空密码字段
          _this4.password = '';
        } else if (err.errCode === 'uni-id-account-not-exists') {
          // 如果是手机号格式，提示更明确的信息
          if (/^1\d{10}$/.test(_this4.account)) {
            // 尝试调用查询接口验证手机号是否已在数据库中
            _this4.checkPhoneExistence(_this4.account).then(function (exists) {
              if (exists) {
                // 如果手机号存在但登录失败，可能是密码问题
                uni.showModal({
                  title: '登录失败',
                  content: '密码错误或账号异常，请重新输入密码或使用手机验证码登录',
                  showCancel: true,
                  cancelText: '重新输入',
                  confirmText: '验证码登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 切换到手机验证码登录
                      _this4.selectedLoginMethod = 'phoneVerify';
                      _this4.phoneNumber = _this4.account;
                      _this4.showPhoneLoginModal('phoneVerify');
                    } else {
                      // 清空密码重新输入
                      _this4.password = '';
                    }
                  }
                });
              } else {
                // 手机号不存在，提示注册
                uni.showModal({
                  title: '账号未注册',
                  content: '该手机号未注册，是否立即注册？',
                  showCancel: true,
                  cancelText: '取消',
                  confirmText: '去注册',
                  success: function success(res) {
                    if (res.confirm) {
                      // 切换到注册页面
                      _this4.showRegisterModal();
                      _this4.mobile = _this4.account;
                    }
                  }
                });
              }
            });
          } else {
            errorMsg = '账号不存在，请检查输入';
            // 显示错误提示
            uni.showModal({
              title: '登录失败',
              content: errorMsg,
              showCancel: false
            });
          }
          return; // 提前返回，不显示一般错误提示
        } else if (err.errCode === 'uni-id-account-banned') {
          errorMsg = '账号已被禁用';
        } else if (err.errCode === 'uni-id-account-not-exists-in-current-app') {
          errorMsg = '账号在当前应用不存在';
        } else if (err.errCode === 'uni-id-password-error-exceed-limit') {
          errorMsg = '密码错误次数过多，账号已被锁定';
        }

        // 显示错误提示
        uni.showModal({
          title: '登录失败',
          content: errorMsg,
          showCancel: false
        });
      });
    },
    // 确认注册
    confirmRegister: function confirmRegister() {
      var _this5 = this;
      // 验证输入
      if (!this.validatePhoneNumber(this.mobile) || !this.validateVerificationCode(this.verificationCode) || !this.validatePassword(this.password)) {
        return;
      }

      // 验证两次密码是否一致
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次输入的密码不一致',
          icon: 'none'
        });
        return;
      }

      // 关闭弹窗
      this.closeLoginModals();

      // 显示加载
      uni.showLoading({
        title: '注册中',
        mask: true
      });

      // 使用importObject方式调用云对象
      var uniIdCo = uniCloud.importObject('uni-id-co');
      uniIdCo.register({
        username: this.mobile,
        password: this.password,
        code: this.verificationCode,
        mobile: this.mobile
      }).then(function (res) {
        console.log('注册成功:', res);
        uni.hideLoading();

        // 保存用户信息
        _this5.saveUserInfo(res);

        // 显示注册成功提示
        uni.showToast({
          title: '注册成功',
          icon: 'success'
        });

        // 刷新页面或跳转
        setTimeout(function () {
          _this5.$emit('login-success', res);
          // 登录成功后进行页面跳转
          _this5.navigateAfterLogin();
        }, 1500);
      }).catch(function (err) {
        uni.hideLoading();
        console.error('注册失败:', err);
        uni.showToast({
          title: err.message || '注册失败',
          icon: 'none'
        });
      });
    },
    // 手机号登录（旧方法，保留兼容性）
    handlePhoneLogin: function handlePhoneLogin() {
      this.showPhoneLoginModal('phoneVerify');
    },
    // 使用手机号登录（旧方法，保留兼容性）
    loginWithPhone: function loginWithPhone(phoneNumber) {
      var _this6 = this;
      // 显示加载中
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      console.log('使用手机号登录:', phoneNumber);

      // 调用登录云函数
      uniCloud.callFunction({
        name: 'login',
        data: {
          phoneNumber: phoneNumber,
          loginType: 'phone'
        },
        success: function success(res) {
          console.log('手机号登录结果:', res);
          if (res.result && res.result.code === 0) {
            // 处理登录结果
            _this6.handleLoginResult(res);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: res.result && res.result.message || '登录失败',
              icon: 'none'
            });
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          console.error('登录失败:', err);
          uni.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      });
    },
    // 静默登录，获取code和openid
    silentLogin: function silentLogin() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var loginRes, openidRes;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this7.wxLoginPromise();
              case 3:
                loginRes = _context.sent;
                if (!loginRes.code) {
                  _context.next = 18;
                  break;
                }
                console.log('静默登录获取code成功:', loginRes.code);
                _this7.loginState.code = loginRes.code;

                // 获取openid
                _context.prev = 7;
                _context.next = 10;
                return _this7.getOpenid(loginRes.code);
              case 10:
                openidRes = _context.sent;
                console.log('静默登录获取openid成功:', openidRes);
                if (openidRes.result && openidRes.result.code === 0 && openidRes.result.data) {
                  _this7.loginState.openid = openidRes.result.data.openid;
                  _this7.loginState.sessionKey = openidRes.result.data.sessionKey;

                  // 有了openid后尝试自动登录
                  if (_this7.loginState.openid) {
                    _this7.checkUserExistsAndLogin();
                  }
                }
                _context.next = 18;
                break;
              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](7);
                console.error('静默登录获取openid失败:', _context.t0);
              case 18:
                _context.next = 23;
                break;
              case 20:
                _context.prev = 20;
                _context.t1 = _context["catch"](0);
                console.error('静默登录失败:', _context.t1);
              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20], [7, 15]]);
      }))();
    },
    // 检查用户是否已存在，如果已存在则自动登录
    checkUserExistsAndLogin: function checkUserExistsAndLogin() {
      var _this8 = this;
      if (!this.loginState.openid) return;

      // 显示加载中
      uni.showLoading({
        title: '检查登录状态',
        mask: true
      });
      var defaultUserInfo = {
        nickName: '微信用户',
        avatarUrl: '',
        gender: 0
      };

      // 调用云函数检查用户是否存在并自动登录
      uniCloud.callFunction({
        name: 'login',
        data: {
          openid: this.loginState.openid,
          userInfo: defaultUserInfo,
          loginType: 'wechat',
          checkOnly: true // 添加标记，仅检查用户是否存在
        },

        success: function success(res) {
          uni.hideLoading();
          console.log('检查用户存在结果:', res);
          if (res.result && res.result.code === 0 && res.result.userExists) {
            console.log('用户已存在，自动登录');
            // 用户已存在，自动登录
            _this8.loginWithOpenid(_this8.loginState.openid, defaultUserInfo);
          } else {
            console.log('用户不存在，需要点击登录按钮');
            // 用户不存在，不进行自动登录，等待用户点击登录按钮
          }
        },

        fail: function fail(err) {
          uni.hideLoading();
          console.error('检查用户存在失败:', err);
        }
      });
    },
    // 自动使用openid登录
    autoLoginWithOpenid: function autoLoginWithOpenid() {
      var defaultUserInfo = {
        nickName: '微信用户',
        avatarUrl: '',
        gender: 0
      };
      if (this.loginState.openid) {
        console.log('使用已获取的openid登录:', this.loginState.openid);
        this.loginWithOpenid(this.loginState.openid, defaultUserInfo);
      }
    },
    // Promise化的wx.login
    wxLoginPromise: function wxLoginPromise() {
      return new Promise(function (resolve, reject) {
        uni.login({
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    },
    // 获取openid
    getOpenid: function getOpenid(code) {
      return new Promise(function (resolve, reject) {
        uniCloud.callFunction({
          name: 'getWxOpenid',
          data: {
            code: code
          },
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    },
    // 处理微信登录
    handleUserInfo: function handleUserInfo(e) {
      var _this9 = this;
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        uni.showToast({
          title: '授权失败',
          icon: 'none'
        });
        return;
      }

      // 获取用户信息
      var userInfo = e.detail.userInfo;

      // 显示加载中
      uni.showLoading({
        title: '登录中',
        mask: true
      });

      // 进行微信登录
      uni.login({
        success: function success(loginRes) {
          if (loginRes.code) {
            console.log('微信登录成功，获取到code:', loginRes.code);

            // 优先使用uni-id-co登录方式
            _this9.loginWithUniIdCo(loginRes.code, userInfo);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: function fail() {
          uni.hideLoading();
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    // 使用uni-id-co的方式登录
    loginWithUniIdCo: function loginWithUniIdCo(code, userInfo) {
      var _this10 = this;
      console.log('尝试使用uni-id-co微信登录');

      // 使用云对象方式调用登录
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true // 使用自定义UI
      });

      uniIdCo.loginByWeixin({
        code: code // 提供正确的code参数
      }).then(function (res) {
        uni.hideLoading();
        console.log('uni-id-co微信登录成功:', res);

        // 保存token等信息到storage
        uni.setStorageSync('uni_id_token', res.token);
        uni.setStorageSync('uni_id_token_expired', res.tokenExpired);

        // 保存用户信息
        _this10.saveUserInfo(res);

        // 显示登录成功提示
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });

        // 触发登录成功事件
        uni.$emit('user:login', res.userInfo || res);
        uni.$emit('login:success', res.userInfo || res);

        // 登录成功后自动跳转到首页或指定页面
        setTimeout(function () {
          _this10.navigateAfterLogin();
        }, 1000);
      }).catch(function (err) {
        console.error('uni-id-co微信登录失败:', err);

        // 尝试备用方式
        _this10.getWxOpenidAndLogin(code, userInfo);
      });
    },
    // 获取微信openid并登录（备用方案）
    getWxOpenidAndLogin: function getWxOpenidAndLogin(code, userInfo) {
      var _this11 = this;
      console.log('使用备用方式获取openid并登录');

      // 通过getWxOpenid获取openid等信息
      uniCloud.callFunction({
        name: 'getWxOpenid',
        data: {
          code: code
        },
        success: function success(openidRes) {
          console.log('获取openid结果:', openidRes);
          if (openidRes.result && openidRes.result.code === 0 && openidRes.result.data) {
            var openid = openidRes.result.data.openid;

            // 使用openid登录
            _this11.loginWithOpenid(openid, userInfo || {
              nickName: '微信用户',
              avatarUrl: '',
              gender: 0
            });
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          console.error('获取openid失败:', err);
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    // 处理登录结果
    handleLoginResult: function handleLoginResult(res) {
      var _this12 = this;
      uni.hideLoading();
      console.log('处理登录结果:', res);
      var result = res.result;
      console.log('结果数据结构:', result);

      // 成功
      if (result && result.code === 0) {
        try {
          // 保存用户信息 (根据uni-id-co的返回格式)
          var userInfo = {
            uid: result.uid,
            token: result.token,
            tokenExpired: result.tokenExpired,
            userInfo: result.userInfo || {}
          };
          uni.setStorageSync('userInfo', userInfo);

          // 显示登录成功提示
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });

          // 触发全局登录成功事件
          uni.$emit('user:login', userInfo);
          uni.$emit('login:success', userInfo);

          // 关闭登录弹窗
          this.closeLoginModals();

          // 登录成功后自动跳转到首页或指定页面
          setTimeout(function () {
            _this12.navigateAfterLogin();
          }, 1000);
        } catch (e) {
          console.error('保存用户信息失败:', e);
        }
      } else {
        // 失败
        console.error('登录失败:', result);
        uni.showToast({
          title: result && result.message || '登录失败',
          icon: 'none'
        });
      }
    },
    // 登录后的跳转逻辑
    navigateAfterLogin: function navigateAfterLogin() {
      console.log('执行登录后跳转...');

      // 获取重定向URL
      var redirectUrl = this.getRedirectUrl();
      if (redirectUrl) {
        console.log('跳转到指定页面:', redirectUrl);

        // 判断是否是tabbar页面
        var tabbarPages = ['/pages/index/index', '/pages/course/index', '/pages/user/user'];
        var isTabbarPage = tabbarPages.some(function (page) {
          return redirectUrl.startsWith(page);
        });
        if (isTabbarPage) {
          uni.switchTab({
            url: redirectUrl,
            success: function success() {
              console.log('跳转成功');
            },
            fail: function fail(err) {
              console.error('跳转失败:', err);
              // 失败时默认跳转到首页
              uni.switchTab({
                url: '/pages/index/index'
              });
            }
          });
        } else {
          uni.redirectTo({
            url: redirectUrl,
            success: function success() {
              console.log('跳转成功');
            },
            fail: function fail(err) {
              console.error('跳转失败:', err);
              // 失败时默认跳转到首页
              uni.switchTab({
                url: '/pages/index/index'
              });
            }
          });
        }
      } else {
        // 没有重定向URL则跳转到首页
        console.log('没有重定向URL，跳转到首页');
        uni.switchTab({
          url: '/pages/index/index',
          success: function success() {
            console.log('跳转到首页成功');
          },
          fail: function fail(err) {
            console.error('跳转到首页失败:', err);
          }
        });
      }
    },
    // 获取重定向URL
    getRedirectUrl: function getRedirectUrl() {
      // 优先使用URL参数中的redirect
      if (this.options && this.options.redirect) {
        return decodeURIComponent(this.options.redirect);
      }

      // 其次尝试从存储中获取
      var redirectUrl = uni.getStorageSync('loginRedirectUrl');
      if (redirectUrl) {
        // 使用后清除，避免下次重复使用
        uni.removeStorageSync('loginRedirectUrl');
        return redirectUrl;
      }
      return '';
    },
    // 调试日志输出
    logDebugInfo: function logDebugInfo() {
      try {
        console.log('----- 用户登录调试信息 -----');

        // 读取本地存储的用户信息
        var userInfoStr = uni.getStorageSync('userInfo');
        console.log('本地存储的用户信息字符串长度:', typeof userInfoStr === 'string' ? userInfoStr.length : '对象类型');
        if (userInfoStr) {
          try {
            // 检查是否已经是对象
            var userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
            console.log('解析后的用户信息字段:', Object.keys(userInfo));
            console.log('用户ID:', userInfo.userId || userInfo._id);
            console.log('用户名:', userInfo.nickName || userInfo.username);
            console.log('是否有手机号:', !!userInfo.phoneNumber);
          } catch (e) {
            console.error('解析用户信息失败:', e);
          }
        } else {
          console.log('本地存储中没有用户信息');
        }

        // 检查全局状态
        var globalData = getApp().globalData || {};
        console.log('全局状态中是否有用户信息:', !!globalData.userInfo);

        // 输出环境信息
        var sysInfo = uni.getSystemInfoSync();
        console.log('运行环境:', sysInfo.platform, sysInfo.system);
        console.log('----- 调试信息结束 -----');
      } catch (err) {
        console.error('输出调试信息失败:', err);
      }
    },
    // 显示隐私政策
    showPrivacyPolicy: function showPrivacyPolicy() {
      uni.navigateTo({
        url: '/pages/common/webview?title=隐私政策&url=' + encodeURIComponent('https://example.com/privacy')
      });
    },
    // 显示用户协议
    showUserAgreement: function showUserAgreement() {
      uni.navigateTo({
        url: '/pages/common/webview?title=用户协议&url=' + encodeURIComponent('https://example.com/agreement')
      });
    },
    // 保存用户信息
    saveUserInfo: function saveUserInfo(res) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var result, completeUserInfo, userInfo;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // 保存用户信息到本地
                console.log('保存用户信息, 原始数据:', JSON.stringify(res));

                // 保存token到storage
                if (!res.token) {
                  _context2.next = 18;
                  break;
                }
                uni.setStorageSync('uni_id_token', res.token);
                uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
                console.log('保存了token和过期时间:', res.tokenExpired);

                // 登录成功后，立即调用getUserInfoByToken云函数获取完整用户信息
                console.log('尝试获取完整用户信息...');
                _context2.prev = 7;
                _context2.next = 10;
                return uniCloud.callFunction({
                  name: 'getUserInfoByToken',
                  data: {
                    uniIdToken: res.token
                  }
                });
              case 10:
                result = _context2.sent;
                console.log('获取完整用户信息结果:', result);
                if (result && result.result && result.result.code === 0 && result.result.userInfo) {
                  // 使用完整的用户信息
                  completeUserInfo = result.result.userInfo;
                  console.log('获取到完整用户信息:', completeUserInfo);

                  // 保存到存储
                  uni.setStorageSync('uni-id-pages-userInfo', completeUserInfo);
                  uni.setStorageSync('userInfo', completeUserInfo);

                  // 保存到全局变量
                  getApp().globalData.userInfo = completeUserInfo;
                  console.log('完整用户信息保存成功');

                  // 触发登录成功事件
                  uni.$emit('user:login', completeUserInfo);
                  uni.$emit('login:success', completeUserInfo);

                  // 显示登录成功提示
                  uni.showToast({
                    title: '登录成功',
                    icon: 'success'
                  });

                  // 登录成功后自动跳转到首页或指定页面
                  setTimeout(function () {
                    _this13.navigateAfterLogin();
                  }, 1000);
                }
                _context2.next = 18;
                break;
              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](7);
                console.error('获取完整用户信息失败，将使用标准方式:', _context2.t0);
              case 18:
                // 如果获取完整用户信息失败，则使用标准方式保存简化信息
                // 从不同格式的响应中提取完整用户信息
                userInfo = {
                  uid: res.uid || '',
                  token: res.token || '',
                  tokenExpired: res.tokenExpired || '',
                  username: '',
                  nickname: '',
                  mobile: '',
                  email: '',
                  avatar: '',
                  avatar_file: ''
                }; // 如果存在userInfo字段
                if (res.userInfo && (0, _typeof2.default)(res.userInfo) === 'object') {
                  console.log('从userInfo字段提取数据');
                  // 合并用户信息
                  Object.assign(userInfo, {
                    username: res.userInfo.username || '',
                    nickname: res.userInfo.nickname || '',
                    mobile: res.userInfo.mobile || '',
                    email: res.userInfo.email || '',
                    avatar: res.userInfo.avatar || '',
                    avatar_file: res.userInfo.avatar_file || ''
                  });
                }
                // 如果直接包含用户信息字段
                else {
                  console.log('从顶级字段提取数据');
                  userInfo.username = res.username || '';
                  userInfo.nickname = res.nickname || '';
                  userInfo.mobile = res.mobile || '';
                  userInfo.email = res.email || '';
                  userInfo.avatar = res.avatar || '';
                  userInfo.avatar_file = res.avatar_file || '';
                }

                // 确保uid和userInfo属性一定存在
                if (!userInfo.userInfo) {
                  userInfo.userInfo = {
                    _id: userInfo.uid,
                    uid: userInfo.uid,
                    username: userInfo.username,
                    nickname: userInfo.nickname
                  };
                }
                console.log('处理后的用户信息:', JSON.stringify(userInfo));

                // 直接存储对象，而不是字符串，减少解析错误
                uni.setStorageSync('userInfo', userInfo);

                // 保存到全局变量以便其他页面使用
                getApp().globalData.userInfo = userInfo;

                // 同时保存到uni-id-pages的标准存储位置
                uni.setStorageSync('uni-id-pages-userInfo', userInfo);
                console.log('保存用户信息成功');

                // 触发登录成功事件
                uni.$emit('user:login', userInfo);
                uni.$emit('login:success', userInfo);

                // 显示登录成功提示
                uni.showToast({
                  title: '登录成功',
                  icon: 'success'
                });

                // 登录成功后自动跳转到首页或指定页面
                setTimeout(function () {
                  _this13.navigateAfterLogin();
                }, 1000);
                _context2.next = 35;
                break;
              case 32:
                _context2.prev = 32;
                _context2.t1 = _context2["catch"](0);
                console.error('保存用户信息失败:', _context2.t1);
              case 35:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 32], [7, 15]]);
      }))();
    },
    // 关闭验证码弹窗
    closeCaptchaModal: function closeCaptchaModal() {
      this.showCaptchaModal = false;
      this.captchaCode = '';
    },
    // 刷新图形验证码
    refreshCaptcha: function refreshCaptcha() {
      var _this14 = this;
      uni.showLoading({
        title: '刷新中',
        mask: true
      });
      var uniIdCo = uniCloud.importObject('uni-id-co');

      // 必须提供scene参数
      uniIdCo.createCaptcha({
        scene: 'login-by-sms' // 必须提供scene参数
      }).then(function (res) {
        uni.hideLoading();
        console.log('刷新图形验证码成功:', res);

        // 尝试手动提取captchaId (有些版本存储在不同位置)
        var captchaId = '';
        if (res.captchaId) {
          captchaId = res.captchaId;
        } else if (res.data && res.data.captchaId) {
          captchaId = res.data.captchaId;
        }

        // 手动添加captchaId
        if (captchaId) {
          res.captchaId = captchaId;
          console.log('成功提取captchaId:', captchaId);
        } else {
          console.log('无法提取captchaId，将使用备用方式');
        }
        _this14.captchaData = res;
      }).catch(function (err) {
        uni.hideLoading();
        console.error('刷新图形验证码失败:', err);
        uni.showToast({
          title: '刷新失败，请重试',
          icon: 'none'
        });
      });
    },
    // 确认图形验证码并发送短信
    confirmCaptchaAndSendSms: function confirmCaptchaAndSendSms() {
      if (!this.captchaCode) {
        uni.showToast({
          title: '请输入图形验证码',
          icon: 'none'
        });
        return;
      }
      var phoneStr = String(this.mobile).trim();
      console.log('准备发送验证码，captchaData详细内容:', JSON.stringify(this.captchaData));
      console.log('输入的验证码:', this.captchaCode);
      console.log('手机号(验证码方式):', phoneStr, 'typeof:', (0, _typeof2.default)(phoneStr), 'length:', phoneStr.length);

      // 验证手机号
      if (!phoneStr || phoneStr.length !== 11) {
        console.error("手机号格式不正确:", phoneStr);
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }
      uni.showLoading({
        title: '发送中',
        mask: true
      });

      // 验证成功后直接发送短信
      console.log('验证码验证通过，直接发送短信');

      // 直接调用短信发送方法
      this.sendSmsDirectly(phoneStr);
    },
    // 直接发送短信 - 最后的方法
    sendSmsDirectly: function sendSmsDirectly(phoneNumber) {
      var _this15 = this;
      console.log('直接发送短信 - 最终方法, 手机号:', phoneNumber);

      // 确保手机号格式正确
      phoneNumber = String(phoneNumber).trim();
      if (!phoneNumber || phoneNumber.length !== 11) {
        console.error("手机号格式不正确:", phoneNumber);
        uni.hideLoading();
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }

      // 尝试不同的数据格式
      // 格式1: 直接在表单中添加mobile字段
      var formData = {
        mobile: phoneNumber
      };
      console.log('发送参数 (格式1):', JSON.stringify(formData));

      // 直接调用API接口
      uni.request({
        url: 'https://fc-mp-7e3e0dc5-f41a-4295-acf9-83f1b1b089b9.next.bspapp.com/sendSmsCode',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: formData,
        success: function success(res) {
          console.log('发送响应 (格式1):', res);
          if (res.statusCode === 200 && res.data && res.data.code === 0) {
            uni.hideLoading();
            // 关闭验证码弹窗
            _this15.closeCaptchaModal();

            // 提示成功并开始倒计时
            uni.showToast({
              title: '验证码已发送',
              icon: 'success'
            });

            // 开始倒计时
            _this15.startCountdown();
          } else {
            console.error('格式1失败，尝试格式2');

            // 格式2: 使用params包装
            var formData2 = {
              params: {
                mobile: phoneNumber
              }
            };
            console.log('发送参数 (格式2):', JSON.stringify(formData2));
            uni.request({
              url: 'https://fc-mp-7e3e0dc5-f41a-4295-acf9-83f1b1b089b9.next.bspapp.com/sendSmsCode',
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              data: formData2,
              success: function success(res2) {
                console.log('发送响应 (格式2):', res2);
                if (res2.statusCode === 200 && res2.data && res2.data.code === 0) {
                  uni.hideLoading();
                  // 关闭验证码弹窗
                  _this15.closeCaptchaModal();

                  // 提示成功并开始倒计时
                  uni.showToast({
                    title: '验证码已发送',
                    icon: 'success'
                  });

                  // 开始倒计时
                  _this15.startCountdown();
                } else {
                  // 所有方式都失败，使用格式3
                  console.error('格式2失败，尝试格式3 (URL参数)');
                  uni.request({
                    url: "https://fc-mp-7e3e0dc5-f41a-4295-acf9-83f1b1b089b9.next.bspapp.com/sendSmsCode?mobile=".concat(encodeURIComponent(phoneNumber)),
                    method: 'GET',
                    success: function success(res3) {
                      uni.hideLoading();
                      console.log('发送响应 (格式3):', res3);

                      // 关闭验证码弹窗
                      _this15.closeCaptchaModal();
                      if (res3.statusCode === 200 && res3.data && res3.data.code === 0) {
                        uni.showToast({
                          title: '验证码已发送',
                          icon: 'success'
                        });

                        // 开始倒计时
                        _this15.startCountdown();
                      } else {
                        uni.showToast({
                          title: '发送失败，请稍后重试',
                          icon: 'none'
                        });
                      }
                    },
                    fail: function fail(err3) {
                      uni.hideLoading();
                      console.error('发送请求失败 (格式3):', err3);

                      // 关闭验证码弹窗
                      _this15.closeCaptchaModal();
                      uni.showToast({
                        title: '验证码发送失败',
                        icon: 'none'
                      });
                    }
                  });
                }
              },
              fail: function fail(err2) {
                console.error('发送请求失败 (格式2):', err2);
                // 继续尝试格式3...
              }
            });
          }
        },

        fail: function fail(err) {
          console.error('发送请求失败 (格式1):', err);
          // 继续尝试格式2...
        }
      });
    },
    // 尝试从SVG中获取验证码文本
    getCaptchaTextFromSvg: function getCaptchaTextFromSvg() {
      try {
        if (this.captchaData && this.captchaData.captchaBase64) {
          var svg = this.captchaData.captchaBase64;

          // 尝试提取文本内容
          var captchaText = '';

          // 如果是SVG格式，尝试从中提取文本节点
          if (svg.includes('<svg') && svg.includes('</svg>')) {
            // 查找text标签
            var textMatch = svg.match(/<text[^>]*>(.*?)<\/text>/g);
            if (textMatch) {
              captchaText = textMatch.map(function (t) {
                // 提取text标签内的文本
                var content = t.match(/<text[^>]*>(.*?)<\/text>/);
                return content ? content[1] : '';
              }).join('');
            }

            // 如果没有找到text标签，尝试查看title或desc标签
            if (!captchaText) {
              var titleMatch = svg.match(/<title[^>]*>(.*?)<\/title>/);
              if (titleMatch) {
                captchaText = titleMatch[1];
              }
            }

            // 如果还是没找到，尝试通过路径或线条的标识猜测
            if (!captchaText && svg.includes('path')) {
              console.log('SVG包含路径，但无法提取文本');
            }
          }
          if (captchaText) {
            console.log('从SVG中提取的验证码文本可能是:', captchaText);
            return captchaText;
          }
        }
      } catch (err) {
        console.error('尝试提取验证码文本失败:', err);
      }
      return null;
    },
    // 开始倒计时
    startCountdown: function startCountdown() {
      var _this16 = this;
      this.countdown = 60;
      this.countdownTimer = setInterval(function () {
        _this16.countdown--;
        if (_this16.countdown <= 0) {
          clearInterval(_this16.countdownTimer);
          _this16.countdown = 0;
        }
      }, 1000);
    },
    // 使用openid登录（备用方法）
    loginWithOpenid: function loginWithOpenid(openid, userInfo) {
      var _this17 = this;
      console.log('使用openid直接登录:', openid);

      // 显示加载中
      uni.showLoading({
        title: '登录中...',
        mask: true
      });

      // 准备用户数据
      var userData = {
        nickname: userInfo.nickName || '微信用户',
        avatar: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0
      };

      // 调用云函数，使其在uni-id-users中查找或创建用户
      uniCloud.callFunction({
        name: 'loginWithOpenid',
        data: {
          openid: openid,
          platform: 'mp-weixin',
          userInfo: userData
        },
        success: function success(res) {
          uni.hideLoading();
          console.log('openid登录结果:', res);
          if (res.result && res.result.code === 0) {
            // 保存token等信息
            if (res.result.token) {
              uni.setStorageSync('uni_id_token', res.result.token);
              uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired);
            }

            // 保存用户信息
            _this17.saveUserInfo(res.result);

            // 显示登录成功提示
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            });

            // 触发登录成功事件
            uni.$emit('user:login', res.result.userInfo || res.result);
            uni.$emit('login:success', res.result.userInfo || res.result);

            // 登录成功后自动跳转到首页或指定页面
            setTimeout(function () {
              _this17.navigateAfterLogin();
            }, 1000);
          } else {
            var _res$result;
            console.error('登录失败:', res.result);
            uni.showToast({
              title: ((_res$result = res.result) === null || _res$result === void 0 ? void 0 : _res$result.message) || '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          console.error('调用登录云函数失败:', err);
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack({
        delta: 1,
        fail: function fail() {
          // 如果没有上一页，则返回首页
          uni.switchTab({
            url: '/pages/index/index'
          });
        }
      });
    },
    // 显示其他登录方式
    showLoginOptions: function showLoginOptions() {
      this.showLoginOptionsModal = true;
    },
    // 调用登录API
    callLoginApi: function callLoginApi(loginParams) {
      var _this18 = this;
      // 显示加载中
      uni.showLoading({
        title: '登录中...'
      });

      // 调用登录API
      uniCloud.callFunction({
        name: 'login',
        data: _objectSpread(_objectSpread({}, loginParams), {}, {
          loginType: 'phone'
        }),
        success: function success(res) {
          console.log('登录结果:', res);
          if (res.result && res.result.code === 0) {
            // 处理登录结果
            _this18.handleLoginResult(res);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: res.result && res.result.message || '登录失败',
              icon: 'none'
            });
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          console.error('登录失败:', err);
          uni.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      });
    },
    // 选择登录方式
    selectLoginMethod: function selectLoginMethod(method) {
      this.selectedLoginMethod = method;
      this.closeLoginModals();

      // 直接显示对应的登录表单
      this.showPhoneLoginModal(method);
    },
    // 检查登录状态
    checkLoginStatus: function checkLoginStatus() {
      try {
        // 检查本地存储中的token
        var token = uni.getStorageSync('uni_id_token');
        var tokenExpired = uni.getStorageSync('uni_id_token_expired');
        var userInfoStr = uni.getStorageSync('userInfo');
        console.log('本地token:', token);
        console.log('token过期时间:', tokenExpired);
        console.log('用户信息:', userInfoStr);

        // 检查token是否过期
        var now = Date.now();
        var isExpired = !tokenExpired || now > tokenExpired;
        console.log('token是否过期:', isExpired);

        // 在界面上显示用户信息
        uni.showToast({
          title: '正在检查登录状态',
          icon: 'loading'
        });

        // 调试日志输出
        this.logDebugInfo();

        // 使用云对象检查token有效性
        if (token) {
          this.checkTokenValidity(token);
        } else {
          uni.showModal({
            title: '登录状态',
            content: '未找到登录凭证，请重新登录',
            showCancel: false
          });
        }
      } catch (err) {
        console.error('检查登录状态错误:', err);
        uni.showModal({
          title: '错误',
          content: "\u68C0\u67E5\u767B\u5F55\u72B6\u6001\u65F6\u51FA\u9519: ".concat(err.message),
          showCancel: false
        });
      }
    },
    // 检查token有效性
    checkTokenValidity: function checkTokenValidity(token) {
      var _this19 = this;
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      uni.showLoading({
        title: '检查中...'
      });
      uniIdCo.checkToken({
        token: token
      }).then(function (res) {
        uni.hideLoading();
        console.log('token检查结果:', res);
        if (res.code === 0) {
          // 成功获取到用户信息，显示详细内容
          var infoText = "\u767B\u5F55\u72B6\u6001: \u5DF2\u767B\u5F55\n";

          // 添加用户ID信息
          infoText += "\u7528\u6237ID: ".concat(res.uid || '未知', "\n");

          // 检查云数据库中的用户信息
          _this19.checkDatabaseUserInfo(res.uid);

          // 添加用户名和昵称信息
          if (res.userInfo) {
            infoText += "\u7528\u6237\u540D: ".concat(res.userInfo.username || '未设置', "\n");
            infoText += "\u6635\u79F0: ".concat(res.userInfo.nickname || res.userInfo.username || '未设置', "\n");

            // 如果有手机号，显示手机号
            if (res.userInfo.mobile) {
              infoText += "\u624B\u673A\u53F7: ".concat(res.userInfo.mobile, "\n");
            }

            // 显示是否绑定手机号
            infoText += "\u662F\u5426\u7ED1\u5B9A\u624B\u673A\u53F7: ".concat(res.userInfo.mobile ? '是' : '否', "\n");
          }

          // 尝试获取用户完整信息
          var userInfo = uni.getStorageSync('userInfo');

          // 如果存储了用户信息，添加到显示中
          if (userInfo) {
            infoText += "\n\u672C\u5730\u5B58\u50A8\u4FE1\u606F:\n";
            infoText += "\u5B58\u50A8\u7528\u6237ID: ".concat(userInfo.uid || userInfo._id || '未知', "\n");
            if ((0, _typeof2.default)(userInfo) === 'object') {
              // 检查userInfo属性
              if (userInfo.userInfo) {
                infoText += "\u5B58\u50A8\u6635\u79F0: ".concat(userInfo.userInfo.nickname || userInfo.nickname || '未设置', "\n");
              } else {
                infoText += "\u5B58\u50A8\u6635\u79F0: ".concat(userInfo.nickname || '未设置', "\n");
              }
            }
          }

          // 显示token过期时间
          var tokenExpired = uni.getStorageSync('uni_id_token_expired');
          if (tokenExpired) {
            var expireDate = new Date(tokenExpired);
            infoText += "\nToken\u8FC7\u671F\u65F6\u95F4: ".concat(expireDate.toLocaleString(), "\n");
            infoText += "\u662F\u5426\u5DF2\u8FC7\u671F: ".concat(Date.now() > tokenExpired ? '是' : '否', "\n");
          }

          // 显示用户信息
          uni.showModal({
            title: '登录状态',
            content: infoText,
            showCancel: false
          });

          // 如果没有用户信息，尝试重新获取
          if (!userInfo || !userInfo.nickname) {
            _this19.refreshUserInfo(res);
          }
        } else {
          uni.showModal({
            title: '登录状态',
            content: "\u767B\u5F55\u5DF2\u5931\u6548: ".concat(res.message || '未知错误'),
            showCancel: false
          });
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('检查token失败:', err);
        uni.showModal({
          title: '登录状态',
          content: "\u68C0\u67E5\u5931\u8D25: ".concat(err.message || JSON.stringify(err)),
          showCancel: false
        });
      });
    },
    // 检查数据库中的用户信息
    checkDatabaseUserInfo: function checkDatabaseUserInfo(uid) {
      if (!uid) return;
      console.log('检查数据库中的用户信息, uid:', uid);
      uniCloud.callFunction({
        name: 'getUserInfoByToken',
        data: {
          uniIdToken: uni.getStorageSync('uni_id_token')
        }
      }).then(function (res) {
        if (res.result && res.result.code === 0 && res.result.userInfo) {
          console.log('数据库用户信息:', res.result.userInfo);
          uni.showModal({
            title: '数据库用户信息',
            content: "\u7528\u6237ID: ".concat(res.result.userInfo._id, "\n\u7528\u6237\u540D: ").concat(res.result.userInfo.username || '未设置', "\n\u6635\u79F0: ").concat(res.result.userInfo.nickname || '未设置'),
            showCancel: false
          });
        } else {
          console.error('获取数据库用户信息失败:', res);
        }
      }).catch(function (err) {
        console.error('查询数据库用户信息失败:', err);
      });
    },
    // 刷新用户信息
    refreshUserInfo: function refreshUserInfo(tokenCheckRes) {
      if (!tokenCheckRes || !tokenCheckRes.uid) return;
      console.log('尝试刷新用户信息');

      // 使用uid构建基本用户信息
      var basicUserInfo = {
        uid: tokenCheckRes.uid,
        _id: tokenCheckRes.uid
      };

      // 如果有用户信息，添加到基本信息中
      if (tokenCheckRes.userInfo) {
        Object.assign(basicUserInfo, tokenCheckRes.userInfo);
      }

      // 保存到storage
      uni.setStorageSync('userInfo', basicUserInfo);
      uni.setStorageSync('uni-id-pages-userInfo', basicUserInfo);

      // 同时触发登录事件，让用户页面刷新
      uni.$emit('user:login', basicUserInfo);
      uni.$emit('login:success', basicUserInfo);
      console.log('已刷新用户信息:', basicUserInfo);
      uni.showToast({
        title: '用户信息已刷新',
        icon: 'success'
      });
    },
    // 检查手机号是否存在于数据库中
    checkPhoneExistence: function checkPhoneExistence(phoneNumber) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var result, db, uniIdResult, usersResult;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return uniCloud.callFunction({
                  name: 'login',
                  data: {
                    phoneNumber: phoneNumber,
                    loginType: 'checkMobileExists'
                  }
                });
              case 3:
                result = _context3.sent;
                console.log('检查手机号是否存在结果:', result);
                if (!(result && result.result && result.result.exists !== undefined)) {
                  _context3.next = 7;
                  break;
                }
                return _context3.abrupt("return", result.result.exists);
              case 7:
                // 如果还没有该云函数逻辑，尝试查询可能存在用户的表
                db = uniCloud.database(); // 查询uni-id-users表
                _context3.next = 10;
                return db.collection('uni-id-users').where({
                  mobile: phoneNumber
                }).limit(1).field({
                  _id: true
                }).get();
              case 10:
                uniIdResult = _context3.sent;
                if (!(uniIdResult && uniIdResult.data && uniIdResult.data.length > 0)) {
                  _context3.next = 14;
                  break;
                }
                console.log('在uni-id-users表中找到手机号');
                return _context3.abrupt("return", true);
              case 14:
                _context3.next = 16;
                return db.collection('users').where({
                  phoneNumber: phoneNumber
                }).limit(1).field({
                  _id: true
                }).get();
              case 16:
                usersResult = _context3.sent;
                if (!(usersResult && usersResult.data && usersResult.data.length > 0)) {
                  _context3.next = 20;
                  break;
                }
                console.log('在users表中找到手机号');
                return _context3.abrupt("return", true);
              case 20:
                console.log('未找到该手机号的用户');
                return _context3.abrupt("return", false);
              case 24:
                _context3.prev = 24;
                _context3.t0 = _context3["catch"](0);
                console.error('检查手机号存在性时出错:', _context3.t0);
                // 出错时默认假设存在，避免错误提示
                return _context3.abrupt("return", false);
              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 24]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"]))

/***/ }),

/***/ 146:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/login/login.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=style&index=0&lang=scss& */ 147);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 147:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/login/login.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[140,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map