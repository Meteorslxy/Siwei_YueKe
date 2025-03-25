(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/course/detail"],{

/***/ 107:
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
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/course/detail.vue */ 108));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 108:
/*!******************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=5652f2c8& */ 109);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 111);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&lang=scss& */ 113);
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

/***/ 109:
/*!*************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=template&id=5652f2c8& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=5652f2c8& */ 110);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5652f2c8___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 110:
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

/***/ 111:
/*!*******************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 112);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 112:
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
  data: function data() {
    return {
      courseId: '',
      courseInfo: {},
      hasBooked: false,
      userInfo: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    console.log('课程详情页已挂载，当前状态:', {
      courseId: this.courseId,
      userInfo: this.userInfo ? '已登录' : '未登录',
      hasBooked: this.hasBooked
    });

    // 每3秒输出状态信息，但不使用document.querySelector
    this.debugInterval = setInterval(function () {
      console.log('课程详情页状态:', {
        courseId: _this.courseId,
        hasBooked: _this.hasBooked
      });
    }, 3000);

    // 监听预约取消事件
    uni.$on('booking:cancel', this.handleBookingCancelled);
  },
  beforeDestroy: function beforeDestroy() {
    // 清除定时器
    if (this.debugInterval) {
      clearInterval(this.debugInterval);
    }

    // 移除事件监听
    uni.$off('booking:cancel', this.handleBookingCancelled);
  },
  onLoad: function onLoad(options) {
    console.log('加载课程详情页面, 参数:', options);

    // 监听预约取消事件，更新本页面的预约状态
    uni.$on('booking:cancel', this.handleBookingCancelled);
    if (options.id) {
      this.courseId = options.id;
      // 获取课程详情
      this.getCourseDetail();
      // 如果登录了，检查预约状态
      this.checkBookingStatus();
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
  },
  methods: {
    // 获取课程详情
    fetchCourseDetail: function fetchCourseDetail() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this2.courseId) {
                  _context.next = 3;
                  break;
                }
                console.error('课程ID为空，无法获取详情');
                return _context.abrupt("return");
              case 3:
                _context.prev = 3;
                // 显示加载提示
                uni.showLoading({
                  title: '加载中...'
                });
                console.log('开始获取课程详情，ID:', _this2.courseId);

                // 直接使用MongoDB ObjectId格式调用API
                _context.next = 8;
                return _this2.$api.course.getCourseDetail(_this2.courseId);
              case 8:
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
                } else {
                  // 获取失败时显示错误提示
                  console.error('获取课程详情失败: 未找到数据');
                  uni.showToast({
                    title: '获取课程详情失败',
                    icon: 'none'
                  });
                }
                _context.next = 19;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                // 隐藏加载提示
                uni.hideLoading();
                console.error('获取课程详情失败:', _context.t0);

                // 显示错误提示
                uni.showToast({
                  title: '获取课程详情失败',
                  icon: 'none'
                });
              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 14]]);
      }))();
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
    // 预加载教师头像
    preloadTeacherAvatar: function preloadTeacherAvatar() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var avatarResult;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this3.courseInfo.teacherAvatar) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _context2.prev = 2;
                if (!(_this3.courseInfo.teacherAvatar.startsWith('/static') || _this3.courseInfo.teacherAvatar.startsWith('/'))) {
                  _context2.next = 8;
                  break;
                }
                console.log('使用本地头像图片:', _this3.courseInfo.teacherAvatar);
                // 如果是本地路径，直接使用
                _this3.courseInfo.teacherAvatarUrl = _this3.courseInfo.teacherAvatar;
                _context2.next = 13;
                break;
              case 8:
                // 否则从云端获取
                console.log('从云端获取头像图片:', _this3.courseInfo.teacherAvatar);
                _context2.next = 11;
                return _this3.$api.file.getImage(_this3.courseInfo.teacherAvatar);
              case 11:
                avatarResult = _context2.sent;
                if (avatarResult && avatarResult.data && avatarResult.data.url) {
                  _this3.courseInfo.teacherAvatarUrl = avatarResult.data.url;
                }
              case 13:
                _context2.next = 19;
                break;
              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](2);
                console.error('加载教师头像失败:', _context2.t0);
                // 加载失败时使用默认头像
                _this3.courseInfo.teacherAvatarUrl = '/static/images/teacher/default-avatar.png';
              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 15]]);
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
    },
    // 检查是否已预约
    checkBookingStatus: function checkBookingStatus() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var res;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('开始检查预约状态，当前用户信息:', _this4.userInfo);

                // 先设置为未预约状态，确保按钮可见
                _this4.hasBooked = false;
                if (!(!_this4.userInfo || !_this4.userInfo.userId || !_this4.courseId)) {
                  _context3.next = 5;
                  break;
                }
                console.log('用户未登录或缺少必要参数，设置为未预约状态');
                return _context3.abrupt("return");
              case 5:
                _context3.prev = 5;
                console.log('检查预约状态，用户ID:', _this4.userInfo.userId, '课程ID:', _this4.courseId);
                _context3.next = 9;
                return uniCloud.callFunction({
                  name: 'getBookings',
                  data: {
                    userId: _this4.userInfo.userId,
                    courseId: _this4.courseId,
                    status: ['pending', 'confirmed']
                  }
                });
              case 9:
                res = _context3.sent;
                console.log('查询预约状态结果详情:', JSON.stringify(res.result));
                if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
                  _this4.hasBooked = true;
                  console.log('用户已预约该课程，预约记录:', res.result.data[0]);
                } else {
                  console.log('用户未预约该课程，API返回:', res.result);
                }
                _context3.next = 17;
                break;
              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](5);
                console.error('检查预约状态失败，详细错误:', _context3.t0);
              case 17:
                console.log('预约状态检查完成，hasBooked=', _this4.hasBooked);
              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 14]]);
      }))();
    },
    // 预约课程
    bookCourse: function bookCourse() {
      var _this5 = this;
      console.log('点击预约课程按钮');

      // 再次检查用户是否登录
      if (!this.userInfo || !this.userInfo.userId) {
        console.log('用户未登录，跳转到登录页面');
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        setTimeout(function () {
          // 跳转到登录页面，并设置重定向回当前页面
          var currentUrl = "/pages/course/detail?id=".concat(_this5.courseId);
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
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(res) {
            return _regenerator.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!res.confirm) {
                      _context4.next = 6;
                      break;
                    }
                    console.log('用户确认预约');
                    // 用户点击确定
                    _context4.next = 4;
                    return _this5.submitBooking();
                  case 4:
                    _context4.next = 7;
                    break;
                  case 6:
                    console.log('用户取消预约');
                  case 7:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
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
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var res;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('开始提交预约请求');
                uni.showLoading({
                  title: '预约中...'
                });
                _context5.prev = 2;
                console.log('提交预约数据：用户ID:', _this6.userInfo.userId, '课程ID:', _this6.courseId);

                // 调用云函数预约课程
                _context5.next = 6;
                return uniCloud.callFunction({
                  name: 'bookCourse',
                  data: {
                    userId: _this6.userInfo.userId,
                    courseId: _this6.courseId,
                    userName: _this6.userInfo.nickName || _this6.userInfo.username || '未知用户',
                    phoneNumber: _this6.userInfo.phoneNumber || '',
                    remark: ''
                  }
                });
              case 6:
                res = _context5.sent;
                console.log('预约结果详情:', JSON.stringify(res.result));
                uni.hideLoading();
                if (res.result && res.result.success) {
                  console.log('预约成功:', res.result);
                  uni.showToast({
                    title: '预约成功',
                    icon: 'success'
                  });

                  // 设置已预约状态
                  _this6.hasBooked = true;

                  // 更新预约人数，确保UI显示正确
                  if (_this6.courseInfo) {
                    _this6.courseInfo.bookingCount = (_this6.courseInfo.bookingCount || 0) + 1;
                    console.log('更新预约人数，bookingCount:', _this6.courseInfo.bookingCount);
                  }

                  // 发送预约成功事件，用于其他页面更新
                  uni.$emit('booking:success', {
                    courseId: _this6.courseId,
                    userId: _this6.userInfo.userId
                  });

                  // 延迟1.5秒后刷新数据，确保云端数据已更新
                  setTimeout(function () {
                    // 重新获取课程详情
                    _this6.fetchCourseDetail().then(function () {
                      // 再次检查预约状态
                      _this6.checkBookingStatus();
                    });
                  }, 1500);
                } else {
                  console.error('预约失败:', res.result);
                  uni.showToast({
                    title: res.result && res.result.message ? res.result.message : '预约失败',
                    icon: 'none'
                  });
                }
                _context5.next = 17;
                break;
              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](2);
                uni.hideLoading();
                console.error('预约课程过程中发生异常:', _context5.t0);
                uni.showToast({
                  title: '预约失败，请稍后重试',
                  icon: 'none'
                });
              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 12]]);
      }))();
    },
    // 跳转到预约列表
    navigateToBookingList: function navigateToBookingList() {
      uni.navigateTo({
        url: '/pages/user/booking?status=all'
      });
    },
    // 联系老师
    contactTeacher: function contactTeacher() {
      var _this7 = this;
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
              _this7.makePhoneCall(teacherPhone);
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
    // 处理预约取消事件
    handleBookingCancelled: function handleBookingCancelled(data) {
      console.log('收到预约取消事件:', data);

      // 判断是否是当前课程的预约取消
      if (data && data.courseId === this.courseId) {
        // 更新预约状态
        this.hasBooked = false;
        this.bookingId = '';
        this.bookingStatus = '';
        uni.showToast({
          title: '预约已取消',
          icon: 'none'
        });

        // 刷新课程详情，获取最新的报名人数
        this.getCourseDetail();
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"]))

/***/ }),

/***/ 113:
/*!****************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&lang=scss& */ 114);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 114:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/YueKe/pages/course/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[107,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course/detail.js.map