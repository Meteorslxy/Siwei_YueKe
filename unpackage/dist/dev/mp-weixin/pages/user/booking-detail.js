(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/booking-detail"],{

/***/ 241:
/*!****************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/main.js?{"page":"pages%2Fuser%2Fbooking-detail"} ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _bookingDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/user/booking-detail.vue */ 242));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_bookingDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 242:
/*!*********************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/booking-detail.vue ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./booking-detail.vue?vue&type=template&id=e694c0c0& */ 243);
/* harmony import */ var _booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./booking-detail.vue?vue&type=script&lang=js& */ 245);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _booking_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./booking-detail.vue?vue&type=style&index=0&lang=scss& */ 247);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/user/booking-detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 243:
/*!****************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/booking-detail.vue?vue&type=template&id=e694c0c0& ***!
  \****************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./booking-detail.vue?vue&type=template&id=e694c0c0& */ 244);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_template_id_e694c0c0___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 244:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/booking-detail.vue?vue&type=template&id=e694c0c0& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uniPopup: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 453))
    },
    uniPopupDialog: function () {
      return Promise.all(/*! import() | uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue */ 460))
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
  var m0 =
    _vm.bookingDetail.status === "pending" &&
    _vm.bookingDetail.paymentStatus !== "paid" &&
    _vm.bookingDetail.paymentStatus !== "refunded" &&
    _vm.paymentCountdown > 0
      ? _vm.formatCountdown(_vm.paymentCountdown)
      : null
  var m1 = _vm.formatBookingTime(_vm.bookingDetail.createTime)
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

