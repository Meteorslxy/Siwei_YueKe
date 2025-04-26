(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/user"],{

/***/ 111:
/*!******************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/main.js?{"page":"pages%2Fuser%2Fuser"} ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _user = _interopRequireDefault(__webpack_require__(/*! ./pages/user/user.vue */ 112));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_user.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 112:
/*!***********************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/user.vue ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.vue?vue&type=template&id=80842834& */ 113);
/* harmony import */ var _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.vue?vue&type=script&lang=js& */ 115);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.vue?vue&type=style&index=0&lang=scss& */ 118);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
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

/***/ 113:
/*!******************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/user.vue?vue&type=template&id=80842834& ***!
  \******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=template&id=80842834& */ 114);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 114:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/user.vue?vue&type=template&id=80842834& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 115:
/*!************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/user.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=script&lang=js& */ 116);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 116:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/user.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var _store = __webpack_require__(/*! @/uni_modules/uni-id-pages/common/store.js */ 117);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StudentNameModal = function StudentNameModal() {
  __webpack_require__.e(/*! require.ensure | components/common/student-name-modal */ "components/common/student-name-modal").then((function () {
    return resolve(__webpack_require__(/*! @/components/common/student-name-modal.vue */ 404));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    StudentNameModal: StudentNameModal
  },
  data: function data() {
    return {
      userInfo: {},
      hasUserInfo: false,
      bookingCounts: {
        all: 0,
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
      lastUserUpdateTime: 0,
      // 添加防抖控制参数
      userInfoDebounceTime: 5000,
      // 5秒内不重复请求
      forceUpdateUserInfo: false // 是否强制刷新用户信息
    };
  },
  onLoad: function onLoad(options) {
    var _this = this;
    console.log('user.vue onLoad');
    console.log('user.vue 页面已加载', this.isLoggedIn);

    // 初始化学生姓名弹窗引用
    this.initStudentNameModal();

    // 监听登录成功事件
    uni.$on('login:success', function (userInfo) {
      console.log('接收到login:success事件，刷新用户信息:', userInfo);
      _this.refreshUserInfo(); // 使用强制刷新方法
    });

    // 监听用户登录事件
    uni.$on('user:login', function (userInfo) {
      console.log('接收到user:login事件，刷新用户信息:', userInfo);
      _this.refreshUserInfo(); // 使用强制刷新方法
    });

    // 监听显示学生姓名设置弹窗事件
    uni.$on('show:student-name-modal', function () {
      console.log('接收到show:student-name-modal事件，显示学生姓名设置弹窗');
      _this.showStudentNameModal();
    });

    // 监听登录过期事件
    uni.$on('login:expired', function (userInfo) {
      console.log('接收到login:expired事件，尝试重新获取token');
      _this.handleLoginExpired(userInfo);
    });

    // 监听预约状态变更事件
    uni.$on('booking:change', function () {
      console.log('接收到booking:change事件，刷新预约数量');
      _this.fetchBookingCounts();
    });

    // 监听预约取消事件
    uni.$on('booking:cancel', function () {
      console.log('接收到booking:cancel事件，刷新预约数量');
      _this.fetchBookingCounts();
    });
  },
  onUnload: function onUnload() {
    // 取消监听登录事件
    uni.$off('user:login');
    uni.$off('login:success');
    uni.$off('uni-id-pages-login-success');
    // 取消监听显示学生姓名设置弹窗事件
    uni.$off('show:student-name-modal');
    // 取消监听预约相关事件
    uni.$off('booking:change');
    uni.$off('booking:cancel');
  },
  onShow: function onShow() {
    var _this2 = this;
    console.log('user.vue onShow');

    // 检查距离上次加载时间，防止频繁加载
    var now = Date.now();
    var timeSinceLastUpdate = now - this.lastUserUpdateTime;

    // 如果距离上次刷新时间超过5秒或者没有用户信息，才重新加载
    if (timeSinceLastUpdate > this.userInfoDebounceTime || !this.hasUserInfo || !this.userInfo._id) {
      console.log('页面显示时加载用户信息');
      this.loadUserInfo();
    } else {
      console.log("\u8DDD\u79BB\u4E0A\u6B21\u52A0\u8F7D\u4EC5".concat(Math.floor(timeSinceLastUpdate / 1000), "\u79D2\uFF0C\u8DF3\u8FC7\u52A0\u8F7D"));
    }

    // 确保获取uni-id-token，可能uni-id-pages组件登录后没有保存userInfo但保存了token
    var token = uni.getStorageSync('uni_id_token');
    var tokenExpired = uni.getStorageSync('uni_id_token_expired');

    // 减少不必要的日志输出
    if (this.isDev) {
      console.log('当前uni_id_token状态:', !!token, '过期时间:', tokenExpired);
    }
    if (token && tokenExpired && new Date(tokenExpired).getTime() > Date.now() && !this.hasUserInfo) {
      if (this.isDev) console.log('发现有效的uni_id_token，但可能没有用户信息，尝试获取');
      // 如果距离上次获取时间超过1分钟，才再次请求
      if (now - this.lastUserUpdateTime > 60000) {
        this.fetchUserInfoByToken();
      }
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

    // 检查是否需要显示学生姓名设置弹窗
    this.checkAndShowStudentNameModal();
  },
  mounted: function mounted() {
    var _this3 = this;
    console.log('user.vue 页面已挂载，开始加载数据');
    console.log('是否有用户信息:', !!this.userInfo);
    console.log('用户信息:', JSON.stringify(this.userInfo || {}));

    // 如果没有用户信息，只在mounted时加载一次
    if (!this.hasUserInfo && Object.keys(this.userInfo).length === 0) {
      console.log('没有用户信息，首次加载');
      this.loadUserInfo();
    }

    // 同步用户信息到uniIdPages组件
    this.syncUserInfoToUniIdPages();

    // 获取预约数量 - 使用防抖逻辑避免多次请求
    if (!this.bookingCounts.usable && !this.bookingCounts.expired && !this.bookingCounts.canceled) {
      this.getBookingCount();
    }

    // 在页面挂载后的延迟检查，确保弹窗能正确显示
    setTimeout(function () {
      _this3.checkShouldShowNameModal();
    }, 1000);

    // 监听页面刷新请求
    uni.$on('page:refresh', this.refreshPage);
  },
  beforeDestroy: function beforeDestroy() {
    uni.$off('page:refresh', this.refreshPage);
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
    // 获取当前用户信息
    loadUserInfo: function loadUserInfo() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var now, timeSinceLastUpdate, userInfo, nickname, isDefaultNickname, thirtyMinutes, lastCloudUpdateKey, lastCloudUpdate;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // 防抖逻辑：如果短时间内多次调用，只执行一次
                now = Date.now();
                timeSinceLastUpdate = now - _this4.lastUserUpdateTime; // 如果正在更新用户信息，直接返回
                if (!_this4.isUpdatingUserInfo) {
                  _context2.next = 6;
                  break;
                }
                console.log('已有更新用户信息的任务在执行，跳过本次请求');
                return _context2.abrupt("return", false);
              case 6:
                if (!(timeSinceLastUpdate < _this4.userInfoDebounceTime && _this4.userInfo && _this4.userInfo._id && !_this4.forceUpdateUserInfo)) {
                  _context2.next = 9;
                  break;
                }
                console.log("\u8DDD\u79BB\u4E0A\u6B21\u52A0\u8F7D\u7528\u6237\u4FE1\u606F\u4EC5\u8FC7\u53BB\u4E86".concat(Math.floor(timeSinceLastUpdate / 1000), "\u79D2\uFF0C\u4F7F\u7528\u73B0\u6709\u6570\u636E"));
                return _context2.abrupt("return", true);
              case 9:
                _this4.isUpdatingUserInfo = true;
                _this4.lastUserUpdateTime = now;
                _this4.forceUpdateUserInfo = false; // 重置强制刷新标记

                console.log('加载用户信息...');

                // 首先尝试从本地存储获取
                userInfo = uni.getStorageSync('uni-id-pages-userInfo');
                if (userInfo) {
                  console.log('从本地存储中加载到用户信息:', userInfo.nickname || userInfo.nickName || '未设置昵称');

                  // 更新用户信息
                  _this4.userInfo = userInfo;
                  _this4.hasUserInfo = true;

                  // 检查是否需要显示姓名设置弹窗
                  _this4.checkShouldShowNameModal();

                  // 延迟检查页面内容完整性
                  setTimeout(function () {
                    // 检查内容完整性
                    if (typeof _this4.checkContentIntegrity === 'function') {
                      _this4.checkContentIntegrity();
                    } else {
                      // 如果方法不存在，则手动设置页面状态
                      console.log('checkContentIntegrity方法不存在，手动设置页面状态');
                      _this4.hasContent = true;
                      _this4.hasUserInfo = !!_this4.userInfo;
                    }
                  }, 500);

                  // 仅在以下情况从云端更新用户信息:
                  // 1. 本地无昵称或使用默认昵称
                  // 2. 已经超过30分钟没有更新
                  // 3. 强制更新标记
                  nickname = userInfo.nickname || userInfo.nickName || '';
                  isDefaultNickname = nickname === '微信用户' || nickname.startsWith('用户') || /^用户\d+$/.test(nickname);
                  thirtyMinutes = 30 * 60 * 1000;
                  lastCloudUpdateKey = 'lastCloudUserInfoUpdate';
                  lastCloudUpdate = uni.getStorageSync(lastCloudUpdateKey) || 0;
                  if (isDefaultNickname || now - lastCloudUpdate > thirtyMinutes) {
                    // 使用setTimeout延迟执行，不阻塞UI显示
                    setTimeout( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                      return _regenerator.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              if (!userInfo._id) {
                                _context.next = 6;
                                break;
                              }
                              console.log('从云端刷新用户信息 (延迟执行)');
                              _context.next = 5;
                              return _this4.fetchCompleteUserInfo(userInfo._id);
                            case 5:
                              // 更新最后一次从云端更新的时间
                              uni.setStorageSync(lastCloudUpdateKey, Date.now());
                            case 6:
                              _context.next = 11;
                              break;
                            case 8:
                              _context.prev = 8;
                              _context.t0 = _context["catch"](0);
                              console.error('延迟获取用户信息失败:', _context.t0);
                            case 11:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[0, 8]]);
                    })), 2000); // 延迟2秒执行，优先显示UI
                  } else {
                    console.log('使用本地缓存的用户信息，跳过云端读取');
                  }
                } else {
                  console.log('本地存储中没有有效的用户信息');

                  // 尝试从uni-id-pages的store中获取
                  try {
                    console.log('从uni-id-pages的store中获取用户信息');
                    // 这里添加获取用户信息的代码
                  } catch (storeError) {
                    console.error('从store获取用户信息失败:', storeError);
                  }
                }

                // 调用内容完整性检查
                _this4.checkContentIntegrity();
                return _context2.abrupt("return", true);
              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);
                console.error('加载用户信息出错:', _context2.t0);
                return _context2.abrupt("return", false);
              case 23:
                _context2.prev = 23;
                // 无论成功失败，都将更新状态设为false
                _this4.isUpdatingUserInfo = false;
                return _context2.finish(23);
              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 19, 23, 26]]);
      }))();
    },
    // 从数据库获取完整用户信息
    fetchCompleteUserInfo: function fetchCompleteUserInfo(userId) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var lastFetchKey, lastFetchTime, now, token, result, dbUserInfo;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (userId) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                // 防抖逻辑：检查最近是否已经请求过
                lastFetchKey = "lastFetchUserInfo_".concat(userId);
                lastFetchTime = uni.getStorageSync(lastFetchKey) || 0;
                now = Date.now(); // 如果距离上次加载时间小于10分钟，则跳过本次加载
                if (!(now - lastFetchTime < 10 * 60 * 1000)) {
                  _context3.next = 8;
                  break;
                }
                console.log("\u8DDD\u79BB\u4E0A\u6B21\u4ECE\u4E91\u7AEF\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u4E0D\u8DB310\u5206\u949F\uFF0C\u8DF3\u8FC7\u8BF7\u6C42");
                return _context3.abrupt("return");
              case 8:
                if (_this5.isDev) console.log('正在从数据库获取完整用户信息, ID:', userId);
                _context3.prev = 9;
                // 获取token
                token = uni.getStorageSync('uni_id_token');
                if (token) {
                  _context3.next = 14;
                  break;
                }
                if (_this5.isDev) console.log('未找到有效token，无法获取用户信息');
                return _context3.abrupt("return");
              case 14:
                // 记录请求时间
                uni.setStorageSync(lastFetchKey, now);

                // 直接调用云函数获取完整用户信息，不在客户端使用uniIdCo.checkToken
                _context3.next = 17;
                return uniCloud.callFunction({
                  name: 'getUserInfoByToken',
                  data: {
                    uniIdToken: token,
                    forceRefresh: true,
                    // 强制从数据库刷新
                    userId: userId // 额外传递userId参数确保获取正确的用户
                  }
                });
              case 17:
                result = _context3.sent;
                if (_this5.verboseLogging) console.log('从云函数获取用户信息结果:', result);
                if (result.result && result.result.code === 0 && result.result.userInfo) {
                  dbUserInfo = result.result.userInfo;
                  if (_this5.isDev) console.log('从数据库获取到完整用户信息:', dbUserInfo);

                  // 更新本地存储的用户信息
                  _this5.updateUserInfoWithDBData(dbUserInfo);
                }
                _context3.next = 25;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](9);
                console.error('获取完整用户信息失败:', _context3.t0);
              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[9, 22]]);
      }))();
    },
    // 使用数据库信息更新用户信息
    updateUserInfoWithDBData: function updateUserInfoWithDBData(dbUserInfo) {
      if (!dbUserInfo || !dbUserInfo._id) return;
      console.log('使用数据库信息更新用户信息', dbUserInfo);

      // 从存储获取当前用户信息
      var currentUserInfo;
      try {
        var userInfoStr = uni.getStorageSync('userInfo');
        currentUserInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
      } catch (e) {
        console.error('解析用户信息失败:', e);
        currentUserInfo = {};
      }

      // 记录是否有重大变化需要刷新UI
      var needRefreshUI = false;

      // 检查昵称是否有变化
      if (dbUserInfo.nickname && dbUserInfo.nickname !== currentUserInfo.nickname) {
        console.log('检测到昵称变化，旧值:', currentUserInfo.nickname, '新值:', dbUserInfo.nickname);
        needRefreshUI = true;
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

      // 如果检测到重大变化，强制刷新UI
      if (needRefreshUI) {
        this.$forceUpdate();
        console.log('用户信息有重大变化，已强制刷新UI');
      }

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
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var userInfo, userId, res, counts;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_this6.hasUserInfo) {
                  _context4.next = 3;
                  break;
                }
                console.log('未登录，无法获取预约数量');
                return _context4.abrupt("return");
              case 3:
                console.log('正在获取预约统计');
                _context4.prev = 4;
                userInfo = _this6.userInfo;
                userId = userInfo.userId || userInfo._id || '';
                if (userId) {
                  _context4.next = 10;
                  break;
                }
                console.log('无法获取用户ID，跳过获取预约统计');
                return _context4.abrupt("return");
              case 10:
                console.log('获取预约统计，用户ID:', userId);

                // 直接调用云函数获取预约统计
                _context4.next = 13;
                return uniCloud.callFunction({
                  name: 'getBookingCounts',
                  data: {
                    userId: userId
                  }
                });
              case 13:
                res = _context4.sent;
                console.log('获取预约统计结果:', res);
                if (res && res.result && res.result.code === 0 && res.result.data) {
                  counts = res.result.data.counts || {}; // 更新预约计数
                  _this6.bookingCounts = {
                    usable: (counts.pending || 0) + (counts.confirmed_unpaid || 0) + (counts.confirmed || 0),
                    expired: counts.finished || 0,
                    canceled: counts.cancelled || 0
                  };
                  console.log('预约计数已更新:', _this6.bookingCounts);

                  // 如果有未完成预约，添加红点提示
                  if (_this6.bookingCounts.usable > 0) {
                    uni.showTabBarRedDot({
                      index: 2
                    });
                  }

                  // 同时更新bookingStats（如果页面上有使用）
                  _this6.bookingStats = {
                    total: counts.all || 0,
                    pending: counts.pending || 0,
                    confirmed: counts.confirmed || 0,
                    finished: counts.finished || 0,
                    cancelled: counts.cancelled || 0
                  };
                } else {
                  console.warn('获取预约统计失败:', res);
                }
                _context4.next = 21;
                break;
              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](4);
                console.error('获取预约统计出错:', _context4.t0);
              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 18]]);
      }))();
    },
    // 获取预约数量
    fetchBookingCounts: function fetchBookingCounts() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve, reject) {
                    var res, counts, usableCount, canceledCount, expiredCount, localCanceledCount, cancelledIds, ids, finalCanceledCount, allCount, _localCanceledCount, _cancelledIds, _ids;
                    return _regenerator.default.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.prev = 0;
                            if (!(!_this7.hasUserInfo || !_this7.userInfo || !_this7.userInfo.userId)) {
                              _context5.next = 4;
                              break;
                            }
                            console.log('用户未登录或没有userId，跳过获取预约数量');
                            return _context5.abrupt("return", resolve());
                          case 4:
                            console.log('正在获取预约数量，用户ID:', _this7.userInfo.userId);

                            // 使用API接口获取预约数量
                            _context5.next = 7;
                            return uniCloud.callFunction({
                              name: 'getBookingCounts',
                              data: {
                                userId: _this7.userInfo.userId || _this7.userInfo._id || ''
                              }
                            });
                          case 7:
                            res = _context5.sent;
                            console.log('获取预约数量响应:', res);
                            if (res && res.result && res.result.code === 0 && res.result.data) {
                              // 获取counts下的数据
                              counts = res.result.data.counts || {};
                              console.log('预约数量详情:', counts);

                              // 修复"可使用"预约数量计算，确保与预约列表页显示一致
                              usableCount = (counts.pending || 0) + (counts.confirmed_unpaid || 0) + (counts.confirmed || 0);
                              canceledCount = counts.cancelled || 0;
                              expiredCount = counts.finished || 0; // 检查本地存储中是否有被取消的预约记录
                              localCanceledCount = 0;
                              try {
                                cancelledIds = uni.getStorageSync('cancelled_booking_ids');
                                if (cancelledIds) {
                                  ids = typeof cancelledIds === 'string' ? JSON.parse(cancelledIds) : cancelledIds;
                                  if (Array.isArray(ids)) {
                                    localCanceledCount = ids.length;
                                  }
                                }
                              } catch (e) {
                                console.error('获取本地取消记录失败:', e);
                              }

                              // 使用本地取消记录和服务器返回的取消记录中较大的值
                              finalCanceledCount = Math.max(canceledCount, localCanceledCount); // 计算总数
                              allCount = usableCount + expiredCount + finalCanceledCount;
                              _this7.bookingCounts = {
                                all: allCount,
                                usable: usableCount,
                                expired: expiredCount,
                                canceled: finalCanceledCount
                              };

                              // 添加额外调试信息
                              console.log('计算后的预约数量:', JSON.stringify(_this7.bookingCounts));
                              console.log('可使用数量:', _this7.bookingCounts.usable);
                              console.log('已取消数量:', _this7.bookingCounts.canceled);
                              console.log('全部数量:', _this7.bookingCounts.all);

                              // 如果用户有未完成的预约，在tabBar上添加红点提示
                              if (_this7.bookingCounts.usable > 0) {
                                console.log('添加红点提示，未处理预约数:', _this7.bookingCounts.usable);
                                uni.showTabBarRedDot({
                                  index: 2 // 假设"我的"页面是第三个tabBar页面（索引从0开始）
                                });
                              } else {
                                uni.hideTabBarRedDot({
                                  index: 2
                                });
                              }
                              resolve(_this7.bookingCounts);
                            } else {
                              console.warn('获取预约数量失败或返回数据格式不符合预期:', res);

                              // 尝试从本地存储获取取消记录数量
                              _localCanceledCount = 0;
                              try {
                                _cancelledIds = uni.getStorageSync('cancelled_booking_ids');
                                if (_cancelledIds) {
                                  _ids = typeof _cancelledIds === 'string' ? JSON.parse(_cancelledIds) : _cancelledIds;
                                  if (Array.isArray(_ids)) {
                                    _localCanceledCount = _ids.length;
                                  }
                                }
                              } catch (e) {
                                console.error('获取本地取消记录失败:', e);
                              }
                              _this7.bookingCounts = {
                                all: _localCanceledCount,
                                // 如果没有其他数据，全部就等于已取消数量
                                usable: 0,
                                expired: 0,
                                canceled: _localCanceledCount
                              };
                              resolve(_this7.bookingCounts);
                            }
                            _context5.next = 17;
                            break;
                          case 12:
                            _context5.prev = 12;
                            _context5.t0 = _context5["catch"](0);
                            console.error('获取预约数量出错:', _context5.t0);
                            // 出错时仍然显示默认值
                            _this7.bookingCounts = {
                              all: 0,
                              usable: 0,
                              expired: 0,
                              canceled: 0
                            };
                            reject(_context5.t0);
                          case 17:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5, null, [[0, 12]]);
                  }));
                  return function (_x, _x2) {
                    return _ref2.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
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
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var token, tokenExpired, now, result, _userInfo, userInfo;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                // 先检查token是否存在
                token = uni.getStorageSync('uni_id_token');
                if (token) {
                  _context7.next = 5;
                  break;
                }
                console.error('token不存在，无法获取用户信息');
                return _context7.abrupt("return", false);
              case 5:
                // 检查token是否过期
                tokenExpired = uni.getStorageSync('uni_id_token_expired');
                if (!tokenExpired) {
                  _context7.next = 13;
                  break;
                }
                now = Date.now();
                if (!(now >= tokenExpired)) {
                  _context7.next = 13;
                  break;
                }
                console.error('token已过期');
                // 清除过期的token
                uni.removeStorageSync('uni_id_token');
                uni.removeStorageSync('uni_id_token_expired');
                return _context7.abrupt("return", false);
              case 13:
                _context7.prev = 13;
                _context7.next = 16;
                return uniCloud.callFunction({
                  name: 'login',
                  data: {
                    loginType: 'token',
                    token: token
                  }
                });
              case 16:
                result = _context7.sent;
                if (!(result.result && result.result.code === 0 && result.result.data)) {
                  _context7.next = 28;
                  break;
                }
                _userInfo = result.result.data;
                console.log('通过云函数获取的用户信息:', _userInfo);

                // 保存用户信息
                uni.setStorageSync('uni-id-pages-userInfo', _userInfo);
                uni.setStorageSync('userInfo', _userInfo);

                // 更新当前页面状态
                _this8.userInfo = _this8.formatUserInfo(_userInfo);
                _this8.hasUserInfo = true;

                // 触发登录成功事件
                uni.$emit('user:login', _userInfo);
                uni.$emit('login:success', _userInfo);

                // 获取预约数量
                _this8.fetchBookingCounts();
                return _context7.abrupt("return", true);
              case 28:
                _context7.next = 33;
                break;
              case 30:
                _context7.prev = 30;
                _context7.t0 = _context7["catch"](13);
                console.error('通过云函数获取用户信息失败:', _context7.t0);
              case 33:
                // 如果云函数方法失败，尝试使用本地存储中的用户信息
                userInfo = uni.getStorageSync('userInfo') || uni.getStorageSync('uni-id-pages-userInfo');
                if (!(userInfo && (userInfo._id || userInfo.uid))) {
                  _context7.next = 40;
                  break;
                }
                console.log('使用本地存储的用户信息:', userInfo);

                // 更新当前页面状态
                _this8.userInfo = _this8.formatUserInfo(userInfo);
                _this8.hasUserInfo = true;

                // 获取预约数量
                _this8.fetchBookingCounts();
                return _context7.abrupt("return", true);
              case 40:
                return _context7.abrupt("return", false);
              case 43:
                _context7.prev = 43;
                _context7.t1 = _context7["catch"](0);
                console.error('获取用户信息失败:', _context7.t1);
                return _context7.abrupt("return", false);
              case 47:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 43], [13, 30]]);
      }))();
    },
    // 退出登录
    logout: function logout() {
      var _this9 = this;
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(res) {
            var token, uniIdCo, info, userRelatedKeys, _require, uniIdStore, uniIdMutations;
            return _regenerator.default.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    if (!res.confirm) {
                      _context8.next = 42;
                      break;
                    }
                    _context8.prev = 1;
                    console.log('开始执行退出登录流程');

                    // 获取token
                    token = uni.getStorageSync('uni_id_token');
                    if (!token) {
                      _context8.next = 14;
                      break;
                    }
                    _context8.prev = 5;
                    // 使用customUI参数创建uniIdCo对象，禁止自动显示错误提示
                    uniIdCo = uniCloud.importObject('uni-id-co', {
                      customUI: true
                    });
                    _context8.next = 9;
                    return uniIdCo.logout();
                  case 9:
                    _context8.next = 14;
                    break;
                  case 11:
                    _context8.prev = 11;
                    _context8.t0 = _context8["catch"](5);
                    // 捕获错误但不显示给用户
                    console.log('调用logout云函数失败，错误已被静默处理:', _context8.t0.message || _context8.t0);
                  case 14:
                    // 清除缓存 - 更彻底的清理方式
                    console.log('清除本地缓存数据');
                    uni.removeStorageSync('userInfo');
                    uni.removeStorageSync('uni-id-pages-userInfo');
                    uni.removeStorageSync('uni_id_token');
                    uni.removeStorageSync('uni_id_token_expired');

                    // 尝试清除其他可能的相关缓存
                    try {
                      info = uni.getStorageInfoSync();
                      if (info && info.keys) {
                        userRelatedKeys = info.keys.filter(function (key) {
                          return key.toLowerCase().includes('token') || key.toLowerCase().includes('user') || key.toLowerCase().includes('login') || key.toLowerCase().includes('auth');
                        });
                        userRelatedKeys.forEach(function (key) {
                          console.log('清除额外缓存:', key);
                          uni.removeStorageSync(key);
                        });
                      }
                    } catch (storageError) {
                      console.log('清除额外缓存时出错:', storageError);
                    }

                    // 重置状态
                    _this9.userInfo = {};
                    _this9.hasUserInfo = false;
                    _this9.bookingCounts = {
                      usable: 0,
                      expired: 0,
                      canceled: 0
                    };

                    // 直接引入和修改uni-id-pages的store，确保其也被重置
                    try {
                      // 引入uni-id-pages的store和mutations
                      _require = __webpack_require__(/*! @/uni_modules/uni-id-pages/common/store */ 117), uniIdStore = _require.store, uniIdMutations = _require.mutations; // 确保store的登录状态被重置
                      if (uniIdStore) {
                        uniIdStore.userInfo = {};
                        uniIdStore.hasLogin = false;
                      }

                      // 确保App的globalData中的用户信息也被清除
                      if (getApp().globalData) {
                        getApp().globalData.userInfo = null;
                        getApp().globalData.hasLogin = false;
                        getApp().globalData.token = null;
                        getApp().globalData.tokenExpired = null;
                      }
                    } catch (e) {
                      console.error('重置uni-id-pages store失败:', e);
                    }

                    // 触发登出事件
                    uni.$emit('uni-id-pages-logout');
                    uni.$emit('user:logout'); // 增加自定义事件便于其他组件监听

                    // 强制清理页面状态，防止页面恢复时自动重新登录
                    _this9.$forceUpdate();
                    uni.showToast({
                      title: '已退出登录',
                      icon: 'success'
                    });

                    // 延迟执行页面跳转，确保状态完全清除
                    setTimeout(function () {
                      // 直接跳转到首页，避免回到可能恢复登录状态的页面
                      uni.reLaunch({
                        url: '/pages/index/index',
                        success: function success() {
                          console.log('成功跳转至首页');
                          // 执行二次检查，确保登录状态被清除
                          setTimeout(function () {
                            var tokenCheck = uni.getStorageSync('uni_id_token');
                            if (tokenCheck) {
                              console.log('检测到token未完全清除，执行二次清理');
                              uni.removeStorageSync('uni_id_token');
                              uni.removeStorageSync('uni_id_token_expired');
                            }
                          }, 500);
                        }
                      });
                    }, 300);
                    _context8.next = 42;
                    break;
                  case 31:
                    _context8.prev = 31;
                    _context8.t1 = _context8["catch"](1);
                    console.error('退出登录过程中出错:', _context8.t1);
                    // 确保清除了登录状态
                    uni.removeStorageSync('userInfo');
                    uni.removeStorageSync('uni-id-pages-userInfo');
                    uni.removeStorageSync('uni_id_token');
                    uni.removeStorageSync('uni_id_token_expired');

                    // 重置状态
                    _this9.userInfo = {};
                    _this9.hasUserInfo = false;
                    uni.showToast({
                      title: '已退出登录',
                      icon: 'success'
                    });

                    // 强制跳转到首页
                    uni.reLaunch({
                      url: '/pages/index/index'
                    });
                  case 42:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, null, [[1, 31], [5, 11]]);
          }));
          function success(_x3) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
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
      // 始终优先使用nickname字段，这是uni-id中存储的真实昵称
      if (this.userInfo.nickname) {
        return this.userInfo.nickname;
      }
      // 其次使用nickName字段
      else if (this.userInfo.nickName && !this.userInfo.nickName.startsWith('用户')) {
        return this.userInfo.nickName;
      }
      // 再次尝试使用username
      else if (this.userInfo.username) {
        return this.userInfo.username;
      }
      // 最后才使用默认用户名
      else {
        return this.userInfo.userId ? '用户' + this.userInfo.userId.substr(-6) : '未知用户';
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
      var _this10 = this;
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

      // 设置强制刷新标记
      this.forceUpdateUserInfo = true;

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
        if (_this10.hasUserInfo && _this10.userInfo.userId) {
          _this10.fetchBookingCounts();
        }

        // 检查内容是否成功加载
        _this10.hasContent = true;
      }, 1500);
    },
    // 刷新预约数量
    refreshBookingCount: function refreshBookingCount() {
      console.log('手动刷新预约数量');
      // 显示加载中提示
      uni.showLoading({
        title: '刷新中...'
      });

      // 强制从服务器重新获取
      this.fetchBookingCounts().then(function () {
        uni.hideLoading();
        uni.showToast({
          title: '刷新成功',
          icon: 'success',
          duration: 1500
        });
      }).catch(function (err) {
        console.error('刷新预约数量失败:', err);
        uni.hideLoading();
        uni.showToast({
          title: '刷新失败',
          icon: 'none',
          duration: 1500
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
      var _this11 = this;
      console.log('检查页面内容');

      // 使用简单方法检查是否应该显示内容
      setTimeout(function () {
        if (!_this11.hasUserInfo && _this11.userInfo._id) {
          // 如果有用户ID但hasUserInfo为false，可能是数据错误
          _this11.hasUserInfo = true;
        }

        // 始终显示页面内容，但如果没有用户信息，给用户提示
        _this11.hasContent = true;
        console.log('内容检查结果:', _this11.hasContent, '用户信息状态:', _this11.hasUserInfo);
      }, 300);
    },
    // 检查是否需要显示学生姓名设置弹窗
    checkAndShowStudentNameModal: function checkAndShowStudentNameModal() {
      var _this12 = this;
      // 检查全局变量中是否有显示弹窗的标记
      var app = getApp();
      if (app && app.globalData) {
        if (app.globalData.needShowStudentNameModal) {
          console.log('检测到全局变量中有显示学生姓名弹窗的标记');
          // 清除标记
          app.globalData.needShowStudentNameModal = false;
          // 显示弹窗
          setTimeout(function () {
            _this12.showStudentNameModal();
          }, 500);
          return;
        }
      }

      // 检查本地存储是否设置过学生姓名
      var hasSetStudentName = uni.getStorageSync('hasSetStudentName');
      if (hasSetStudentName) {
        console.log('用户已设置过学生姓名，不显示弹窗');
        return;
      }

      // 检查用户是否已有昵称
      var userInfo = uni.getStorageSync('uni-id-pages-userInfo') || uni.getStorageSync('userInfo') || {};
      var nickname = userInfo.nickname || userInfo.nickName;
      if (nickname && nickname.trim() !== '') {
        console.log('用户已有昵称:', nickname, '不显示弹窗');
        // 自动设置标记
        uni.setStorageSync('hasSetStudentName', true);
        return;
      }
      console.log('检测到用户未设置学生姓名，将显示弹窗');
      // 延迟显示，确保页面已加载完成
      setTimeout(function () {
        _this12.showStudentNameModal();
      }, 500);

      // 检查是否需要打开个人资料
      if (getApp().globalData.openUserProfile) {
        // 清除标记
        getApp().globalData.openUserProfile = false;

        // 延迟执行，确保页面已经加载完成
        setTimeout(function () {
          if (_this12.hasUserInfo) {
            _this12.testUniIdPages('profile');
          } else {
            uni.showToast({
              title: '请先登录',
              icon: 'none'
            });
          }
        }, 800);
      }
    },
    // 显示学生姓名设置弹窗
    showStudentNameModal: function showStudentNameModal() {
      console.log('执行showStudentNameModal方法');
      // 查找弹窗组件并调用open方法
      var modalComponent = this.$refs.studentNameModal;
      if (modalComponent) {
        console.log('弹窗组件已找到');
        modalComponent.open();
      } else {
        console.error('弹窗组件未找到，请确保页面中包含student-name-modal组件');
        // 尝试使用全局事件再次触发
        setTimeout(function () {
          uni.$emit('show:student-name-modal');
        }, 500);
      }
    },
    // 处理登录过期事件
    handleLoginExpired: function handleLoginExpired(userInfo) {
      var _this13 = this;
      console.log('处理登录过期，尝试重新获取token，用户信息:', userInfo);
      if (!userInfo || !userInfo._id) {
        console.error('无法处理登录过期，用户信息无效');
        return;
      }

      // 显示加载中
      uni.showLoading({
        title: '刷新登录状态...',
        mask: true
      });

      // 调用云函数获取新token
      uniCloud.callFunction({
        name: 'refreshToken',
        data: {
          userId: userInfo._id
        }
      }).then(function (res) {
        console.log('刷新token结果:', res);
        if (res.result && res.result.code === 0 && res.result.token) {
          // 保存新token
          uni.setStorageSync('uni_id_token', res.result.token);
          if (res.result.tokenExpired) {
            uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired);
          }

          // 刷新用户信息
          if (res.result.userInfo) {
            uni.setStorageSync('uni-id-pages-userInfo', res.result.userInfo);
            uni.setStorageSync('userInfo', res.result.userInfo);

            // 更新当前组件的用户信息
            _this13.userInfo = res.result.userInfo;
            _this13.isLoggedIn = true;
          }

          // 提示用户
          uni.showToast({
            title: '登录状态已刷新',
            icon: 'success'
          });

          // 触发用户信息更新事件
          uni.$emit('user:updated', res.result.userInfo);
        } else {
          console.error('刷新token失败:', res.result);
          // 登录已彻底过期，需要跳转到登录页
          _this13.handleCompleteExpiration();
        }
      }).catch(function (err) {
        console.error('刷新token出错:', err);
        // 登录已彻底过期，需要跳转到登录页
        _this13.handleCompleteExpiration();
      }).finally(function () {
        uni.hideLoading();
      });
    },
    // 处理完全过期的情况
    handleCompleteExpiration: function handleCompleteExpiration() {
      console.log('登录完全过期，跳转到登录页');

      // 清理登录状态
      uni.removeStorageSync('uni_id_token');
      uni.removeStorageSync('uni_id_token_expired');
      this.isLoggedIn = false;
      this.userInfo = null;

      // 提示用户
      uni.showModal({
        title: '登录已过期',
        content: '您的登录状态已失效，请重新登录',
        showCancel: false,
        success: function success() {
          // 跳转到登录页
          uni.navigateTo({
            url: '/pages/login/login'
          });
        }
      });
    },
    // 添加初始化学生姓名弹窗的方法
    initStudentNameModal: function initStudentNameModal() {
      var _this14 = this;
      console.log('初始化学生姓名弹窗组件');
      // 在下一个渲染周期执行，确保组件已加载
      this.$nextTick(function () {
        // 查找学生姓名弹窗组件
        var modalComponent = _this14.$refs.studentNameModal;
        if (modalComponent) {
          console.log('找到学生姓名弹窗组件');
        } else {
          console.warn('未找到学生姓名弹窗组件，请确保页面中包含该组件');
        }
      });
    },
    // 添加checkShouldShowNameModal方法，判断是否需要显示学生姓名设置弹窗
    checkShouldShowNameModal: function checkShouldShowNameModal() {
      var _this15 = this;
      console.log('检查是否需要显示学生姓名设置弹窗');
      if (!this.userInfo) {
        console.log('用户未登录，不显示弹窗');
        return false;
      }
      var nickname = this.userInfo.nickname || this.userInfo.nickName || '';
      var isDefaultNickname = nickname === '微信用户' || nickname.startsWith('用户') || nickname.includes('默认');
      console.log("\u5F53\u524D\u6635\u79F0: ".concat(nickname, ", \u662F\u5426\u4E3A\u9ED8\u8BA4\u6635\u79F0: ").concat(isDefaultNickname));
      if (isDefaultNickname) {
        console.log('检测到默认昵称，需要显示姓名设置弹窗');
        // 清除已设置标记，确保弹窗能够显示
        uni.removeStorageSync('hasSetStudentName');
        // 显示弹窗
        setTimeout(function () {
          _this15.showStudentNameModal();
        }, 500);
        return true;
      }
      return false;
    },
    // 添加checkContentIntegrity方法
    checkContentIntegrity: function checkContentIntegrity() {
      console.log('检查内容完整性...');
      try {
        // 检查用户信息是否完整
        if (!this.userInfo || !this.userInfo._id) {
          console.warn('用户信息不完整，正在尝试重新加载...');
          // 如果没有用户信息，尝试刷新用户信息
          this.loadUserInfo();
          return false;
        }

        // 检查其他页面状态
        this.checkShouldShowNameModal();
        return true;
      } catch (error) {
        console.error('内容完整性检查失败:', error);
        return false;
      }
    },
    // 添加刷新页面方法
    refreshPage: function refreshPage() {
      console.log('正在刷新用户页面...');
      // 仅在距离上次刷新超过3秒时才执行
      var now = Date.now();
      if (now - this.lastUserUpdateTime < 3000) {
        console.log('刷新操作太频繁，已跳过');
        return;
      }
      this.loadUserInfo().then(function () {
        uni.showToast({
          title: '页面已刷新',
          icon: 'none',
          duration: 1500
        });
      }).catch(function (err) {
        console.error('刷新页面失败:', err);
      });
    },
    // 刷新用户信息(外部调用)
    refreshUserInfo: function refreshUserInfo() {
      console.log('手动刷新用户信息');
      // 设置强制刷新标记
      this.forceUpdateUserInfo = true;
      // 重新加载用户信息
      return this.loadUserInfo();
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

      // 优先使用nickname字段，uni-id中的昵称字段是nickname
      if (formattedInfo.nickname) {
        formattedInfo.nickName = formattedInfo.nickname;
        if (this.verboseLogging) console.log('使用nickname字段:', formattedInfo.nickname);
      }
      // 如果没有nickname，尝试使用username
      else if (formattedInfo.username) {
        formattedInfo.nickName = formattedInfo.username;
        if (this.verboseLogging) console.log('使用username字段:', formattedInfo.username);
      }
      // 仅当nickname和username都不存在时才使用自动生成的默认用户名
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
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 118:
/*!*********************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/user.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=style&index=0&lang=scss& */ 119);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 119:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/user.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[111,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map