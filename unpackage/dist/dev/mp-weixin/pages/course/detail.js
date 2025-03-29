(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/course/detail"],{

/***/ 122:
/*!*************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/main.js?{"page":"pages%2Fcourse%2Fdetail"} ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/course/detail.vue */ 123));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 123:
/*!******************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=5652f2c8& */ 124);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 126);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&lang=scss& */ 128);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/course/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 124:
/*!*************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=template&id=5652f2c8& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=5652f2c8& */ 125);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 125:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=template&id=5652f2c8& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    favoriteButton: function () {
      return __webpack_require__.e(/*! import() | components/favorite-button/favorite-button */ "components/favorite-button/favorite-button").then(__webpack_require__.bind(null, /*! @/components/favorite-button/favorite-button.vue */ 81))
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
  var m0 = _vm.formatCourseDateAndTime(
    _vm.courseInfo.startDate,
    _vm.courseInfo.endDate,
    _vm.courseInfo.startTime,
    _vm.courseInfo.endTime
  )
  var m1 = _vm.calculateRemainingSeats()
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 126:
/*!*******************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 127);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 127:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var FavoriteButton = function FavoriteButton() {
  __webpack_require__.e(/*! require.ensure | components/favorite-button/favorite-button */ "components/favorite-button/favorite-button").then((function () {
    return resolve(__webpack_require__(/*! @/components/favorite-button/favorite-button.vue */ 81));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    FavoriteButton: FavoriteButton
  },
  data: function data() {
    return {
      courseId: '',
      courseInfo: {},
      hasBooked: false,
      userInfo: null,
      statusBarHeight: 90 // 默认状态栏高度（rpx单位）
    };
  },
  mounted: function mounted() {
    console.log('课程详情页已挂载，当前状态:', {
      courseId: this.courseId,
      userInfo: this.userInfo ? '已登录' : '未登录',
      hasBooked: this.hasBooked
    });

    // 监听预约取消事件
    uni.$on('booking:cancel', this.handleBookingCancelled);
  },
  beforeDestroy: function beforeDestroy() {
    // 移除事件监听
    uni.$off('booking:cancel', this.handleBookingCancelled);
    uni.$off('login:success', this.handleLoginSuccess);
  },
  onLoad: function onLoad(options) {
    var _this = this;
    console.log('加载课程详情页面, 参数:', options);

    // 监听预约取消事件，更新本页面的预约状态
    uni.$on('booking:cancel', this.handleBookingCancelled);

    // 加载用户信息
    this.loadUserInfo();
    if (options.id) {
      this.courseId = options.id;

      // 检查是否有状态变更标记
      var hasBookingChanged = uni.getStorageSync('booking_changed') === 'true';
      if (hasBookingChanged) {
        console.log('检测到预约状态变更标记，将优先从云端获取最新状态');
        // 清除本地缓存中可能过时的预约状态
        try {
          if (this.userInfo && this.userInfo.userId) {
            var userKey = "booking_".concat(this.userInfo.userId, "_").concat(this.courseId);
            uni.removeStorageSync(userKey);
          }
          var courseKey = "booking_course_".concat(this.courseId);
          uni.removeStorageSync(courseKey);
          console.log('已清除可能过时的预约状态缓存');
        } catch (e) {
          console.error('清除缓存失败:', e);
        }
      }

      // 检查URL中是否已直接包含预约状态参数
      if (options.hasBooked === 'true') {
        console.log('从URL参数获取预约状态: 已预约');
        this.hasBooked = true;
      } else if (options.hasBooked === 'false') {
        console.log('从URL参数获取预约状态: 未预约');
        this.hasBooked = false;
      } else {
        // 尝试从本地缓存加载预约状态（立即执行以避免闪烁）
        if (this.loadBookingStatusFromCache()) {
          console.log('从缓存获取到预约状态，设置hasBooked =', this.hasBooked);
        }
      }

      // 获取课程详情
      this.getCourseDetail();

      // 立即检查云端预约状态（优先级高于本地缓存）
      this.checkBookingStatus().then(function (booked) {
        console.log('初始检查预约状态完成，结果:', booked);

        // 如果云端状态与本地状态不一致，以云端为准
        if (booked !== _this.hasBooked) {
          console.log('检测到状态不一致，更新本地状态:', {
            云端状态: booked,
            本地状态: _this.hasBooked
          });
          _this.hasBooked = booked;
          _this.saveBookingStatusToCache(booked);
          _this.$forceUpdate();
        }

        // 清除状态变更标记
        if (hasBookingChanged) {
          uni.setStorageSync('booking_changed', 'false');
          console.log('已清除预约状态变更标记');
        }
      }).catch(function (err) {
        console.error('初始检查预约状态失败:', err);
      });

      // 延迟再次检查，确保页面显示正确的状态
      setTimeout(function () {
        // 再次检查本地缓存
        _this.checkBookingStatus().then(function (booked) {
          console.log('延迟检查预约状态结果:', booked);
          if (booked !== _this.hasBooked) {
            console.log('延迟检查发现状态不一致，更新状态');
            _this.hasBooked = booked;
            _this.$forceUpdate();
          }
        }).catch(function (err) {
          console.warn('延迟检查预约状态失败，忽略错误:', err);
        });
      }, 1000);
    } else {
      uni.showToast({
        title: '未找到课程ID',
        icon: 'none'
      });
      setTimeout(function () {
        uni.navigateBack();
      }, 1500);
    }
  },
  onUnload: function onUnload() {
    // 页面卸载时移除事件监听，防止内存泄漏
    uni.$off('booking:cancel', this.handleBookingCancelled);
    uni.$off('login:success', this.handleLoginSuccess);
  },
  methods: {
    // 获取课程详情
    fetchCourseDetail: function fetchCourseDetail() {
      var _arguments = arguments,
        _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var retryCount, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                retryCount = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : 0;
                if (_this2.courseId) {
                  _context.next = 4;
                  break;
                }
                console.error('课程ID为空，无法获取详情');
                return _context.abrupt("return");
              case 4:
                _context.prev = 4;
                // 显示加载提示
                uni.showLoading({
                  title: '加载中...'
                });
                console.log('开始获取课程详情，ID:', _this2.courseId);

                // 直接使用MongoDB ObjectId格式调用API
                _context.next = 9;
                return _this2.$api.course.getCourseDetail(_this2.courseId);
              case 9:
                result = _context.sent;
                // 隐藏加载提示
                uni.hideLoading();
                console.log('课程详情API返回结果:', result);
                if (result && result.data) {
                  // 处理返回的数组数据 - 获取第一个元素作为课程信息
                  if (Array.isArray(result.data) && result.data.length > 0) {
                    _this2.courseInfo = result.data[0];
                    console.log('课程详情数据(数组第一项):', _this2.courseInfo);
                  } else {
                    _this2.courseInfo = result.data;
                    console.log('课程详情数据(对象):', _this2.courseInfo);
                  }

                  // 预处理数据，确保所有字段都有值
                  _this2.processCourseData();

                  // 主动获取教师详情，无论是否已有教师描述
                  if (_this2.courseInfo.teacherId) {
                    console.log('主动获取教师详情，teacherId:', _this2.courseInfo.teacherId);
                    _this2.fetchTeacherDescription(_this2.courseInfo.teacherId);
                  }
                } else if (result && result.code === -1 && retryCount < 3) {
                  // 如果是超时错误且重试次数小于3次，尝试重试
                  console.log("\u83B7\u53D6\u8BFE\u7A0B\u8BE6\u60C5\u5931\u8D25\uFF0C\u51C6\u5907\u7B2C".concat(retryCount + 1, "\u6B21\u91CD\u8BD5..."));
                  uni.hideLoading();

                  // 延迟1秒后重试
                  setTimeout(function () {
                    _this2.fetchCourseDetail(retryCount + 1);
                  }, 1000);
                } else {
                  // 获取失败时显示错误提示
                  console.error('获取课程详情失败: 未找到数据');
                  // 尝试使用静态数据
                  _this2.handleDetailFetchError();
                }
                _context.next = 20;
                break;
              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](4);
                // 隐藏加载提示
                uni.hideLoading();
                console.error('获取课程详情失败:', _context.t0);

                // 如果是网络错误或超时错误，且重试次数小于3次，尝试重试
                if (retryCount < 3) {
                  console.log("\u83B7\u53D6\u8BFE\u7A0B\u8BE6\u60C5\u51FA\u9519\uFF0C\u51C6\u5907\u7B2C".concat(retryCount + 1, "\u6B21\u91CD\u8BD5..."));

                  // 延迟1秒后重试
                  setTimeout(function () {
                    _this2.fetchCourseDetail(retryCount + 1);
                  }, 1000);
                } else {
                  // 尝试使用静态数据
                  _this2.handleDetailFetchError();
                }
              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 15]]);
      }))();
    },
    // 处理获取课程详情失败的情况
    handleDetailFetchError: function handleDetailFetchError() {
      // 显示错误提示
      uni.showToast({
        title: '获取课程详情失败',
        icon: 'none'
      });

      // 使用预设的默认数据
      console.log('使用默认课程数据作为备选');
      this.courseInfo = {
        title: '课程详情加载失败',
        price: 0,
        teacherName: '未知',
        location: '未知',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '抱歉，无法加载课程详情，请返回后重试或联系客服。',
        coverImage: '/static/images/course/default.jpg',
        courseCount: 20,
        bookingCount: 0
      };

      // 预处理数据
      this.processCourseData();
    },
    // 新函数，与onLoad中使用的方法名匹配
    getCourseDetail: function getCourseDetail() {
      // 调用原有的获取课程详情函数
      this.fetchCourseDetail();
    },
    // 预处理课程数据，确保所有需要的字段都存在
    processCourseData: function processCourseData() {
      if (!this.courseInfo) return;
      console.log('预处理课程数据:', this.courseInfo);

      // 特别检查教师描述相关的字段
      console.log('教师描述字段检查:', {
        teacherDesc: this.courseInfo.teacherDesc,
        teacherDescription: this.courseInfo.teacherDescription,
        teacherId: this.courseInfo.teacherId,
        teacherName: this.courseInfo.teacherName
      });

      // 确保基本字段有默认值
      this.courseInfo.title = this.courseInfo.title || '未命名课程';
      this.courseInfo.price = this.courseInfo.price || 0;
      this.courseInfo.teacherName = this.courseInfo.teacherName || '未指定';
      this.courseInfo.location = this.courseInfo.location || '未指定';

      // 处理课程容量和报名人数
      this.courseInfo.courseCount = this.courseInfo.courseCount || 20; // 优先使用courseCount
      this.courseInfo.capacity = this.courseInfo.capacity || this.courseInfo.courseCount || 20;
      this.courseInfo.bookingCount = this.courseInfo.bookingCount || 0;

      // 处理日期和时间
      if (!this.courseInfo.startDate && this.courseInfo.startTime && this.courseInfo.startTime.includes(' ')) {
        // 从旧格式提取日期和时间
        var parts = this.courseInfo.startTime.split(' ');
        this.courseInfo.startDate = parts[0];
        this.courseInfo.startTime = parts[1];
      }
      if (!this.courseInfo.endDate && this.courseInfo.endTime && this.courseInfo.endTime.includes(' ')) {
        // 从旧格式提取日期和时间
        var _parts = this.courseInfo.endTime.split(' ');
        this.courseInfo.endDate = _parts[0];
        this.courseInfo.endTime = _parts[1];
      }
      this.courseInfo.description = this.courseInfo.description || '暂无课程详情';

      // 处理教师描述信息，确保teacherDescription字段有值
      if (!this.courseInfo.teacherDescription && this.courseInfo.teacherDesc) {
        this.courseInfo.teacherDescription = this.courseInfo.teacherDesc;
        console.log('复制教师描述信息到teacherDescription字段');
      }

      // 获取教师描述信息 - 先尝试通过名称查询，这样更可靠
      if (this.courseInfo.teacherName) {
        console.log('优先通过教师名称查询教师信息:', this.courseInfo.teacherName);
        this.fetchTeacherByName(this.courseInfo.teacherName);
      }
      // 如果有teacherId但没有通过名称查询，也尝试通过ID查询
      else if (this.courseInfo.teacherId) {
        console.log('通过teacherId获取教师详情:', this.courseInfo.teacherId);
        this.fetchTeacherDescription(this.courseInfo.teacherId);
      }

      // 处理封面图片路径
      if (this.courseInfo.coverImage && !this.courseInfo.coverImage.startsWith('/')) {
        this.courseInfo.coverImage = "/static/images/course/".concat(this.courseInfo.coverImage);
      } else if (!this.courseInfo.coverImage && this.courseInfo.image) {
        // 使用image字段作为备选
        this.courseInfo.coverImage = this.courseInfo.image.startsWith('/') ? this.courseInfo.image : "/static/images/course/".concat(this.courseInfo.image);
      } else if (!this.courseInfo.coverImage) {
        // 没有封面图时使用默认图片
        this.courseInfo.coverImage = '/static/images/course/course1.jpg';
      }

      // 预加载教师头像
      if (this.courseInfo.teacherAvatar) {
        this.preloadTeacherAvatar();
      }
      console.log('预处理后的课程数据:', this.courseInfo);
    },
    // 直接获取教师描述信息
    fetchTeacherDescription: function fetchTeacherDescription(teacherId) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var result, teacherData;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (teacherId) {
                  _context2.next = 6;
                  break;
                }
                if (!_this3.courseInfo.teacherName) {
                  _context2.next = 5;
                  break;
                }
                console.log('尝试通过教师名称查询教师信息:', _this3.courseInfo.teacherName);
                _this3.fetchTeacherByName(_this3.courseInfo.teacherName);
                return _context2.abrupt("return");
              case 5:
                return _context2.abrupt("return");
              case 6:
                _context2.prev = 6;
                console.log('开始获取教师详情:', teacherId);
                _context2.next = 10;
                return _this3.$api.teacher.getTeacherDetail(teacherId);
              case 10:
                result = _context2.sent;
                console.log('教师详情API返回结果:', result);
                if (result && result.data) {
                  teacherData = result.data;
                  console.log('获取到教师数据:', teacherData);

                  // 更新教师信息
                  if (teacherData.description) {
                    _this3.courseInfo.teacherDescription = teacherData.description;
                    console.log('已更新教师描述信息:', teacherData.description);
                  } else if (teacherData.introduction) {
                    _this3.courseInfo.teacherDescription = teacherData.introduction;
                    console.log('使用教师introduction作为描述:', teacherData.introduction);
                  }

                  // 添加其他可能的描述字段
                  if (!_this3.courseInfo.teacherDescription) {
                    if (teacherData.desc) {
                      _this3.courseInfo.teacherDescription = teacherData.desc;
                      console.log('使用教师desc字段作为描述');
                    } else if (teacherData.bio) {
                      _this3.courseInfo.teacherDescription = teacherData.bio;
                      console.log('使用教师bio字段作为描述');
                    } else if (teacherData.profile) {
                      _this3.courseInfo.teacherDescription = teacherData.profile;
                      console.log('使用教师profile字段作为描述');
                    } else {
                      console.log('教师数据中没有找到任何可用的描述字段');
                      // 如果实在没有描述，设置一个默认值
                      _this3.courseInfo.teacherDescription = teacherData.name ? "".concat(teacherData.name).concat(teacherData.title ? '，' + teacherData.title : '', "\uFF0C\u6682\u65E0\u8BE6\u7EC6\u4ECB\u7ECD\u3002") : '暂无详细介绍';
                    }
                  }

                  // 强制更新UI
                  _this3.$forceUpdate();
                } else {
                  console.log('未获取到教师数据，尝试通过名称查询');
                  // 如果通过ID查询失败，尝试通过名称查询
                  if (_this3.courseInfo.teacherName) {
                    _this3.fetchTeacherByName(_this3.courseInfo.teacherName);
                  } else {
                    _this3.courseInfo.teacherDescription = '暂无详细介绍';
                    _this3.$forceUpdate();
                  }
                }
                _context2.next = 19;
                break;
              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](6);
                console.error('获取教师详情失败:', _context2.t0);

                // 尝试通过名称查询
                if (_this3.courseInfo.teacherName) {
                  console.log('ID查询失败，尝试通过名称查询:', _this3.courseInfo.teacherName);
                  _this3.fetchTeacherByName(_this3.courseInfo.teacherName);
                } else {
                  // 设置默认描述
                  _this3.courseInfo.teacherDescription = '暂无详细介绍';
                  _this3.$forceUpdate();
                }
              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 15]]);
      }))();
    },
    // 通过教师名称查询
    fetchTeacherByName: function fetchTeacherByName(teacherName) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var nameForSearch, result, foundTeacher;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (teacherName) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.prev = 2;
                console.log('开始通过名称查询教师:', teacherName);

                // 从教师名称中去除可能的"老师"后缀
                nameForSearch = teacherName.replace(/老师$/, '');
                console.log('处理后的教师名称:', nameForSearch);

                // 直接调用获取教师列表的API接口
                _context3.next = 8;
                return _this4.$api.teacher.getTeacherList({
                  name: nameForSearch
                });
              case 8:
                result = _context3.sent;
                console.log('教师查询API结果:', result);
                if (result && result.data && result.data.length > 0) {
                  // 确保查询匹配的是准确的教师名称
                  foundTeacher = result.data.find(function (item) {
                    return item.name === nameForSearch;
                  });
                  if (foundTeacher) {
                    console.log('通过教师列表API找到匹配的教师数据:', foundTeacher);

                    // 更新教师信息
                    if (foundTeacher.description) {
                      _this4.courseInfo.teacherDescription = foundTeacher.description;
                      console.log('已更新教师描述信息:', foundTeacher.description);
                    } else if (foundTeacher.introduction) {
                      _this4.courseInfo.teacherDescription = foundTeacher.introduction;
                      console.log('使用教师introduction作为描述:', foundTeacher.introduction);
                    } else {
                      // 如果都没有，尝试直接给定简介
                      _this4.courseInfo.teacherDescription = '该教师暂无详细介绍';
                    }
                  } else {
                    console.log('API返回的教师数据中没有找到精确匹配:', nameForSearch);
                    _this4.courseInfo.teacherDescription = "".concat(teacherName, "\uFF0C\u6682\u65E0\u8BE6\u7EC6\u4ECB\u7ECD\u3002");
                  }
                } else {
                  // API没有找到任何教师信息
                  console.log('未能从API查询到教师信息，显示默认信息');
                  _this4.courseInfo.teacherDescription = "\u6682\u65E0\u8BE6\u7EC6\u4ECB\u7ECD";
                }

                // 强制更新UI
                _this4.$forceUpdate();
                _context3.next = 19;
                break;
              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](2);
                console.error('通过名称查询教师失败:', _context3.t0);

                // 错误情况下，显示默认信息
                _this4.courseInfo.teacherDescription = "\u6682\u65E0\u8BE6\u7EC6\u4ECB\u7ECD";
                _this4.$forceUpdate();
              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 14]]);
      }))();
    },
    // 预加载教师头像
    preloadTeacherAvatar: function preloadTeacherAvatar() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var avatarResult;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_this5.courseInfo.teacherAvatar) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                _context4.prev = 2;
                if (!(_this5.courseInfo.teacherAvatar.startsWith('/static') || _this5.courseInfo.teacherAvatar.startsWith('/'))) {
                  _context4.next = 8;
                  break;
                }
                console.log('使用本地头像图片:', _this5.courseInfo.teacherAvatar);
                // 如果是本地路径，直接使用
                _this5.courseInfo.teacherAvatarUrl = _this5.courseInfo.teacherAvatar;
                _context4.next = 13;
                break;
              case 8:
                // 否则从云端获取
                console.log('从云端获取头像图片:', _this5.courseInfo.teacherAvatar);
                _context4.next = 11;
                return _this5.$api.file.getImage(_this5.courseInfo.teacherAvatar);
              case 11:
                avatarResult = _context4.sent;
                if (avatarResult && avatarResult.data && avatarResult.data.url) {
                  _this5.courseInfo.teacherAvatarUrl = avatarResult.data.url;
                }
              case 13:
                _context4.next = 19;
                break;
              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](2);
                console.error('加载教师头像失败:', _context4.t0);
                // 加载失败时使用默认头像
                _this5.courseInfo.teacherAvatarUrl = '/static/images/teacher/default-avatar.png';
              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 15]]);
      }))();
    },
    // 格式化课程时间
    formatCourseTime: function formatCourseTime(startTime, endTime) {
      if (!startTime) return '';
      var formatDateTime = function formatDateTime(dateStr) {
        var date = new Date(dateStr);
        return "".concat(date.getFullYear(), "\u5E74").concat(date.getMonth() + 1, "\u6708").concat(date.getDate(), "\u65E5 ").concat(date.getHours(), ":").concat(date.getMinutes().toString().padStart(2, '0'));
      };
      if (endTime) {
        return "".concat(formatDateTime(startTime), " - ").concat(formatDateTime(endTime));
      }
      return formatDateTime(startTime);
    },
    // 加载用户信息
    loadUserInfo: function loadUserInfo() {
      console.log('加载用户信息');

      // 调试全局用户信息
      var globalUserInfo = getApp().globalData.userInfo;
      console.log('全局用户信息:', globalUserInfo);
      var userInfoStr = uni.getStorageSync('userInfo');
      console.log('本地存储用户信息字符串:', userInfoStr ? '存在(长度:' + userInfoStr.length + ')' : '不存在');
      if (userInfoStr) {
        try {
          this.userInfo = JSON.parse(userInfoStr);
          console.log('当前用户信息解析成功:', this.userInfo);

          // 确保userInfo包含userId
          if (!this.userInfo.userId && this.userInfo._id) {
            console.log('用户信息中没有userId，使用_id代替:', this.userInfo._id);
            this.userInfo.userId = this.userInfo._id;
          }
          console.log('用户ID:', this.userInfo.userId);
        } catch (e) {
          console.error('解析用户信息失败:', e);
          this.userInfo = null;

          // 尝试从全局状态恢复
          if (globalUserInfo) {
            console.log('从全局状态恢复用户信息');
            this.userInfo = globalUserInfo;
          }
        }
      } else {
        console.log('本地存储中没有用户信息');
        this.userInfo = globalUserInfo || null;
      }

      // 最终检查
      if (this.userInfo) {
        console.log('最终用户信息:', this.userInfo);
      } else {
        console.log('用户未登录');
      }

      // 添加登录成功事件监听
      uni.$on('login:success', this.handleLoginSuccess);
    },
    // 处理登录成功事件
    handleLoginSuccess: function handleLoginSuccess(userData) {
      var _this6 = this;
      console.log('收到登录成功事件，更新用户数据:', userData);
      this.userInfo = userData;

      // 登录成功后重新检查预约状态
      setTimeout(function () {
        _this6.checkBookingStatus();
      }, 500);
    },
    // 从本地缓存加载预约状态
    loadBookingStatusFromCache: function loadBookingStatusFromCache() {
      try {
        if (this.courseId) {
          // 检查是否有状态变更标记
          var hasBookingChanged = uni.getStorageSync('booking_changed') === 'true';
          if (hasBookingChanged) {
            console.log('检测到预约状态变更标记，避免使用可能过时的缓存状态');
            return false;
          }

          // 先尝试使用用户特定的缓存
          if (this.userInfo && this.userInfo.userId) {
            var userKey = "booking_".concat(this.userInfo.userId, "_").concat(this.courseId);
            var userCachedStatus = uni.getStorageSync(userKey);
            if (userCachedStatus) {
              console.log('从用户特定缓存加载预约状态:', userCachedStatus);
              this.hasBooked = userCachedStatus === 'true';
              console.log('用户特定缓存预约状态:', this.hasBooked);
              return true;
            }
          }

          // 尝试使用课程通用缓存
          var courseKey = "booking_course_".concat(this.courseId);
          var courseCachedStatus = uni.getStorageSync(courseKey);
          if (courseCachedStatus) {
            console.log('从课程通用缓存加载预约状态:', courseCachedStatus);
            this.hasBooked = courseCachedStatus === 'true';
            console.log('课程通用缓存预约状态:', this.hasBooked);
            return true;
          }
        }
      } catch (e) {
        console.error('加载本地预约状态失败:', e);
      }
      return false;
    },
    // 保存预约状态到本地缓存
    saveBookingStatusToCache: function saveBookingStatusToCache(status) {
      var _this7 = this;
      try {
        if (this.courseId) {
          var debugMode = false; // 控制是否输出详细日志

          if (debugMode) console.log('保存预约状态到缓存:', status);

          // 清除所有相关的缓存键，确保状态一致性
          var clearRelatedCaches = function clearRelatedCaches() {
            // 清除可能存在的过期状态
            if (_this7.userInfo && _this7.userInfo.userId) {
              var userKey = "booking_".concat(_this7.userInfo.userId, "_").concat(_this7.courseId);
              uni.removeStorageSync(userKey);
              if (debugMode) console.log('已清除用户特定缓存');
            }

            // 清除课程通用缓存
            var courseKey = "booking_course_".concat(_this7.courseId);
            uni.removeStorageSync(courseKey);
            if (debugMode) console.log('已清除课程通用缓存');
          };

          // 在设置新值前先清除相关缓存
          if (!status) {
            clearRelatedCaches();
          }

          // 同时保存用户特定缓存和课程通用缓存
          if (this.userInfo && this.userInfo.userId) {
            var userKey = "booking_".concat(this.userInfo.userId, "_").concat(this.courseId);
            uni.setStorageSync(userKey, status ? 'true' : 'false');
            if (debugMode) console.log('预约状态已保存到用户特定缓存:', status);
          }

          // 保存课程通用缓存
          var courseKey = "booking_course_".concat(this.courseId);
          uni.setStorageSync(courseKey, status ? 'true' : 'false');
          if (debugMode) console.log('预约状态已保存到课程通用缓存:', status);

          // 设置全局标记，通知其他页面可能需要刷新状态
          uni.setStorageSync('booking_changed', 'true');
          if (debugMode) console.log('已设置booking_changed标记通知其他页面');

          // 立即刷新页面显示
          this.hasBooked = status;
          if (debugMode) console.log('hasBooked状态已更新为:', status);

          // 强制DOM更新
          this.$forceUpdate();

          // 确保下一帧渲染生效
          this.$nextTick(function () {
            // 再次确认状态已更新
            if (_this7.hasBooked !== status) {
              console.warn('状态更新失败，强制再次更新');
              _this7.hasBooked = status;
              _this7.$forceUpdate();
            }
          });
        }
      } catch (e) {
        console.error('保存预约状态到本地缓存失败:', e);
      }
    },
    // 检查是否已预约
    checkBookingStatus: function checkBookingStatus() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var debugMode, key, cachedStatus, res, booked, allRes, activeBookings, allCancelled, db, dbRes;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // 简化日志输出
                debugMode = false; // 控制是否输出详细日志
                if (debugMode) console.log('开始检查预约状态，当前用户信息:', _this8.userInfo);

                // 检查本地缓存中是否有预约状态记录
                if (_this8.userInfo && _this8.userInfo.userId && _this8.courseId) {
                  key = "booking_".concat(_this8.userInfo.userId, "_").concat(_this8.courseId);
                  cachedStatus = uni.getStorageSync(key);
                  if (cachedStatus === 'true') {
                    if (debugMode) console.log('从本地缓存确认预约状态: 已预约');
                    _this8.hasBooked = true;
                    // 仍然继续查询云端状态来确认
                  }
                }
                if (!(!_this8.userInfo || !_this8.userInfo.userId || !_this8.courseId)) {
                  _context5.next = 7;
                  break;
                }
                if (debugMode) console.log('用户未登录或缺少必要参数，设置为未预约状态');
                _this8.hasBooked = false;
                return _context5.abrupt("return", Promise.resolve(false));
              case 7:
                _context5.prev = 7;
                if (debugMode) console.log('检查预约状态，用户ID:', _this8.userInfo.userId, '课程ID:', _this8.courseId);

                // 首先尝试调用getBookings云函数
                _context5.next = 11;
                return uniCloud.callFunction({
                  name: 'getBookings',
                  data: {
                    userId: _this8.userInfo.userId,
                    courseId: _this8.courseId,
                    // 包括所有未取消的状态
                    status: ['pending', 'confirmed', 'confirmed_unpaid']
                  }
                });
              case 11:
                res = _context5.sent;
                if (debugMode) console.log('查询预约状态结果详情:', JSON.stringify(res.result));

                // 判断是否预约过
                booked = false;
                if (!(res.result && res.result.success && res.result.data && res.result.data.length > 0)) {
                  _context5.next = 19;
                  break;
                }
                booked = true;
                if (debugMode) console.log('用户已预约该课程，预约记录:', res.result.data[0]);
                _context5.next = 56;
                break;
              case 19:
                if (debugMode) console.log('第一次查询未找到记录，尝试不带状态参数再次查询');

                // 如果没有找到记录，尝试不带状态参数再次查询
                _context5.prev = 20;
                _context5.next = 23;
                return uniCloud.callFunction({
                  name: 'getBookings',
                  data: {
                    userId: _this8.userInfo.userId,
                    courseId: _this8.courseId
                    // 不指定状态，查询所有状态的预约
                  }
                });
              case 23:
                allRes = _context5.sent;
                if (debugMode) console.log('第二次查询结果:', JSON.stringify(allRes.result));
                if (!(allRes.result && allRes.result.success && allRes.result.data)) {
                  _context5.next = 51;
                  break;
                }
                // 只有在找到未取消的预约记录时才设置为已预约
                activeBookings = allRes.result.data.filter(function (b) {
                  return b.status !== 'cancelled' && b.status !== 'cancel';
                }); // 检查是否所有记录都是已取消状态
                allCancelled = allRes.result.data.length > 0 && allRes.result.data.every(function (b) {
                  return b.status === 'cancelled' || b.status === 'cancel';
                });
                if (!allCancelled) {
                  _context5.next = 33;
                  break;
                }
                if (debugMode) console.log('所有预约记录均为已取消状态，设置为未预约');
                booked = false;
                _context5.next = 51;
                break;
              case 33:
                if (!(activeBookings.length > 0)) {
                  _context5.next = 38;
                  break;
                }
                booked = true;
                if (debugMode) console.log('找到未取消的预约:', activeBookings[0]);
                _context5.next = 51;
                break;
              case 38:
                if (debugMode) console.log('云端没有找到有效预约记录');

                // 如果仍然没有找到记录，再尝试使用常规数据库API查询
                db = uniCloud.database();
                _context5.prev = 40;
                _context5.next = 43;
                return db.collection('bookings').where({
                  courseId: _this8.courseId,
                  userId: _this8.userInfo.userId,
                  status: db.command.neq('cancelled')
                }).limit(1).get();
              case 43:
                dbRes = _context5.sent;
                if (debugMode) console.log('数据库直接查询结果:', dbRes);
                if (dbRes && dbRes.data && dbRes.data.length > 0) {
                  booked = true;
                  if (debugMode) console.log('通过数据库API找到有效预约:', dbRes.data[0]);
                }
                _context5.next = 51;
                break;
              case 48:
                _context5.prev = 48;
                _context5.t0 = _context5["catch"](40);
                console.error('数据库查询失败:', _context5.t0);
              case 51:
                _context5.next = 56;
                break;
              case 53:
                _context5.prev = 53;
                _context5.t1 = _context5["catch"](20);
                console.error('第二次查询失败:', _context5.t1);
              case 56:
                // 如果查询到所有预约都已取消，则设置为未预约状态，无论本地缓存状态如何
                if (booked === false) {
                  if (debugMode) console.log('云端确认用户没有有效预约，覆盖本地缓存状态');
                  _this8.hasBooked = false;
                }
                // 如果查询失败但本地缓存认为已预约，仅在没有确认所有预约都已取消的情况下保留已预约状态
                else if (!booked && _this8.hasBooked) {
                  if (debugMode) console.log('云端查询失败但本地缓存显示已预约，保留已预约状态');
                  booked = true;
                }

                // 更新预约状态
                if (debugMode) console.log('最终预约状态:', booked);
                _this8.hasBooked = booked;

                // 更新本地缓存
                _this8.saveBookingStatusToCache(booked);

                // 强制刷新视图
                _this8.$forceUpdate();
                return _context5.abrupt("return", Promise.resolve(booked));
              case 64:
                _context5.prev = 64;
                _context5.t2 = _context5["catch"](7);
                console.error('检查预约状态失败，详细错误:', _context5.t2);
                // 出错时保持当前状态不变
                return _context5.abrupt("return", Promise.reject(_context5.t2));
              case 68:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[7, 64], [20, 53], [40, 48]]);
      }))();
    },
    // 预约课程
    bookCourse: function bookCourse() {
      var _this9 = this;
      console.log('点击预约课程按钮');

      // 再次检查用户是否登录
      if (!this.userInfo || !this.userInfo.userId) {
        this.userInfo = null;

        // 尝试从本地和全局重新加载用户信息
        var userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          try {
            this.userInfo = JSON.parse(userInfoStr);
            console.log('从本地存储重新获取用户信息:', this.userInfo);
          } catch (e) {
            console.error('从本地存储重新解析用户信息失败:', e);
          }
        }

        // 如果本地存储没有，尝试从全局获取
        if (!this.userInfo) {
          var globalUserInfo = getApp().globalData.userInfo;
          if (globalUserInfo) {
            this.userInfo = globalUserInfo;
            console.log('从全局状态获取用户信息:', this.userInfo);
          }
        }
      }

      // 如果仍然未登录
      if (!this.userInfo || !this.userInfo.userId) {
        console.log('用户未登录，跳转到登录页面');
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        setTimeout(function () {
          // 跳转到登录页面，并设置重定向回当前页面
          var currentUrl = "/pages/course/detail?id=".concat(_this9.courseId);
          console.log('设置登录后重定向地址:', currentUrl);
          uni.navigateTo({
            url: "/pages/login/login?redirect=".concat(encodeURIComponent(currentUrl))
          });
        }, 1500);
        return;
      }

      // 显示确认弹窗
      uni.showModal({
        title: '确认预约',
        content: "\u60A8\u786E\u5B9A\u8981\u9884\u7EA6\"".concat(this.courseInfo.title, "\"\u8BFE\u7A0B\u5417\uFF1F"),
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(res) {
            return _regenerator.default.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!res.confirm) {
                      _context6.next = 6;
                      break;
                    }
                    console.log('用户确认预约');
                    // 用户点击确定
                    _context6.next = 4;
                    return _this9.submitBooking();
                  case 4:
                    _context6.next = 7;
                    break;
                  case 6:
                    console.log('用户取消预约');
                  case 7:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 提交预约
    submitBooking: function submitBooking() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var res;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log('开始提交预约请求');
                uni.showLoading({
                  title: '预约中...'
                });
                _context7.prev = 2;
                console.log('提交预约数据：用户ID:', _this10.userInfo.userId, '课程ID:', _this10.courseId);

                // 调用云函数预约课程
                _context7.next = 6;
                return uniCloud.callFunction({
                  name: 'bookCourse',
                  data: {
                    userId: _this10.userInfo.userId,
                    courseId: _this10.courseId,
                    userName: _this10.userInfo.nickName || _this10.userInfo.username || '未知用户',
                    phoneNumber: _this10.userInfo.phoneNumber || '',
                    remark: ''
                  }
                });
              case 6:
                res = _context7.sent;
                console.log('预约结果详情:', JSON.stringify(res.result));
                uni.hideLoading();
                if (res.result && res.result.success) {
                  console.log('预约成功:', res.result);

                  // 强制立即设置预约状态
                  _this10.hasBooked = true;
                  console.log('预约成功，强制设置hasBooked =', _this10.hasBooked);

                  // 立即保存到本地缓存
                  _this10.saveBookingStatusToCache(true);
                  uni.showToast({
                    title: '预约成功',
                    icon: 'success'
                  });

                  // 更新预约人数，确保UI显示正确
                  if (_this10.courseInfo) {
                    _this10.courseInfo.bookingCount = (_this10.courseInfo.bookingCount || 0) + 1;
                    console.log('更新预约人数，bookingCount:', _this10.courseInfo.bookingCount);
                  }

                  // 发送预约成功事件，用于其他页面更新
                  uni.$emit('booking:success', {
                    courseId: _this10.courseId,
                    userId: _this10.userInfo.userId
                  });

                  // 确保UI立即更新
                  _this10.$forceUpdate();

                  // 确保下一帧渲染时状态正确
                  _this10.$nextTick(function () {
                    // 再次确认hasBooked状态
                    _this10.hasBooked = true;
                    // 检查DOM是否正确反映了状态
                    console.log('DOM更新后再次检查状态：hasBooked =', _this10.hasBooked);
                  });

                  // 强制刷新页面以显示预约成功状态
                  setTimeout(function () {
                    // 重新加载页面（彻底解决显示问题）
                    _this10.reloadPage();
                  }, 1000);
                } else {
                  console.error('预约失败:', res.result);
                  uni.showToast({
                    title: res.result && res.result.message ? res.result.message : '预约失败',
                    icon: 'none'
                  });
                }
                _context7.next = 17;
                break;
              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](2);
                uni.hideLoading();
                console.error('预约课程过程中发生异常:', _context7.t0);
                uni.showToast({
                  title: '预约失败，请稍后重试',
                  icon: 'none'
                });
              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 12]]);
      }))();
    },
    // 重新加载页面
    reloadPage: function reloadPage() {
      var _this11 = this;
      console.log('重新加载页面以确保显示预约状态');

      // 先缓存必要数据
      var courseId = this.courseId;
      var hasBooked = this.hasBooked;

      // 也确保本地缓存已更新
      this.saveBookingStatusToCache(hasBooked);

      // 显示加载提示
      uni.showLoading({
        title: '刷新页面...'
      });

      // 重新导航到当前页面（完全重新加载）
      uni.redirectTo({
        url: "/pages/course/detail?id=".concat(courseId, "&hasBooked=").concat(hasBooked, "&_t=").concat(Date.now()),
        success: function success() {
          console.log('页面重新加载成功，预约状态:', hasBooked);
          uni.hideLoading();
        },
        fail: function fail(err) {
          console.error('页面重新加载失败:', err);
          uni.hideLoading();

          // 失败时，再次尝试强制更新状态
          _this11.hasBooked = hasBooked;

          // 立即更新按钮显示
          _this11.$forceUpdate();

          // 确保下一帧更新
          _this11.$nextTick(function () {
            _this11.hasBooked = hasBooked;
            console.log('强制更新状态完成, hasBooked =', _this11.hasBooked);
          });
        }
      });
    },
    // 跳转到预约列表
    navigateToBookingList: function navigateToBookingList() {
      uni.navigateTo({
        url: '/pages/user/booking?status=all'
      });
    },
    // 联系老师
    contactTeacher: function contactTeacher() {
      var _this12 = this;
      // 获取教师电话号码
      var teacherPhone = this.courseInfo.teacherPhone || '';
      console.log('尝试联系老师，电话:', teacherPhone);
      if (!teacherPhone || teacherPhone.trim() === '') {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
        return;
      }

      // 检查电话号码格式
      var isValidPhone = /^1[3-9]\d{9}$/.test(teacherPhone) || /^0\d{2,3}-?\d{7,8}$/.test(teacherPhone);
      if (!isValidPhone) {
        console.warn('教师电话格式可能不正确:', teacherPhone);
        // 尽管格式可能不正确，仍然尝试拨打，但显示警告
        uni.showModal({
          title: '提示',
          content: '电话号码格式可能不正确，是否继续拨打？',
          success: function success(res) {
            if (res.confirm) {
              _this12.makePhoneCall(teacherPhone);
            }
          }
        });
        return;
      }

      // 格式正确，直接拨打
      this.makePhoneCall(teacherPhone);
    },
    // 拨打电话
    makePhoneCall: function makePhoneCall(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        success: function success() {
          console.log('拨打电话成功');
        },
        fail: function fail(err) {
          console.error('拨打电话失败:', err);
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    // 格式化课程日期和时间
    formatCourseDateAndTime: function formatCourseDateAndTime(startDate, endDate, startTime, endTime) {
      // 检查必要参数，如果没有新格式的字段，则使用原来的时间格式
      if (!startDate && !endDate) {
        if (this.courseInfo.startTime && this.courseInfo.endTime) {
          return this.formatCourseTime(this.courseInfo.startTime, this.courseInfo.endTime);
        }
        return '时间待定';
      }

      // 格式化日期部分
      var formatDate = function formatDate(dateStr) {
        if (!dateStr) return '';
        var date;
        try {
          date = new Date(dateStr);
          // 检查日期是否有效
          if (isNaN(date.getTime())) {
            return '';
          }
        } catch (e) {
          console.error('日期格式化错误:', e);
          return '';
        }
        return "".concat(date.getFullYear(), "\u5E74").concat(date.getMonth() + 1, "\u6708").concat(date.getDate(), "\u65E5");
      };

      // 格式化时间部分
      var formatTime = function formatTime(timeStr) {
        if (!timeStr) return '';

        // 如果timeStr是标准时间格式，则直接使用Date对象解析
        if (timeStr.includes(':')) {
          try {
            // 处理"HH:MM"格式
            var parts = timeStr.split(':');
            var hours = parseInt(parts[0]);
            var minutes = parts.length > 1 ? parseInt(parts[1]) : 0;
            if (!isNaN(hours) && !isNaN(minutes)) {
              return "".concat(hours, ":").concat(minutes.toString().padStart(2, '0'));
            }
          } catch (e) {
            console.error('时间格式化错误:', e);
          }
        }

        // 如果不是标准格式，尝试作为完整日期解析
        try {
          var time = new Date(timeStr);
          if (!isNaN(time.getTime())) {
            return "".concat(time.getHours(), ":").concat(time.getMinutes().toString().padStart(2, '0'));
          }
        } catch (e) {
          console.error('时间格式化错误:', e);
        }
        return timeStr; // 兜底返回原始值
      };

      var result = '';

      // 添加日期范围
      var startDateFormatted = formatDate(startDate);
      var endDateFormatted = formatDate(endDate);
      if (startDateFormatted && endDateFormatted) {
        if (startDateFormatted === endDateFormatted) {
          // 如果开始和结束日期相同
          result = startDateFormatted;
        } else {
          result = "".concat(startDateFormatted, " \u81F3 ").concat(endDateFormatted);
        }
      } else if (startDateFormatted) {
        result = startDateFormatted;
      } else if (endDateFormatted) {
        result = endDateFormatted;
      }

      // 添加时间范围
      var startTimeFormatted = formatTime(startTime);
      var endTimeFormatted = formatTime(endTime);
      if (startTimeFormatted && endTimeFormatted) {
        if (result) {
          result += " ".concat(startTimeFormatted, "-").concat(endTimeFormatted);
        } else {
          result = "".concat(startTimeFormatted, "-").concat(endTimeFormatted);
        }
      }
      return result || '时间待定';
    },
    // 计算剩余名额
    calculateRemainingSeats: function calculateRemainingSeats() {
      var total = this.courseInfo.courseCount || this.courseInfo.capacity || 20;
      var enrolled = this.courseInfo.bookingCount || 0;
      var remaining = Math.max(0, total - enrolled);
      return remaining;
    },
    // 新增：调试方法，简单切换预约状态
    toggleBookStatus: function toggleBookStatus() {
      this.hasBooked = !this.hasBooked;
      console.log('手动切换预约状态，当前值:', this.hasBooked);
    },
    // 添加强制刷新预约状态的方法
    forceRefreshStatus: function forceRefreshStatus() {
      var _this13 = this;
      console.log('手动强制刷新预约状态');

      // 从缓存中删除状态，强制重新检查
      try {
        if (this.courseId) {
          // 清除用户特定缓存
          if (this.userInfo && this.userInfo.userId) {
            var userKey = "booking_".concat(this.userInfo.userId, "_").concat(this.courseId);
            uni.removeStorageSync(userKey);
          }

          // 清除课程通用缓存
          var courseKey = "booking_course_".concat(this.courseId);
          uni.removeStorageSync(courseKey);
          console.log('已清除本地预约状态缓存');
        }
      } catch (e) {
        console.error('清除预约缓存失败:', e);
      }

      // 显示加载状态
      uni.showLoading({
        title: '刷新中...'
      });

      // 立即检查最新预约状态
      this.checkBookingStatus().then(function () {
        uni.hideLoading();
        uni.showToast({
          title: _this13.hasBooked ? '您已预约此课程' : '您未预约此课程',
          icon: 'none'
        });

        // 强制刷新页面
        _this13.$forceUpdate();
      }).catch(function () {
        uni.hideLoading();
        uni.showToast({
          title: '刷新失败',
          icon: 'none'
        });
      });
    },
    // 处理预约取消事件
    handleBookingCancelled: function handleBookingCancelled(data) {
      var _this14 = this;
      console.log('收到预约取消事件:', data);

      // 判断是否是当前课程的预约取消
      if (data && data.courseId === this.courseId) {
        console.log('当前课程的预约已被取消，立即更新状态');

        // 强制清除缓存中的预约状态
        try {
          if (this.userInfo && this.userInfo.userId) {
            var userKey = "booking_".concat(this.userInfo.userId, "_").concat(this.courseId);
            uni.removeStorageSync(userKey);
            console.log('已强制清除用户特定预约状态缓存');
          }
          var courseKey = "booking_course_".concat(this.courseId);
          uni.removeStorageSync(courseKey);
          console.log('已强制清除课程通用预约状态缓存');
        } catch (e) {
          console.error('清除预约缓存失败:', e);
        }

        // 更新预约状态
        this.hasBooked = false;
        this.bookingId = '';
        this.bookingStatus = '';

        // 更新本地缓存（设置为false）
        this.saveBookingStatusToCache(false);

        // 立即更新课程的报名人数
        if (this.courseInfo && this.courseInfo.bookingCount && this.courseInfo.bookingCount > 0) {
          this.courseInfo.bookingCount -= 1;
          console.log('已减少当前页面课程报名人数，更新后:', this.courseInfo.bookingCount);
        }

        // 强制更新UI
        this.$forceUpdate();

        // 确保下一帧状态一致
        this.$nextTick(function () {
          if (_this14.hasBooked !== false) {
            console.warn('状态未正确更新，强制再次设置为未预约');
            _this14.hasBooked = false;
            _this14.$forceUpdate();
          }
        });
        uni.showToast({
          title: '预约已取消',
          icon: 'none'
        });

        // 刷新课程详情，获取最新的报名人数
        setTimeout(function () {
          _this14.getCourseDetail();
        }, 1000);
      }
    },
    // 调试教师信息
    debugTeacherInfo: function debugTeacherInfo() {
      // 获取真实教师数据信息
      console.log('当前教师信息:', {
        teacherId: this.courseInfo.teacherId,
        teacherName: this.courseInfo.teacherName,
        teacherDesc: this.courseInfo.teacherDesc,
        teacherDescription: this.courseInfo.teacherDescription
      });

      // 直接设置一个测试值
      this.courseInfo.teacherDescription = '这是一段测试的教师描述信息，用于验证UI显示是否正常。';
      console.log('已手动设置教师描述为测试值');

      // 如果有teacherId，尝试获取真实数据
      if (this.courseInfo.teacherId) {
        this.fetchTeacherDescription(this.courseInfo.teacherId);
      } else {
        uni.showToast({
          title: '未找到教师ID',
          icon: 'none'
        });
      }

      // 强制更新UI
      this.$forceUpdate();
    },
    // 收藏状态变更
    onFavoriteChange: function onFavoriteChange(isFavorite) {
      console.log('收藏状态变更:', isFavorite);
    },
    // 获取状态栏高度
    onStatusBarHeight: function onStatusBarHeight(height) {
      // 状态栏高度 + 10px的间距
      this.statusBarHeight = height + 10;
      console.log('课程详情页设置状态栏高度:', this.statusBarHeight);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"]))

/***/ }),

/***/ 128:
/*!****************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&lang=scss& */ 129);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 129:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[122,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course/detail.js.map