/***/ 245:
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/booking-detail.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./booking-detail.vue?vue&type=script&lang=js& */ 246);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 246:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/booking-detail.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 28));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var uniPopup = function uniPopup() {
  __webpack_require__.e(/*! require.ensure | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then((function () {
    return resolve(__webpack_require__(/*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 453));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var uniPopupDialog = function uniPopupDialog() {
  Promise.all(/*! require.ensure | uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then((function () {
    return resolve(__webpack_require__(/*! @/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue */ 460));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    uniPopup: uniPopup,
    uniPopupDialog: uniPopupDialog
  },
  data: function data() {
    return {
      bookingId: '',
      bookingDetail: {
        _id: '',
        bookingId: '',
        courseId: '',
        courseTitle: '',
        courseStartTime: '',
        courseEndTime: '',
        schoolName: '',
        studentName: '',
        userPhoneNumber: '',
        remark: '',
        status: 'pending',
        paymentStatus: '',
        createTime: '',
        isCourseDeleted: false,
        courseDeletedNote: '',
        teacherName: '',
        teacherPhone: '',
        grade: '' // 添加grade字段
      },

      // 倒计时相关
      paymentCountdown: 0,
      // 支付倒计时（秒）
      countdownTimer: null,
      // 倒计时定时器

      // 二维码相关
      qrcodeUrl: '' // 支付二维码URL
    };
  },
  onLoad: function onLoad(options) {
    var _this = this;
    console.log('booking-detail页面加载，参数:', options);
    if (options.id) {
      this.bookingId = options.id;
      this.fetchBookingDetail();

      // 立即开始倒计时检查，不等待fetchBookingDetail完成
      if (this.bookingId) {
        console.log('预约详情页面加载后立即检查支付状态');
        setTimeout(function () {
          _this.checkPaymentTimeout();
        }, 500); // 稍微延迟一下，确保页面已渲染
      }
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      });
      setTimeout(function () {
        uni.navigateBack();
      }, 1500);
    }
  },
  onShow: function onShow() {
    var _this2 = this;
    // 页面显示时，立即检查所有预约状态
    if (this.bookingDetail && this.bookingDetail._id) {
      console.log('页面显示时，检查预约状态:', this.bookingDetail.status);

      // 对所有待确认预约，始终检查支付状态
      if (this.bookingDetail.status === 'pending') {
        console.log('页面显示：发现pending状态预约，强制检查支付超时');
        this.checkPaymentTimeout();
      }
    } else if (this.bookingId) {
      // 如果预约详情还没加载但有ID，尝试直接检查
      console.log('页面显示：预约详情未加载，直接检查ID:', this.bookingId);
      setTimeout(function () {
        _this2.checkPaymentTimeout();
      }, 300);
    }
  },
  onUnload: function onUnload() {
    // 在页面卸载时清除定时器
    this.clearCountdownTimer();
  },
  computed: {
    statusIcon: function statusIcon() {
      return this.getStatusIcon(this.bookingDetail.status);
    },
    statusText: function statusText() {
      return this.getStatusText(this.bookingDetail.status, this.bookingDetail.paymentStatus);
    },
    statusDesc: function statusDesc() {
      return this.getStatusDesc(this.bookingDetail.status, this.bookingDetail.paymentStatus);
    },
    formattedCourseTime: function formattedCourseTime() {
      // 从课程开始和结束时间格式化课程时间
      var result = '';
      if (this.bookingDetail.courseStartTime && this.bookingDetail.courseEndTime) {
        result = "".concat(this.bookingDetail.courseStartTime, "-").concat(this.bookingDetail.courseEndTime);
      } else {
        result = this.bookingDetail.courseTime || '暂无';
      }

      // 添加classTime字段内容（每周几）
      if (this.bookingDetail.classTime) {
        // 处理classTime字段，可能是字符串或数组
        var classTimeStr = '';
        if (Array.isArray(this.bookingDetail.classTime)) {
          // 处理数组中可能包含的字符串，如 ["周一，周三"]
          var extractWeekdays = function extractWeekdays(str) {
            if (!str) return [];
            // 处理包含逗号、顿号或空格分隔的字符串
            return str.split(/[,，、\s]+/).filter(Boolean);
          };

          // 提取和扁平化所有周几数据
          var weekdaysArray = [];
          this.bookingDetail.classTime.forEach(function (entry) {
            if (typeof entry === 'string') {
              if (entry.includes('周') || entry.includes('每')) {
                weekdaysArray = weekdaysArray.concat(extractWeekdays(entry));
              } else {
                weekdaysArray.push(entry);
              }
            } else {
              weekdaysArray.push(entry);
            }
          });

          // 标准化处理，确保所有数据格式一致
          var weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
          var classTimeSet = new Set();
          weekdaysArray.forEach(function (day) {
            var trimmedDay = String(day).trim();
            // 处理标准格式
            if (weekdays.includes(trimmedDay)) {
              classTimeSet.add(trimmedDay);
            }
            // 处理数字格式，如 "1" 表示周一
            else if (/^[1-7]$/.test(trimmedDay)) {
              var index = parseInt(trimmedDay, 10) - 1;
              if (index >= 0 && index < 7) {
                classTimeSet.add(weekdays[index]);
              }
            }
            // 处理带有"周"前缀但不完整的格式，如"周一"可能缩写为"一"
            else if (/^[一二三四五六日天]$/.test(trimmedDay)) {
              var dayMap = {
                一: '周一',
                二: '周二',
                三: '周三',
                四: '周四',
                五: '周五',
                六: '周六',
                日: '周日',
                天: '周日'
              };
              if (dayMap[trimmedDay]) {
                classTimeSet.add(dayMap[trimmedDay]);
              }
            }
          });

          // 检查是否为"每天"
          var isEveryday = weekdays.every(function (day) {
            return classTimeSet.has(day);
          });
          if (isEveryday) {
            classTimeStr = '天';
          } else {
            // 不是每天，按照周一到周日的顺序排序
            var sortedDays = [];
            weekdays.forEach(function (day) {
              if (classTimeSet.has(day)) {
                sortedDays.push(day);
              }
            });
            classTimeStr = sortedDays.join('、');
          }
        } else if (typeof this.bookingDetail.classTime === 'string') {
          // 如果是字符串，检查是否为"每天"或包含"每天"字样
          var classTimeString = this.bookingDetail.classTime.trim();
          if (classTimeString === '每天' || classTimeString === '天天' || classTimeString === '每日' || classTimeString.includes('每天')) {
            classTimeStr = '天';
          } else {
            // 处理可能包含逗号分隔的字符串，如 "周一，周三"
            var _weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            var parts = classTimeString.split(/[,，、\s]+/).filter(Boolean);
            if (parts.length > 1) {
              // 包含多个周几数据，标准化并排序
              var daySet = new Set();
              parts.forEach(function (part) {
                var trimmed = part.trim();
                if (_weekdays.includes(trimmed)) {
                  daySet.add(trimmed);
                }
              });
              var _sortedDays = [];
              _weekdays.forEach(function (day) {
                if (daySet.has(day)) {
                  _sortedDays.push(day);
                }
              });
              classTimeStr = _sortedDays.join('、');
            } else {
              // 单个值，直接使用
              classTimeStr = classTimeString;
            }
          }
        }

        // 如果classTime有内容，添加到结果中
        if (classTimeStr) {
          result += " (\u6BCF".concat(classTimeStr, ")");
        }
      }
      return result;
    },
    // 判断是否需要显示联系老师按钮
    isNeedContactTeacher: function isNeedContactTeacher() {
      // 只有当状态为已确认但未缴费时才显示联系老师按钮
      return this.bookingDetail.status === 'confirmed' && this.bookingDetail.paymentStatus !== 'paid' && !this.isPaid;
    },
    // 判断是否已支付
    isPaid: function isPaid() {
      return this.bookingDetail.paymentStatus === 'paid' || this.bookingDetail.isPaid === true;
    }
  },
  methods: {
    // 获取预约详情
    fetchBookingDetail: function fetchBookingDetail() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this3.bookingId) {
                  _context.next = 4;
                  break;
                }
                console.error('预约ID为空，无法获取详情');
                uni.showToast({
                  title: '参数错误',
                  icon: 'none'
                });
                return _context.abrupt("return");
              case 4:
                uni.showLoading({
                  title: '加载中...'
                });
                _context.prev = 5;
                _context.next = 8;
                return uniCloud.callFunction({
                  name: 'getBookingDetail',
                  data: {
                    bookingId: _this3.bookingId
                  }
                });
              case 8:
                res = _context.sent;
                console.log('预约详情云函数返回结果:', res.result);
                if (res.result && res.result.success && res.result.data) {
                  // 合并返回的数据
                  _this3.bookingDetail = _objectSpread(_objectSpread(_objectSpread({}, _this3.bookingDetail), res.result.data), {}, {
                    courseTime: res.result.data.courseTime || _this3.formatCourseTimeFromFields(res.result.data),
                    userPhoneNumber: res.result.data.userPhoneNumber || '',
                    // 确保teacherName有默认值
                    teacherName: res.result.data.teacherName || '暂无指定教师',
                    teacherPhone: res.result.data.teacherPhone || '',
                    grade: res.result.data.grade || '' // 添加grade字段
                  });

                  console.log('获取到预约详情:', _this3.bookingDetail);

                  // 确保支付状态字段存在
                  if (!_this3.bookingDetail.paymentStatus) {
                    console.log('预约记录缺少paymentStatus字段，设置为默认值unpaid');
                    _this3.bookingDetail.paymentStatus = 'unpaid';
                  }

                  // 如果有课程ID，尝试获取课程的classTime信息
                  if (_this3.bookingDetail.courseId) {
                    _this3.fetchCourseClassTime(_this3.bookingDetail.courseId);
                  }

                  // 对于所有待确认状态的预约，无论支付状态如何，都检查倒计时
                  if (_this3.bookingDetail.status === 'pending') {
                    console.log('发现待确认预约，立即检查倒计时');
                    _this3.checkPaymentTimeout();
                  }
                } else {
                  console.error('获取预约详情失败:', res.result);
                  uni.showToast({
                    title: '获取预约详情失败',
                    icon: 'none'
                  });
                }
                _context.next = 17;
                break;
              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](5);
                console.error('获取预约详情出错:', _context.t0);
                uni.showToast({
                  title: '获取预约详情失败',
                  icon: 'none'
                });
              case 17:
                _context.prev = 17;
                uni.hideLoading();
                return _context.finish(17);
              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 13, 17, 20]]);
      }))();
    },
    // 获取课程的classTime信息
    fetchCourseClassTime: function fetchCourseClassTime(courseId) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var classTimeData, res, db, result, formattedClassTime, classTimeStr;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (courseId) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _context2.prev = 2;
                console.log('获取课程classTime信息，课程ID:', courseId);
                // 首先尝试使用getCourseDetail云函数
                classTimeData = null;
                _context2.prev = 5;
                _context2.next = 8;
                return uniCloud.callFunction({
                  name: 'getCourseDetail',
                  data: {
                    courseId: courseId
                  }
                });
              case 8:
                res = _context2.sent;
                if (res.result && res.result.success && res.result.data) {
                  console.log('获取课程详情成功:', res.result.data);

                  // 更新课程信息中的classTime字段
                  if (res.result.data.classTime) {
                    classTimeData = res.result.data.classTime;
                  }
                }
                _context2.next = 15;
                break;
              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](5);
                console.error('获取课程详情信息失败:', _context2.t0);
              case 15:
                if (classTimeData) {
                  _context2.next = 28;
                  break;
                }
                _context2.prev = 16;
                console.log('尝试直接从数据库获取课程classTime信息');
                db = uniCloud.database();
                _context2.next = 21;
                return db.collection('courses').doc(courseId).field({
                  classTime: true
                }).get();
              case 21:
                result = _context2.sent;
                if (result.data && result.data.classTime) {
                  classTimeData = result.data.classTime;
                }
                _context2.next = 28;
                break;
              case 25:
                _context2.prev = 25;
                _context2.t1 = _context2["catch"](16);
                console.error('从数据库获取课程classTime失败:', _context2.t1);
              case 28:
                // 如果获取到了classTime数据，更新预约详情
                if (classTimeData) {
                  console.log('成功获取到课程classTime数据:', classTimeData);
                  _this4.bookingDetail.classTime = classTimeData;

                  // 确保classTime是数组格式
                  if (!Array.isArray(_this4.bookingDetail.classTime)) {
                    // 处理可能的字符串格式
                    if (typeof _this4.bookingDetail.classTime === 'string') {
                      classTimeStr = _this4.bookingDetail.classTime.trim(); // 处理逗号或顿号分隔的字符串
                      if (classTimeStr.includes(',') || classTimeStr.includes('，') || classTimeStr.includes('、')) {
                        formattedClassTime = classTimeStr.split(/[,，、\s]+/).filter(Boolean).map(function (day) {
                          return day.trim();
                        });
                      } else {
                        formattedClassTime = [classTimeStr];
                      }
                    } else {
                      formattedClassTime = [String(_this4.bookingDetail.classTime)];
                    }
                    _this4.bookingDetail.classTime = formattedClassTime;
                  }
                  console.log('处理后的classTime数据:', _this4.bookingDetail.classTime);
                } else {
                  console.warn('无法获取课程classTime信息');
                }
                _context2.next = 34;
                break;
              case 31:
                _context2.prev = 31;
                _context2.t2 = _context2["catch"](2);
                console.error('获取并处理课程classTime信息失败:', _context2.t2);
              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 31], [5, 12], [16, 25]]);
      }))();
    },
    // 从字段格式化课程时间
    formatCourseTimeFromFields: function formatCourseTimeFromFields(data) {
      if (data.courseStartTime && data.courseEndTime) {
        return "".concat(data.courseStartTime, " - ").concat(data.courseEndTime);
      }
      return '';
    },
    // 格式化预约时间
    formatBookingTime: function formatBookingTime(timeStr) {
      if (!timeStr) return '';
      var date = new Date(timeStr);
      return "".concat(date.getFullYear(), "-").concat((date.getMonth() + 1).toString().padStart(2, '0'), "-").concat(date.getDate().toString().padStart(2, '0'), " ").concat(date.getHours().toString().padStart(2, '0'), ":").concat(date.getMinutes().toString().padStart(2, '0'));
    },
    // 返回列表
    goBack: function goBack() {
      // 如果有课程ID，则跳转到课程详情
      if (this.bookingDetail && this.bookingDetail.courseId) {
        // 检查是否是从课程详情页来的
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];

        // 如果前一个页面不是课程详情，且课程未取消，则跳转到课程详情
        if (prevPage && !prevPage.route.includes('/pages/course/detail') && this.bookingDetail.status !== 'cancelled') {
          console.log('返回并跳转到课程详情页');
          uni.redirectTo({
            url: "/pages/course/detail?id=".concat(this.bookingDetail.courseId)
          });
          return;
        }
      }

      // 默认返回上一页
      uni.navigateBack();
    },
    // 取消预约
    cancelBooking: function cancelBooking() {
      var _this5 = this;
      // 检查支付状态，更准确地判断是否已支付
      var hasPaid = this.bookingDetail.paymentStatus === 'paid' || this.bookingDetail.isPaid === true;

      // 确认是否取消
      uni.showModal({
        title: '取消预约',
        content: hasPaid ? '您已完成缴费，确定要取消此次预约吗？' : '确定要取消此次预约吗？',
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(res) {
            var userInfoStr, userId, userInfo, bookingId, updateSuccess, cloudResult;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!res.confirm) {
                      _context3.next = 41;
                      break;
                    }
                    uni.showLoading({
                      title: '取消中...'
                    });
                    _context3.prev = 2;
                    // 获取当前用户ID
                    userInfoStr = uni.getStorageSync('userInfo');
                    userId = '';
                    if (userInfoStr) {
                      try {
                        userInfo = JSON.parse(userInfoStr);
                        userId = userInfo.userId || userInfo._id || '';
                      } catch (e) {
                        console.error('解析用户信息失败:', e);
                      }
                    }

                    // 确保bookingId有值
                    bookingId = _this5.bookingDetail._id || _this5.bookingId;
                    if (bookingId) {
                      _context3.next = 12;
                      break;
                    }
                    console.error('预约ID无效');
                    uni.showToast({
                      title: '预约ID无效',
                      icon: 'none'
                    });
                    uni.hideLoading();
                    return _context3.abrupt("return");
                  case 12:
                    // 标记是否更新成功
                    updateSuccess = false; // 尝试方法1：使用cancelBooking云函数
                    _context3.prev = 13;
                    console.log('尝试方法1：使用cancelBooking云函数');
                    _context3.next = 17;
                    return uniCloud.callFunction({
                      name: 'cancelBooking',
                      data: {
                        bookingId: bookingId,
                        userId: userId
                      }
                    });
                  case 17:
                    cloudResult = _context3.sent;
                    console.log('方法1结果:', cloudResult.result);
                    if (cloudResult.result && cloudResult.result.success) {
                      updateSuccess = true;
                      console.log('方法1成功：使用cancelBooking云函数更新成功');
                    }
                    _context3.next = 25;
                    break;
                  case 22:
                    _context3.prev = 22;
                    _context3.t0 = _context3["catch"](13);
                    console.error('方法1失败:', _context3.t0);
                  case 25:
                    // 无论是否成功更新数据库，都更新本地状态
                    _this5.bookingDetail.status = 'cancelled';
                    _this5.bookingDetail.cancelTime = new Date().toISOString();
                    if (updateSuccess) {
                      uni.showToast({
                        title: '取消成功',
                        icon: 'success'
                      });
                    } else {
                      console.log('云端更新失败，仅更新本地状态');
                      uni.showToast({
                        title: '取消成功(仅本地)',
                        icon: 'success'
                      });
                    }

                    // 保存到本地存储
                    _this5.saveToLocalStorage();

                    // 标记预约状态已变更，通知其他页面刷新
                    uni.setStorageSync('booking_changed', 'true');

                    // 发送取消事件，更新相关页面
                    uni.$emit('booking:cancel', {
                      courseId: _this5.bookingDetail.courseId || '',
                      userId: userId,
                      bookingId: bookingId
                    });

                    // 通知预约列表页面刷新数据
                    setTimeout(function () {
                      uni.navigateBack();
                    }, 1000);
                    _context3.next = 38;
                    break;
                  case 34:
                    _context3.prev = 34;
                    _context3.t1 = _context3["catch"](2);
                    console.error('取消预约失败:', _context3.t1);
                    uni.showToast({
                      title: '取消失败，请稍后重试',
                      icon: 'none'
                    });
                  case 38:
                    _context3.prev = 38;
                    uni.hideLoading();
                    return _context3.finish(38);
                  case 41:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, null, [[2, 34, 38, 41], [13, 22]]);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 保存已取消的预约到本地存储
    saveToLocalStorage: function saveToLocalStorage() {
      try {
        if (!this.bookingDetail || !this.bookingDetail._id) return;

        // 保存已取消的预约数据
        var key = "cancelled_booking_".concat(this.bookingDetail._id);
        uni.setStorageSync(key, JSON.stringify(_objectSpread(_objectSpread({}, this.bookingDetail), {}, {
          status: 'cancelled',
          cancelTime: this.bookingDetail.cancelTime || new Date().toISOString()
        })));

        // 记录最近取消的预约ID列表
        var cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
        try {
          cancelledIds = JSON.parse(cancelledIds);
          if (!Array.isArray(cancelledIds)) {
            cancelledIds = [];
          }
        } catch (e) {
          console.error('解析已取消预约ID列表失败:', e);
          cancelledIds = [];
        }

        // 检查是否已经存在
        if (!cancelledIds.includes(this.bookingDetail._id)) {
          // 添加到列表头部
          cancelledIds.unshift(this.bookingDetail._id);
          // 最多保存20条
          if (cancelledIds.length > 20) {
            cancelledIds = cancelledIds.slice(0, 20);
          }
          // 保存更新后的ID列表
          uni.setStorageSync('cancelled_booking_ids', JSON.stringify(cancelledIds));
        }
        console.log('已保存已取消预约数据:', this.bookingDetail._id);
      } catch (e) {
        console.error('保存已取消预约数据失败:', e);
      }
    },
    // 联系老师
    contactTeacher: function contactTeacher() {
      // 检查是否有联系电话
      var phoneNumber = this.bookingDetail.teacherPhone || this.bookingDetail.userPhoneNumber || '';
      if (!phoneNumber) {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
        return;
      }
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        fail: function fail() {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    // 直接拨打教师电话
    callTeacher: function callTeacher() {
      if (!this.bookingDetail.teacherPhone) {
        uni.showToast({
          title: '暂无教师电话',
          icon: 'none'
        });
        return;
      }
      uni.makePhoneCall({
        phoneNumber: this.bookingDetail.teacherPhone,
        fail: function fail() {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    // 获取状态图标
    getStatusIcon: function getStatusIcon(status) {
      switch (status) {
        case 'pending':
          return 'icon-time';
        case 'confirmed':
          return 'icon-check-circle';
        case 'finished':
          return 'icon-success';
        case 'cancelled':
          return 'icon-close-circle';
        default:
          return 'icon-help';
      }
    },
    // 获取状态文本
    getStatusText: function getStatusText(status, paymentStatus) {
      // 如果支付状态为已付款，优先显示已支付状态
      if (paymentStatus === 'paid') {
        return status === 'confirmed' ? '已确认（已缴费）' : status === 'finished' ? '已完成' : status === 'cancelled' ? '已取消' : '已缴费';
      }

      // 如果支付状态为已退费
      if (paymentStatus === 'refunded') {
        return '已退费';
      }
      switch (status) {
        case 'pending':
          return '待确认（未缴费）';
        case 'confirmed_unpaid':
          return '已确认（未缴费）';
        case 'confirmed':
          return paymentStatus === 'paid' ? '已确认（已缴费）' : '已确认（未缴费）';
        case 'finished':
          return '已完成';
        case 'cancelled':
          return '已取消';
        default:
          return '未知状态';
      }
    },
    // 获取状态描述
    getStatusDesc: function getStatusDesc(status, paymentStatus) {
      // 如果支付状态为已付款，优先显示已支付状态的描述
      if (paymentStatus === 'paid') {
        return status === 'confirmed' ? '教师已确认您的预约，您已完成缴费，请按时参加课程' : status === 'finished' ? '课程已顺利完成，感谢您的参与' : status === 'cancelled' ? '预约已取消' : '您已完成缴费，等待教师确认';
      }

      // 如果支付状态为已退费
      if (paymentStatus === 'refunded') {
        return '您的课程费用已退还，预约已结束';
      }
      switch (status) {
        case 'pending':
          return '您的预约正在等待教师确认，未缴费状态可随时取消';
        case 'confirmed_unpaid':
          return '教师已确认您的预约，但您尚未缴费，请及时缴费或取消';
        case 'confirmed':
          return paymentStatus === 'paid' ? '教师已确认您的预约，您已完成缴费，请按时参加课程' : '教师已确认您的预约，但您尚未缴费，请及时缴费或取消';
        case 'finished':
          return '课程已顺利完成，感谢您的参与';
        case 'cancelled':
          return '预约已取消';
        default:
          return '';
      }
    },
    // 检查支付超时
    checkPaymentTimeout: function checkPaymentTimeout() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var bookingId, res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                // 取两个ID中任何一个有效的
                bookingId = _this6.bookingDetail._id || _this6.bookingId;
                console.log('开始检查支付超时...预约ID:', bookingId);
                if (bookingId) {
                  _context4.next = 6;
                  break;
                }
                console.error('没有有效的预约ID，无法检查支付超时');
                return _context4.abrupt("return");
              case 6:
                _context4.next = 8;
                return uniCloud.callFunction({
                  name: 'autoExpireBooking',
                  data: {
                    forceCheck: true,
                    bookingId: bookingId
                  }
                });
              case 8:
                res = _context4.sent;
                console.log('强制检查预约超时结果:', JSON.stringify(res.result));

                // 如果云函数成功取消了预约，则刷新预约详情
                if (!(res.result && res.result.updatedBookingIds && res.result.updatedBookingIds.includes(bookingId))) {
                  _context4.next = 16;
                  break;
                }
                console.log('预约已被自动取消，刷新详情');
                _this6.fetchBookingDetail();

                // 显示提示
                uni.showToast({
                  title: '预约已超时未支付，自动取消',
                  icon: 'none',
                  duration: 2000
                });

                // 标记预约状态已变更，通知列表页刷新
                uni.setStorageSync('booking_changed', 'true');
                return _context4.abrupt("return");
              case 16:
                _context4.next = 18;
                return _this6.calculateTimeManually();
              case 18:
                _context4.next = 24;
                break;
              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](0);
                console.error('检查支付超时异常:', _context4.t0);
                // 发生异常时，尝试本地计算
                _this6.calculateTimeManually();
              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 20]]);
      }))();
    },
    // 申请退款
    handleRefund: function handleRefund() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // 确认是否退款
                uni.showModal({
                  title: '申请退费',
                  content: '确认要申请退费吗？退费后将无法恢复。',
                  success: function () {
                    var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
                      var userInfoStr, userId, userInfo, bookingId, result, _result$result;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!res.confirm) {
                                _context5.next = 30;
                                break;
                              }
                              uni.showLoading({
                                title: '处理中...'
                              });
                              _context5.prev = 2;
                              // 获取当前用户ID
                              userInfoStr = uni.getStorageSync('userInfo');
                              userId = '';
                              if (userInfoStr) {
                                try {
                                  userInfo = JSON.parse(userInfoStr);
                                  userId = userInfo.userId || userInfo._id || '';
                                } catch (e) {
                                  console.error('解析用户信息失败:', e);
                                }
                              }
                              if (userId) {
                                _context5.next = 10;
                                break;
                              }
                              uni.showToast({
                                title: '用户未登录',
                                icon: 'none'
                              });
                              uni.hideLoading();
                              return _context5.abrupt("return");
                            case 10:
                              // 确保bookingId有值
                              bookingId = _this7.bookingDetail._id || _this7.bookingId;
                              if (bookingId) {
                                _context5.next = 16;
                                break;
                              }
                              console.error('预约ID无效');
                              uni.showToast({
                                title: '预约ID无效',
                                icon: 'none'
                              });
                              uni.hideLoading();
                              return _context5.abrupt("return");
                            case 16:
                              _context5.next = 18;
                              return uniCloud.callFunction({
                                name: 'refundBookingPayment',
                                data: {
                                  bookingId: bookingId,
                                  userId: userId,
                                  refundReason: '用户申请退款'
                                }
                              });
                            case 18:
                              result = _context5.sent;
                              console.log('退款处理结果:', result);
                              if (result.result && result.result.success) {
                                // 更新本地数据
                                _this7.bookingDetail.paymentStatus = 'refunded';
                                _this7.bookingDetail.refundTime = new Date();
                                _this7.bookingDetail.refundReason = '用户申请退款';

                                // 设置标记，通知列表页刷新
                                uni.setStorageSync('booking_changed', 'true');
                                uni.showToast({
                                  title: '退费申请已处理',
                                  icon: 'success'
                                });

                                // 刷新页面数据
                                setTimeout(function () {
                                  _this7.fetchBookingDetail();
                                }, 1500);
                              } else {
                                uni.showToast({
                                  title: ((_result$result = result.result) === null || _result$result === void 0 ? void 0 : _result$result.message) || '处理失败',
                                  icon: 'none'
                                });
                              }
                              _context5.next = 27;
                              break;
                            case 23:
                              _context5.prev = 23;
                              _context5.t0 = _context5["catch"](2);
                              console.error('退款处理出错:', _context5.t0);
                              uni.showToast({
                                title: '处理失败，请重试',
                                icon: 'none'
                              });
                            case 27:
                              _context5.prev = 27;
                              uni.hideLoading();
                              return _context5.finish(27);
                            case 30:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, null, [[2, 23, 27, 30]]);
                    }));
                    function success(_x2) {
                      return _success2.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 去缴费
    goToPay: function goToPay() {
      // 确保有预约ID
      var bookingId = this.bookingDetail._id || this.bookingId;
      if (!bookingId) {
        uni.showToast({
          title: '预约ID无效',
          icon: 'none'
        });
        return;
      }

      // 根据课程的grade字段确定二维码URL
      var grade = this.bookingDetail.grade || '';
      // 从课程标题中尝试提取年级信息（如果grade字段为空）
      if (!grade && this.bookingDetail.courseTitle) {
        var title = this.bookingDetail.courseTitle;
        if (title.includes('初一') || title.includes('七年级')) {
          grade = '初一';
        } else if (title.includes('初二') || title.includes('八年级')) {
          grade = '初二';
        } else if (title.includes('初三') || title.includes('九年级')) {
          grade = '初三';
        }
      }

      // 设置二维码URL
      if (grade === '初一') {
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
      } else if (grade === '初二') {
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初二.png';
      } else if (grade === '初三') {
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初三.png';
      } else {
        // 如果未找到匹配的年级，使用初一年级的二维码作为默认
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
      }

      // 显示二维码弹窗
      this.$refs.qrcodePopup.open();
    },
    // 关闭二维码弹窗
    closeQrcodePopup: function closeQrcodePopup() {
      this.$refs.qrcodePopup.close();
    },
    // 手动计算支付剩余时间（备用方案）
    calculateTimeManually: function calculateTimeManually() {
      try {
        if (!this.bookingDetail || !this.bookingDetail.createTime) {
          console.error('无法手动计算时间：无效的预约数据');
          this.paymentCountdown = 60; // 默认设置60秒
          this.startCountdown();
          return;
        }

        // 转换创建时间
        var createTime = new Date(this.bookingDetail.createTime);
        if (isNaN(createTime.getTime())) {
          console.error('无效的创建时间，使用当前时间:', this.bookingDetail.createTime);
          // 如果时间无效，使用当前时间减去30秒作为创建时间
          createTime = new Date();
          createTime.setSeconds(createTime.getSeconds() - 30);
        }
        var now = new Date();

        // 计算已经过去的时间（毫秒）
        var elapsedMs = now.getTime() - createTime.getTime();
        var elapsedSeconds = Math.floor(elapsedMs / 1000);
        console.log("\u624B\u52A8\u8BA1\u7B97\uFF1A\u9884\u7EA6\u521B\u5EFA\u4E8E ".concat(createTime.toISOString()));
        console.log("\u5DF2\u7ECF\u8FC7\u53BB ".concat(elapsedSeconds, " \u79D2"));
        if (elapsedSeconds >= 60) {
          // 已超过1分钟，自动取消
          console.log('预约已超过1分钟，应自动取消');

          // 更新本地状态
          this.bookingDetail.status = 'cancelled';
          this.bookingDetail.paymentStatus = 'cancelled';
          this.bookingDetail.cancelReason = '超时未支付，系统自动取消';
          this.bookingDetail.autoCancel = true;

          // 清除倒计时
          this.clearCountdownTimer();

          // 显示提示
          uni.showToast({
            title: '预约已超时未支付，自动取消',
            icon: 'none',
            duration: 2000
          });

          // 标记状态变更
          uni.setStorageSync('booking_changed', 'true');
        } else {
          // 未超时，设置倒计时
          var remainingSeconds = 60 - elapsedSeconds;
          console.log("\u9884\u7EA6\u672A\u8D85\u65F6\uFF0C\u5269\u4F59 ".concat(remainingSeconds, " \u79D2"));
          this.paymentCountdown = remainingSeconds;
          this.startCountdown();
        }
      } catch (e) {
        console.error('手动计算支付时间异常:', e);
        // 出错时设置默认倒计时
        this.paymentCountdown = 30;
        this.startCountdown();
      }
    },
    // 更新已超时预约的状态
    updateExpiredStatus: function updateExpiredStatus() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var res;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                if (_this8.bookingDetail._id) {
                  _context7.next = 3;
                  break;
                }
                return _context7.abrupt("return");
              case 3:
                console.log('尝试更新已超时预约状态:', _this8.bookingDetail._id);
                _context7.next = 6;
                return uniCloud.callFunction({
                  name: 'autoExpireBooking',
                  data: {
                    forceCheck: true
                  }
                });
              case 6:
                res = _context7.sent;
                console.log('更新超时预约状态结果:', res.result);
                _context7.next = 13;
                break;
              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](0);
                console.error('更新超时预约状态失败:', _context7.t0);
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 10]]);
      }))();
    },
    // 开始倒计时
    startCountdown: function startCountdown() {
      var _this9 = this;
      // 先清除可能存在的定时器
      this.clearCountdownTimer();

      // 创建新的定时器
      this.countdownTimer = setInterval(function () {
        if (_this9.paymentCountdown > 0) {
          _this9.paymentCountdown--;
        } else {
          // 倒计时结束，重新检查状态
          _this9.clearCountdownTimer();
          _this9.fetchBookingDetail();
        }
      }, 1000);
    },
    // 清除倒计时定时器
    clearCountdownTimer: function clearCountdownTimer() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    },
    // 格式化倒计时显示
    formatCountdown: function formatCountdown(seconds) {
      var min = Math.floor(seconds / 60);
      var sec = seconds % 60;
      return "".concat(min, ":").concat(sec.toString().padStart(2, '0'));
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ }),

/***/ 247:
/*!*******************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/booking-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./booking-detail.vue?vue&type=style&index=0&lang=scss& */ 248);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 248:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/booking-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[241,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/booking-detail.js.map