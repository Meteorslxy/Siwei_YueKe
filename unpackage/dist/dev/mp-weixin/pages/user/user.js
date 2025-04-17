(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/user"],{

/***/ 109:
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/main.js?{"page":"pages%2Fuser%2Fuser"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _user = _interopRequireDefault(__webpack_require__(/*! ./pages/user/user.vue */ 110));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_user.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 110:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/user.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.vue?vue&type=template&id=80842834& */ 111);
/* harmony import */ var _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.vue?vue&type=script&lang=js& */ 113);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.vue?vue&type=style&index=0&lang=scss& */ 116);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["render"],
  _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/user/user.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 111:
/*!***********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/user.vue?vue&type=template&id=80842834& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=template&id=80842834& */ 112);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 112:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/user.vue?vue&type=template&id=80842834& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = _vm.hasUserInfo ? _vm.getUserDisplayName() : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 113:
/*!*****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/user.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=script&lang=js& */ 114);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 114:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/user.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 27));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _store = __webpack_require__(/*! @/uni_modules/uni-id-pages/common/store.js */ 115);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      userInfo: {},
      hasUserInfo: false,
      bookingCounts: {
        usable: 0,
        expired: 0,
        canceled: 0
      },
      isDev: false,
      // 是否为开发环境
      hasContent: false,
      // 是否存在内容
      verboseLogging: false,
      // 是否显示详细日志
      // 添加防止重复更新的标记
      isUpdatingUserInfo: false,
      lastUserUpdateTime: 0
    };
  },
  onLoad: function onLoad() {
    var _this = this;
    // 获取全局变量
    this.isDev = getApp().globalData.$isDevMode;

    // 清理不完整的登录状态
    this.checkAndCleanupIncompleteLogin();

    // 获取当前用户信息
    this.loadUserInfo();

    // 获取我的预约数
    this.getBookingCount();

    // 监听登录事件
    uni.$on('user:login', function (userData) {
      console.log('接收到user:login事件，刷新用户信息:', userData);
      _this.loadUserInfo();
    });

    // 添加对login:success事件的监听
    uni.$on('login:success', function (userData) {
      console.log('接收到login:success事件，刷新用户信息:', userData);
      _this.loadUserInfo();
    });

    // 添加对uni-id-pages-login-success事件的监听
    uni.$on('uni-id-pages-login-success', function () {
      console.log('接收到uni-id-pages-login-success事件，刷新用户信息');
      _this.loadUserInfo();
    });
  },
  onUnload: function onUnload() {
    // 取消监听登录事件
    uni.$off('user:login');
    uni.$off('login:success');
    uni.$off('uni-id-pages-login-success');
  },
  onShow: function onShow() {
    var _this2 = this;
    // 每次页面显示时重新获取用户信息，解决登录后跳转但不显示用户信息的问题
    this.loadUserInfo();

    // 确保获取uni-id-token，可能uni-id-pages组件登录后没有保存userInfo但保存了token
    var token = uni.getStorageSync('uni_id_token');
    var tokenExpired = uni.getStorageSync('uni_id_token_expired');

    // 减少不必要的日志输出
    if (this.isDev) {
      console.log('当前uni_id_token状态:', !!token, '过期时间:', tokenExpired);
    }
    if (token && tokenExpired && new Date(tokenExpired).getTime() > Date.now() && !this.hasUserInfo) {
      if (this.isDev) console.log('发现有效的uni_id_token，但可能没有用户信息，尝试获取');
      this.fetchUserInfoByToken();
    }

    // 每次打开页面都重新获取预约数量
    this.fetchBookingCounts();

    // 检查是否有内容显示
    setTimeout(function () {
      _this2.checkContent();
    }, 500);

    // 延迟检查用户手机绑定状态，确保在用户信息完全加载后
    setTimeout(function () {
      if (_this2.hasUserInfo && _this2.userInfo && _this2.userInfo._id) {
        console.log('页面显示时检查手机绑定状态');
        // 获取App实例，调用其checkMobileBindingStatus方法
        var app = getApp();
        if (app && app.checkMobileBindingStatus) {
          app.checkMobileBindingStatus(_this2.userInfo);
        } else {
          console.error('无法获取App实例或checkMobileBindingStatus方法不存在');
        }
      } else {
        console.log('用户未登录，无需检查手机绑定状态');
      }
    }, 1000);

    // 检查是否需要打开个人资料
    if (getApp().globalData.openUserProfile) {
      // 清除标记
      getApp().globalData.openUserProfile = false;

      // 延迟执行，确保页面已经加载完成
      setTimeout(function () {
        if (_this2.hasUserInfo) {
          _this2.testUniIdPages('profile');
        } else {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
        }
      }, 800);
    }

    // 检查是否需要打开注册页面
    if (getApp().globalData.openUserRegister) {
      // 清除标记
      getApp().globalData.openUserRegister = false;

      // 延迟执行，确保页面已经加载完成
      setTimeout(function () {
        _this2.testUniIdPages('register');
      }, 800);
    }
  },
  mounted: function mounted() {
    // 加载用户信息
    this.loadUserInfo();
    console.log('user.vue 页面已挂载，开始加载数据');
    console.log('是否有用户信息:', this.hasUserInfo);
    console.log('用户信息:', JSON.stringify(this.userInfo));

    // 立即同步用户信息到uni-id-pages组件
    this.syncUserInfoToUniIdPages();

    // 查询预约数量
    this.getBookingCount();

    // 获取用户可兑换优惠券列表
    this.getUserCoupons();
  },
  methods: {
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
    // 检查并清理不完整的登录状态
    checkAndCleanupIncompleteLogin: function checkAndCleanupIncompleteLogin() {
      console.log('检查登录状态完整性');
      var token = uni.getStorageSync('uni_id_token');
      var tokenExpired = uni.getStorageSync('uni_id_token_expired');
      var uniIdPagesUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
      var userInfo = uni.getStorageSync('userInfo');

      // 检查有无token但没有用户信息的情况
      if (token && tokenExpired && new Date(tokenExpired).getTime() > Date.now()) {
        // 有token但没有用户信息，需要获取用户信息
        if (!uniIdPagesUserInfo || Object.keys(uniIdPagesUserInfo).length === 0) {
          console.log('发现有token但没有用户信息，将尝试获取用户信息');
          this.fetchUserInfoByToken();
        }
      }

      // 检查有没有过期token的情况
      if (token && tokenExpired && new Date(tokenExpired).getTime() <= Date.now()) {
        console.log('发现已过期token，将清除登录状态');
        this.cleanupStorage();
      }

      // 检查uni-id-pages和应用自定义的用户信息同步情况
      if (uniIdPagesUserInfo && Object.keys(uniIdPagesUserInfo).length > 0) {
        if (!userInfo || Object.keys(userInfo).length === 0) {
          console.log('同步uni-id-pages用户信息到自定义存储');
          uni.setStorageSync('userInfo', uniIdPagesUserInfo);
        }
      }

      // 检查自定义和uni-id-pages的用户信息同步情况
      if (userInfo && Object.keys(userInfo).length > 0) {
        if (!uniIdPagesUserInfo || Object.keys(uniIdPagesUserInfo).length === 0) {
          console.log('同步自定义用户信息到uni-id-pages存储');
          uni.setStorageSync('uni-id-pages-userInfo', userInfo);
        }
      }
    },
    // 清理缓存的方法
    cleanupStorage: function cleanupStorage() {
      uni.removeStorageSync('uni_id_token');
      uni.removeStorageSync('uni_id_token_expired');
      uni.removeStorageSync('uni-id-pages-userInfo');
      uni.removeStorageSync('userInfo');
      this.userInfo = {};
      this.hasUserInfo = false;
    },
    // 加载用户信息
    loadUserInfo: function loadUserInfo() {
      if (this.isDev && this.verboseLogging) console.log('加载用户信息');

      // 防止短时间内重复调用
      var now = Date.now();
      if (this.isUpdatingUserInfo || now - this.lastUserUpdateTime < 500) {
        if (this.isDev && this.verboseLogging) console.log('正在更新用户信息中，跳过重复调用');
        return;
      }
      this.isUpdatingUserInfo = true;
      this.lastUserUpdateTime = now;
      try {
        // 先检查是否有token，如果有token但没有用户信息，优先尝试从token获取用户信息
        var token = uni.getStorageSync('uni_id_token');
        var tokenExpired = uni.getStorageSync('uni_id_token_expired');
        if (token && tokenExpired && new Date(tokenExpired).getTime() > Date.now() && !this.hasUserInfo) {
          if (this.isDev && this.verboseLogging) console.log('发现有效的token，尝试获取用户信息');
          this.fetchUserInfoByToken();
          this.isUpdatingUserInfo = false;
          return;
        }

        // 先尝试从uni-id-pages的存储位置读取
        var uniIdPagesUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
        if (uniIdPagesUserInfo && Object.keys(uniIdPagesUserInfo).length > 0) {
          if (this.isDev && this.verboseLogging) console.log('从uni-id-pages读取到的用户信息:', uniIdPagesUserInfo);

          // 处理uni-id-pages格式的用户信息
          var formattedInfo = this.formatUserInfo(uniIdPagesUserInfo);
          this.userInfo = formattedInfo;
          this.hasUserInfo = true;
          if (this.isDev && this.verboseLogging) {
            console.log('处理后的用户信息:', JSON.stringify(this.userInfo));
            console.log('是否有用户信息：', this.hasUserInfo);
          }
          this.isUpdatingUserInfo = false;
          return;
        }

        // 如果uni-id-pages中没有，再尝试从自定义位置读取
        var userInfoStorage = uni.getStorageSync('userInfo');
        if (userInfoStorage) {
          try {
            // 检查是否已经是对象，避免重复解析
            var userInfo = typeof userInfoStorage === 'string' ? JSON.parse(userInfoStorage) : userInfoStorage;
            if (this.isDev && this.verboseLogging) console.log('读取到的用户信息类型:', (0, _typeof2.default)(userInfo));

            // 检查是否为数组格式(登录函数可能返回数组格式)
            if (Array.isArray(userInfo) && userInfo.length > 0) {
              userInfo = userInfo[0];
            }

            // 处理一层嵌套数据的情况（有些时候data是嵌套的）
            if (userInfo.data && (0, _typeof2.default)(userInfo.data) === 'object') {
              userInfo = userInfo.data;
            }
            this.userInfo = this.formatUserInfo(userInfo);
            this.hasUserInfo = !!this.userInfo.nickName || !!this.userInfo.nickname;
            if (this.isDev && this.verboseLogging) {
              console.log('处理后的用户信息:', JSON.stringify(this.userInfo));
              console.log('是否有用户信息：', this.hasUserInfo);
            }
          } catch (e) {
            console.error('解析用户信息失败:', e);
            this.userInfo = {};
            this.hasUserInfo = false;
          }
        } else {
          if (this.isDev && this.verboseLogging) console.log('未找到用户信息');
          this.userInfo = {};
          this.hasUserInfo = false;
        }
      } finally {
        this.isUpdatingUserInfo = false;
      }
    },
    // 格式化用户信息
    formatUserInfo: function formatUserInfo(userInfo) {
      if (!userInfo) return {};

      // 创建新对象，避免直接修改原对象
      var formattedInfo = _objectSpread({}, userInfo);

      // 调试日志，仅在verboseLogging为true时输出
      if (this.verboseLogging) {
        console.log('原始用户信息:', JSON.stringify(userInfo));
      }

      // 直接从数据库查询完整用户信息
      this.fetchCompleteUserInfo(formattedInfo._id || formattedInfo.uid);

      // 检查是否有空字符串的_id和uid
      if (formattedInfo._id === "") {
        // 尝试从用户信息的其他字段中找到有效值
        formattedInfo._id = formattedInfo.uid || '';
      }
      if (formattedInfo.uid === "") {
        formattedInfo.uid = formattedInfo._id || '';
      }

      // 检查userInfo嵌套结构，uni-id-co有时会返回嵌套结构
      if (formattedInfo.userInfo && (0, _typeof2.default)(formattedInfo.userInfo) === 'object') {
        if (this.verboseLogging) console.log('发现嵌套的userInfo结构，提取内部数据');
        Object.keys(formattedInfo.userInfo).forEach(function (key) {
          if (!formattedInfo[key] && formattedInfo.userInfo[key]) {
            formattedInfo[key] = formattedInfo.userInfo[key];
          }
        });
      }

      // 直接使用nickname字段，uni-id中的昵称字段是nickname
      if (formattedInfo.nickname) {
        formattedInfo.nickName = formattedInfo.nickname;
        if (this.verboseLogging) console.log('使用nickname字段:', formattedInfo.nickname);
      }
      // 如果没有nickname，尝试使用username
      else if (formattedInfo.username) {
        formattedInfo.nickName = formattedInfo.username;
        if (this.verboseLogging) console.log('使用username字段:', formattedInfo.username);
      }
      // 如果都没有，生成默认用户名
      else {
        // 如果有手机号，使用手机号生成昵称
        if (formattedInfo.phoneNumber || formattedInfo.mobile) {
          var phone = formattedInfo.phoneNumber || formattedInfo.mobile;
          formattedInfo.nickName = '用户' + phone.substr(phone.length - 4);
          if (this.verboseLogging) console.log('使用手机号生成昵称');
        } else if (formattedInfo._id && formattedInfo._id.length > 4) {
          // 使用用户ID后四位
          formattedInfo.nickName = '用户' + formattedInfo._id.substr(-4);
          if (this.verboseLogging) console.log('使用ID生成昵称');
        } else if (formattedInfo.uid && formattedInfo.uid.length > 4) {
          // 使用uid后四位
          formattedInfo.nickName = '用户' + formattedInfo.uid.substr(-4);
          if (this.verboseLogging) console.log('使用UID生成昵称');
        } else {
          // 最后的备选
          formattedInfo.nickName = '未知用户';
          if (this.verboseLogging) console.log('使用默认昵称: 未知用户');
        }
      }

      // 处理头像路径，兼容avatar和avatarUrl两种字段名
      if (!formattedInfo.avatarUrl && formattedInfo.avatar) {
        formattedInfo.avatarUrl = formattedInfo.avatar;
      }

      // 处理avatar_file字段
      if (!formattedInfo.avatarUrl && formattedInfo.avatar_file) {
        if ((0, _typeof2.default)(formattedInfo.avatar_file) === 'object' && formattedInfo.avatar_file.url) {
          formattedInfo.avatarUrl = formattedInfo.avatar_file.url;
        } else if (typeof formattedInfo.avatar_file === 'string') {
          formattedInfo.avatarUrl = formattedInfo.avatar_file;
        }
      }

      // 确保有默认头像
      if (!formattedInfo.avatarUrl) {
        formattedInfo.avatarUrl = '/static/images/avatar.jpg';
      }

      // 确保userId字段，兼容多种可能的ID字段名
      if (!formattedInfo.userId) {
        formattedInfo.userId = formattedInfo._id || formattedInfo.uid || '';
      }
      console.log('格式化后的用户信息:', JSON.stringify(formattedInfo));
      return formattedInfo;
    },
    // 从数据库获取完整用户信息
    fetchCompleteUserInfo: function fetchCompleteUserInfo(userId) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var token, result, dbUserInfo;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (userId) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (_this3.isDev) console.log('正在从数据库获取完整用户信息, ID:', userId);
                _context.prev = 3;
                // 获取token
                token = uni.getStorageSync('uni_id_token');
                if (token) {
                  _context.next = 8;
                  break;
                }
                if (_this3.isDev) console.log('未找到有效token，无法获取用户信息');
                return _context.abrupt("return");
              case 8:
                _context.next = 10;
                return uniCloud.callFunction({
                  name: 'getUserInfoByToken',
                  data: {
                    uniIdToken: token,
                    forceRefresh: true,
                    // 强制从数据库刷新
                    userId: userId // 额外传递userId参数确保获取正确的用户
                  }
                });
              case 10:
                result = _context.sent;
                if (_this3.verboseLogging) console.log('从云函数获取用户信息结果:', result);
                if (result.result && result.result.code === 0 && result.result.userInfo) {
                  dbUserInfo = result.result.userInfo;
                  if (_this3.isDev) console.log('从数据库获取到完整用户信息:', dbUserInfo);

                  // 根据实际服务器数据检查昵称字段
                  if (dbUserInfo && (!dbUserInfo.nickname || dbUserInfo.nickname.startsWith('用户'))) {
                    // 如果数据库里的昵称也是自动生成的，查询其他可用的信息
                    if (_this3.isDev) console.log('数据库中的昵称也是自动生成的，查看用户其他信息');

                    // 可以在这里查询数据库中的其他用户信息字段
                    // ...
                  } else {
                    // 更新本地存储的用户信息
                    _this3.updateUserInfoWithDBData(dbUserInfo);
                  }
                }
                _context.next = 18;
                break;
              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](3);
                console.error('获取完整用户信息失败:', _context.t0);
              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 15]]);
      }))();
    },
    // 使用数据库信息更新用户信息
    updateUserInfoWithDBData: function updateUserInfoWithDBData(dbUserInfo) {
      if (!dbUserInfo || !dbUserInfo._id) return;
      console.log('使用数据库信息更新用户信息');

      // 从存储获取当前用户信息
      var currentUserInfo;
      try {
        var userInfoStr = uni.getStorageSync('userInfo');
        currentUserInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
      } catch (e) {
        console.error('解析用户信息失败:', e);
        currentUserInfo = {};
      }

      // 合并数据库信息和当前信息
      var mergedInfo = _objectSpread(_objectSpread({}, currentUserInfo), {}, {
        _id: dbUserInfo._id || currentUserInfo._id || '',
        uid: dbUserInfo._id || currentUserInfo.uid || '',
        nickname: dbUserInfo.nickname || currentUserInfo.nickname || '',
        username: dbUserInfo.username || currentUserInfo.username || '',
        mobile: dbUserInfo.mobile || currentUserInfo.mobile || '',
        email: dbUserInfo.email || currentUserInfo.email || '',
        avatar: dbUserInfo.avatar || currentUserInfo.avatar || '',
        avatar_file: dbUserInfo.avatar_file || currentUserInfo.avatar_file || ''
      });

      // 确保nickName字段同步
      mergedInfo.nickName = mergedInfo.nickname || mergedInfo.nickName;

      // 确保avatarUrl字段同步
      if (dbUserInfo.avatar) {
        mergedInfo.avatarUrl = dbUserInfo.avatar;
      } else if (dbUserInfo.avatar_file) {
        if ((0, _typeof2.default)(dbUserInfo.avatar_file) === 'object' && dbUserInfo.avatar_file.url) {
          mergedInfo.avatarUrl = dbUserInfo.avatar_file.url;
        } else if (typeof dbUserInfo.avatar_file === 'string') {
          mergedInfo.avatarUrl = dbUserInfo.avatar_file;
        }
      }

      // 确保userId字段
      mergedInfo.userId = mergedInfo._id || mergedInfo.uid || '';
      console.log('合并后的用户信息:', mergedInfo);

      // 保存到存储
      uni.setStorageSync('userInfo', mergedInfo);
      uni.setStorageSync('uni-id-pages-userInfo', mergedInfo);

      // 更新组件数据
      this.userInfo = mergedInfo;
      this.hasUserInfo = true;

      // 触发更新事件
      uni.$emit('user:updated', mergedInfo);

      // 同步更新到uni-id-pages组件的store
      try {
        // 使用导入的uni-id-pages store和mutations
        if (_store.mutations && _store.mutations.setUserInfo) {
          console.log('使用导入的uniIdPagesMutations同步用户信息');
          _store.mutations.setUserInfo(mergedInfo, {
            cover: true
          });

          // 检查同步是否成功
          if (_store.store && _store.store.userInfo && _store.store.userInfo._id === mergedInfo._id) {
            console.log('用户信息同步成功');
          } else {
            console.warn('同步可能不完整，store中的用户ID:', _store.store && _store.store.userInfo ? _store.store.userInfo._id : 'undefined');
          }
        } else {
          console.warn('找不到uniIdPagesMutations.setUserInfo方法, 尝试备用方案');

          // 备用方案：尝试直接使用全局变量
          if (getApp().globalData) {
            console.log('使用globalData存储用户信息');
            getApp().globalData.currentUserInfo = mergedInfo;
          }
        }
      } catch (error) {
        console.error('同步用户信息到uni-id-pages失败:', error);
      }
      console.log('用户信息已更新');

      // 获取预约数量
      this.fetchBookingCounts();
      if (this.isDev) console.log('完整用户信息保存成功');

      // 延迟检查用户手机绑定状态
      setTimeout(function () {
        // 获取App实例调用检查方法
        var app = getApp();
        if (app && app.checkMobileBindingStatus) {
          console.log('检查用户手机绑定状态');
          app.checkMobileBindingStatus(mergedInfo);
        }
      }, 1000);
    },
    // 获取预约数量
    getBookingCount: function getBookingCount() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userInfo, userId, res, counts;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this4.hasUserInfo) {
                  _context2.next = 3;
                  break;
                }
                console.log('未登录，无法获取预约数量');
                return _context2.abrupt("return");
              case 3:
                console.log('正在获取预约统计');
                _context2.prev = 4;
                userInfo = _this4.userInfo;
                userId = userInfo.userId || userInfo._id || '';
                if (userId) {
                  _context2.next = 10;
                  break;
                }
                console.log('无法获取用户ID，跳过获取预约统计');
                return _context2.abrupt("return");
              case 10:
                console.log('获取预约统计，用户ID:', userId);

                // 直接调用云函数获取预约统计
                _context2.next = 13;
                return uniCloud.callFunction({
                  name: 'getBookingCounts',
                  data: {
                    userId: userId
                  }
                });
              case 13:
                res = _context2.sent;
                console.log('获取预约统计结果:', res);
                if (res && res.result && res.result.code === 0 && res.result.data) {
                  counts = res.result.data.counts || {}; // 更新预约计数
                  _this4.bookingCounts = {
                    usable: (counts.pending || 0) + (counts.confirmed_unpaid || 0) + (counts.confirmed || 0),
                    expired: counts.finished || 0,
                    canceled: counts.cancelled || 0
                  };
                  console.log('预约计数已更新:', _this4.bookingCounts);

                  // 如果有未完成预约，添加红点提示
                  if (_this4.bookingCounts.usable > 0) {
                    uni.showTabBarRedDot({
                      index: 2
                    });
                  }

                  // 同时更新bookingStats（如果页面上有使用）
                  _this4.bookingStats = {
                    total: counts.all || 0,
                    pending: counts.pending || 0,
                    confirmed: counts.confirmed || 0,
                    finished: counts.finished || 0,
                    cancelled: counts.cancelled || 0
                  };
                } else {
                  console.warn('获取预约统计失败:', res);
                }
                _context2.next = 21;
                break;
              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](4);
                console.error('获取预约统计出错:', _context2.t0);
              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 18]]);
      }))();
    },
    // 获取预约数量
    fetchBookingCounts: function fetchBookingCounts() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve, reject) {
                    var res, counts;
                    return _regenerator.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;
                            if (!(!_this5.hasUserInfo || !_this5.userInfo || !_this5.userInfo.userId)) {
                              _context3.next = 4;
                              break;
                            }
                            console.log('用户未登录或没有userId，跳过获取预约数量');
                            return _context3.abrupt("return", resolve());
                          case 4:
                            console.log('正在获取预约数量，用户ID:', _this5.userInfo.userId);

                            // 使用API接口获取预约数量
                            _context3.next = 7;
                            return uniCloud.callFunction({
                              name: 'getBookingCounts',
                              data: {
                                userId: _this5.userInfo.userId || _this5.userInfo._id || ''
                              }
                            });
                          case 7:
                            res = _context3.sent;
                            console.log('获取预约数量响应:', res);
                            if (res && res.result && res.result.code === 0 && res.result.data) {
                              // 获取counts下的数据
                              counts = res.result.data.counts || {};
                              console.log('预约数量详情:', counts);

                              // 修复"可使用"预约数量计算，确保与预约列表页显示一致
                              _this5.bookingCounts = {
                                usable: (counts.pending || 0) + (counts.confirmed_unpaid || 0) + (counts.confirmed || 0),
                                expired: counts.finished || 0,
                                canceled: counts.cancelled || 0
                              };

                              // 添加额外调试信息
                              console.log('计算后的预约数量:', JSON.stringify(_this5.bookingCounts));
                              console.log('可使用数量:', _this5.bookingCounts.usable);

                              // 如果用户有未完成的预约，在tabBar上添加红点提示
                              if (_this5.bookingCounts.usable > 0) {
                                console.log('添加红点提示，未处理预约数:', _this5.bookingCounts.usable);
                                uni.showTabBarRedDot({
                                  index: 2 // 假设"我的"页面是第三个tabBar页面（索引从0开始）
                                });
                              } else {
                                uni.hideTabBarRedDot({
                                  index: 2
                                });
                              }
                              resolve(_this5.bookingCounts);
                            } else {
                              console.warn('获取预约数量失败或返回数据格式不符合预期:', res);
                              _this5.bookingCounts = {
                                usable: 0,
                                expired: 0,
                                canceled: 0
                              };
                              resolve(_this5.bookingCounts);
                            }
                            _context3.next = 17;
                            break;
                          case 12:
                            _context3.prev = 12;
                            _context3.t0 = _context3["catch"](0);
                            console.error('获取预约数量出错:', _context3.t0);
                            // 出错时仍然显示默认值
                            _this5.bookingCounts = {
                              usable: 0,
                              expired: 0,
                              canceled: 0
                            };
                            reject(_context3.t0);
                          case 17:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, null, [[0, 12]]);
                  }));
                  return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 页面跳转
    navigateTo: function navigateTo(url) {
      // 替换status=usable为status=confirmed,pending的组合查询
      if (url.includes('status=usable')) {
        url = url.replace('status=usable', 'status=usable');
        console.log('修改后的URL:', url);
      }

      // 替换status=expired为status=finished
      if (url.includes('status=expired')) {
        url = url.replace('status=expired', 'status=finished');
        console.log('修改后的URL:', url);
      }

      // 确保cancelled拼写与服务器一致
      if (url.includes('status=canceled')) {
        url = url.replace('status=canceled', 'status=cancelled');
        console.log('修改后的URL:', url);
      }
      uni.navigateTo({
        url: url,
        fail: function fail(err) {
          console.error('页面跳转错误:', err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    },
    // 打开反馈页面
    openFeedback: function openFeedback() {
      if (!this.hasUserInfo) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      // 调用小程序的意见反馈功能
      wx.openEmbeddedMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: '299971' // 小程序意见反馈的ID
        }
      });
    },
    // 使用token获取用户信息
    fetchUserInfoByToken: function fetchUserInfoByToken() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var token, userId, parts, result, completeUserInfo, db, userDetailRes, userDetail, uniIdCo, res, userInfo, _db, _token, uid, tokenParts, base64Payload, payload, _userDetailRes, _userDetail, key, _token2, _tokenParts, _base64Payload, _payload, _userId;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (_this6.isDev) console.log('尝试使用token获取用户信息');
                _context5.prev = 1;
                // 使用自定义云函数获取完整用户信息
                token = uni.getStorageSync('uni_id_token');
                if (token) {
                  _context5.next = 6;
                  break;
                }
                if (_this6.isDev) console.log('没有找到token，无法获取用户信息');
                return _context5.abrupt("return", false);
              case 6:
                // 尝试从简单格式token中解析用户ID，格式：userId_timestamp_randomPart
                userId = '';
                if (token.includes('_')) {
                  parts = token.split('_');
                  if (parts.length >= 2) {
                    userId = parts[0];
                    if (_this6.isDev) console.log('从token中解析出用户ID:', userId);
                  }
                }

                // 调用自定义云函数获取完整用户信息
                _context5.next = 10;
                return uniCloud.callFunction({
                  name: 'getUserInfoByToken',
                  data: {
                    uniIdToken: token,
                    userId: userId // 传递解析出的用户ID作为备用
                  }
                });
              case 10:
                result = _context5.sent;
                if (_this6.verboseLogging) console.log('获取完整用户信息结果:', result);
                if (!(result && result.result && result.result.code === 0 && result.result.userInfo)) {
                  _context5.next = 28;
                  break;
                }
                // 使用完整的用户信息
                completeUserInfo = result.result.userInfo; // 确保用户信息中包含nickname字段，用于显示用户名
                if (completeUserInfo._id && !completeUserInfo.nickname && completeUserInfo.username) {
                  completeUserInfo.nickname = completeUserInfo.username;
                }
                if (_this6.isDev) console.log('获取到完整用户信息:', completeUserInfo);

                // 保存到存储
                uni.setStorageSync('uni-id-pages-userInfo', completeUserInfo);
                uni.setStorageSync('userInfo', completeUserInfo);

                // 更新当前页面状态
                _this6.userInfo = _this6.formatUserInfo(completeUserInfo);
                _this6.hasUserInfo = true;

                // 触发事件
                uni.$emit('user:login', completeUserInfo);
                uni.$emit('login:success', completeUserInfo);

                // 获取预约数量
                _this6.fetchBookingCounts();
                if (_this6.isDev) console.log('完整用户信息保存成功');

                // 延迟检查用户手机绑定状态
                setTimeout(function () {
                  // 获取App实例调用检查方法
                  var app = getApp();
                  if (app && app.checkMobileBindingStatus) {
                    console.log('检查用户手机绑定状态');
                    app.checkMobileBindingStatus(completeUserInfo);
                  }
                }, 1000);
                return _context5.abrupt("return", true);
              case 28:
                if (!(result && result.result && result.result.code !== 0)) {
                  _context5.next = 53;
                  break;
                }
                if (_this6.isDev) console.warn('getUserInfoByToken返回错误:', result.result.message);

                // 如果有解析出的用户ID，尝试直接从数据库获取用户信息
                if (!userId) {
                  _context5.next = 53;
                  break;
                }
                if (_this6.isDev) console.log('尝试使用解析出的用户ID直接获取用户信息');
                _context5.prev = 32;
                db = uniCloud.database();
                _context5.next = 36;
                return db.collection('uni-id-users').doc(userId).get();
              case 36:
                userDetailRes = _context5.sent;
                if (!(userDetailRes.data && userDetailRes.data.length > 0)) {
                  _context5.next = 48;
                  break;
                }
                userDetail = userDetailRes.data[0];
                if (_this6.isDev) console.log('直接从数据库获取到用户信息:', userDetail);

                // 保存到存储
                uni.setStorageSync('uni-id-pages-userInfo', userDetail);
                uni.setStorageSync('userInfo', userDetail);

                // 更新当前页面状态
                _this6.userInfo = _this6.formatUserInfo(userDetail);
                _this6.hasUserInfo = true;

                // 触发事件
                uni.$emit('user:login', userDetail);

                // 获取预约数量
                _this6.fetchBookingCounts();
                if (_this6.isDev) console.log('直接从数据库获取用户信息成功');
                return _context5.abrupt("return", true);
              case 48:
                _context5.next = 53;
                break;
              case 50:
                _context5.prev = 50;
                _context5.t0 = _context5["catch"](32);
                console.error('直接从数据库获取用户信息失败:', _context5.t0);
              case 53:
                // 如果上面的方法失败，回退到原来的方法
                if (_this6.isDev) console.log('无法获取完整用户信息，尝试使用uni-id-co方法');

                // 使用uni-id-co获取当前用户信息
                uniIdCo = uniCloud.importObject('uni-id-co', {
                  customUI: true
                }); // 调用getAccountInfo方法
                _context5.next = 57;
                return uniIdCo.getAccountInfo();
              case 57:
                res = _context5.sent;
                console.log('获取到的用户信息:', res);
                if (!res) {
                  _context5.next = 116;
                  break;
                }
                // 构建用户信息对象，从API响应中正确提取用户信息
                userInfo = {
                  _id: '',
                  uid: '',
                  nickname: '',
                  username: '',
                  mobile: '',
                  email: '',
                  avatar_file: ''
                }; // 检查完整的响应结构，对不同格式进行处理
                if (!(res.errCode === 0)) {
                  _context5.next = 91;
                  break;
                }
                console.log('API调用成功，提取用户信息');

                // 获取完整的用户基本信息，而不仅仅是标志信息
                _context5.prev = 63;
                console.log('尝试获取完整的用户详细信息');
                // 创建云对象获取用户详细信息
                _db = uniCloud.database(); // 获取当前登录用户的uid
                _token = uni.getStorageSync('uni_id_token');
                if (!_token) {
                  _context5.next = 85;
                  break;
                }
                console.log('使用uni_id_token获取用户详情');
                // 验证token并获取uid
                _context5.prev = 69;
                // 从res中获取用户ID，如果响应中没有就尝试从token中获取
                uid = res.uid || '';
                if (!uid && res.userInfo && res.userInfo._id) {
                  uid = res.userInfo._id;
                }

                // 如果还是没有获取到uid，尝试从token中解析
                if (!uid) {
                  try {
                    // 尝试解析token，获取uid
                    tokenParts = _token.split('.');
                    if (tokenParts.length === 3) {
                      base64Payload = tokenParts[1];
                      payload = JSON.parse(atob(base64Payload));
                      console.log('token payload:', payload);
                      if (payload && payload.uid) {
                        uid = payload.uid;
                        console.log('从token payload中获取到用户ID:', uid);
                      }
                    }
                  } catch (e) {
                    console.error('解析token失败:', e);
                  }
                }

                // 如果成功获取到uid，直接查询用户数据
                if (!uid) {
                  _context5.next = 80;
                  break;
                }
                console.log('获取到有效用户ID:', uid);

                // 查询用户信息
                _context5.next = 77;
                return _db.collection('uni-id-users').doc(uid).get();
              case 77:
                _userDetailRes = _context5.sent;
                console.log('用户详情查询结果:', _userDetailRes);
                if (_userDetailRes.data && _userDetailRes.data.length > 0) {
                  _userDetail = _userDetailRes.data[0];
                  console.log('获取到完整用户详情:', _userDetail);

                  // 填充用户信息
                  userInfo._id = _userDetail._id || '';
                  userInfo.uid = _userDetail._id || ''; // _id和uid相同
                  userInfo.nickname = _userDetail.nickname || '';
                  userInfo.username = _userDetail.username || '';
                  userInfo.mobile = _userDetail.mobile || '';
                  userInfo.email = _userDetail.email || '';
                  userInfo.avatar_file = _userDetail.avatar || _userDetail.avatar_file || '';
                  console.log('从数据库获取的详细用户信息:', userInfo);
                }
              case 80:
                _context5.next = 85;
                break;
              case 82:
                _context5.prev = 82;
                _context5.t1 = _context5["catch"](69);
                console.error('处理token获取用户信息失败:', _context5.t1);
              case 85:
                _context5.next = 90;
                break;
              case 87:
                _context5.prev = 87;
                _context5.t2 = _context5["catch"](63);
                console.error('获取用户详情失败:', _context5.t2);
              case 90:
                // 如果上述方法没有获取到数据，再尝试从res中提取
                if (!userInfo._id && !userInfo.uid) {
                  console.log('从API响应中提取用户信息');
                  // 如果直接返回了完整的用户对象，提取其中的值
                  if (res.userInfo) {
                    console.log('使用userInfo字段中的数据:', res.userInfo);
                    userInfo._id = res.userInfo._id || res.uid || '';
                    userInfo.uid = res.userInfo._id || res.uid || '';
                    userInfo.nickname = res.userInfo.nickname || '';
                    userInfo.username = res.userInfo.username || '';
                    userInfo.mobile = res.userInfo.mobile || '';
                    userInfo.email = res.userInfo.email || '';
                    userInfo.avatar_file = res.userInfo.avatar_file || '';
                  }
                  // 处理没有userInfo字段但有uid和其他用户信息的情况
                  else {
                    console.log('直接使用根级字段数据');
                    userInfo._id = res.uid || '';
                    userInfo.uid = res.uid || '';

                    // 尝试所有可能的字段名称
                    userInfo.nickname = res.nickname || '';
                    userInfo.username = res.username || '';

                    // 如果设置了昵称但没有昵称值，使用用户名
                    if (res.isNicknameSet && !userInfo.nickname) {
                      userInfo.nickname = res.username || '';
                    }
                    userInfo.mobile = res.mobile || '';
                    userInfo.email = res.email || '';
                    userInfo.avatar_file = res.avatar || res.avatarUrl || res.avatar_file || '';
                  }
                }
              case 91:
                if (!(!userInfo.uid && !userInfo._id && (0, _typeof2.default)(res) === 'object')) {
                  _context5.next = 103;
                  break;
                }
                console.log('尝试从原始响应中直接提取用户ID');
                // 尝试遍历所有字段查找可能的用户ID
                _context5.t3 = _regenerator.default.keys(res);
              case 94:
                if ((_context5.t4 = _context5.t3()).done) {
                  _context5.next = 103;
                  break;
                }
                key = _context5.t4.value;
                if (!((key === 'uid' || key === '_id') && res[key])) {
                  _context5.next = 101;
                  break;
                }
                userInfo._id = res[key];
                userInfo.uid = res[key];
                console.log('找到用户ID:', res[key]);
                return _context5.abrupt("break", 103);
              case 101:
                _context5.next = 94;
                break;
              case 103:
                // 最后尝试从token中获取用户ID
                if (!userInfo.uid && !userInfo._id) {
                  try {
                    _token2 = uni.getStorageSync('uni_id_token');
                    if (_token2) {
                      console.log('从token中尝试获取用户ID');
                      // 尝试解析token
                      _tokenParts = _token2.split('.');
                      if (_tokenParts.length === 3) {
                        try {
                          // 解码payload部分
                          _base64Payload = _tokenParts[1];
                          _payload = JSON.parse(atob(_base64Payload));
                          console.log('token payload:', _payload);
                          if (_payload && _payload.uid) {
                            userInfo._id = _payload.uid;
                            userInfo.uid = _payload.uid;
                            console.log('从token payload中获取到用户ID:', _payload.uid);
                          }
                        } catch (decodeError) {
                          console.error('解析token失败:', decodeError);
                        }
                      }
                    }
                  } catch (tokenError) {
                    console.error('处理token时出错:', tokenError);
                  }
                }

                // 确保至少有些数据
                if ((userInfo.uid || userInfo._id) && !userInfo.nickname && !userInfo.username) {
                  _userId = userInfo.uid || userInfo._id;
                  userInfo.nickname = '用户' + _userId.substr(-4);
                  console.log('生成默认昵称:', userInfo.nickname);
                }
                console.log('处理后待存储的用户信息对象:', JSON.stringify(userInfo));

                // 保存到uni-id-pages的存储位置
                uni.setStorageSync('uni-id-pages-userInfo', userInfo);

                // 同时保存到自定义位置确保兼容性
                uni.setStorageSync('userInfo', userInfo);

                // 更新当前页面状态
                _this6.userInfo = _this6.formatUserInfo(userInfo);
                _this6.hasUserInfo = true;

                // 触发登录成功事件，确保其他页面也能知道登录状态
                uni.$emit('user:login', userInfo);
                uni.$emit('login:success', userInfo);

                // 获取预约数量
                _this6.fetchBookingCounts();
                console.log('token获取用户信息成功，已更新状态');

                // 延迟检查用户手机绑定状态
                setTimeout(function () {
                  // 获取App实例调用检查方法
                  var app = getApp();
                  if (app && app.checkMobileBindingStatus) {
                    console.log('检查用户手机绑定状态');
                    app.checkMobileBindingStatus(userInfo);
                  }
                }, 1000);
                return _context5.abrupt("return", true);
              case 116:
                return _context5.abrupt("return", false);
              case 119:
                _context5.prev = 119;
                _context5.t5 = _context5["catch"](1);
                console.error('获取用户信息失败:', _context5.t5);
                return _context5.abrupt("return", false);
              case 123:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 119], [32, 50], [63, 87], [69, 82]]);
      }))();
    },
    // 退出登录
    logout: function logout() {
      var _this7 = this;
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: function success(res) {
          if (res.confirm) {
            // 清除登录信息 - 同时清除两种方式的登录信息
            uni.removeStorageSync('userInfo');
            uni.removeStorageSync('uni-id-pages-userInfo');
            uni.removeStorageSync('uni_id_token');
            uni.removeStorageSync('uni_id_token_expired');

            // 重置状态
            _this7.userInfo = {};
            _this7.hasUserInfo = false;
            _this7.bookingCounts = {
              usable: 0,
              expired: 0,
              canceled: 0
            };
            uni.showToast({
              title: '已退出登录',
              icon: 'success'
            });
          }
        }
      });
    },
    // 获取用户信息
    getUserProfile: function getUserProfile() {
      // 重定向到登录页面
      uni.navigateTo({
        url: '/pages/login/login?redirect=' + encodeURIComponent('/pages/user/user')
      });
    },
    // 测试统一登录
    testUniIdPages: function testUniIdPages(type) {
      // 实现测试统一登录的逻辑
      console.log("\u6D4B\u8BD5uni-id-pages\u7684".concat(type, "\u529F\u80FD"));
      switch (type) {
        case 'login':
          // 先清除当前的用户信息，以便测试登录
          this.userInfo = {};
          this.hasUserInfo = false;

          // 同样确保清除token，避免干扰测试
          uni.removeStorageSync('uni_id_token');
          uni.removeStorageSync('uni_id_token_expired');
          uni.removeStorageSync('uni-id-pages-userInfo');
          uni.removeStorageSync('userInfo');

          // 跳转到不需要密码的登录页
          console.log('比较 /uni_modules/uni-id-pages/pages/login/login-withoutpwd /pages/user/user /uni_modules/uni-id-pages/pages/login/login-withpwd');

          // 设置当前页为重定向目标
          var redirectUrl = encodeURIComponent('/pages/user/user');
          uni.navigateTo({
            url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?uniIdRedirectUrl=".concat(redirectUrl)
          });
          break;
        case 'register':
          // 先清除当前的用户信息，以便测试注册
          this.userInfo = {};
          this.hasUserInfo = false;

          // 同样确保清除token，避免干扰测试
          uni.removeStorageSync('uni_id_token');
          uni.removeStorageSync('uni_id_token_expired');
          uni.removeStorageSync('uni-id-pages-userInfo');
          uni.removeStorageSync('userInfo');

          // 跳转到注册页
          uni.navigateTo({
            url: '/uni_modules/uni-id-pages/pages/register/register'
          });
          break;
        case 'profile':
          // 跳转到个人资料页而不清除用户信息
          this.toUserProfile();
          break;
        default:
          uni.showToast({
            title: '功能开发中',
            icon: 'none'
          });
      }
    },
    // 获取用户显示名称
    getUserDisplayName: function getUserDisplayName() {
      if (this.userInfo.nickName) {
        return this.userInfo.nickName;
      } else if (this.userInfo.nickname) {
        return this.userInfo.nickname;
      } else {
        return '未知用户';
      }
    },
    // 同步用户信息到uni-id-pages组件
    syncUserInfoToUniIdPages: function syncUserInfoToUniIdPages() {
      try {
        var userInfo = this.userInfo;
        if (!userInfo || !userInfo._id) {
          console.log('没有用户信息可同步');
          return;
        }

        // 将当前用户信息也保存到uni-id-pages使用的存储中
        console.log('同步用户信息到uni-id-pages组件');
        uni.setStorageSync('uni-id-pages-userInfo', userInfo);

        // 使用导入的uni-id-pages store和mutations
        if (_store.mutations && _store.mutations.setUserInfo) {
          console.log('使用导入的uniIdPagesMutations同步用户信息');
          _store.mutations.setUserInfo(userInfo, {
            cover: true
          });

          // 检查同步是否成功
          if (_store.store && _store.store.userInfo && _store.store.userInfo._id === userInfo._id) {
            console.log('用户信息同步成功');
          } else {
            console.warn('同步可能不完整，store中的用户ID:', _store.store && _store.store.userInfo ? _store.store.userInfo._id : 'undefined');
          }
        } else {
          console.warn('找不到uniIdPagesMutations.setUserInfo方法, 尝试备用方案');

          // 备用方案：尝试直接使用全局变量
          if (getApp().globalData) {
            console.log('使用globalData存储用户信息');
            getApp().globalData.currentUserInfo = userInfo;
          }
        }

        // 确保token信息也是同步的
        var token = uni.getStorageSync('uni_id_token');
        var tokenExpired = uni.getStorageSync('uni_id_token_expired');
        if (token && tokenExpired) {
          console.log('token信息已存在，不需要更新');
        } else if (userInfo._id) {
          // 如果没有token但有用户信息，可能需要生成临时token
          console.log('用户已登录但没有有效token，尝试重新登录获取token');

          // 使用已有的用户信息模拟登录成功
          if (_store.mutations.loginSuccess) {
            var loginSuccessInfo = {
              userInfo: userInfo
            };
            // 调用loginSuccess可能会触发token更新
            _store.mutations.loginSuccess(loginSuccessInfo);
            console.log('已触发loginSuccess方法');
          }
        }
      } catch (error) {
        console.error('同步用户信息到uni-id-pages失败:', error);
      }
    },
    // 跳转到个人资料页
    toUserProfile: function toUserProfile() {
      console.log('跳转到个人资料页面');

      // 在跳转前先确保本地有token
      var token = uni.getStorageSync('uni_id_token');
      if (!token) {
        // 尝试生成一个临时token
        try {
          var userId = this.userInfo._id || this.userInfo.userId;
          if (userId) {
            console.log('本地token不存在，生成临时token');
            var timestamp = Date.now();
            var randomPart = Math.random().toString(36).substring(2, 10);
            var newToken = "".concat(userId, "_").concat(timestamp, "_").concat(randomPart);
            var tokenExpired = timestamp + 7 * 24 * 60 * 60 * 1000; // 7天后过期

            uni.setStorageSync('uni_id_token', newToken);
            uni.setStorageSync('uni_id_token_expired', tokenExpired);
            console.log('已生成新token以确保个人资料页正常加载');
          }
        } catch (e) {
          console.error('生成临时token失败:', e);
        }
      }

      // 跳转到个人资料页面
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo',
        success: function success(res) {
          console.log('成功跳转到个人资料页');
        },
        fail: function fail(err) {
          console.error('跳转到个人资料页失败:', err);
          // 失败时尝试另一种跳转方式
          setTimeout(function () {
            uni.redirectTo({
              url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo',
              fail: function fail(redirectErr) {
                console.error('重定向到个人资料页也失败:', redirectErr);
                uni.showToast({
                  title: '页面跳转失败',
                  icon: 'none'
                });
              }
            });
          }, 500);
        }
      });
    },
    // 获取用户可兑换优惠券列表
    getUserCoupons: function getUserCoupons() {
      // 如果没有登录，直接返回
      if (!this.hasUserInfo) return;
      console.log('获取用户优惠券列表');
      // 实际获取优惠券的代码可以在此添加
    },
    // 处理图片加载错误
    handleImageError: function handleImageError(event) {
      console.error('图片加载错误:', event);
      // 可以添加一些错误处理逻辑，比如显示默认图片或提示用户
    },
    // 重新加载页面
    reload: function reload() {
      var _this8 = this;
      console.log('重新加载user页面');

      // 显示加载中提示
      uni.showLoading({
        title: '加载中...'
      });

      // 清除之前的缓存数据
      this.bookingCounts = {
        usable: 0,
        expired: 0,
        canceled: 0
      };

      // 重新获取用户信息
      this.loadUserInfo();

      // 重新获取预约数量
      this.fetchBookingCounts();

      // 强制刷新用户信息同步
      this.syncUserInfoToUniIdPages();

      // 2秒后隐藏加载提示
      setTimeout(function () {
        uni.hideLoading();

        // 通知用户
        uni.showToast({
          title: '已刷新',
          icon: 'success',
          duration: 1500
        });

        // 再次确保预约数量已更新
        if (_this8.hasUserInfo && _this8.userInfo.userId) {
          _this8.fetchBookingCounts();
        }

        // 检查内容是否成功加载
        _this8.hasContent = true;
      }, 1500);
    },
    // 手动刷新预约数量
    refreshBookingCount: function refreshBookingCount() {
      if (!this.hasUserInfo || !this.userInfo.userId) {
        console.log('用户未登录，无法刷新预约数量');
        return;
      }
      console.log('手动刷新预约数量');
      uni.showLoading({
        title: '刷新中...'
      });
      this.fetchBookingCounts().then(function () {
        uni.hideLoading();
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        });
      }).catch(function (err) {
        console.error('刷新预约数量失败:', err);
        uni.hideLoading();
        uni.showToast({
          title: '刷新失败',
          icon: 'none'
        });
      });
    },
    // 开启下拉刷新
    onPullDownRefresh: function onPullDownRefresh() {
      console.log('触发下拉刷新');
      // 调用重载方法
      this.reload();
      // 延迟结束下拉刷新
      setTimeout(function () {
        uni.stopPullDownRefresh();
      }, 1000);
    },
    // 检查页面是否有内容
    checkContent: function checkContent() {
      var _this9 = this;
      console.log('检查页面内容');

      // 使用简单方法检查是否应该显示内容
      setTimeout(function () {
        if (!_this9.hasUserInfo && _this9.userInfo._id) {
          // 如果有用户ID但hasUserInfo为false，可能是数据错误
          _this9.hasUserInfo = true;
        }

        // 始终显示页面内容，但如果没有用户信息，给用户提示
        _this9.hasContent = true;
        console.log('内容检查结果:', _this9.hasContent, '用户信息状态:', _this9.hasUserInfo);
      }, 300);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 116:
/*!**************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/user.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=style&index=0&lang=scss& */ 117);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 117:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/user.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[109,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map