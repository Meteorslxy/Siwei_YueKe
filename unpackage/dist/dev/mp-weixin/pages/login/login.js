(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/login/login"],{

/***/ 144:
/*!****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ 145));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 145:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/pages/login/login.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=b237504c& */ 146);
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ 148);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.vue?vue&type=style&index=0&lang=scss& */ 150);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

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

/***/ 146:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/pages/login/login.vue?vue&type=template&id=b237504c& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=template&id=b237504c& */ 147);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_b237504c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 147:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/pages/login/login.vue?vue&type=template&id=b237504c& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.providerList.length
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 148:
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/pages/login/login.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=script&lang=js& */ 149);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 149:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/pages/login/login.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var _methods;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
      showLoginOptionsModal: false,
      // 是否显示其他登录方式弹窗
      // 账号密码登录相关
      account: '',
      // 用于账号密码登录
      password: '',
      confirmPassword: '',
      // 嵌入式手机号验证码登录相关
      showEmbeddedPhoneLogin: false,
      phone: '',
      agreed: false,
      loginState: {
        code: '',
        // 微信登录code
        openid: '',
        // 用户openid
        sessionKey: '',
        // 会话密钥
        userInfo: null,
        // 微信用户信息
        phoneNumber: '' // 存储获取到的手机号，用于后续步骤
      },

      hasWxUserInfo: false,
      // 是否已获取微信用户信息
      selectedLoginMethod: "",
      // 用户选择的登录方式
      userInfo: null,
      // 用户信息
      providerList: [{
        id: 'weixin',
        name: '微信'
      }
      // 添加更多登录方式
      ],

      isLoggedIn: false,
      // 登录状态

      // 添加用户信息弹窗相关数据
      showUserProfileModal: false,
      userProfileData: {
        nickName: '',
        avatarUrl: '',
        gender: 0
      }
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

    // 重置微信信息状态
    this.hasWxUserInfo = false;
    this.loginState.userInfo = null;

    // 检查是否支持一键登录
    this.checkSupport();

    // 页面加载时自动尝试静默登录
    this.silentLogin();

    // 提前获取微信登录code，为授权做准备
    this.getWxLoginCode();
  },
  methods: (_methods = {
    // 新增：获取微信登录code
    getWxLoginCode: function getWxLoginCode() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var loginRes;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                console.log('获取微信登录code');
                _context.next = 4;
                return new Promise(function (resolve, reject) {
                  uni.login({
                    provider: 'weixin',
                    success: function success(res) {
                      return resolve(res);
                    },
                    fail: function fail(err) {
                      return reject(err);
                    }
                  });
                });
              case 4:
                loginRes = _context.sent;
                if (loginRes && loginRes.code) {
                  console.log('获取微信登录code成功:', loginRes.code);
                  _this.loginState.code = loginRes.code;
                }
                _context.next = 11;
                break;
              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error('获取微信登录code失败:', _context.t0);
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    // 检查是否支持一键登录
    checkSupport: function checkSupport() {
      var _this2 = this;
      // 获取服务商
      uni.getProvider({
        service: 'oauth',
        success: function success(res) {
          console.log('支持的服务商:', res.provider);

          // 预登录
          if (res.provider.includes('univerify')) {
            _this2.preLogin();
          }
        }
      });
    },
    // 预登录
    preLogin: function preLogin() {},
    // 关闭所有登录弹窗
    closeLoginModals: function closeLoginModals() {
      this.showLoginOptionsModal = false;
      // 移除所有其他弹窗状态，因为它们不再使用
    },
    // 获取验证码
    getVerificationCode: function getVerificationCode() {
      if (!this.phone || !/^1\d{10}$/.test(this.phone)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return;
      }
      if (!this.agreed) {
        uni.showToast({
          title: '请先同意用户协议和隐私政策',
          icon: 'none'
        });
        return;
      }

      // 直接跳转到验证码输入页面
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber=' + this.phone,
        fail: function fail(err) {
          console.error('跳转验证码页面失败:', err);
          uni.showToast({
            title: '系统繁忙，请稍后再试',
            icon: 'none'
          });
        }
      });
    },
    // 显示协议
    showAgreement: function showAgreement(type) {
      var url = type === 'user' ? '/pages/common/agreement' : '/pages/common/privacy';
      uni.navigateTo({
        url: url
      });
    },
    // 使用图形验证码方式获取验证码
    getVerificationCodeWithCaptcha: function getVerificationCodeWithCaptcha() {
      var _this3 = this;
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

        // 提取完整的验证码数据结构
        var captchaId = _this3.extractCaptchaId(res);
        console.log('提取的验证码ID:', captchaId);

        // 检查是否有验证码图片
        if (!res.captchaBase64 && (!res.data || !res.data.captchaBase64)) {
          console.error('未找到验证码图片');
          uni.hideLoading();
          uni.showToast({
            title: '获取验证码失败，请重试',
            icon: 'none'
          });
          return;
        }

        // 创建一个携带所有必要信息的captchaData对象
        var captchaData = {
          captchaId: captchaId,
          captchaBase64: res.captchaBase64 || res.data && res.data.captchaBase64,
          code: res.code || 0
        };

        // 打印完整的返回值，帮助调试
        console.log('服务器返回的完整验证码数据结构:', JSON.stringify(res));

        // 隐藏加载
        uni.hideLoading();

        // 显示图形验证码弹窗
        _this3.captchaData = captchaData;
        _this3.showCaptchaModal = true;

        // 尝试从SVG中提取验证码文本
        var suggestedText = _this3.getCaptchaTextFromSvg();
        if (suggestedText) {
          _this3.captchaData.captchaText = suggestedText;
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('获取图形验证码失败:', err);

        // 检查错误类型
        var errorMsg = '获取验证码失败，请重试';
        if (err && err.message) {
          if (err.message.includes('Method name is required')) {
            errorMsg = '服务方法不存在';

            // 尝试使用直接初始化方法
            _this3.initCaptchaDirectly();
            return;
          } else if (err.message.includes('timeout')) {
            errorMsg = '网络超时，请重试';
          } else {
            errorMsg = err.message;
          }
        }
        uni.showToast({
          title: errorMsg,
          icon: 'none'
        });
      });
    },
    // 直接初始化验证码，不使用云对象
    initCaptchaDirectly: function initCaptchaDirectly() {
      console.log('直接初始化验证码，不使用云对象');

      // 创建一个随机ID
      var randomId = 'manual_captcha_' + Date.now();

      // 内置的SVG验证码，避免网络请求
      var baseSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"50\" viewBox=\"0,0,150,50\"><rect width=\"100%\" height=\"100%\" fill=\"#FFFAE8\"/><path d=\"M10 25 C50 10,100 40,140 20\" stroke=\"#47c76d\" fill=\"none\"/><text x=\"30\" y=\"35\" font-family=\"Arial\" font-size=\"24\" fill=\"#333\" transform=\"rotate(5,30,35)\">\u5B89\u5168\u7801</text></svg>";
      var captchaBase64 = "data:image/svg+xml;utf8,".concat(baseSvg);

      // 创建验证码数据
      var captchaData = {
        captchaId: randomId,
        captchaBase64: captchaBase64,
        captchaText: '安全码',
        code: 0
      };

      // 隐藏加载
      uni.hideLoading();

      // 保存验证码数据
      this.captchaData = captchaData;

      // 显示验证码弹窗
      this.showCaptchaModal = true;

      // 提示用户
      setTimeout(function () {
        uni.showToast({
          title: '请输入图中文字"安全码"',
          icon: 'none',
          duration: 3000
        });
      }, 500);
    },
    // 刷新图形验证码
    refreshCaptcha: function refreshCaptcha() {
      var _this4 = this;
      uni.showLoading({
        title: '刷新中',
        mask: true
      });
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });

      // 必须提供scene参数
      uniIdCo.createCaptcha({
        scene: 'login-by-sms' // 必须提供scene参数
      }).then(function (res) {
        uni.hideLoading();
        console.log('刷新图形验证码成功:', res);

        // 提取验证码ID
        var captchaId = _this4.extractCaptchaId(res);
        console.log('刷新后的验证码ID:', captchaId);

        // 创建一个携带所有必要信息的captchaData对象
        var captchaData = {
          captchaId: captchaId,
          captchaBase64: res.captchaBase64 || res.data && res.data.captchaBase64,
          code: res.code || 0
        };
        _this4.captchaData = captchaData;
        _this4.captchaCode = ''; // 清空验证码输入

        // 尝试从SVG中提取验证码文本
        var suggestedText = _this4.getCaptchaTextFromSvg();
        if (suggestedText) {
          _this4.captchaData.captchaText = suggestedText;
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('刷新图形验证码失败:', err);
        uni.showToast({
          title: '刷新失败，请重试',
          icon: 'none'
        });
      });
    },
    // 递归提取验证码ID
    extractCaptchaId: function extractCaptchaId(res) {
      // 检查res是否为对象且不为null
      if (!res || (0, _typeof2.default)(res) !== 'object') {
        console.error('提取验证码ID失败: 参数不是有效对象');
        return 'not_found_' + Date.now();
      }
      console.log('提取验证码ID, 原始数据结构类型:', (0, _typeof2.default)(res));

      // 直接检查最常见的情况
      if (res.captchaId) {
        console.log('在顶层找到captchaId:', res.captchaId);
        return res.captchaId;
      }
      if (res.data && res.data.captchaId) {
        console.log('在data字段中找到captchaId:', res.data.captchaId);
        return res.data.captchaId;
      }

      // 检查可能的位置
      if (res.code === 0 && res.captchaBase64) {
        // 使用当前时间作为ID
        console.log('在captchaBase64中找到数据，但无ID，生成临时ID');
        return 'captcha_base64_' + Date.now();
      }

      // 递归搜索对象中的captchaId
      var findCaptchaId = function findCaptchaId(obj) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'root';
        if (obj === null || (0, _typeof2.default)(obj) !== 'object') {
          return null;
        }

        // 遍历对象的所有属性
        for (var key in obj) {
          // 跳过继承的属性
          if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
          var currentPath = "".concat(path, ".").concat(key);

          // 如果找到captchaId属性
          if (key === 'captchaId' && obj[key]) {
            console.log("\u5728\u8DEF\u5F84 ".concat(currentPath, " \u627E\u5230captchaId:"), obj[key]);
            return obj[key];
          }

          // 如果属性值是对象，递归搜索
          if ((0, _typeof2.default)(obj[key]) === 'object' && obj[key] !== null) {
            var found = findCaptchaId(obj[key], currentPath);
            if (found) return found;
          }
        }
        return null;
      };

      // 执行递归搜索
      var foundId = findCaptchaId(res);
      if (foundId) {
        return foundId;
      }

      // 如果找不到合法的ID，检查是否成功
      if (res.code === 0 || res.data && res.data.code === 0) {
        // 使用当前时间作为临时ID
        var tempId = 'captcha_' + Date.now();
        console.log('找不到captchaId，但请求成功，使用临时ID:', tempId);
        return tempId;
      }

      // 完全失败的情况
      console.error('无法找到验证码ID，生成错误ID');
      return 'not_found_' + Date.now();
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
            // 查找path标签中的文本内容 (更可能包含验证码)
            var pathMatch = svg.match(/<path fill="[^"]*" d="[^"]*">([^<]*)<\/path>/g);
            if (pathMatch) {
              // 尝试找出包含字母的path标签
              for (var i = 0; i < pathMatch.length; i++) {
                var pathText = pathMatch[i];
                // 找到d属性，里面可能包含字母轮廓
                var dAttr = pathText.match(/d="([^"]*)"/);
                if (dAttr && dAttr[1]) {
                  // 检查是否包含可能是字母的路径
                  if (dAttr[1].length > 50 && dAttr[1].includes('L') && dAttr[1].includes('Q')) {
                    captchaText += 'X'; // 每找到一个可能是字母的path，就加一个占位符
                  }
                }
              }
            }

            // 查找text标签
            var textMatch = svg.match(/<text[^>]*>(.*?)<\/text>/g);
            if (textMatch) {
              captchaText = textMatch.map(function (t) {
                // 提取text标签内的文本
                var content = t.match(/<text[^>]*>(.*?)<\/text>/);
                return content ? content[1] : '';
              }).join('');
            }

            // 如果通过标准方法无法提取，尝试简单检测包含字母的路径
            if (!captchaText) {
              // 检查有多少个单独的路径，每个可能代表一个字符
              var paths = svg.match(/<path fill/g);
              if (paths && paths.length >= 3 && paths.length <= 6) {
                console.log('检测到可能的验证码字符数:', paths.length);
                captchaText = new Array(paths.length).fill('?').join('');
              }
            }
            if (captchaText) {
              console.log('从SVG中提取的验证码内容:', captchaText);

              // 不直接填入验证码，但给用户提示
              if (captchaText.length >= 4) {
                setTimeout(function () {
                  uni.showToast({
                    title: '提示:建议输入 ' + captchaText.substring(0, 1) + '*' + captchaText.substring(captchaText.length - 1),
                    icon: 'none',
                    duration: 2000
                  });
                }, 500);
              } else if (captchaText.length > 0) {
                setTimeout(function () {
                  uni.showToast({
                    title: '提示:可能的验证码 ' + captchaText,
                    icon: 'none',
                    duration: 2000
                  });
                }, 500);
              }
              return captchaText;
            }
          }
        }
      } catch (error) {
        console.error('提取验证码文本失败:', error);
      }
      return '';
    },
    // 开始倒计时
    startCountdown: function startCountdown() {
      var _this5 = this;
      this.countdown = 60;
      var timer = setInterval(function () {
        if (_this5.countdown > 0) {
          _this5.countdown--;
        } else {
          clearInterval(timer);
        }
      }, 1000);
    },
    // 处理登录结果
    handleLoginResult: function handleLoginResult(res) {
      var _this6 = this;
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

          // 检查是否是首次登录
          var hasSetStudentName = uni.getStorageSync('hasSetStudentName');
          var isFirstLogin = !hasSetStudentName;

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
            _this6.navigateAfterLogin();

            // 检查用户昵称是否为自动生成的
            var userInfo = uni.getStorageSync('userInfo');
            if (typeof userInfo === 'string') {
              try {
                userInfo = JSON.parse(userInfo);
              } catch (e) {
                userInfo = null;
              }
            }
            var isAutoGeneratedNickname = userInfo && userInfo.nickname && (userInfo.nickname.startsWith('用户') || userInfo.nickname === '微信用户' || /^用户\d+$/.test(userInfo.nickname));

            // 只有当是首次登录且昵称为自动生成时才显示弹窗
            if (isFirstLogin && isAutoGeneratedNickname) {
              console.log('检测到首次登录且昵称为自动生成，显示学生姓名设置弹窗');
              setTimeout(function () {
                uni.$emit('show:student-name-modal');
              }, 500); // 给页面足够的时间加载
            } else {
              console.log('非首次登录或昵称非自动生成，不显示设置弹窗');
            }
          }, 1500);
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
    // 静默登录
    silentLogin: function silentLogin() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var savedOpenid, deviceInfo, uuid, loginResult, loginRes;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('尝试静默登录');
                _context2.prev = 1;
                // 获取存储的openid
                savedOpenid = uni.getStorageSync('wx_openid');
                if (!savedOpenid) {
                  _context2.next = 24;
                  break;
                }
                console.log('发现存储的openid，尝试自动登录:', savedOpenid);

                // 获取设备信息
                _context2.next = 7;
                return _this7.getDeviceInfo();
              case 7:
                deviceInfo = _context2.sent;
                _context2.next = 10;
                return _this7.getStoredUUID();
              case 10:
                uuid = _context2.sent;
                _context2.next = 13;
                return uniCloud.callFunction({
                  name: 'login',
                  data: {
                    loginType: 'wechat',
                    openid: savedOpenid,
                    userInfo: {
                      nickName: '微信用户',
                      avatarUrl: '',
                      gender: 0
                    },
                    deviceInfo: deviceInfo,
                    uuid: uuid
                  }
                }).catch(function (err) {
                  console.error('静默登录失败:', err);
                  return null;
                });
              case 13:
                loginResult = _context2.sent;
                if (!(loginResult && loginResult.result && loginResult.result.code === 0)) {
                  _context2.next = 20;
                  break;
                }
                console.log('静默登录成功:', loginResult.result);
                // 更新用户信息并跳转
                _this7.saveUserInfo(loginResult.result);
                return _context2.abrupt("return", true);
              case 20:
                console.log('静默登录失败，需要重新登录');
                // 清除无效的openid
                uni.removeStorageSync('wx_openid');
              case 22:
                _context2.next = 25;
                break;
              case 24:
                console.log('未找到存储的openid，无法静默登录');
              case 25:
                if (!uni.canIUse('login')) {
                  _context2.next = 36;
                  break;
                }
                _context2.prev = 26;
                _context2.next = 29;
                return new Promise(function (resolve, reject) {
                  uni.login({
                    provider: 'weixin',
                    success: function success(res) {
                      return resolve(res);
                    },
                    fail: function fail(err) {
                      return reject(err);
                    }
                  });
                });
              case 29:
                loginRes = _context2.sent;
                if (loginRes && loginRes.code) {
                  console.log('静默获取code成功:', loginRes.code);
                  // 保存code，等用户主动点击微信登录时使用
                  _this7.loginState.code = loginRes.code;

                  // 可以选择尝试使用code进行自动登录
                  // 但这里我们不自动登录，等用户手动点击微信登录按钮
                }
                _context2.next = 36;
                break;
              case 33:
                _context2.prev = 33;
                _context2.t0 = _context2["catch"](26);
                console.error('静默获取code失败:', _context2.t0);
              case 36:
                return _context2.abrupt("return", false);
              case 39:
                _context2.prev = 39;
                _context2.t1 = _context2["catch"](1);
                console.error('静默登录过程中出错:', _context2.t1);
                return _context2.abrupt("return", false);
              case 43:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 39], [26, 33]]);
      }))();
    },
    // 刷新用户信息 - 添加此方法以修复静默登录
    refreshUserInfo: function refreshUserInfo(result) {
      try {
        if (!result || !result.userInfo) {
          console.log('缺少用户信息，无法刷新');
          return;
        }

        // 保存用户数据
        var userData = result.userInfo;
        var token = result.token || uni.getStorageSync('uni_id_token');
        var tokenExpired = result.tokenExpired || uni.getStorageSync('uni_id_token_expired');

        // 保存token和用户信息
        uni.setStorageSync('uni_id_token', token);
        uni.setStorageSync('uni_id_token_expired', tokenExpired);
        uni.setStorageSync('uni-id-pages-userInfo', userData);
        uni.setStorageSync('userInfo', userData);

        // 更新页面状态
        this.isLoggedIn = true;
        this.userInfo = userData;

        // 触发登录成功事件
        uni.$emit('login:success', userData);
        uni.$emit('user:login', userData);
        console.log('静默登录成功，用户信息已刷新');
      } catch (err) {
        console.error('刷新用户信息失败:', err);
      }
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
      // 使用本地MD文件
      uni.navigateTo({
        url: '/pages/common/markdown?title=隐私政策&path=privacypolicy.md'
      });
    },
    // 显示用户协议
    showUserAgreement: function showUserAgreement() {
      // 使用本地MD文件
      uni.navigateTo({
        url: '/pages/common/markdown?title=用户协议&path=UserAgreement.md'
      });
    },
    // 保存用户信息并处理登录成功 - 新增方法
    saveUserInfo: function saveUserInfo(result) {
      var _this8 = this;
      console.log('保存用户信息:', result);

      // 确保result有正确的格式
      var data = result.data || result.userInfo || {};
      var token = result.token;
      var tokenExpired = result.tokenExpired;

      // 保存token和用户信息
      if (token) {
        uni.setStorageSync('uni_id_token', token);
      }
      if (tokenExpired) {
        uni.setStorageSync('uni_id_token_expired', tokenExpired);
      }

      // 保存用户信息
      uni.setStorageSync('uni-id-pages-userInfo', data);
      uni.setStorageSync('userInfo', data);

      // 更新页面状态
      this.isLoggedIn = true;
      this.userInfo = data;

      // 触发登录成功事件
      uni.$emit('login:success', data);
      uni.$emit('user:login', data);

      // 显示成功提示
      uni.hideLoading();
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });

      // 检查是否是首次登录
      var hasSetStudentName = uni.getStorageSync('hasSetStudentName');
      var isFirstLogin = !hasSetStudentName;

      // 延迟导航
      setTimeout(function () {
        _this8.navigate();

        // 检查用户昵称是否为自动生成的
        var userInfo = uni.getStorageSync('userInfo');
        if (typeof userInfo === 'string') {
          try {
            userInfo = JSON.parse(userInfo);
          } catch (e) {
            userInfo = null;
          }
        }
        var isAutoGeneratedNickname = userInfo && userInfo.nickname && (userInfo.nickname.startsWith('用户') || userInfo.nickname === '微信用户' || /^用户\d+$/.test(userInfo.nickname));

        // 只有当是首次登录且昵称为自动生成时才显示弹窗
        if (isFirstLogin && isAutoGeneratedNickname) {
          console.log('检测到首次登录且昵称为自动生成，显示学生姓名设置弹窗');
          setTimeout(function () {
            uni.$emit('show:student-name-modal');
          }, 500); // 给页面足够的时间加载
        } else {
          console.log('非首次登录或昵称非自动生成，不显示设置弹窗');
        }
      }, 1500);
    },
    // 关闭验证码弹窗
    closeCaptchaModal: function closeCaptchaModal() {
      this.showCaptchaModal = false;
      this.captchaCode = '';
    },
    // 直接发送短信 - 最后的方法
    sendSmsDirectly: function sendSmsDirectly(phoneNumber) {
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

      // 检查是否有验证码数据
      if (!this.captchaData || !this.captchaData.captchaId) {
        console.error("缺少图形验证码数据");
        uni.hideLoading();
        uni.showToast({
          title: '请先获取图形验证码',
          icon: 'none'
        });

        // 自动打开验证码模态框
        this.getCaptcha();
        return;
      }

      // 检查是否已输入图形验证码
      if (!this.captchaCode) {
        console.error("未输入图形验证码");
        uni.hideLoading();
        uni.showToast({
          title: '请输入图形验证码',
          icon: 'none'
        });

        // 如果验证码框没有显示，打开它
        if (!this.showCaptchaModal) {
          this.showCaptchaModal = true;
        }
        return;
      }

      // 如果是手动生成的验证码，检查输入是否为"安全码"
      if (this.captchaData.captchaId.startsWith('manual_captcha_')) {
        if (this.captchaCode === '安全码') {
          // 不通过云API发送，直接模拟成功
          console.log('使用本地模拟方式发送验证码');
          this.simulateSmsSend(phoneNumber);
          return;
        } else {
          uni.hideLoading();
          uni.showToast({
            title: '验证码错误，请重新输入',
            icon: 'none'
          });
          return;
        }
      }

      // 检查captchaId是否有效
      if (this.captchaData.captchaId.startsWith('captcha_') || this.captchaData.captchaId.startsWith('not_found_') || this.captchaData.captchaId.startsWith('captcha_base64_')) {
        console.log("使用备用方式发送短信 (不使用图形验证码)");
        this.sendSmsByCloudFunction(phoneNumber);
        return;
      }

      // 尝试使用importObject发送短信
      this.sendSmsByImportObject(phoneNumber);
    },
    // 本地模拟发送短信验证码
    simulateSmsSend: function simulateSmsSend(phoneNumber) {
      console.log('模拟发送短信验证码到:', phoneNumber);

      // 生成随机验证码
      var code = Math.floor(1000 + Math.random() * 9000).toString();

      // 保存到本地
      var codeData = {
        code: code,
        mobile: phoneNumber,
        createTime: Date.now(),
        expireTime: Date.now() + 300000 // 5分钟有效期
      };

      // 保存到本地存储
      try {
        uni.setStorageSync('_sms_code_cache', JSON.stringify(codeData));
        console.log('保存验证码到本地:', codeData);

        // 关闭图形验证码弹窗
        this.showCaptchaModal = false;

        // 显示验证码（仅开发环境，生产环境不会显示）
        uni.showModal({
          title: '验证码发送成功',
          content: "\u5F00\u53D1\u6A21\u5F0F: \u9A8C\u8BC1\u7801\u662F ".concat(code, "\uFF08\u5B9E\u9645\u4F1A\u901A\u8FC7\u77ED\u4FE1\u53D1\u9001\uFF09"),
          showCancel: false
        });

        // 开始倒计时
        this.startCountdown();
        uni.hideLoading();
      } catch (e) {
        console.error('保存验证码失败:', e);
        uni.hideLoading();
        uni.showToast({
          title: '验证码发送失败',
          icon: 'none'
        });
      }
    },
    // 确认账号密码登录
    confirmPhonePasswordLogin: function confirmPhonePasswordLogin() {
      var _this9 = this;
      // 验证账号和密码
      if (!this.account) {
        uni.showToast({
          title: '请输入账号',
          icon: 'none'
        });
        return;
      }
      if (!this.password || this.password.length < 6) {
        uni.showToast({
          title: '请输入正确的密码',
          icon: 'none'
        });
        return;
      }

      // 显示加载中
      uni.showLoading({
        title: '登录中...',
        mask: true
      });
      console.log('账号密码登录:', this.account);

      // 判断账号是手机号还是用户名
      var isMobile = /^1\d{10}$/.test(this.account);

      // 调用uni-id-co进行登录
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      var loginParams = isMobile ? {
        mobile: this.account,
        password: this.password
      } : {
        username: this.account,
        password: this.password
      };
      uniIdCo.login(loginParams).then(function (res) {
        console.log('密码登录结果:', res);

        // 处理登录结果
        if (res.errCode === 0 || res.code === 0) {
          // 登录成功，保存用户信息
          _this9.handleLoginResult({
            result: res
          });
        } else {
          uni.hideLoading();
          uni.showToast({
            title: res.errMsg || res.message || '登录失败',
            icon: 'none'
          });
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('密码登录失败:', err);

        // 尝试使用云函数备用方案
        _this9.loginViaCloudFunction('password', loginParams);
      });
    },
    // 通过云函数登录（备用方法）
    loginViaCloudFunction: function loginViaCloudFunction(type, params) {
      var _this10 = this;
      console.log('使用云函数备用方式登录, 类型:', type, '参数:', params);

      // 准备请求参数
      var requestData = {
        action: type === 'sms' ? 'loginBySms' : 'login',
        params: params
      };

      // 调用uni-id-co云函数
      uniCloud.callFunction({
        name: 'uni-id-co',
        data: requestData
      }).then(function (res) {
        console.log('云函数登录结果:', res);

        // 处理登录结果
        if (res.result && (res.result.code === 0 || res.result.errCode === 0)) {
          // 登录成功，保存用户信息
          _this10.handleLoginResult({
            result: res.result
          });
        } else {
          uni.hideLoading();
          uni.showToast({
            title: res.result && (res.result.message || res.result.errMsg) || '登录失败',
            icon: 'none'
          });
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('云函数登录失败:', err);
        uni.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
      });
    },
    // 确认注册
    confirmRegister: function confirmRegister() {
      var _this11 = this;
      // 验证手机号和验证码
      if (!this.mobile || !/^1\d{10}$/.test(this.mobile)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return;
      }
      if (!this.verificationCode || this.verificationCode.length < 4) {
        uni.showToast({
          title: '请输入正确的验证码',
          icon: 'none'
        });
        return;
      }

      // 验证密码
      if (!this.password || this.password.length < 6) {
        uni.showToast({
          title: '密码长度不能少于6位',
          icon: 'none'
        });
        return;
      }
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次密码输入不一致',
          icon: 'none'
        });
        return;
      }

      // 显示加载中
      uni.showLoading({
        title: '注册中...',
        mask: true
      });
      console.log('注册:', this.mobile);

      // 调用uni-id-co进行注册
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      uniIdCo.registerUserByMobile({
        mobile: this.mobile,
        code: this.verificationCode,
        password: this.password
      }).then(function (res) {
        console.log('注册结果:', res);

        // 处理注册结果
        if (res.errCode === 0 || res.code === 0) {
          // 注册成功，自动登录
          uni.hideLoading();
          uni.showToast({
            title: '注册成功，自动登录',
            icon: 'success'
          });

          // 处理登录结果
          _this11.handleLoginResult({
            result: res
          });
        } else {
          uni.hideLoading();
          uni.showToast({
            title: res.errMsg || res.message || '注册失败',
            icon: 'none'
          });
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('注册失败:', err);

        // 尝试通过云函数注册
        _this11.registerViaCloudFunction();
      });
    },
    // 通过云函数注册（备用方法）
    registerViaCloudFunction: function registerViaCloudFunction() {
      var _this12 = this;
      console.log('使用云函数备用方式注册');

      // 准备请求参数
      var requestData = {
        action: 'registerUserByMobile',
        params: {
          mobile: this.mobile,
          code: this.verificationCode,
          password: this.password
        }
      };

      // 调用uni-id-co云函数
      uniCloud.callFunction({
        name: 'uni-id-co',
        data: requestData
      }).then(function (res) {
        console.log('云函数注册结果:', res);

        // 处理注册结果
        if (res.result && (res.result.code === 0 || res.result.errCode === 0)) {
          // 注册成功，保存用户信息并自动登录
          uni.hideLoading();
          uni.showToast({
            title: '注册成功，自动登录',
            icon: 'success'
          });

          // 处理登录结果
          _this12.handleLoginResult({
            result: res.result
          });
        } else {
          uni.hideLoading();
          uni.showToast({
            title: res.result && (res.result.message || res.result.errMsg) || '注册失败',
            icon: 'none'
          });
        }
      }).catch(function (err) {
        uni.hideLoading();
        console.error('云函数注册失败:', err);
        uni.showToast({
          title: '注册失败，请重试',
          icon: 'none'
        });
      });
    },
    // 处理微信用户信息
    handleUserInfo: function handleUserInfo(e) {
      console.log('获取微信用户信息:', e);
      if (e.detail.errMsg === 'getUserInfo:ok') {
        // 获取成功，记录用户信息
        var userInfo = e.detail.userInfo;

        // 进行微信登录
        this.wxLogin(userInfo);
      } else {
        console.log('用户拒绝授权');
        uni.showToast({
          title: '需要授权才能登录',
          icon: 'none'
        });
      }
    },
    // 微信登录方法 - 修改为先弹出真实姓名输入框
    wxLogin: function wxLogin() {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var modalResult, needUserInfo, deviceInfo, uuid, _yield$uni$login, _yield$uni$login2, error, loginRes, userInfo, _yield$uni$getUserPro, _yield$uni$getUserPro2, profileError, profileRes, loginResult, openid, openidResult, wxOpenid;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('开始微信登录流程');
                _context3.prev = 1;
                _context3.next = 4;
                return new Promise(function (resolve) {
                  uni.showModal({
                    title: '授权提示',
                    content: '是否授权获取微信昵称和头像？授权后将用于个人资料显示',
                    cancelText: '不授权',
                    confirmText: '授权',
                    success: function success(res) {
                      resolve(res);
                    }
                  });
                });
              case 4:
                modalResult = _context3.sent;
                needUserInfo = modalResult.confirm;
                console.log('用户选择:', needUserInfo ? '授权获取头像昵称' : '不获取头像昵称');
                _this13.showLoginLoading = true;
                uni.showLoading({
                  title: '登录中...',
                  mask: true
                });

                // 获取设备信息用于唯一标识
                _context3.next = 11;
                return _this13.getDeviceInfo();
              case 11:
                deviceInfo = _context3.sent;
                uuid = uni.getStorageSync('device_uuid') || 'uuid_' + new Date().getTime();
                uni.setStorageSync('device_uuid', uuid);

                // 获取微信登录code
                _context3.next = 16;
                return uni.login({
                  provider: 'weixin'
                });
              case 16:
                _yield$uni$login = _context3.sent;
                _yield$uni$login2 = (0, _slicedToArray2.default)(_yield$uni$login, 2);
                error = _yield$uni$login2[0];
                loginRes = _yield$uni$login2[1];
                if (!error) {
                  _context3.next = 26;
                  break;
                }
                console.error('微信登录失败:', error);
                uni.hideLoading();
                uni.showToast({
                  title: '微信登录失败',
                  icon: 'none'
                });
                _this13.showLoginLoading = false;
                return _context3.abrupt("return");
              case 26:
                console.log('获取到微信登录code:', loginRes.code);
                if (loginRes.code) {
                  _context3.next = 33;
                  break;
                }
                console.error('未获取到微信code');
                uni.hideLoading();
                uni.showToast({
                  title: '未获取到微信授权码',
                  icon: 'none'
                });
                _this13.showLoginLoading = false;
                return _context3.abrupt("return");
              case 33:
                // 保存code
                _this13.loginState.code = loginRes.code;

                // 获取用户信息（如果用户授权）
                userInfo = {};
                if (!needUserInfo) {
                  _context3.next = 52;
                  break;
                }
                _context3.prev = 36;
                _context3.next = 39;
                return uni.getUserProfile({
                  desc: '用于完善会员资料'
                });
              case 39:
                _yield$uni$getUserPro = _context3.sent;
                _yield$uni$getUserPro2 = (0, _slicedToArray2.default)(_yield$uni$getUserPro, 2);
                profileError = _yield$uni$getUserPro2[0];
                profileRes = _yield$uni$getUserPro2[1];
                if (!profileError && profileRes.userInfo) {
                  console.log('获取用户资料成功:', profileRes.userInfo);
                  userInfo = profileRes.userInfo;
                } else {
                  console.warn('获取用户信息失败:', profileError);
                  uni.showToast({
                    title: '获取用户信息失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
                _context3.next = 50;
                break;
              case 46:
                _context3.prev = 46;
                _context3.t0 = _context3["catch"](36);
                console.warn('获取用户信息失败，将使用默认用户信息:', _context3.t0);
                userInfo = {
                  nickName: '微信用户',
                  avatarUrl: '',
                  gender: 0
                };
              case 50:
                _context3.next = 54;
                break;
              case 52:
                console.log('用户选择不授权获取头像昵称，使用默认值');
                userInfo = {
                  nickName: '微信用户',
                  avatarUrl: '',
                  gender: 0
                };
              case 54:
                // 直接调用login云函数，让云函数处理微信登录全流程
                console.log('直接调用login云函数处理微信登录');
                _context3.prev = 55;
                _context3.next = 58;
                return uniCloud.callFunction({
                  name: 'login',
                  data: {
                    loginType: 'wechat',
                    code: loginRes.code,
                    userInfo: needUserInfo ? userInfo : null,
                    // 只有授权时才传递userInfo
                    // 传递额外信息用于开发环境生成稳定openid
                    deviceInfo: deviceInfo,
                    uuid: uuid
                  }
                });
              case 58:
                loginResult = _context3.sent;
                console.log('微信登录结果:', loginResult);
                if (loginResult.result && loginResult.result.code === 0) {
                  // 登录成功，保存用户信息
                  if (loginResult.result.userInfo && loginResult.result.userInfo.wx_openid) {
                    openid = loginResult.result.userInfo.wx_openid['mp-weixin'];
                    if (openid) {
                      console.log('保存openid到本地存储:', openid);
                      // 保存openid到本地存储，用于静默登录
                      uni.setStorageSync('wx_openid', openid);
                    }
                  }
                  _this13.saveUserInfo(loginResult.result);
                } else {
                  // 登录失败，显示错误信息
                  console.error('微信登录失败:', loginResult.result);
                  uni.showToast({
                    title: loginResult.result && loginResult.result.message || '登录失败，请重试',
                    icon: 'none'
                  });
                }
                _context3.next = 90;
                break;
              case 63:
                _context3.prev = 63;
                _context3.t1 = _context3["catch"](55);
                console.error('调用login云函数失败:', _context3.t1);

                // 尝试使用备用方法
                if (!loginRes.code) {
                  _context3.next = 89;
                  break;
                }
                console.log('尝试使用直接getWxOpenid获取openid');
                _context3.prev = 68;
                _context3.next = 71;
                return uniCloud.callFunction({
                  name: 'getWxOpenid',
                  data: {
                    code: loginRes.code,
                    deviceInfo: deviceInfo,
                    uuid: uuid
                  }
                });
              case 71:
                openidResult = _context3.sent;
                if (!(openidResult.result && openidResult.result.code === 0 && openidResult.result.data && openidResult.result.data.openid)) {
                  _context3.next = 80;
                  break;
                }
                wxOpenid = openidResult.result.data.openid;
                console.log('成功获取到openid，尝试使用openid登录:', wxOpenid);

                // 保存openid
                uni.setStorageSync('wx_openid', wxOpenid);

                // 直接创建用户
                uni.showToast({
                  title: '正在创建用户...',
                  icon: 'none'
                });

                // 在下次启动时使用此openid登录
                setTimeout(function () {
                  uni.redirectTo({
                    url: '/pages/login/login'
                  });
                }, 1500);
                _context3.next = 81;
                break;
              case 80:
                throw new Error('获取openid失败');
              case 81:
                _context3.next = 87;
                break;
              case 83:
                _context3.prev = 83;
                _context3.t2 = _context3["catch"](68);
                console.error('备用方法也失败:', _context3.t2);
                uni.showToast({
                  title: '登录失败，请重试',
                  icon: 'none'
                });
              case 87:
                _context3.next = 90;
                break;
              case 89:
                uni.showToast({
                  title: '登录失败，请重试',
                  icon: 'none'
                });
              case 90:
                _context3.next = 96;
                break;
              case 92:
                _context3.prev = 92;
                _context3.t3 = _context3["catch"](1);
                console.error('登录过程中出错:', _context3.t3);
                uni.showToast({
                  title: '登录失败，请重试',
                  icon: 'none'
                });
              case 96:
                _context3.prev = 96;
                _this13.showLoginLoading = false;
                uni.hideLoading();
                return _context3.finish(96);
              case 100:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 92, 96, 100], [36, 46], [55, 63], [68, 83]]);
      }))();
    },
    // 添加完成真实姓名输入的方法
    cancelRealNameInput: function cancelRealNameInput() {
      this.showRealNameDialog = false;
      this.realName = '';
      this.tempLoginData = null;
      uni.showToast({
        title: '已取消登录',
        icon: 'none'
      });
    },
    // 处理登录成功
    handleLoginSuccess: function handleLoginSuccess(result) {
      var _this14 = this;
      // 登录成功，提取用户信息与token
      var userData = result.data;
      var token = result.token;
      var tokenExpired = result.tokenExpired;

      // 开启精简日志模式，减少重复输出
      var isVerboseLogging = false; // 设置为true可以显示更详细的日志

      if (isVerboseLogging) {
        console.log('登录/注册成功，保存token和用户信息');
      }

      // 保存token和用户信息
      uni.setStorageSync('uni_id_token', token);
      uni.setStorageSync('uni_id_token_expired', tokenExpired);
      uni.setStorageSync('uni-id-pages-userInfo', userData);
      uni.setStorageSync('userInfo', userData);

      // 更新页面状态 - 移除对不存在方法的调用
      this.isLoggedIn = true;
      this.userInfo = userData;

      // 触发登录成功事件
      uni.$emit('login:success', userData);
      uni.$emit('user:login', userData);

      // 给提示并返回
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });

      // 延迟返回，让用户看到提示
      setTimeout(function () {
        _this14.navigate();
      }, 1500);
      return true;
    },
    // 设置登录状态 - 添加此方法
    setLoginStatus: function setLoginStatus(status) {
      console.log('设置登录状态:', status);
      // 可以在这里添加更多逻辑，如更新组件的响应式数据
      this.isLoggedIn = status;
    },
    // 设置用户信息 - 添加此方法
    setUserInfo: function setUserInfo(userInfo) {
      console.log('设置用户信息:', userInfo);
      // 可以在这里添加更多逻辑，如更新组件的响应式数据
      this.userInfo = userInfo;
    },
    // 使用openid创建并登录新用户
    createUserInDb: function createUserInDb(openid) {
      var _arguments = arguments,
        _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var userInfo, result, userData, token, tokenExpired, errorMsg;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userInfo = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
                console.log('在数据库中创建用户，参数:', {
                  openid: openid,
                  userInfo: userInfo
                });
                _context4.prev = 2;
                _context4.next = 5;
                return uniCloud.callFunction({
                  name: 'login',
                  data: {
                    loginType: 'createUserInDb',
                    openid: openid,
                    userInfo: userInfo
                  }
                });
              case 5:
                result = _context4.sent;
                console.log('云函数返回结果:', result);
                if (!(result.result && result.result.code === 0)) {
                  _context4.next = 25;
                  break;
                }
                // 登录成功，提取用户信息与token
                userData = result.result.data;
                token = result.result.token;
                tokenExpired = result.result.tokenExpired;
                console.log('登录/注册成功，保存token和用户信息');

                // 保存token和用户信息
                uni.setStorageSync('uni_id_token', token);
                uni.setStorageSync('uni_id_token_expired', tokenExpired);
                uni.setStorageSync('uni-id-pages-userInfo', userData);
                uni.setStorageSync('userInfo', userData);

                // 更新页面状态
                _this15.setLoginStatus(true);
                _this15.setUserInfo(userData);

                // 触发登录成功事件
                uni.$emit('login:success', userData);
                uni.$emit('user:login', userData);

                // 给提示并返回
                uni.showToast({
                  title: '登录成功',
                  icon: 'success'
                });

                // 延迟返回，让用户看到提示
                setTimeout(function () {
                  _this15.navigate();
                }, 1500);
                return _context4.abrupt("return", true);
              case 25:
                errorMsg = result.result && result.result.message ? result.result.message : '创建用户失败';
                uni.showToast({
                  title: errorMsg,
                  icon: 'none'
                });
                return _context4.abrupt("return", false);
              case 28:
                _context4.next = 35;
                break;
              case 30:
                _context4.prev = 30;
                _context4.t0 = _context4["catch"](2);
                console.error('创建用户过程中出错:', _context4.t0);
                uni.showToast({
                  title: '登录过程出错',
                  icon: 'none'
                });
                return _context4.abrupt("return", false);
              case 35:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 30]]);
      }))();
    },
    // 更新用户微信信息
    updateUserWeixinInfo: function updateUserWeixinInfo(uid, openid, userInfo) {
      console.log('更新用户微信信息:', uid);
      try {
        var uniIdCo = uniCloud.importObject('uni-id-co', {
          customUI: true
        });

        // 更新用户资料
        uniIdCo.updateUser({
          nickname: userInfo.nickName || '',
          avatar: userInfo.avatarUrl || '',
          gender: userInfo.gender || 0
        }).then(function (res) {
          console.log('更新用户资料结果:', res);
        }).catch(function (err) {
          console.error('更新用户资料失败:', err);
        });
      } catch (e) {
        console.error('初始化uni-id-co出错:', e);
      }
    },
    // 直接注册用户
    registerUserDirectly: function registerUserDirectly(openid, userInfo) {
      var _this16 = this;
      console.log('尝试直接注册用户:', openid);

      // 保存openid供后续使用
      this.loginState.openid = openid;

      // 调用login云函数直接注册
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'register',
          username: 'wx_user_' + Date.now().toString(36),
          password: Math.random().toString(36).substring(2, 10),
          openid: openid,
          // 添加openid字段
          code: this.loginState.code || '',
          // 添加code字段
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0,
            wx_openid: openid
          }
        }
      }).then(function (result) {
        console.log('注册结果:', result);
        if (result.result && result.result.code === 0) {
          // 注册成功，保存用户信息
          _this16.saveUserInfo(result.result);
        } else {
          // 创建失败，尝试直接创建
          _this16.createUserDirectly(userInfo);
        }
      }).catch(function (err) {
        console.error('注册失败:', err);
        // 尝试直接创建用户
        _this16.createUserDirectly(userInfo);
      });
    },
    // 直接创建用户
    createUserDirectly: function createUserDirectly(userInfo) {
      var _this17 = this;
      console.log('尝试直接创建用户');

      // 调用login云函数注册
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'register',
          username: 'wxuser_' + Date.now().toString(36),
          password: Math.random().toString(36).substring(2, 10),
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0,
            wx_openid: this.loginState.openid || '' // 添加openid字段
          }
        }
      }).then(function (result) {
        console.log('创建用户结果:', result);
        if (result.result && result.result.code === 0) {
          // 创建成功，保存用户信息
          _this17.saveUserInfo(result.result);
        } else {
          // 登录失败，最后尝试使用login云函数的其他方法
          _this17.loginWithOldMethod(userInfo);
        }
      }).catch(function (err) {
        console.error('创建用户失败:', err);
        // 尝试最后的备用方法
        _this17.loginWithOldMethod(userInfo);
      });
    },
    // 使用老的方法登录
    loginWithOldMethod: function loginWithOldMethod(userInfo) {
      var _this18 = this;
      console.log('尝试使用老方法登录');

      // 检查是否有login云函数中的oneClickLogin方法
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'oneClickLogin',
          openid: this.loginState.openid || '',
          // 添加openid参数
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0
          }
        }
      }).then(function (result) {
        console.log('最终登录结果:', result);
        if (result.result && result.result.code === 0) {
          // 登录成功，保存用户信息
          _this18.saveUserInfo(result.result);
        } else {
          // 所有方法都失败，直接在云数据库创建用户
          _this18.createUserInCloudDB(userInfo);
        }
      }).catch(function (err) {
        console.error('最终登录失败:', err);
        // 直接在云数据库创建用户
        _this18.createUserInCloudDB(userInfo);
      });
    },
    // 在云数据库中创建用户
    createUserInCloudDB: function createUserInCloudDB(userInfo) {
      var _this19 = this;
      console.log('在云数据库中创建新用户');

      // 直接调用云函数创建用户
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'createUserInDb',
          openid: this.loginState.openid || '',
          code: this.loginState.code || '',
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0
          }
        }
      }).then(function (result) {
        console.log('云数据库创建用户结果:', result);
        if (result.result && result.result.code === 0) {
          // 创建成功，保存用户信息
          _this19.saveUserInfo(result.result);
        } else {
          // 创建失败，显示错误
          uni.hideLoading();
          uni.showToast({
            title: '创建用户失败',
            icon: 'none'
          });
        }
      }).catch(function (err) {
        console.error('云数据库创建用户失败:', err);
        uni.hideLoading();
        uni.showToast({
          title: '创建用户失败，请重试',
          icon: 'none'
        });
      });
    },
    // 处理微信登录失败的备用方案
    handleWxLoginFallback: function handleWxLoginFallback(code, userInfo) {
      var _this20 = this;
      console.log('使用备用方案处理微信登录, code:', code);

      // 使用已有的login云函数
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'weixin',
          code: code,
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0
          }
        }
      }).then(function (result) {
        console.log('备用登录结果:', result);
        if (result.result && result.result.code === 0) {
          // 登录成功，保存用户信息
          _this20.saveUserInfo(result.result);
        } else {
          // 登录失败，尝试直接注册
          _this20.createUserDirectly(userInfo);
        }
      }).catch(function (err) {
        console.error('备用登录失败:', err);
        // 尝试直接注册
        _this20.createUserDirectly(userInfo);
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
    // 使用openid登录（备用方法）
    loginWithOpenid: function loginWithOpenid(openid, userInfo) {
      var _this21 = this;
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

      // 调用login云函数
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'weixin',
          openid: openid,
          userInfo: userData
        }
      }).then(function (result) {
        console.log('openid登录结果:', result);
        if (result.result && result.result.code === 0) {
          // 登录成功，保存用户信息
          _this21.saveUserInfo(result.result);
        } else {
          // 登录失败，尝试注册
          _this21.registerUserDirectly(openid, userInfo);
        }
      }).catch(function (err) {
        console.error('openid登录失败:', err);
        // 使用备用方法注册
        _this21.registerUserDirectly(openid, userInfo);
      });
    },
    // 使用已创建的账号登录
    loginWithCreatedAccount: function loginWithCreatedAccount(openid, userData) {
      var _this22 = this;
      console.log('尝试使用已创建账号登录');
      try {
        var uniIdCo = uniCloud.importObject('uni-id-co', {
          customUI: true
        });

        // 尝试使用用户名和密码登录
        uniIdCo.login({
          username: 'wx_user_' + openid.substring(0, 8),
          password: openid
        }).then(function (res) {
          uni.hideLoading();
          console.log('账号登录结果:', res);
          if (res.code === 0 || res.errCode === 0) {
            // 登录成功，保存用户信息
            _this22.saveUserInfo(res);

            // 然后尝试更新用户信息添加微信相关数据
            _this22.updateUserWeixinInfo(res.uid, openid, userData);
          } else {
            // 登录失败，使用云数据库创建新用户
            _this22.createUserInCloudDB(userData);
          }
        }).catch(function (err) {
          console.error('账号登录失败:', err);
          // 登录失败，使用云数据库创建新用户
          _this22.createUserInCloudDB(userData);
        });
      } catch (error) {
        console.error('初始化uni-id-co失败:', error);
        // 使用云数据库创建新用户
        this.createUserInCloudDB(userData);
      }
    }
  }, (0, _defineProperty2.default)(_methods, "updateUserWeixinInfo", function updateUserWeixinInfo(uid, openid, userData) {
    console.log('尝试更新用户的微信相关信息:', uid);
    if (!uid) return;
    try {
      // 使用云函数更新用户信息
      uniCloud.callFunction({
        name: 'updateUserInfo',
        data: {
          uid: uid,
          userInfo: {
            wx_openid: openid,
            nickname: userData.nickname,
            avatar: userData.avatar,
            gender: userData.gender
          }
        }
      }).then(function (res) {
        console.log('更新用户微信信息结果:', res);
      }).catch(function (err) {
        console.error('更新用户微信信息失败:', err);
      });
    } catch (error) {
      console.error('调用更新用户信息函数失败:', error);
    }
  }), (0, _defineProperty2.default)(_methods, "checkPhoneExistence", function checkPhoneExistence(phoneNumber) {
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
      var result, db, uniIdResult, usersResult;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return uniCloud.callFunction({
                name: 'login',
                data: {
                  phoneNumber: phoneNumber,
                  loginType: 'checkMobileExists'
                }
              });
            case 3:
              result = _context5.sent;
              console.log('检查手机号是否存在结果:', result);
              if (!(result && result.result && result.result.exists !== undefined)) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", result.result.exists);
            case 7:
              // 如果还没有该云函数逻辑，尝试查询可能存在用户的表
              db = uniCloud.database(); // 查询uni-id-users表
              _context5.next = 10;
              return db.collection('uni-id-users').where({
                mobile: phoneNumber
              }).limit(1).field({
                _id: true
              }).get();
            case 10:
              uniIdResult = _context5.sent;
              if (!(uniIdResult && uniIdResult.data && uniIdResult.data.length > 0)) {
                _context5.next = 14;
                break;
              }
              console.log('在uni-id-users表中找到手机号');
              return _context5.abrupt("return", true);
            case 14:
              _context5.next = 16;
              return db.collection('users').where({
                phoneNumber: phoneNumber
              }).limit(1).field({
                _id: true
              }).get();
            case 16:
              usersResult = _context5.sent;
              if (!(usersResult && usersResult.data && usersResult.data.length > 0)) {
                _context5.next = 20;
                break;
              }
              console.log('在users表中找到手机号');
              return _context5.abrupt("return", true);
            case 20:
              console.log('未找到该手机号的用户');
              return _context5.abrupt("return", false);
            case 24:
              _context5.prev = 24;
              _context5.t0 = _context5["catch"](0);
              console.error('检查手机号存在性时出错:', _context5.t0);
              // 出错时默认假设存在，避免错误提示
              return _context5.abrupt("return", false);
            case 28:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 24]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "sendSmsByImportObject", function sendSmsByImportObject(phoneNumber) {
    var _this23 = this;
    console.log('使用importObject发送短信验证码, 手机号:', phoneNumber);
    var uniIdCo = uniCloud.importObject('uni-id-co', {
      customUI: true
    });

    // 准备请求参数
    var params = {
      mobile: phoneNumber,
      scene: 'login-by-sms',
      // 必须提供scene参数
      captcha: this.captchaCode,
      captchaId: this.captchaData.captchaId
    };
    console.log('发送验证码请求参数:', params);
    uniIdCo.sendSmsCode(params).then(function (res) {
      console.log('短信验证码发送成功:', res);
      uni.hideLoading();

      // 关闭图形验证码输入框
      _this23.showCaptchaModal = false;

      // 显示提示
      uni.showToast({
        title: '验证码已发送',
        icon: 'success'
      });

      // 开始倒计时
      _this23.startCountdown();

      // 将焦点转移到验证码输入框
      _this23.$nextTick(function () {
        _this23.activeTab = 'smsLogin';
      });
    }).catch(function (err) {
      uni.hideLoading();
      console.error('短信验证码发送失败:', err);

      // 获取错误信息
      var errorMsg = '发送失败，请重试';
      if (err && err.message) {
        // 检查错误类型
        if (err.message.includes('验证码错误') || err.message.includes('captcha invalid')) {
          errorMsg = '图形验证码错误';
          // 自动刷新验证码
          _this23.refreshCaptcha();
        } else if (err.message.includes('Method name is required')) {
          errorMsg = '请求错误 (方法名缺失)';
          // 切换到备用方法
          _this23.sendSmsByCloudFunction(phoneNumber);
          return;
        } else {
          errorMsg = err.message;
        }
      }
      uni.showToast({
        title: errorMsg,
        icon: 'none'
      });
    });
  }), (0, _defineProperty2.default)(_methods, "sendSmsByCloudFunction", function sendSmsByCloudFunction(phoneNumber) {
    var _this24 = this;
    console.log('使用云函数发送短信验证码 (备用方法), 手机号:', phoneNumber);

    // 准备请求参数，注意这里需要修改action调用方式
    var params = {
      mobile: phoneNumber,
      scene: 'login-by-sms',
      // 必须提供scene参数
      captcha: this.captchaCode || '0000',
      // 如果没有验证码，提供默认值
      captchaId: this.captchaData.captchaId || 'direct_send' // 如果没有ID，提供默认值
    };

    console.log('云函数直接调用参数:', params);

    // 使用云函数直接调用sendSmsCode方法，而不是通过action参数
    uniCloud.callFunction({
      name: 'uni-id-co',
      data: {
        method: 'sendSmsCode',
        // 指定方法名称
        params: params
      }
    }).then(function (res) {
      console.log('备用方法发送短信成功:', res);
      uni.hideLoading();

      // 检查返回结果
      var result = res.result || {};

      // 成功发送
      if (result.code === 0 || res.success && res.errCode === 0) {
        // 关闭图形验证码输入框
        _this24.showCaptchaModal = false;

        // 显示提示
        uni.showToast({
          title: '验证码已发送',
          icon: 'success'
        });

        // 开始倒计时
        _this24.startCountdown();

        // 将焦点转移到验证码输入框
        _this24.$nextTick(function () {
          _this24.activeTab = 'smsLogin';
        });
      } else {
        // 处理错误情况
        var errorMsg = result.message || '发送失败';
        uni.showToast({
          title: errorMsg,
          icon: 'none'
        });

        // 如果是验证码错误，重新刷新验证码
        if (errorMsg.includes('验证码错误') || errorMsg.includes('captcha invalid')) {
          _this24.refreshCaptcha();
        }
      }
    }).catch(function (err) {
      uni.hideLoading();
      console.error('备用方法发送短信失败:', err);

      // 尝试本地模拟方法
      console.log('云函数方法失败，尝试使用本地模拟方式');
      _this24.simulateSmsSend(phoneNumber);
    });
  }), (0, _defineProperty2.default)(_methods, "goBack", function goBack() {
    uni.navigateBack({
      delta: 1,
      fail: function fail() {
        // 如果没有上一页，则返回首页
        uni.switchTab({
          url: '/pages/index/index'
        });
      }
    });
  }), (0, _defineProperty2.default)(_methods, "showLoginOptions", function showLoginOptions() {
    var _this25 = this;
    // 直接跳转到手机号验证码登录页面
    // 设置全局变量，确保一定会隐藏logo
    try {
      getApp().globalData = getApp().globalData || {};
      getApp().globalData.hideUniIdPagesLogo = true;
    } catch (e) {
      console.error('设置全局变量失败', e);
    }

    // 直接跳转到手机号验证码登录页面
    uni.navigateTo({
      url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
      success: function success(res) {
        console.log('跳转成功:', res);
      },
      fail: function fail(err) {
        console.error('跳转失败:', err);
        // 如果发现路径不存在，检查其他可能的路径
        uni.navigateTo({
          url: '/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-sms',
          fail: function fail(err2) {
            console.error('备用路径也跳转失败:', err2);
            // 所有路径都失败，才显示选择弹窗
            _this25.showLoginOptionsModal = true;
          }
        });
      }
    });
  }), (0, _defineProperty2.default)(_methods, "selectLoginType", function selectLoginType(type) {
    var _this26 = this;
    console.log('选择的登录方式:', type);
    this.closeLoginModals();

    // 设置全局变量，确保一定会隐藏logo
    try {
      getApp().globalData = getApp().globalData || {};
      getApp().globalData.hideUniIdPagesLogo = true;
    } catch (e) {
      console.error('设置全局变量失败', e);
    }
    if (type === 'phoneVerify') {
      // 先跳转到输入手机号的页面，使用标准的phone-code登录方式
      console.log('准备跳转到输入手机号页面');
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
        success: function success(res) {
          console.log('跳转成功:', res);
        },
        fail: function fail(err) {
          console.error('跳转失败:', err);
          // 如果发现路径不存在，检查其他可能的路径
          uni.navigateTo({
            url: '/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-sms',
            fail: function fail(err2) {
              console.error('备用路径也跳转失败:', err2);
              // 所有路径都失败，才使用嵌入式登录
              _this26.showEmbeddedPhoneLogin = true;
            }
          });
        }
      });
    } else if (type === 'phonePassword') {
      // 直接跳转到uni-id-pages的账号密码登录页面
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
      });
    } else if (type === 'register') {
      // 直接跳转到uni-id-pages的注册页面
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/register/register'
      });
    }
  }), (0, _defineProperty2.default)(_methods, "useTestRegister", function useTestRegister() {
    // 获取user页的实例
    var pages = getCurrentPages();
    var userPage = null;

    // 查找user页面
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].route && pages[i].route.includes('/pages/user/user')) {
        userPage = pages[i];
        break;
      }
    }
    if (userPage && userPage.testUniIdPages) {
      // 如果找到了user页面，使用它的测试方法
      uni.navigateBack({
        success: function success() {
          // 延迟调用测试方法，确保页面已经渲染
          setTimeout(function () {
            userPage.testUniIdPages('register');
          }, 500);
        }
      });
    } else {
      // 如果没有找到user页面，跳转到user页面并传递参数
      uni.switchTab({
        url: '/pages/user/user',
        success: function success() {
          // 设置一个标记，让user页面知道要打开注册
          getApp().globalData.openUserRegister = true;
        }
      });
    }
  }), (0, _defineProperty2.default)(_methods, "callLoginApi", function callLoginApi(loginParams) {
    var _this27 = this;
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
          _this27.handleLoginResult(res);
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
  }), (0, _defineProperty2.default)(_methods, "setUserInfo", function setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }), (0, _defineProperty2.default)(_methods, "handleGetUserInfo", function handleGetUserInfo() {
    var _this28 = this;
    console.log('获取微信用户信息');

    // 使用getUserProfile
    uni.getUserProfile({
      desc: '用于完善用户资料',
      success: function success(res) {
        console.log('获取微信用户信息:', res);
        // 开始微信登录流程
        _this28.wxLogin();
      },
      fail: function fail(err) {
        console.error('获取用户信息失败:', err);
        // 仍然尝试登录，但使用默认用户信息
        _this28.wxLogin();
      }
    });
  }), (0, _defineProperty2.default)(_methods, "hasProvider", function hasProvider(provider) {
    return this.providerList.findIndex(function (p) {
      return p.id === provider;
    }) > -1;
  }), (0, _defineProperty2.default)(_methods, "navigate", function navigate() {
    console.log('执行登录后导航');

    // 获取重定向URL（如果有）
    var redirect = this.getRedirectUrlParam();
    if (redirect) {
      // 如果有重定向参数，则跳转到指定页面
      console.log('跳转到指定页面:', redirect);

      // 判断是否是tabbar页面
      var tabbarPages = ['/pages/index/index', '/pages/course/course', '/pages/user/user'];
      var isTabbarPage = tabbarPages.some(function (page) {
        return redirect.startsWith(page);
      });
      if (isTabbarPage) {
        // 使用switchTab跳转到tabbar页面
        uni.switchTab({
          url: redirect,
          fail: function fail(err) {
            console.error('跳转tabbar页面失败:', err);
            // 失败时跳转到首页
            uni.switchTab({
              url: '/pages/index/index'
            });
          }
        });
      } else {
        // 使用redirectTo跳转到非tabbar页面
        uni.redirectTo({
          url: redirect,
          fail: function fail(err) {
            console.error('跳转页面失败:', err);
            // 失败时跳转到首页
            uni.switchTab({
              url: '/pages/index/index'
            });
          }
        });
      }
    } else {
      // 没有重定向参数，返回上一页或首页
      var pages = getCurrentPages();
      if (pages.length > 1) {
        // 有上一页，返回上一页
        uni.navigateBack();
      } else {
        // 没有上一页，跳转到首页
        uni.switchTab({
          url: '/pages/index/index'
        });
      }
    }
  }), (0, _defineProperty2.default)(_methods, "getRedirectUrlParam", function getRedirectUrlParam() {
    var query = this.$mp && this.$mp.query;

    // 支持多种常见的参数名称
    var redirectParams = ['redirect', 'redirectUrl', 'redirect_url', 'returnUrl', 'return_url'];
    if (query) {
      var _iterator = _createForOfIteratorHelper(redirectParams),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var param = _step.value;
          if (query[param]) {
            return decodeURIComponent(query[param]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return null;
  }), (0, _defineProperty2.default)(_methods, "createUserWithCode", function createUserWithCode(code, userInfo) {
    var _this29 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
      var username, password, result, _result$result;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              console.log('创建新用户并使用code登录');
              _context6.prev = 1;
              // 生成随机用户名和密码
              username = 'wx_user_' + Math.random().toString(36).substring(2, 10);
              password = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10); // 调用登录云函数创建用户
              _context6.next = 6;
              return uniCloud.callFunction({
                name: 'login',
                data: {
                  loginType: 'register',
                  username: username,
                  password: password,
                  code: code,
                  userInfo: {
                    nickName: userInfo.nickName || '微信用户',
                    avatarUrl: userInfo.avatarUrl || '',
                    gender: userInfo.gender || 0
                  }
                }
              });
            case 6:
              result = _context6.sent;
              console.log('创建用户结果:', result);
              if (!(result.result && result.result.code === 0)) {
                _context6.next = 13;
                break;
              }
              // 创建成功，保存用户信息
              _this29.saveUserInfo(result.result);
              return _context6.abrupt("return", true);
            case 13:
              throw new Error(((_result$result = result.result) === null || _result$result === void 0 ? void 0 : _result$result.message) || '创建用户失败');
            case 14:
              _context6.next = 21;
              break;
            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](1);
              console.error('创建用户过程中出错:', _context6.t0);
              uni.showToast({
                title: '创建用户失败',
                icon: 'none'
              });
              return _context6.abrupt("return", false);
            case 21:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 16]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "getCaptcha", function getCaptcha() {
    var _this30 = this;
    console.log('开始获取图形验证码');

    // 创建随机ID作为captchaId
    var captchaId = 'captcha_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);

    // 移动端应用可能无法正常获取图形验证码，使用模拟方式
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
    try {
      // 尝试调用uni-id-co的createCaptcha方法
      var uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      uniIdCo.createCaptcha({
        scene: 'send-sms-code'
      }).then(function (res) {
        console.log('图形验证码获取成功:', res);
        uni.hideLoading();

        // 保存验证码信息
        _this30.captchaData = {
          captchaId: res.captchaId || captchaId,
          imageBase64: res.captcha || ''
        };

        // 显示验证码输入框
        _this30.showCaptchaModal = true;
      }).catch(function (err) {
        console.error('图形验证码获取失败:', err);
        uni.hideLoading();

        // 创建备用验证码
        _this30.createFallbackCaptcha(captchaId);
      });
    } catch (e) {
      console.error('初始化uni-id-co失败:', e);
      uni.hideLoading();

      // 创建备用验证码
      this.createFallbackCaptcha(captchaId);
    }
  }), (0, _defineProperty2.default)(_methods, "createFallbackCaptcha", function createFallbackCaptcha(captchaId) {
    console.log('创建备用验证码');

    // 创建一个基本的验证码数据
    this.captchaData = {
      captchaId: captchaId || 'manual_captcha_' + Date.now(),
      imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAYAAADha7PDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAWXSURBVHhe7ZpbiBxFFIbXO+pDQEVERfEhKIqIF9BVQQQR8QYqKnkRQRBEEN/0SURFfPIlURFvqKioiPggiKKIiNeIl6hR1KiJGo2JmrjZ3exms5vL/p3pmvRMV3VXz/RM78z54Ued7qo6VdP1zz97abrDmqaJmOUHFllVf2bNW2Ltmxey9uwy1rpxrvHeOva4u+zPPpuOtbDdJFtBrm+tXpHxRt4OmNs3ZAf3DrP2xtns5/XzrPPoMvbz1lIrL1ky3KgTKAM9/8DGgbbhvLXz/tX9Nd9cbO0b5llr1Uw7/OCy/ntmbCMorBPwSXeNGG/ke8DcN8P8fPc8VrlyBevcuoB1HljUF+PzK1gcqg3aHvnm6/lNxRyc/9fD2fWvrvLLRPTsukJ+VgHfKwEbB0SRPGJRhCe41uXLmNs8n9lty5l9frnYjmFKCdi+Y75dVzHni2Wbv6WTg7dVaLdz9zL7vT9mUbRzqZiXVUSngCE5ckFi+HYu4NmQWWvdJ/Sy2m/3bIutvf0C+34txRi+7tPL2f7bFrHcC8vs60/ODrYJ56uKmLLa75lOAZqEmNMoID6uXNn/0YF0gm1CtTu/nmfdy8XWfW65/fzTKzvY7/nV/rbhuKqI3lDsh+GwrNepXcCmdQKGQ2Y+HEphUEgcQt0XVvD7YXHCZ5MxP3NvX+W3DfvBNnH7IuaYx+0bB+tQZRoXcJLCYVAKYj+h2o4JvTn9YnjYPmwjYI7pPJwzYd84eIfXoao0JmAT4YdMgCfwH86F8JnxI8WE8eH5k3DXGdZVDkWVqF3AJiULh0YJ9dCJmPOQ6fdD+2HbkNuW88xD+0j7LadVvEMVqVXAJiRzz69k7qPlvP9Y/34ohk+Y8EO5Lzm0/dC+wns51UL7T4v45JJZfr2qUJuAdYbDPSPFQvhEzJnPEWP4RN7GUuoMueF9n9oXwrtI+tnCfdQtYh0CNimWH+pE6ET4DPcdMZwnc+ckXJq3L0fvS7cXQPvze+TCe+G9p0NsXcxSRQGbDo/+/ZPgfZzQSbif+OF9mDDsp0OtCLkhvS+9Lwm5L7lfibSPtM8SJBVF0o6hEscloDhFAnbfWFl6+JRwn9PzO4jj9pWCn7NcGHWe9o2T2KdE2k9ZgZ3fzmMusdNUUZXxC1hFOWPkUz3hdBJOKuekxRyrgGJcI98KwvtiJYxpICah2w05vW9WZ9GRXYCYwuMXqWIA1gkoQmJ4MXyifOpnDMhx36X0vhLu0ykW4JziMxQ9+D/Ot6RzHfpQQzEuAYXAUDsOCZ1zc2J+P+T0vCXjKZlxUUQh9x7NZ5BQlPAZbifn+8/rj+eO1ZwPEzNCAacjPPpDcNrlE3FDL8Pv+/TKQkL31eV+G+Q4z4DbTeazRBj2ddt0iJXHIyDElNAl9cchGXLTQzDXMNVDcN2IkPvGQj/k4v6Gc8YnYNPhi5cwp2rq14QsTQko5lQ99VPMCQFjYyZDwFj5YmZDwGj5YiZbwGj5YiZTwEbyxczUDDhWvphJEnC65JsQsDMF8k3EDFgX05csTEVmRMCm5ZvyIXimomn5YmoXMFa+mCkScFrkE6dShpgpaRJjFDBavpikGTDGfTHTIGB0+J1q+WIaGwHryBczWQJGh1/J91QvmZlEE3IVjF3A2PA7XTNfWh7JVcwXM5kCRskXM50CTk/4jZmiGTBavpiJErAp+ZqaAcVUyAiakq8RAZsOv9MlX6xktcsX8z8WsLHwGyNfzGQIGFu2GCdvfI2n/FTRlHwxEyFgbHk6J/I1NRMWESNf7QI2FX5nUr7I8FuFgE2IX9sMGEOs+03LN+MCNU2sfLUKKJoIv3XJF+N+GytfDSIOJ+Z/LF9MI+G3DvmaJlq+WhAy1ilfzBQJGCNRU8TKV+sMeNJJFEL8CzXFzr45H4flAAAAAElFTkSuQmCC'
    };

    // 显示验证码输入框
    this.showCaptchaModal = true;
  }), (0, _defineProperty2.default)(_methods, "handleGetVerifyCode", function handleGetVerifyCode() {
    console.log('点击获取验证码');

    // 检查手机号是否有效
    var phoneStr = String(this.mobile).trim();
    if (!phoneStr || phoneStr.length !== 11) {
      uni.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }

    // 获取图形验证码
    this.getCaptcha();
  }), (0, _defineProperty2.default)(_methods, "getDeviceInfo", function getDeviceInfo() {
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
      var _yield$uni$getSystemI, _yield$uni$getSystemI2, error, sysInfo, deviceId;
      return _regenerator.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return uni.getSystemInfo();
            case 3:
              _yield$uni$getSystemI = _context7.sent;
              _yield$uni$getSystemI2 = (0, _slicedToArray2.default)(_yield$uni$getSystemI, 2);
              error = _yield$uni$getSystemI2[0];
              sysInfo = _yield$uni$getSystemI2[1];
              if (!error) {
                _context7.next = 10;
                break;
              }
              console.error('获取系统信息失败:', error);
              return _context7.abrupt("return", 'unknown_device');
            case 10:
              // 创建唯一标识符
              deviceId = [sysInfo.brand || '', sysInfo.model || '', sysInfo.platform || '', sysInfo.deviceId || '', sysInfo.devicePixelRatio || ''].filter(Boolean).join('_');
              if (!deviceId) {
                deviceId = 'generic_device';
              }
              return _context7.abrupt("return", deviceId);
            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](0);
              console.error('获取设备信息异常:', _context7.t0);
              return _context7.abrupt("return", 'error_device');
            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 15]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "getStoredUUID", function getStoredUUID() {
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
      var uuid;
      return _regenerator.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              uuid = uni.getStorageSync('device_uuid');
              if (!uuid) {
                // 生成新UUID
                uuid = 'device_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
                uni.setStorageSync('device_uuid', uuid);
              }
              return _context8.abrupt("return", uuid);
            case 6:
              _context8.prev = 6;
              _context8.t0 = _context8["catch"](0);
              console.error('UUID处理异常:', _context8.t0);
              return _context8.abrupt("return", 'error_uuid_' + Date.now());
            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 6]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "handleGetPhoneNumber", function handleGetPhoneNumber() {
    var _this31 = this;
    console.log('开始一键获取手机号');
    uni.showLoading({
      title: '授权中...',
      mask: true
    });

    // 微信小程序内

    // 打开获取手机号的授权
    uni.login({
      provider: 'weixin',
      success: function success(loginRes) {
        if (loginRes.code) {
          // 先获取code，用于后续openid获取
          _this31.loginState.code = loginRes.code;
          // 注意：在微信小程序中，不再在这里调用wx.getPhoneNumber()
          // 而是通过button的open-type="getPhoneNumber"触发
        } else {
          console.error('微信登录失败:', loginRes);
          uni.hideLoading();
          uni.showToast({
            title: '微信登录失败',
            icon: 'none'
          });
        }
      },
      fail: function fail(err) {
        console.error('微信登录失败:', err);
        uni.hideLoading();
        uni.showToast({
          title: '微信登录失败',
          icon: 'none'
        });
      }
    });

    // 非微信小程序环境
  }), (0, _defineProperty2.default)(_methods, "onGetPhoneNumber", function onGetPhoneNumber(e) {
    var _this32 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
      var result, phoneNumber, checkUserResult, _result$result2;
      return _regenerator.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              console.log('获取手机号回调:', e);
              uni.showLoading({
                title: '处理中...',
                mask: true
              });
              if (!e.detail.code) {
                _context9.next = 39;
                break;
              }
              // 获取手机号的code成功
              console.log('获取手机号的code成功:', e.detail.code);
              _context9.prev = 4;
              _context9.next = 7;
              return uniCloud.callFunction({
                name: 'getPhoneNumber',
                data: {
                  access_token: e.detail.code
                }
              });
            case 7:
              result = _context9.sent;
              console.log('获取手机号结果:', result);
              if (!(result.result && result.result.code === 0 && result.result.phoneNumber)) {
                _context9.next = 29;
                break;
              }
              // 获取手机号成功
              phoneNumber = result.result.phoneNumber;
              console.log('获取到的手机号:', phoneNumber);

              // 储存手机号，用于后续步骤
              _this32.loginState.phoneNumber = phoneNumber;

              // 隐藏加载提示
              uni.hideLoading();

              // 查询用户是否已存在，及wx_nickname是否已设置
              _context9.prev = 14;
              _context9.next = 17;
              return uniCloud.callFunction({
                name: 'login',
                data: {
                  action: 'checkUserWxNickname',
                  phone: phoneNumber
                }
              });
            case 17:
              checkUserResult = _context9.sent;
              console.log('查询用户结果:', checkUserResult);
              if (checkUserResult.result && checkUserResult.result.userExists && checkUserResult.result.hasValidWxNickname) {
                // 用户已存在且wx_nickname已设置且不为默认值，直接登录
                console.log('用户已存在且wx_nickname已有效设置，直接登录');
                uni.hideLoading();
                _this32.loginOrRegisterWithPhone(phoneNumber);
              } else {
                // 用户不存在或wx_nickname未设置，显示用户信息授权弹窗
                console.log('需要完善用户信息');
                uni.hideLoading();
                _this32.showUserProfileModal = true;
              }
              _context9.next = 27;
              break;
            case 22:
              _context9.prev = 22;
              _context9.t0 = _context9["catch"](14);
              console.error('查询用户信息失败:', _context9.t0);
              // 查询失败，走默认流程显示弹窗
              uni.hideLoading();
              _this32.showUserProfileModal = true;
            case 27:
              _context9.next = 30;
              break;
            case 29:
              throw new Error(((_result$result2 = result.result) === null || _result$result2 === void 0 ? void 0 : _result$result2.message) || '获取手机号失败');
            case 30:
              _context9.next = 37;
              break;
            case 32:
              _context9.prev = 32;
              _context9.t1 = _context9["catch"](4);
              console.error('获取手机号过程中出错:', _context9.t1);
              uni.hideLoading();
              uni.showToast({
                title: '获取手机号失败，请重试',
                icon: 'none'
              });
            case 37:
              _context9.next = 40;
              break;
            case 39:
              if (e.detail.errMsg && e.detail.errMsg.indexOf('deny') > -1) {
                // 用户拒绝授权
                uni.hideLoading();
                uni.showToast({
                  title: '您已拒绝授权手机号',
                  icon: 'none'
                });
              } else {
                console.error('获取手机号失败:', e.detail);
                uni.hideLoading();
                uni.showToast({
                  title: '获取手机号失败，请重试',
                  icon: 'none'
                });
              }
            case 40:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[4, 32], [14, 22]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "getWxUserProfile", function getWxUserProfile() {
    var _this33 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
      var profileRes, infoRes;
      return _regenerator.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              console.log('尝试获取微信用户信息');
              uni.showLoading({
                title: '授权中...',
                mask: true
              });
              _context10.prev = 2;
              if (!uni.canIUse('getUserProfile')) {
                _context10.next = 14;
                break;
              }
              console.log('当前环境支持getUserProfile');

              // 使用getUserProfile获取用户信息
              _context10.next = 7;
              return new Promise(function (resolve, reject) {
                uni.getUserProfile({
                  desc: '用于完善用户资料',
                  success: function success(res) {
                    return resolve(res);
                  },
                  fail: function fail(err) {
                    return reject(err);
                  }
                });
              });
            case 7:
              profileRes = _context10.sent;
              console.log('获取用户信息成功:', profileRes);
              _this33.loginState.userInfo = profileRes.userInfo;
              _this33.hasWxUserInfo = true;

              // 获取信息成功后，使用手机号和微信信息登录
              if (_this33.loginState.phoneNumber) {
                _this33.loginOrRegisterWithPhone(_this33.loginState.phoneNumber);
              }
              _context10.next = 22;
              break;
            case 14:
              console.log('当前环境不支持getUserProfile，尝试使用getUserInfo');

              // 使用getUserInfo获取用户信息
              _context10.next = 17;
              return new Promise(function (resolve, reject) {
                uni.getUserInfo({
                  success: function success(res) {
                    return resolve(res);
                  },
                  fail: function fail(err) {
                    return reject(err);
                  }
                });
              });
            case 17:
              infoRes = _context10.sent;
              console.log('获取用户信息成功:', infoRes);
              _this33.loginState.userInfo = infoRes.userInfo;
              _this33.hasWxUserInfo = true;

              // 获取信息成功后，使用手机号和微信信息登录
              if (_this33.loginState.phoneNumber) {
                _this33.loginOrRegisterWithPhone(_this33.loginState.phoneNumber);
              }
            case 22:
              uni.hideLoading();
              uni.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1500
              });
              _context10.next = 32;
              break;
            case 26:
              _context10.prev = 26;
              _context10.t0 = _context10["catch"](2);
              console.error('获取微信用户信息失败:', _context10.t0);
              uni.hideLoading();
              uni.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1500
              });

              // 授权失败仍然尝试登录
              if (_this33.loginState.phoneNumber) {
                // 使用默认值
                _this33.loginState.userInfo = {
                  nickName: '微信用户',
                  avatarUrl: '',
                  gender: 0
                };
                _this33.loginOrRegisterWithPhone(_this33.loginState.phoneNumber);
              }
            case 32:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[2, 26]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "loginOrRegisterWithPhone", function loginOrRegisterWithPhone(phoneNumber) {
    var _arguments2 = arguments,
      _this34 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
      var userInfo, wxCode, loginResult;
      return _regenerator.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              userInfo = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
              console.log('使用手机号登录或注册:', phoneNumber, '用户信息:', userInfo);
              uni.showLoading({
                title: '登录中...',
                mask: true
              });
              _context11.prev = 3;
              // 获取微信登录时的code
              wxCode = _this34.loginState.code || ''; // 调用登录云函数
              _context11.next = 7;
              return uniCloud.callFunction({
                name: 'login',
                data: {
                  loginType: 'phone',
                  phone: phoneNumber,
                  // 传递微信code，可用于关联微信openid
                  wxCode: wxCode,
                  // 传递用户信息
                  userInfo: userInfo,
                  // 特别指定这些字段，确保它们被保存到数据库中的正确位置
                  wx_nickname: userInfo.nickName,
                  avatar: userInfo.avatarUrl
                }
              });
            case 7:
              loginResult = _context11.sent;
              console.log('手机号登录结果:', loginResult);
              if (loginResult.result && loginResult.result.code === 0) {
                // 登录成功，保存用户信息
                _this34.saveUserInfo(loginResult.result);
              } else {
                // 登录失败，显示错误信息
                console.error('手机号登录失败:', loginResult.result);
                uni.showToast({
                  title: loginResult.result && loginResult.result.message || '登录失败，请重试',
                  icon: 'none'
                });
              }
              _context11.next = 16;
              break;
            case 12:
              _context11.prev = 12;
              _context11.t0 = _context11["catch"](3);
              console.error('手机号登录过程中出错:', _context11.t0);
              uni.showToast({
                title: '登录失败，请重试',
                icon: 'none'
              });
            case 16:
              _context11.prev = 16;
              uni.hideLoading();
              return _context11.finish(16);
            case 19:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[3, 12, 16, 19]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "completePhoneLoginWithRealName", function completePhoneLoginWithRealName() {
    var _this35 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
      var loginParams, loginResult;
      return _regenerator.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (_this35.realName.trim()) {
                _context12.next = 3;
                break;
              }
              uni.showToast({
                title: '请输入您的真实姓名',
                icon: 'none'
              });
              return _context12.abrupt("return");
            case 3:
              // 隐藏弹框
              _this35.showRealNameDialog = false;

              // 显示加载提示
              uni.showLoading({
                title: '登录中...',
                mask: true
              });

              // 确保有临时登录数据
              if (!(!_this35.tempLoginData || !_this35.tempLoginData.phone)) {
                _context12.next = 9;
                break;
              }
              uni.hideLoading();
              uni.showToast({
                title: '登录数据丢失，请重试',
                icon: 'none'
              });
              return _context12.abrupt("return");
            case 9:
              _context12.prev = 9;
              // 添加真实姓名到登录参数
              loginParams = _objectSpread(_objectSpread({}, _this35.tempLoginData), {}, {
                real_name: _this35.realName // 添加真实姓名
              });

              console.log('调用login云函数处理手机号登录，带真实姓名:', loginParams);

              // 调用登录云函数
              _context12.next = 14;
              return uniCloud.callFunction({
                name: 'login',
                data: loginParams
              });
            case 14:
              loginResult = _context12.sent;
              console.log('手机号登录结果:', loginResult);
              if (loginResult.result && loginResult.result.code === 0) {
                // 登录成功，保存用户信息
                _this35.saveUserInfo(loginResult.result);
              } else {
                // 登录失败，显示错误信息
                console.error('手机号登录失败:', loginResult.result);
                uni.showToast({
                  title: loginResult.result && loginResult.result.message || '登录失败，请重试',
                  icon: 'none'
                });
              }
              _context12.next = 23;
              break;
            case 19:
              _context12.prev = 19;
              _context12.t0 = _context12["catch"](9);
              console.error('手机号登录过程中出错:', _context12.t0);
              uni.showToast({
                title: '登录失败，请重试',
                icon: 'none'
              });
            case 23:
              _context12.prev = 23;
              uni.hideLoading();
              return _context12.finish(23);
            case 26:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[9, 19, 23, 26]]);
    }))();
  }), (0, _defineProperty2.default)(_methods, "confirmRealNameInput", function confirmRealNameInput() {
    // 检查当前的登录类型，调用对应的完成方法
    if (this.tempLoginData && this.tempLoginData.loginType) {
      if (this.tempLoginData.loginType === 'wechat') {
        // 微信登录
        this.cancelRealNameInput();
        uni.showToast({
          title: '未知登录类型',
          icon: 'none'
        });
      } else if (this.tempLoginData.loginType === 'phone') {
        // 手机号登录
        this.completePhoneLoginWithRealName();
      } else {
        // 其他未知登录类型，默认关闭弹框
        this.cancelRealNameInput();
        uni.showToast({
          title: '未知登录类型',
          icon: 'none'
        });
      }
    } else {
      // 没有临时登录数据，直接关闭弹框
      this.cancelRealNameInput();
      uni.showToast({
        title: '登录数据丢失，请重试',
        icon: 'none'
      });
    }
  }), (0, _defineProperty2.default)(_methods, "onGetUserInfo", function onGetUserInfo(e) {
    var _this36 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
      return _regenerator.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              console.log('获取微信用户信息回调:', e);
              if (e.detail.errMsg.includes('ok')) {
                // 用户同意获取信息
                console.log('获取微信用户信息成功:', e.detail.userInfo);

                // 保存用户信息
                _this36.loginState.userInfo = e.detail.userInfo;
                _this36.hasWxUserInfo = true;
                uni.showToast({
                  title: '获取成功，请继续授权手机号',
                  icon: 'none',
                  duration: 1500
                });
              } else {
                // 用户拒绝
                console.log('用户拒绝授权微信信息');
                uni.showToast({
                  title: '您已拒绝授权微信信息',
                  icon: 'none'
                });
              }
            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  }), (0, _defineProperty2.default)(_methods, "onChooseAvatar", function onChooseAvatar(e) {
    console.log('选择头像回调:', e);
    if (e.detail && e.detail.avatarUrl) {
      this.userProfileData.avatarUrl = e.detail.avatarUrl;
      console.log('选择的头像URL:', this.userProfileData.avatarUrl);
    }
  }), (0, _defineProperty2.default)(_methods, "onNicknameChange", function onNicknameChange(e) {
    console.log('昵称输入回调:', e);
    if (e.detail && e.detail.value) {
      this.userProfileData.nickName = e.detail.value;
      console.log('输入的昵称:', this.userProfileData.nickName);
    }
  }), (0, _defineProperty2.default)(_methods, "cancelUserProfile", function cancelUserProfile() {
    var _this37 = this;
    console.log('用户取消授权个人信息');
    this.showUserProfileModal = false;

    // 如果用户取消授权，则仅使用手机号登录
    if (this.loginState.phoneNumber) {
      uni.showModal({
        title: '提示',
        content: '您已取消授权个人信息，将使用默认头像和昵称',
        showCancel: false,
        success: function success() {
          _this37.loginOrRegisterWithPhone(_this37.loginState.phoneNumber, {
            nickName: '微信用户',
            avatarUrl: ''
          });
        }
      });
    }
  }), (0, _defineProperty2.default)(_methods, "confirmUserProfile", function confirmUserProfile() {
    console.log('用户确认授权个人信息');

    // 验证用户信息
    if (!this.userProfileData.nickName) {
      uni.showToast({
        title: '请输入您的昵称',
        icon: 'none'
      });
      return;
    }
    this.showUserProfileModal = false;

    // 使用手机号和用户信息登录
    if (this.loginState.phoneNumber) {
      this.loginOrRegisterWithPhone(this.loginState.phoneNumber, this.userProfileData);
    }
  }), _methods)
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"]))

/***/ }),

/***/ 150:
/*!*******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/pages/login/login.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=style&index=0&lang=scss& */ 151);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 151:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/pages/login/login.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[144,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map