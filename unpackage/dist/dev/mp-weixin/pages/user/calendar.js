(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/calendar"],{

/***/ 315:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/main.js?{"page":"pages%2Fuser%2Fcalendar"} ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./pages/user/calendar.vue */ 316));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_calendar.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 316:
/*!***************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/calendar.vue ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar.vue?vue&type=template&id=4f905f4e& */ 317);
/* harmony import */ var _calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar.vue?vue&type=script&lang=js& */ 319);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar.vue?vue&type=style&index=0&lang=scss& */ 321);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/user/calendar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 317:
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/calendar.vue?vue&type=template&id=4f905f4e& ***!
  \**********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./calendar.vue?vue&type=template&id=4f905f4e& */ 318);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_template_id_4f905f4e___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 318:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/calendar.vue?vue&type=template&id=4f905f4e& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uniCalendar: function () {
      return Promise.all(/*! import() | uni_modules/uni-calendar/components/uni-calendar/uni-calendar */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-calendar/components/uni-calendar/uni-calendar")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-calendar/components/uni-calendar/uni-calendar.vue */ 509))
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
  var m0 = _vm.selectedDate ? _vm.formatDate(_vm.selectedDate) : null
  var g0 = _vm.courseList.length
  var l0 =
    g0 > 0
      ? _vm.__map(_vm.courseList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m1 = _vm.getStatusText(item.status)
          return {
            $orig: $orig,
            m1: m1,
          }
        })
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        g0: g0,
        l0: l0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 319:
/*!****************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/calendar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./calendar.vue?vue&type=script&lang=js& */ 320);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 320:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/calendar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _typeof3 = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 28));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var courseCalendarUtils = _interopRequireWildcard(__webpack_require__(/*! @/utils/courseCalendar.js */ 126));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var uniCalendar = function uniCalendar() {
  Promise.all(/*! require.ensure | uni_modules/uni-calendar/components/uni-calendar/uni-calendar */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-calendar/components/uni-calendar/uni-calendar")]).then((function () {
    return resolve(__webpack_require__(/*! @/uni_modules/uni-calendar/components/uni-calendar/uni-calendar.vue */ 509));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    uniCalendar: uniCalendar
  },
  data: function data() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    return {
      // 日历相关
      startDate: "".concat(year - 1, "-").concat(month + 1, "-1"),
      endDate: "".concat(year + 1, "-").concat(month + 1, "-28"),
      selectedDate: '',
      selectedInfo: {
        selected: []
      },
      courseList: [],
      // 已预约课程列表
      bookedCourses: [],
      // 课程日期映射，用于快速检查某一天是否有课程
      courseDatesMap: {},
      // 当前显示的月份
      currentYear: year,
      currentMonth: month + 1,
      // 课程日期缓存，避免重复计算
      courseDateCache: {},
      loading: false,
      loadingText: '',
      userInfo: null,
      calendarLoaded: false
    };
  },
  onLoad: function onLoad() {
    // 设置导航栏标题
    uni.setNavigationBarTitle({
      title: '课程日历'
    });

    // 同步全局用户信息
    this.syncGlobalUserInfo();

    // 清除所有日历相关缓存（解决5月1日错误显示课程问题）
    this.clearAllCalendarCache();

    // 设置默认日期为今天
    var today = new Date();
    this.selectedDate = this.formatDateString(today);
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth() + 1;

    // 清理过期缓存
    this.cleanExpiredCache();

    // 检查用户页面是否已经获取了预约数据
    this.checkUserPageBookings();

    // 加载用户已预约课程
    this.initCalendarPage();

    // 从课程排期表获取时间段
    this.fetchCourseSchedules();
  },
  onShow: function onShow() {
    // 页面显示时重新加载课程数据
    this.initCalendarPage();

    // 添加示例课程排期数据（默认情况下不执行，仅供测试）
    // this.addExampleCourseSchedule();
  },

  methods: {
    // 初始化日历页面
    initCalendarPage: function initCalendarPage() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var userInfo;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                uni.showLoading({
                  title: '加载中...'
                });

                // 获取用户信息
                userInfo = uni.getStorageSync('userInfo');
                _this.userInfo = userInfo;

                // 检查用户登录状态 - 修复判断逻辑
                if (_this.isUserLoggedIn()) {
                  _context.next = 9;
                  break;
                }
                console.log('用户未登录，显示登录提示');
                uni.hideLoading();
                _this.showLoginTip();
                return _context.abrupt("return");
              case 9:
                console.log('用户已登录，ID:', _this.getUserId());

                // 清除无效的课程缓存
                _this.clearInvalidCoursesCache();

                // 重新获取数据，不使用缓存
                console.log('重新从服务器获取数据');

                // 获取用户已预约的课程和详情
                _context.next = 14;
                return _this.fetchBookedCourses();
              case 14:
                _this.calendarLoaded = true;
                _context.next = 21;
                break;
              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                console.error('初始化日历页面失败:', _context.t0);
                // 显示错误信息
                _this.showNetworkError(_context.t0);
              case 21:
                _context.prev = 21;
                uni.hideLoading();
                return _context.finish(21);
              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17, 21, 24]]);
      }))();
    },
    // 保存数据到本地缓存
    saveDataToCache: function saveDataToCache() {
      try {
        if (!this.bookedCourses || this.bookedCourses.length === 0) {
          console.log('无数据需要缓存');
          return;
        }
        var cacheData = {
          bookedCourses: this.bookedCourses,
          timestamp: Date.now()
        };
        uni.setStorageSync('calendar_booked_courses_cache', cacheData);
        console.log('课程数据已保存到本地缓存');
      } catch (error) {
        console.error('保存缓存数据失败:', error);
      }
    },
    // 从本地缓存加载数据
    loadDataFromCache: function loadDataFromCache() {
      try {
        var cacheData = uni.getStorageSync('calendar_booked_courses_cache');
        if (!cacheData || !cacheData.bookedCourses) {
          console.log('没有找到缓存数据');
          return false;
        }

        // 检查缓存是否过期（24小时）
        var now = Date.now();
        var cacheTime = cacheData.timestamp || 0;
        var cacheAgeHours = (now - cacheTime) / (1000 * 60 * 60);
        if (cacheAgeHours > 24) {
          console.log('缓存数据已过期（超过24小时）');
          return false;
        }

        // 使用缓存数据
        this.bookedCourses = cacheData.bookedCourses;
        console.log("\u5DF2\u4ECE\u7F13\u5B58\u52A0\u8F7D ".concat(this.bookedCourses.length, " \u4E2A\u8BFE\u7A0B"));

        // 更新日历标记
        this.updateCalendarCourseMarkers();
        return true;
      } catch (error) {
        console.error('读取缓存数据失败:', error);
        return false;
      }
    },
    // 显示网络错误提示
    showNetworkError: function showNetworkError(error) {
      var message = '网络连接失败，请检查网络设置';
      if (error && error.message) {
        if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
          message = '无法连接到服务器，请检查网络连接';
        } else if (error.message.includes('timeout')) {
          message = '服务器响应超时，请稍后重试';
        } else if (error.message.includes('Network Error')) {
          message = '网络错误，请检查网络连接后重试';
        }
      }
      uni.showToast({
        title: message,
        icon: 'none',
        duration: 3000
      });
    },
    // 获取用户已预约的课程
    fetchBookedCourses: function fetchBookedCourses() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userId, globalBookings, app, userPageData, db, bookingsResult, bookings, _db, bookingsCollection, _yield$bookingsCollec, result, _db2, _result, _bookings, loadedFromCache;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.isUserLoggedIn()) {
                  _context2.next = 3;
                  break;
                }
                console.log('用户未登录，无法获取预约课程');
                return _context2.abrupt("return");
              case 3:
                // 显示加载提示
                uni.showLoading({
                  title: '加载课程中...',
                  mask: true
                });
                _context2.prev = 4;
                // 获取用户ID
                userId = _this2.getUserId();
                console.log('正在获取预约课程，用户ID:', userId);
                if (userId) {
                  _context2.next = 9;
                  break;
                }
                throw new Error('无法获取用户ID');
              case 9:
                // 方法1: 先查看是否已有预约数据 - 从全局数据获取
                globalBookings = getApp().globalData.bookings;
                if (!(globalBookings && globalBookings.data && globalBookings.data.length > 0)) {
                  _context2.next = 14;
                  break;
                }
                console.log('使用全局已有的预约数据:', globalBookings.data.length, '条记录');
                _this2.processBookingsData(globalBookings.data);
                return _context2.abrupt("return");
              case 14:
                _context2.prev = 14;
                app = getApp();
                if (!(app && app.globalData && app.globalData.userBookings)) {
                  _context2.next = 20;
                  break;
                }
                console.log('使用全局用户预约数据');
                _this2.processBookingsData(app.globalData.userBookings);
                return _context2.abrupt("return");
              case 20:
                _context2.next = 25;
                break;
              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](14);
                console.error('获取全局用户预约数据出错:', _context2.t0);
              case 25:
                _context2.prev = 25;
                userPageData = uni.getStorageSync('user_bookings_data');
                if (!(userPageData && Array.isArray(userPageData))) {
                  _context2.next = 31;
                  break;
                }
                console.log('使用用户页面缓存的预约数据:', userPageData.length, '条记录');
                _this2.processBookingsData(userPageData);
                return _context2.abrupt("return");
              case 31:
                _context2.next = 36;
                break;
              case 33:
                _context2.prev = 33;
                _context2.t1 = _context2["catch"](25);
                console.error('获取用户页面预约数据出错:', _context2.t1);
              case 36:
                _context2.prev = 36;
                console.log('尝试使用备用API获取用户预约...');
                db = uniCloud.database(); // 首先尝试 getBookings 云函数 (如果存在)
                _context2.next = 41;
                return db.callFunction({
                  name: 'getBookings',
                  data: {
                    userId: userId,
                    status: 'all'
                  }
                });
              case 41:
                bookingsResult = _context2.sent;
                if (!(bookingsResult && bookingsResult.result && (bookingsResult.result.data || bookingsResult.result.bookings))) {
                  _context2.next = 47;
                  break;
                }
                bookings = bookingsResult.result.data || bookingsResult.result.bookings || [];
                console.log('从getBookings获取到预约数据:', bookings.length, '条记录');
                _this2.processBookingsData(bookings);
                return _context2.abrupt("return");
              case 47:
                _context2.next = 52;
                break;
              case 49:
                _context2.prev = 49;
                _context2.t2 = _context2["catch"](36);
                console.log('备用API getBookings 不可用:', _context2.t2.message);
              case 52:
                _context2.prev = 52;
                console.log('尝试直接查询预约表...');
                _db = uniCloud.database();
                bookingsCollection = _db.collection('bookings');
                _context2.next = 58;
                return bookingsCollection.where({
                  userId: userId
                }).get();
              case 58:
                _yield$bookingsCollec = _context2.sent;
                result = _yield$bookingsCollec.result;
                if (!(result && result.data && result.data.length > 0)) {
                  _context2.next = 64;
                  break;
                }
                console.log('从数据库直接获取到预约数据:', result.data.length, '条记录');
                _this2.processBookingsData(result.data);
                return _context2.abrupt("return");
              case 64:
                _context2.next = 69;
                break;
              case 66:
                _context2.prev = 66;
                _context2.t3 = _context2["catch"](52);
                console.log('直接查询数据库失败:', _context2.t3.message);
              case 69:
                _context2.prev = 69;
                console.log('尝试原始getUserCourses云函数...');
                _db2 = uniCloud.database();
                _context2.next = 74;
                return _db2.callFunction({
                  name: 'getUserCourses',
                  data: {
                    userId: userId
                  }
                });
              case 74:
                _result = _context2.sent;
                if (!(_result && _result.result && _result.result.success)) {
                  _context2.next = 82;
                  break;
                }
                // 更新预约课程列表
                _bookings = _result.result.data || [];
                console.log('从getUserCourses获取到预约数据:', _bookings.length, '条记录');
                _this2.processBookingsData(_bookings);
                return _context2.abrupt("return");
              case 82:
                throw new Error(_result && _result.result && _result.result.message || '获取预约课程失败');
              case 83:
                _context2.next = 89;
                break;
              case 85:
                _context2.prev = 85;
                _context2.t4 = _context2["catch"](69);
                console.error('getUserCourses云函数调用失败:', _context2.t4);
                throw _context2.t4;
              case 89:
                _context2.next = 96;
                break;
              case 91:
                _context2.prev = 91;
                _context2.t5 = _context2["catch"](4);
                console.error('获取预约课程异常:', _context2.t5);

                // 处理网络错误
                _this2.showNetworkError(_context2.t5);

                // 网络连接失败时，尝试从本地缓存加载数据
                if (_this2.bookedCourses.length === 0) {
                  loadedFromCache = _this2.loadDataFromCache();
                  if (loadedFromCache) {
                    uni.showToast({
                      title: '已加载本地缓存数据',
                      icon: 'none',
                      duration: 2000
                    });
                  } else {
                    // 如果没有缓存，显示友好提示
                    uni.showToast({
                      title: '暂无课程数据，请稍后再试',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                }
              case 96:
                _context2.prev = 96;
                // 隐藏加载提示
                uni.hideLoading();

                // 更新选中日期的课程列表
                _this2.updateSelectedDateCourses();
                return _context2.finish(96);
              case 100:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 91, 96, 100], [14, 22], [25, 33], [36, 49], [52, 66], [69, 85]]);
      }))();
    },
    // 处理预约数据
    processBookingsData: function processBookingsData(bookings) {
      console.log('处理预约数据:', bookings.length, '条记录');
      if (!bookings || bookings.length === 0) return;
      try {
        // 过滤掉已取消的课程
        var validBookings = bookings.filter(function (booking) {
          var status = booking.status || booking.course && booking.course.status;
          return status !== 'cancelled' && status !== 'canceled';
        });
        console.log("\u8FC7\u6EE4\u540E\u7684\u6709\u6548\u9884\u7EA6: ".concat(validBookings.length, "/").concat(bookings.length, " (\u6392\u9664\u5DF2\u53D6\u6D88)"));
        if (validBookings.length === 0) {
          console.log('没有有效的预约课程（全部为已取消状态）');
          return;
        }

        // 转换为课程数据格式
        var processedCourses = validBookings.map(function (booking) {
          // 提取课程信息
          var course = booking.course || {};

          // 确保有课程名称，优先使用course.title，然后是booking.courseName，最后是course.name
          var courseName = course.title || booking.courseName || course.name || (booking.course_name ? booking.course_name : '未命名课程');

          // 确保有课程ID
          var courseId = booking.courseId || course._id || booking._id || booking.course_id;

          // 确保有教师姓名
          var teacherName = course.teacherName || booking.teacherName || course.teacher_name || booking.teacher_name || '未指定';

          // 创建基本课程对象，初始没有schedules，将在后续从course_schedule表获取
          return {
            _id: courseId,
            courseId: courseId,
            title: courseName,
            teacherName: teacherName,
            location: course.location || booking.location || course.place || booking.place || '未指定',
            bookingId: booking._id,
            bookingStatus: booking.status || 'pending',
            status: booking.status || 'pending',
            schedules: [],
            // 初始化为空数组，后续从course_schedule表获取
            timeSlots: [] // 初始化为空数组，后续从course_schedule表获取
          };
        });

        console.log('处理后的课程数据:', processedCourses);

        // 更新预约课程列表
        this.bookedCourses = processedCourses;

        // 保存到本地缓存，便于后续离线访问
        this.saveDataToCache();

        // 从课程排期表获取时间段 - 最关键的一步
        this.fetchCourseSchedules();
      } catch (error) {
        console.error('处理预约数据出错:', error);
      }
    },
    // 导航到有课程的月份
    navigateToMonthWithCourses: function navigateToMonthWithCourses() {
      var _this3 = this;
      if (!this.bookedCourses || this.bookedCourses.length === 0) return;
      try {
        // 获取所有课程日期
        var allDates = [];

        // 遍历所有课程
        var _iterator = _createForOfIteratorHelper(this.bookedCourses),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var course = _step.value;
            var schedules = course.schedules || [];

            // 提取所有日期
            var _iterator2 = _createForOfIteratorHelper(schedules),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var schedule = _step2.value;
                var dateStr = '';
                if (schedule.date) {
                  dateStr = this.formatDateForComparison(schedule.date);
                } else if (schedule.startDate) {
                  dateStr = this.formatDateForComparison(schedule.startDate);
                }
                if (dateStr) {
                  allDates.push(dateStr);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (allDates.length === 0) return;

        // 按日期排序
        allDates.sort();

        // 找出最近的日期（优先当月或未来的月份）
        var today = new Date();
        var currentMonth = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0');

        // 尝试找当月或未来的日期
        var futureDates = allDates.filter(function (date) {
          return date >= _this3.formatDateString(today);
        });
        var targetDate;
        if (futureDates.length > 0) {
          // 使用未来最近的日期
          targetDate = futureDates[0];
        } else {
          // 如果没有未来日期，使用最近的过去日期
          targetDate = allDates[allDates.length - 1];
        }
        if (!targetDate) return;

        // 解析目标日期
        var parts = targetDate.split('-');
        if (parts.length !== 3) return;
        var year = parseInt(parts[0]);
        var month = parseInt(parts[1]);

        // 检查是否需要切换月份
        if (year !== this.currentYear || month !== this.currentMonth) {
          console.log("\u5207\u6362\u5230\u6709\u8BFE\u7A0B\u7684\u6708\u4EFD: ".concat(year, "\u5E74").concat(month, "\u6708\uFF08\u6709\u8BFE\u7A0B\u7684\u65E5\u671F: ").concat(targetDate, "\uFF09"));

          // 更新当前显示的年月
          this.currentYear = year;
          this.currentMonth = month;

          // 选中该日期
          this.selectedDate = targetDate;

          // 通知日历组件更新
          this.$nextTick(function () {
            // 强制刷新日历标记
            _this3.updateCalendarCourseMarkers();

            // 获取该日期的课程
            _this3.fetchCourseList(targetDate);
          });
        }
      } catch (error) {
        console.error('导航到有课程的月份出错:', error);
      }
    },
    // 从预约信息中提取日程安排
    extractSchedulesFromBooking: function extractSchedulesFromBooking(booking) {
      var _this4 = this;
      var schedules = [];

      // 如果预约记录中直接包含时间信息
      if (booking.date || booking.startDate || booking.courseDate) {
        var date = booking.date || booking.startDate || booking.courseDate || '';
        var startTime = booking.startTime || '00:00';
        var endTime = booking.endTime || '23:59';
        if (date) {
          schedules.push({
            date: date,
            startTime: startTime,
            endTime: endTime
          });
        }
      }

      // 如果有timeSlots字段
      if (booking.timeSlots && Array.isArray(booking.timeSlots) && booking.timeSlots.length > 0) {
        booking.timeSlots.forEach(function (slot) {
          // 如果时间槽包含完整日期和时间
          if (slot.start && slot.end) {
            try {
              var startDate = new Date(slot.start);
              var endDate = new Date(slot.end);
              if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                schedules.push({
                  date: _this4.formatDate(startDate),
                  startTime: "".concat(startDate.getHours().toString().padStart(2, '0'), ":").concat(startDate.getMinutes().toString().padStart(2, '0')),
                  endTime: "".concat(endDate.getHours().toString().padStart(2, '0'), ":").concat(endDate.getMinutes().toString().padStart(2, '0'))
                });
              }
            } catch (e) {
              console.error('解析时间槽日期时出错:', e);
            }
          }
          // 如果时间槽分别包含日期和时间字段
          else if (slot.date || slot.startDate) {
            schedules.push({
              date: slot.date || slot.startDate,
              startTime: slot.startTime || '00:00',
              endTime: slot.endTime || '23:59'
            });
          }
        });
      }
      return schedules;
    },
    // 获取预订课程的详情并处理为日历数据
    fetchCourseDetailsAndSchedules: function fetchCourseDetailsAndSchedules() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var courseIds, _yield$uniCloud$callF, result, courseMap, processedCourses;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                if (!(!_this5.bookedCourses || _this5.bookedCourses.length === 0)) {
                  _context3.next = 4;
                  break;
                }
                console.log('没有预约课程数据');
                return _context3.abrupt("return");
              case 4:
                // 从预订记录中提取课程ID列表
                courseIds = (0, _toConsumableArray2.default)(new Set(_this5.bookedCourses.map(function (booking) {
                  return booking.courseId;
                })));
                if (!(courseIds.length === 0)) {
                  _context3.next = 8;
                  break;
                }
                console.log('没有有效的课程ID');
                return _context3.abrupt("return");
              case 8:
                console.log("\u5F00\u59CB\u67E5\u8BE2".concat(courseIds.length, "\u4E2A\u8BFE\u7A0B\u7684\u8BE6\u7EC6\u4FE1\u606F"));

                // 查询课程详情
                _context3.next = 11;
                return uniCloud.callFunction({
                  name: 'getCoursesByIds',
                  data: {
                    courseIds: courseIds
                  }
                });
              case 11:
                _yield$uniCloud$callF = _context3.sent;
                result = _yield$uniCloud$callF.result;
                if (!(!result || !result.data || result.data.length === 0)) {
                  _context3.next = 16;
                  break;
                }
                console.log('未找到课程详情');
                return _context3.abrupt("return");
              case 16:
                console.log("\u83B7\u53D6\u5230".concat(result.data.length, "\u4E2A\u8BFE\u7A0B\u8BE6\u60C5"));

                // 创建课程ID到课程对象的映射
                courseMap = {};
                result.data.forEach(function (course) {
                  courseMap[course._id] = course;
                });

                // 将课程详情与预订记录整合
                processedCourses = _this5.bookedCourses.map(function (booking) {
                  // 获取课程详情
                  var courseDetail = courseMap[booking.courseId];
                  if (!courseDetail) {
                    console.warn("\u672A\u627E\u5230ID\u4E3A".concat(booking.courseId, "\u7684\u8BFE\u7A0B\u8BE6\u60C5"));
                    return null;
                  }

                  // 整合课程详情和预订数据
                  return _objectSpread(_objectSpread({}, courseDetail), {}, {
                    bookingId: booking._id,
                    bookingStatus: booking.status || '已预约',
                    timeSlots: booking.timeSlots || (booking.startDate && booking.endDate ? _this5.generateTimeSlots(booking.startDate, booking.endDate, booking.startTime, booking.endTime) : [])
                  });
                }).filter(function (course) {
                  return course !== null;
                });
                console.log('处理后的课程数据:', processedCourses);
                _this5.bookedCourses = processedCourses;
                _this5.updateCalendarCourseMarkers();
                _context3.next = 29;
                break;
              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3["catch"](0);
                console.error('获取课程详情出错:', _context3.t0);
                _this5.showNetworkError(_context3.t0);
              case 29:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 25]]);
      }))();
    },
    // 生成标准化的时间插槽格式
    generateTimeSlots: function generateTimeSlots(startDate, endDate, startTime, endTime) {
      if (!startDate || !endDate || !startTime || !endTime) {
        return [];
      }

      // 如果开始时间晚于结束时间，交换它们
      if (startTime > endTime) {
        var _ref = [endTime, startTime];
        startTime = _ref[0];
        endTime = _ref[1];
      }
      return [{
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime
      }];
    },
    // 将日期对象格式化为字符串 YYYY-MM-DD
    formatDate: function formatDate(date) {
      if (!date) return '';
      if (typeof date === 'string') {
        // 如果已经是日期字符串，检查格式是否符合 YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return date;
        }
        // 尝试转换为Date对象
        date = new Date(date);
      }
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString().padStart(2, '0');
      var day = date.getDate().toString().padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(day);
    },
    // 格式化时间显示 HH:MM
    formatTimeDisplay: function formatTimeDisplay(time) {
      if (!time) return '';

      // 如果时间已经是格式化的字符串
      if (typeof time === 'string' && /^\d{2}:\d{2}(:\d{2})?$/.test(time)) {
        // 去掉秒数如果有
        return time.substring(0, 5);
      }
      try {
        // 尝试处理为Date对象
        var date = typeof time === 'string' ? new Date(time) : time;
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        return "".concat(hours, ":").concat(minutes);
      } catch (e) {
        console.error('无法格式化时间:', time, e);
        return (time === null || time === void 0 ? void 0 : time.toString()) || '';
      }
    },
    // 更新日历上的课程日期标记
    updateCalendarCourseMarkers: function updateCalendarCourseMarkers() {
      var _this6 = this;
      console.log('开始更新日历课程标记，预约课程数量:', this.bookedCourses.length);

      // 重置课程日期映射
      this.courseDatesMap = {};
      if (!this.bookedCourses || this.bookedCourses.length === 0) {
        console.log('没有预约课程数据，无法更新日历标记');

        // 清空日历标记
        this.selectedInfo = {
          selected: []
        };
        return;
      }

      // 处理所有已预订的课程
      var _iterator3 = _createForOfIteratorHelper(this.bookedCourses),
        _step3;
      try {
        var _loop = function _loop() {
          var course = _step3.value;
          // 跳过已取消课程
          if (course.status === 'cancelled' || course.status === 'canceled') {
            return "continue";
          }

          // 获取课程的日程安排
          var schedules = course.schedules || [];
          if (schedules.length === 0) {
            console.log('课程没有日程安排:', course.title || course._id);
            return "continue";
          }
          console.log("\u5904\u7406\u8BFE\u7A0B ".concat(course.title || '未命名', " \u7684 ").concat(schedules.length, " \u4E2A\u65E5\u7A0B"));

          // 统计每个日期的课程数量，用于检查错误数据
          var dateCount = {};

          // 遍历每个日程
          var _iterator4 = _createForOfIteratorHelper(schedules),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var schedule = _step4.value;
              try {
                // 获取日期字符串
                var dateStr = '';
                if (schedule.date) {
                  // 如果是日期字符串
                  dateStr = _this6.formatDateForComparison(schedule.date);
                } else if (schedule.startDate) {
                  // 如果是开始日期
                  dateStr = _this6.formatDateForComparison(schedule.startDate);
                }
                if (!dateStr) {
                  console.log('日程没有有效日期:', schedule);
                  continue;
                }

                // 更新日期计数
                dateCount[dateStr] = (dateCount[dateStr] || 0) + 1;

                // 获取时间信息
                var startTime = schedule.startTime || '00:00';
                var endTime = schedule.endTime || '23:59';

                // 创建课程信息对象
                var courseInfo = {
                  courseId: course._id || course.courseId,
                  courseTitle: course.title || '未命名课程',
                  startTime: startTime,
                  endTime: endTime,
                  status: course.status,
                  index: schedule.index,
                  totalClasses: schedule.totalClasses
                };

                // 将课程信息添加到日期映射
                if (!_this6.courseDatesMap[dateStr]) {
                  _this6.courseDatesMap[dateStr] = {
                    courses: [courseInfo],
                    info: course.status === 'confirmed' ? 'booked' : 'pending'
                  };
                } else {
                  // 已有该日期的记录，追加课程信息
                  _this6.courseDatesMap[dateStr].courses.push(courseInfo);

                  // 更新日期状态（优先显示已确认的课程）
                  if (course.status === 'confirmed') {
                    _this6.courseDatesMap[dateStr].info = 'booked';
                  }
                }
                console.log("\u5DF2\u6DFB\u52A0\u8BFE\u7A0B\u5230\u65E5\u671F ".concat(dateStr, ", \u72B6\u6001: ").concat(course.status));
              } catch (e) {
                console.error('处理日程时出错:', e, schedule);
              }
            }

            // 检查异常日期（同一天有多个课程）
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          Object.keys(dateCount).forEach(function (date) {
            if (dateCount[date] > 1) {
              console.log("\u8B66\u544A: \u65E5\u671F ".concat(date, " \u6709 ").concat(dateCount[date], " \u4E2A\u8BFE\u7A0B\u5B89\u6392\uFF0C\u53EF\u80FD\u91CD\u590D"));
            }
          });
        };
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _ret = _loop();
          if (_ret === "continue") continue;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      console.log('更新后的课程日期映射, 日期数量:', Object.keys(this.courseDatesMap).length);
      if (Object.keys(this.courseDatesMap).length === 0) {
        console.log('没有找到有效的课程日期');
        this.selectedInfo = {
          selected: []
        };
        return;
      }

      // 检查是否有"5月1日"的错误数据
      if (this.courseDatesMap['2025-05-01']) {
        // 检查这个日期是否真的在提供的课程数据中
        var hasValidTimeSlot = this.bookedCourses.some(function (course) {
          return course.timeSlots && course.timeSlots.some(function (slot) {
            var slotDate = new Date(slot.start);
            return _this6.formatDateForComparison(slotDate) === '2025-05-01';
          });
        });
        if (!hasValidTimeSlot) {
          console.log('检测到5月1日可能是错误数据，删除该日期标记');
          delete this.courseDatesMap['2025-05-01'];
        }
      }

      // 更新日历组件的选定日期
      var markedDates = Object.keys(this.courseDatesMap).map(function (dateStr) {
        return {
          date: dateStr,
          info: _this6.courseDatesMap[dateStr].info
        };
      });
      console.log('标记的日期数量:', markedDates.length);
      console.log('标记的具体日期:', markedDates.map(function (d) {
        return d.date;
      }).join(', '));
      this.selectedInfo = {
        selected: markedDates
      };

      // 刷新日历组件
      this.$nextTick(function () {
        // 如果有选中的日期，获取该日期的课程列表
        if (_this6.selectedDate) {
          _this6.fetchCourseList(_this6.selectedDate);
        }
      });
    },
    // 日期变更事件
    dateChange: function dateChange(e) {
      console.log('日期变更:', e);
      var year = e.year,
        month = e.month,
        date = e.date,
        fulldate = e.fulldate;
      this.selectedDate = fulldate || "".concat(year, "-").concat(String(month).padStart(2, '0'), "-").concat(String(date).padStart(2, '0'));

      // 如果月份变了，重新计算日历标记
      if (year !== this.currentYear || month !== this.currentMonth) {
        this.currentYear = year;
        this.currentMonth = month;
        this.updateCalendarCourseMarkers();
      }

      // 获取选中日期的课程
      this.fetchCourseList(this.selectedDate);
    },
    // 处理月份切换事件
    handleMonthSwitch: function handleMonthSwitch(e) {
      console.log('月份切换:', e);
      var year = e.year,
        month = e.month;

      // 更新当前显示的年月
      this.currentYear = year;
      this.currentMonth = month;

      // 更新日历标记
      this.updateCalendarCourseMarkers();
    },
    // 格式化日期字符串
    formatDateString: function formatDateString(date) {
      if (!date) {
        console.error('formatDateString: 参数为空');
        return '';
      }
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error('formatDateString: 无效的日期对象', date);
        return '';
      }
      try {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        return "".concat(year, "-").concat(month, "-").concat(day);
      } catch (e) {
        console.error('formatDateString: 格式化日期时出错', e);
        return '';
      }
    },
    // 检查用户是否已登录
    isUserLoggedIn: function isUserLoggedIn() {
      // 从本地存储获取用户信息
      var userInfo = this.userInfo || uni.getStorageSync('userInfo');
      var userId = userInfo && (userInfo._id || userInfo.userId);

      // 如果在本地存储中找不到用户ID，尝试从缓存获取
      if (!userId) {
        var _userId = uni.getStorageSync('userId') || uni.getStorageSync('uni_id_token');
        return !!_userId;
      }
      return !!userId;
    },
    // 获取用户ID
    getUserId: function getUserId() {
      try {
        // 尝试从存储中获取用户信息
        var userInfo = this.userInfo || uni.getStorageSync('userInfo');
        if (userInfo) {
          // 提取用户ID
          var userId = userInfo._id || userInfo.userId || userInfo.uid || userInfo.userInfo && userInfo.userInfo._id || userInfo.userInfo && userInfo.userInfo.uid;
          if (userId) return userId;
        }

        // 如果用户信息中没有ID，尝试直接从存储获取用户ID
        return uni.getStorageSync('userId');
      } catch (e) {
        console.error('获取用户ID出错:', e);
        return null;
      }
    },
    // 获取指定日期的课程列表
    fetchCourseList: function fetchCourseList(dateStr) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var formattedDate, todayCourses, courseItems;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('获取日期课程列表:', dateStr);
                if (dateStr) {
                  _context4.next = 4;
                  break;
                }
                console.log('未指定日期，无法获取课程列表');
                return _context4.abrupt("return");
              case 4:
                formattedDate = _this7.formatDateForComparison(dateStr);
                console.log('格式化后的日期用于比较:', formattedDate);
                uni.showLoading({
                  title: '加载课程列表...',
                  mask: true
                });
                try {
                  // 清空现有列表
                  _this7.courseList = [];

                  // 从已加载的预约课程中筛选当天的课程
                  if (_this7.bookedCourses && _this7.bookedCourses.length > 0) {
                    console.log('从已加载的预约课程中筛选当天课程');

                    // 从已加载的课程中筛选当天的课程（排除取消状态）
                    todayCourses = _this7.bookedCourses.filter(function (course) {
                      // 跳过已取消课程
                      if (course.status === 'cancelled' || course.status === 'canceled') {
                        return false;
                      }

                      // 检查课程是否有日程安排
                      if (!course.schedules || !Array.isArray(course.schedules) || course.schedules.length === 0) {
                        return false;
                      }

                      // 检查是否有匹配当天的日程
                      return course.schedules.some(function (schedule) {
                        // 获取日程日期
                        var scheduleDate = '';
                        if (schedule.date) {
                          scheduleDate = _this7.formatDateForComparison(schedule.date);
                        } else if (schedule.startDate) {
                          scheduleDate = _this7.formatDateForComparison(schedule.startDate);
                        }
                        return formattedDate === scheduleDate;
                      });
                    });
                    console.log('当天的课程数量:', todayCourses.length);

                    // 将筛选出的课程转换为列表项格式
                    courseItems = todayCourses.map(function (course) {
                      // 找到对应日期的排期
                      var schedules = course.schedules.filter(function (s) {
                        var scheduleDate = '';
                        if (s.date) {
                          scheduleDate = _this7.formatDateForComparison(s.date);
                        } else if (s.startDate) {
                          scheduleDate = _this7.formatDateForComparison(s.startDate);
                        }
                        return formattedDate === scheduleDate;
                      });
                      if (!schedules || schedules.length === 0) {
                        console.warn('未找到课程的排期:', course.title);
                        return null;
                      }

                      // 可能有多个时间段，将每个时间段作为单独的课程项
                      return schedules.map(function (schedule) {
                        // 确保使用正确的课程名称
                        var displayName = course.title || course.courseName || course.name || '未命名课程';
                        // 如果有课程序号，显示在课程名称中
                        var lessonTitle = schedule.index ? "".concat(displayName, " (\u7B2C").concat(schedule.index, "/").concat(schedule.totalClasses || '?', "\u8BFE)") : displayName;
                        return {
                          id: course._id || course.courseId,
                          name: lessonTitle,
                          teacher: course.teacherName || course.teacher || '未知',
                          location: course.location || course.place || '未知',
                          startTime: schedule.startTime || '--:--',
                          endTime: schedule.endTime || '--:--',
                          status: schedule.status || course.status || course.bookingStatus || 'confirmed',
                          date: schedule.date || schedule.startDate || dateStr,
                          index: schedule.index,
                          totalClasses: schedule.totalClasses
                        };
                      });
                    }).filter(function (item) {
                      return item !== null;
                    }).flat(); // 展平数组，因为可能一个课程有多个时间段
                    console.log('转换后的课程列表项:', courseItems);
                    if (courseItems.length > 0) {
                      // 按照课程序号和开始时间排序
                      courseItems.sort(function (a, b) {
                        // 先按开始时间排序
                        var timeA = _this7.parseTimeToMinutes(a.startTime);
                        var timeB = _this7.parseTimeToMinutes(b.startTime);
                        if (timeA !== timeB) {
                          return timeA - timeB;
                        }

                        // 如果时间相同，按课程序号排序
                        return (a.index || 0) - (b.index || 0);
                      });
                      _this7.courseList = courseItems;
                    } else {
                      console.log('当天无课程安排');
                    }
                  } else {
                    console.log('本地无预约课程数据');
                  }

                  // 如果列表为空，显示提示
                  if (_this7.courseList.length === 0) {
                    uni.showToast({
                      title: '当天暂无课程安排',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                } catch (error) {
                  console.error('获取课程列表失败:', error);
                  _this7.showNetworkError(error);
                } finally {
                  uni.hideLoading();
                }
              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 从服务器获取课程数据
    fetchCoursesFromServer: function fetchCoursesFromServer(dateStr) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var todayCourses, skipServerRequest, _yield$uniCloud$callF2, result;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                if (!(typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine)) {
                  _context5.next = 3;
                  break;
                }
                throw new Error('NO_NETWORK');
              case 3:
                console.log('从服务器获取当天课程数据');

                // 根据用户预约的课程过滤当天的课程
                if (!(_this8.bookedCourses && _this8.bookedCourses.length > 0)) {
                  _context5.next = 10;
                  break;
                }
                todayCourses = _this8.filterTodayCourses(dateStr);
                if (!(todayCourses.length > 0)) {
                  _context5.next = 10;
                  break;
                }
                console.log('从现有预约数据中筛选当天课程:', todayCourses);
                _this8.courseList = todayCourses;
                return _context5.abrupt("return");
              case 10:
                // 如果是可以预测的API错误，跳过以避免报错
                skipServerRequest = true; // 根据前面的错误，我们知道API不存在
                if (skipServerRequest) {
                  _context5.next = 30;
                  break;
                }
                _context5.prev = 12;
                _context5.next = 15;
                return uniCloud.callFunction({
                  name: 'getCoursesForDate',
                  data: {
                    userId: _this8.getUserId(),
                    date: dateStr
                  }
                });
              case 15:
                _yield$uniCloud$callF2 = _context5.sent;
                result = _yield$uniCloud$callF2.result;
                if (!(result && result.courses && Array.isArray(result.courses))) {
                  _context5.next = 24;
                  break;
                }
                console.log('从服务器获取到最新课程数据:', result.courses);

                // 将云端数据替换本地数据
                _this8.courseList = result.courses;

                // 缓存到本地
                _this8.saveCourseListToCache(dateStr, result.courses);
                return _context5.abrupt("return");
              case 24:
                console.warn('服务器返回无效数据:', result);
              case 25:
                _context5.next = 30;
                break;
              case 27:
                _context5.prev = 27;
                _context5.t0 = _context5["catch"](12);
                console.error('getCoursesForDate云函数不可用:', _context5.t0);
              case 30:
                // 如果没有课程数据，显示提示
                if (_this8.courseList.length === 0) {
                  uni.showToast({
                    title: '当天暂无课程安排',
                    icon: 'none',
                    duration: 2000
                  });
                }
                _context5.next = 37;
                break;
              case 33:
                _context5.prev = 33;
                _context5.t1 = _context5["catch"](0);
                console.error('从服务器获取当天课程失败:', _context5.t1);

                // 如果缓存中没有数据，显示错误信息
                if (_this8.courseList.length === 0) {
                  if (_context5.t1.message === 'NO_NETWORK') {
                    uni.showToast({
                      title: '网络连接失败，使用缓存数据',
                      icon: 'none',
                      duration: 2000
                    });
                  } else {
                    _this8.showNetworkError(_context5.t1);
                  }
                }
              case 37:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 33], [12, 27]]);
      }))();
    },
    // 从已有的预约数据中筛选特定日期的课程
    filterTodayCourses: function filterTodayCourses(dateStr) {
      var _this9 = this;
      var formattedDate = this.formatDateForComparison(dateStr);

      // 从已加载的课程中筛选当天的课程
      var todayCourses = this.bookedCourses.filter(function (course) {
        // 检查课程是否有日程安排
        if (!course.schedules || !Array.isArray(course.schedules) || course.schedules.length === 0) {
          return false;
        }

        // 检查是否有匹配当天的日程
        return course.schedules.some(function (schedule) {
          // 获取日程日期
          var scheduleDate = '';
          if (schedule.date) {
            scheduleDate = _this9.formatDateForComparison(schedule.date);
          } else if (schedule.startDate) {
            scheduleDate = _this9.formatDateForComparison(schedule.startDate);
          }
          return formattedDate === scheduleDate;
        });
      });

      // 将筛选出的课程转换为列表项格式
      return todayCourses.map(function (course) {
        // 找到对应日期的排期
        var schedule = course.schedules.find(function (s) {
          var scheduleDate = '';
          if (s.date) {
            scheduleDate = _this9.formatDateForComparison(s.date);
          } else if (s.startDate) {
            scheduleDate = _this9.formatDateForComparison(s.startDate);
          }
          return formattedDate === scheduleDate;
        });
        if (!schedule) return null;
        return {
          id: course._id || course.courseId,
          name: course.title || '未命名课程',
          teacher: course.teacherName || '未知',
          location: course.location || '未知',
          startTime: schedule.startTime || '--:--',
          endTime: schedule.endTime || '--:--',
          status: course.status || course.bookingStatus || 'confirmed',
          date: schedule.date || schedule.startDate || dateStr
        };
      }).filter(function (item) {
        return item !== null;
      });
    },
    /**
     * 保存指定日期的课程列表到缓存
     * @param {string} dateStr 日期字符串，格式为YYYY-MM-DD
     * @param {Array} courseList 课程列表
     */
    saveCourseListToCache: function saveCourseListToCache(dateStr, courseList) {
      if (!dateStr || !courseList || courseList.length === 0) {
        return;
      }
      try {
        // 获取现有缓存
        var cache = uni.getStorageSync('calendar_courses_cache') || {};

        // 添加或更新日期数据
        cache[dateStr] = {
          courses: courseList,
          timestamp: Date.now()
        };

        // 清理过期数据（保留30天内的数据）
        var now = Date.now();
        var thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        Object.keys(cache).forEach(function (date) {
          if (now - cache[date].timestamp > thirtyDaysInMs) {
            delete cache[date];
          }
        });

        // 保存回缓存
        uni.setStorageSync('calendar_courses_cache', cache);
        console.log("\u5DF2\u7F13\u5B58".concat(dateStr, "\u7684").concat(courseList.length, "\u4E2A\u8BFE\u7A0B"));
      } catch (error) {
        console.error('保存课程列表缓存失败:', error);
      }
    },
    /**
     * 从缓存加载指定日期的课程列表
     * @param {string} dateStr 日期字符串，格式为YYYY-MM-DD
     * @returns {Array|null} 课程列表或null
     */
    loadCoursesListFromCache: function loadCoursesListFromCache(dateStr) {
      if (!dateStr) return null;
      try {
        // 获取缓存
        var cache = uni.getStorageSync('calendar_courses_cache') || {};

        // 检查是否有该日期的缓存
        if (!cache[dateStr] || !cache[dateStr].courses) {
          return null;
        }

        // 检查缓存是否过期（7天）
        var now = Date.now();
        var cacheTime = cache[dateStr].timestamp || 0;
        var cacheAgeHours = (now - cacheTime) / (1000 * 60 * 60);
        if (cacheAgeHours > 168) {
          // 7天 = 168小时
          console.log("".concat(dateStr, "\u7684\u8BFE\u7A0B\u5217\u8868\u7F13\u5B58\u5DF2\u8FC7\u671F"));
          return null;
        }
        return cache[dateStr].courses;
      } catch (error) {
        console.error('读取课程列表缓存失败:', error);
        return null;
      }
    },
    // 获取课程状态文本
    getStatusText: function getStatusText(status) {
      var statusMap = {
        'pending': '待确认',
        'confirmed': '已确认',
        'cancelled': '已取消',
        'finished': '已完成',
        'available': '可预约'
      };
      return statusMap[status] || '未知状态';
    },
    // 查看课程详情
    viewCourseDetail: function viewCourseDetail(courseId) {
      if (!courseId) return;
      uni.navigateTo({
        url: "/pages/course/detail?id=".concat(courseId)
      });
    },
    // 显示登录提示
    showLoginTip: function showLoginTip() {
      console.log('显示登录提示对话框');
      uni.showModal({
        title: '提示',
        content: '请先登录后查看您的课程',
        confirmText: '去登录',
        success: function success(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/login/index'
            });
          }
        }
      });
    },
    // 清除课程日期缓存
    clearCourseDateCache: function clearCourseDateCache() {
      this.courseDateCache = {};
    },
    // 将时间字符串解析为分钟数
    parseTimeToMinutes: function parseTimeToMinutes(timeStr) {
      return (0, courseCalendarUtils.parseTimeToMinutes)(timeStr);
    },
    // 格式化日期为比较格式 YYYY-MM-DD
    formatDateForComparison: function formatDateForComparison(dateStr) {
      if (!dateStr) return '';

      // 处理各种格式的日期字符串
      var date;
      if (dateStr instanceof Date) {
        date = dateStr;
      } else if (typeof dateStr === 'string') {
        // 替换所有分隔符为'-'
        var normalized = dateStr.replace(/[\/\.]/g, '-');
        date = new Date(normalized);
      } else {
        return '';
      }

      // 检查日期是否有效
      if (isNaN(date.getTime())) {
        return '';
      }
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(day);
    },
    // 更新选中日期的课程列表
    updateSelectedDateCourses: function updateSelectedDateCourses() {
      // 更新课程列表
      this.fetchCourseList(this.selectedDate);
    },
    /**
     * 清理所有过期的缓存数据
     */
    cleanExpiredCache: function cleanExpiredCache() {
      try {
        console.log('开始清理过期缓存数据');
        var now = Date.now();

        // 清理预约课程缓存（超过24小时）
        var bookedCoursesCache = uni.getStorageSync('calendar_booked_courses_cache');
        if (bookedCoursesCache && bookedCoursesCache.timestamp) {
          var cacheAge = now - bookedCoursesCache.timestamp;
          if (cacheAge > 24 * 60 * 60 * 1000) {
            console.log('清理过期的预约课程缓存');
            uni.removeStorageSync('calendar_booked_courses_cache');
          }
        }

        // 清理日期课程列表缓存（超过7天的数据）
        var coursesCache = uni.getStorageSync('calendar_courses_cache');
        if (coursesCache && (0, _typeof2.default)(coursesCache) === 'object') {
          var hasExpired = false;
          var newCache = {};
          Object.keys(coursesCache).forEach(function (date) {
            var cacheData = coursesCache[date];
            if (!cacheData || !cacheData.timestamp) {
              hasExpired = true;
              return;
            }
            var cacheAge = now - cacheData.timestamp;
            if (cacheAge <= 7 * 24 * 60 * 60 * 1000) {
              // 保留未过期的数据
              newCache[date] = cacheData;
            } else {
              hasExpired = true;
            }
          });
          if (hasExpired) {
            console.log('清理过期的日期课程列表缓存');
            uni.setStorageSync('calendar_courses_cache', newCache);
          }
        }
        console.log('缓存清理完成');
      } catch (error) {
        console.error('清理过期缓存失败:', error);
      }
    },
    // 如果有 globalData.userId，初始化时将其同步到存储
    syncGlobalUserInfo: function syncGlobalUserInfo() {
      try {
        var app = getApp();
        if (app && app.globalData) {
          // 检查全局用户ID
          if (app.globalData.userId && !this.userInfo) {
            console.log('从全局数据同步用户ID:', app.globalData.userId);
            uni.setStorageSync('userId', app.globalData.userId);

            // 如果有用户信息对象，也同步
            if (app.globalData.userInfo) {
              console.log('从全局数据同步用户信息');
              this.userInfo = app.globalData.userInfo;
              uni.setStorageSync('userInfo', app.globalData.userInfo);
            }
          }
        }
      } catch (error) {
        console.error('同步全局用户信息出错:', error);
      }
    },
    // 检查用户页面是否已经获取了预约数据
    checkUserPageBookings: function checkUserPageBookings() {
      try {
        // 从user.vue页面检查是否已有预约数据（跨页面数据共享）
        var app = getApp();
        if (app && app.globalData) {
          // 用户页面获取的预约数量
          var bookingCounts = app.globalData.bookingCounts;
          if (bookingCounts && (bookingCounts.all > 0 || bookingCounts.usable > 0)) {
            console.log('检测到用户页面已获取预约数量:', bookingCounts);

            // 如果已经有了预约数据，可以直接使用
            if (app.globalData.bookings && app.globalData.bookings.data) {
              var bookings = app.globalData.bookings.data;
              console.log('从全局数据获取预约记录:', bookings.length, '条记录');

              // 直接保存到本地存储以便跨页面使用
              uni.setStorageSync('user_bookings_data', bookings);
            } else {
              console.log('用户有预约但全局数据中没有详细记录');
            }
          } else {
            console.log('用户页面尚未获取预约数量或无预约');
          }
        }
      } catch (error) {
        console.error('检查用户页面预约数据出错:', error);
      }
    },
    // 获取课程安排数据
    fetchCourseSchedules: function fetchCourseSchedules() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var courseIds, db, schedulesCollection, _yield$schedulesColle, result;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!_this10.bookedCourses || _this10.bookedCourses.length === 0)) {
                  _context6.next = 3;
                  break;
                }
                console.log('没有预约课程，不需要获取课程安排');
                return _context6.abrupt("return");
              case 3:
                _context6.prev = 3;
                // 获取所有预约课程的ID
                courseIds = _this10.bookedCourses.map(function (course) {
                  return course.courseId || course._id;
                });
                console.log('准备获取课程安排，课程IDs:', courseIds);
                if (!(courseIds.length === 0)) {
                  _context6.next = 9;
                  break;
                }
                console.log('没有有效的课程ID，无法获取课程安排');
                return _context6.abrupt("return");
              case 9:
                _context6.next = 11;
                return _this10.fetchCourseDetails(courseIds);
              case 11:
                // 查询课程安排表
                db = uniCloud.database();
                schedulesCollection = db.collection('course_schedule'); // 使用courseId字段进行查询，这应与schema定义一致
                _context6.next = 15;
                return schedulesCollection.where({
                  courseId: db.command.in(courseIds)
                }).get();
              case 15:
                _yield$schedulesColle = _context6.sent;
                result = _yield$schedulesColle.result;
                if (result && result.data && result.data.length > 0) {
                  console.log('获取到课程安排数据:', result.data.length, '条记录');
                  _this10.processCourseSchedules(result.data);
                } else {
                  console.log('未找到相关课程的安排数据');
                }
                _context6.next = 23;
                break;
              case 20:
                _context6.prev = 20;
                _context6.t0 = _context6["catch"](3);
                console.error('获取课程安排失败:', _context6.t0);
              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[3, 20]]);
      }))();
    },
    // 获取课程详细信息
    fetchCourseDetails: function fetchCourseDetails(courseIds) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var db, coursesCollection, _yield$coursesCollect, result, courseDetailsMap;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                if (!(!courseIds || courseIds.length === 0)) {
                  _context7.next = 3;
                  break;
                }
                return _context7.abrupt("return");
              case 3:
                console.log('获取课程详细信息:', courseIds);

                // 查询课程表
                db = uniCloud.database();
                coursesCollection = db.collection('courses');
                _context7.next = 8;
                return coursesCollection.where({
                  _id: db.command.in(courseIds)
                }).get();
              case 8:
                _yield$coursesCollect = _context7.sent;
                result = _yield$coursesCollect.result;
                if (result && result.data && result.data.length > 0) {
                  console.log('获取到课程详细信息:', result.data.length, '条记录');

                  // 创建课程ID到详细信息的映射
                  courseDetailsMap = {};
                  result.data.forEach(function (course) {
                    courseDetailsMap[course._id] = course;
                  });

                  // 更新已有课程的详细信息
                  _this11.bookedCourses = _this11.bookedCourses.map(function (course) {
                    var courseId = course.courseId || course._id;
                    var details = courseDetailsMap[courseId];
                    if (details) {
                      return _objectSpread(_objectSpread({}, course), {}, {
                        title: details.title || course.title,
                        teacherName: details.teacherName || course.teacherName,
                        location: details.location || course.location
                      });
                    }
                    return course;
                  });

                  // 保存更新后的数据到缓存
                  _this11.saveDataToCache();
                } else {
                  console.log('未找到相关课程的详细信息');
                }
                _context7.next = 16;
                break;
              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](0);
                console.error('获取课程详细信息失败:', _context7.t0);
              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 13]]);
      }))();
    },
    // 处理课程安排数据
    processCourseSchedules: function processCourseSchedules(schedules) {
      var _this12 = this;
      if (!schedules || schedules.length === 0) return;
      try {
        console.log('处理课程安排数据:', schedules);

        // 匹配课程ID和安排数据
        var _iterator5 = _createForOfIteratorHelper(schedules),
          _step5;
        try {
          var _loop2 = function _loop2() {
            var schedule = _step5.value;
            var courseId = schedule.courseId;
            var courseName = schedule.courseName || '';
            var timeSlots = schedule.timeSlots || [];
            console.log("\u5904\u7406\u8BFE\u7A0B\u5B89\u6392: ID=".concat(courseId, ", \u540D\u79F0=").concat(courseName, ", \u65F6\u95F4\u69FD\u6570\u91CF=").concat(timeSlots.length));
            if (!courseId || !timeSlots || timeSlots.length === 0) {
              console.log('跳过无效的课程安排数据');
              return "continue";
            }

            // 查找对应的课程
            var courseIndex = _this12.bookedCourses.findIndex(function (course) {
              return course._id === courseId || course.courseId === courseId;
            });
            if (courseIndex >= 0) {
              var course = _this12.bookedCourses[courseIndex];

              // 如果未命名课程，但安排表中有课程名称，则更新课程名称
              if ((course.title === '未命名课程' || !course.title) && courseName) {
                course.title = courseName;
              }

              // 清空课程之前的schedules和timeSlots，确保只使用数据库中的课程时间
              course.schedules = [];
              course.timeSlots = [];

              // 添加时间槽数据
              var slotsAdded = 0;
              timeSlots.forEach(function (slot) {
                // 确保时间槽的start和end字段存在
                if (!slot.start || !slot.end) {
                  console.log('跳过无效的时间槽:', slot);
                  return;
                }
                try {
                  // 将UTC时间转换为本地时间
                  var start = new Date(slot.start);
                  var end = new Date(slot.end);

                  // 确保时间有效
                  if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                    // 添加到课程的timeSlots
                    course.timeSlots.push({
                      start: slot.start,
                      end: slot.end,
                      status: slot.status || 'scheduled',
                      index: slot.index,
                      totalClasses: slot.totalClasses
                    });

                    // 将日期格式化为本地日期
                    var scheduleDate = _this12.formatDate(start);
                    var startTime = "".concat(start.getHours().toString().padStart(2, '0'), ":").concat(start.getMinutes().toString().padStart(2, '0'));
                    var endTime = "".concat(end.getHours().toString().padStart(2, '0'), ":").concat(end.getMinutes().toString().padStart(2, '0'));

                    // 添加到课程的schedules数组，用于日历显示
                    course.schedules.push({
                      date: scheduleDate,
                      startTime: startTime,
                      endTime: endTime,
                      status: slot.status || 'scheduled',
                      index: slot.index,
                      totalClasses: slot.totalClasses
                    });
                    slotsAdded++;
                  }
                } catch (error) {
                  console.error('处理时间槽数据出错:', error);
                }
              });
              console.log("\u4E3A\u8BFE\u7A0B ".concat(course.title || courseId, " \u6DFB\u52A0\u4E86 ").concat(slotsAdded, " \u4E2A\u65F6\u95F4\u69FD"));
              if (slotsAdded === 0) {
                console.log("\u8B66\u544A: \u8BFE\u7A0B ".concat(course.title || courseId, " \u6CA1\u6709\u6709\u6548\u7684\u65F6\u95F4\u69FD"));
              }

              // 更新课程数据
              _this12.bookedCourses.splice(courseIndex, 1, course);
            } else {
              console.log("\u672A\u627E\u5230\u5339\u914D\u7684\u8BFE\u7A0B: ".concat(courseId));
            }
          };
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _ret2 = _loop2();
            if (_ret2 === "continue") continue;
          }

          // 更新日历标记
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        this.updateCalendarCourseMarkers();

        // 更新选中日期的课程列表
        this.updateSelectedDateCourses();

        // 保存更新后的数据到缓存
        this.saveDataToCache();
      } catch (error) {
        console.error('处理课程安排数据出错:', error);
      }
    },
    // 判断两个日期是否为同一天
    isSameDay: function isSameDay(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    },
    // 添加示例课程安排数据（仅用于测试）
    addExampleCourseSchedule: function addExampleCourseSchedule() {
      // 如果没有预约课程数据，创建一个示例
      if (!this.bookedCourses || this.bookedCourses.length === 0) {
        this.bookedCourses = [{
          _id: 'example_course_1',
          courseId: 'example_course_1',
          title: '示例数学课程',
          teacherName: '王老师',
          location: '教室A-101',
          bookingId: 'example_booking_1',
          bookingStatus: 'confirmed',
          status: 'confirmed',
          schedules: []
        }];
      }

      // 创建一个示例课程安排
      var exampleSchedule = {
        courseId: this.bookedCourses[0]._id || this.bookedCourses[0].courseId,
        timeSlots: [{
          // 今天上午10点到11点
          start: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
          end: new Date(new Date().setHours(11, 0, 0, 0)).toISOString()
        }, {
          // 明天上午9点到10点
          start: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 0, 0, 0).toISOString(),
          end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 0, 0, 0).toISOString()
        }, {
          // 后天下午2点到4点
          start: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(14, 0, 0, 0).toISOString(),
          end: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(16, 0, 0, 0).toISOString()
        }]
      };

      // 处理示例数据
      this.processCourseSchedules([exampleSchedule]);
      console.log('已添加示例课程安排数据');
    },
    // 清除无效的课程缓存 - 新增方法
    clearInvalidCoursesCache: function clearInvalidCoursesCache() {
      try {
        console.log('检查并清除无效的课程缓存');

        // 获取本地缓存
        var cacheData = uni.getStorageSync('calendar_booked_courses_cache');
        if (!cacheData || !cacheData.bookedCourses || !Array.isArray(cacheData.bookedCourses)) {
          console.log('无课程缓存数据需要清理');
          return;
        }

        // 筛选有效的课程（具有完整信息和有效schedules的课程）
        var validCourses = cacheData.bookedCourses.filter(function (course) {
          // 必须有课程ID
          if (!course.courseId && !course._id) {
            return false;
          }

          // 必须有课程名称或能够从其它信息获取名称
          var hasTitle = !!course.title || !!course.courseName;

          // 必须有有效的日程安排
          var hasValidSchedules = course.schedules && Array.isArray(course.schedules) && course.schedules.length > 0 && course.schedules.some(function (s) {
            return s.date || s.startDate;
          });
          return hasTitle && hasValidSchedules;
        });

        // 如果有无效课程，重新保存有效课程
        if (validCourses.length < cacheData.bookedCourses.length) {
          console.log("\u6E05\u9664\u4E86 ".concat(cacheData.bookedCourses.length - validCourses.length, " \u6761\u65E0\u6548\u8BFE\u7A0B\u7F13\u5B58"));

          // 更新缓存
          var newCacheData = {
            bookedCourses: validCourses,
            timestamp: Date.now()
          };
          uni.setStorageSync('calendar_booked_courses_cache', newCacheData);
        } else {
          console.log('所有缓存课程均有效，无需清理');
        }

        // 清除特定日期的课程列表缓存
        // this.clearSpecificDateCache('2025-05-01');
      } catch (error) {
        console.error('清除无效课程缓存出错:', error);
      }
    },
    // 清除特定日期的课程列表缓存
    clearSpecificDateCache: function clearSpecificDateCache(dateStr) {
      try {
        if (!dateStr) return;
        console.log("\u6E05\u9664\u7279\u5B9A\u65E5\u671F\u7F13\u5B58: ".concat(dateStr));

        // 获取日期课程缓存
        var cache = uni.getStorageSync('calendar_courses_cache') || {};

        // 如果有该日期的缓存，删除它
        if (cache[dateStr]) {
          console.log("\u5220\u9664\u65E5\u671F\u7F13\u5B58: ".concat(dateStr));
          delete cache[dateStr];
          uni.setStorageSync('calendar_courses_cache', cache);
        }
      } catch (error) {
        console.error('清除特定日期缓存出错:', error);
      }
    },
    // 完全清除日历相关缓存
    clearAllCalendarCache: function clearAllCalendarCache() {
      try {
        console.log('清除所有日历相关缓存');

        // 清除课程预约缓存
        uni.removeStorageSync('calendar_booked_courses_cache');

        // 清除日期课程列表缓存
        uni.removeStorageSync('calendar_courses_cache');

        // 重置内存中的数据
        this.bookedCourses = [];
        this.courseList = [];
        this.courseDatesMap = {};
        this.selectedInfo = {
          selected: []
        };
        uni.showToast({
          title: '日历缓存已清除',
          icon: 'none',
          duration: 2000
        });
      } catch (error) {
        console.error('清除所有日历缓存出错:', error);
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ }),

/***/ 321:
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/calendar.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./calendar.vue?vue&type=style&index=0&lang=scss& */ 322);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 322:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/pages/user/calendar.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[315,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/calendar.js.map