(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["uni_modules/uni-id-pages/pages/userinfo/userinfo"],{

/***/ 364:
/*!*******************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/main.js?{"page":"uni_modules%2Funi-id-pages%2Fpages%2Fuserinfo%2Fuserinfo"} ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _userinfo = _interopRequireDefault(__webpack_require__(/*! ./uni_modules/uni-id-pages/pages/userinfo/userinfo.vue */ 365));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_userinfo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 365:
/*!********************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userinfo.vue?vue&type=template&id=451985ee&scoped=true& */ 366);
/* harmony import */ var _userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userinfo.vue?vue&type=script&lang=js& */ 368);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _userinfo_vue_vue_type_style_index_0_id_451985ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userinfo.vue?vue&type=style&index=0&id=451985ee&lang=scss&scoped=true& */ 370);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "451985ee",
  null,
  false,
  _userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "uni_modules/uni-id-pages/pages/userinfo/userinfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 366:
/*!***************************************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue?vue&type=template&id=451985ee&scoped=true& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./userinfo.vue?vue&type=template&id=451985ee&scoped=true& */ 367);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_template_id_451985ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 367:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue?vue&type=template&id=451985ee&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uniIdPagesAvatar: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar */ "uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.vue */ 478))
    },
    uniList: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-list/components/uni-list/uni-list */ "uni_modules/uni-list/components/uni-list/uni-list").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-list/components/uni-list/uni-list.vue */ 485))
    },
    uniListItem: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-list/components/uni-list-item/uni-list-item */ "uni_modules/uni-list/components/uni-list-item/uni-list-item").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue */ 492))
    },
    uniPopup: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 401))
    },
    uniPopupDialog: function () {
      return Promise.all(/*! import() | uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue */ 408))
    },
    uniIdPagesBindMobile: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile */ "uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.vue */ 499))
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

/***/ 368:
/*!*********************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./userinfo.vue?vue&type=script&lang=js& */ 369);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 369:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uniCloud, uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 27));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var _store = __webpack_require__(/*! @/uni_modules/uni-id-pages/common/store.js */ 117);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var uniIdCo = uniCloud.importObject("uni-id-co");
var _default = {
  computed: {
    userInfo: function userInfo() {
      return _store.store.userInfo;
    },
    realNameStatus: function realNameStatus() {
      if (!this.userInfo.realNameAuth) {
        return 0;
      }
      return this.userInfo.realNameAuth.authStatus;
    }
  },
  data: function data() {
    return {
      univerifyStyle: {
        authButton: {
          "title": "本机号码一键绑定" // 授权按钮文案
        },

        otherLoginButton: {
          "title": "其他号码绑定"
        }
      },
      // userInfo: {
      // 	mobile:'',
      // 	nickname:''
      // },
      hasPassword: false,
      showLoginManage: false,
      //通过页面传参隐藏登录&退出登录按钮
      setNicknameIng: false
    };
  },
  onShow: function onShow() {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.univerifyStyle.authButton.title = "本机号码一键绑定";
              _this.univerifyStyle.otherLoginButton.title = "其他号码绑定";
            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onLoad: function onLoad(e) {
    var _this2 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var cachedUserInfo, token, tokenExpired, now, hasToken, hasExpired, hasUserInfo, userInfo, userId, localUserInfo, timestamp, randomPart, newToken, _tokenExpired;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // 检查参数
              if (e && e.showLoginManage) {
                _this2.showLoginManage = true; //通过页面传参隐藏登录&退出登录按钮
              }

              // 先尝试从缓存恢复用户信息
              if (_store.store.userInfo && Object.keys(_store.store.userInfo).length) {
                // 已有用户信息，无需再从缓存获取
                console.log('store中已有用户信息，无需从缓存获取');
              } else {
                console.log('尝试从缓存恢复用户信息');
                cachedUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
                if (cachedUserInfo && cachedUserInfo._id) {
                  _store.mutations.setUserInfo(cachedUserInfo, {
                    cover: true
                  });
                  console.log('从缓存恢复了用户信息:', cachedUserInfo._id);
                }
              }

              // 检查是否有token和用户信息
              token = uni.getStorageSync('uni_id_token');
              tokenExpired = uni.getStorageSync('uni_id_token_expired');
              now = Date.now();
              hasToken = !!token;
              hasExpired = tokenExpired && new Date(tokenExpired).getTime() > now; // 只要有用户ID就允许访问页面
              hasUserInfo = _store.store.userInfo && _store.store.userInfo._id;
              console.log('个人资料页面onLoad - 检查登录状态:', {
                hasToken: hasToken,
                hasExpired: hasExpired,
                tokenExpired: tokenExpired || 0,
                now: now,
                hasUserInfo: hasUserInfo ? _store.store.userInfo._id : false
              });

              // 有用户信息就允许访问页面，不管token是否有效
              if (hasUserInfo) {
                _context2.next = 19;
                break;
              }
              console.log('没有找到用户信息，可能需要登录');

              // 尝试从userInfo中获取用户信息
              userInfo = uni.getStorageSync('userInfo');
              if (!(userInfo && (userInfo._id || userInfo.uid))) {
                _context2.next = 17;
                break;
              }
              console.log('从userInfo中找到了用户信息，尝试恢复');
              _store.mutations.setUserInfo(userInfo, {
                cover: true
              });
              // 继续加载页面
              _context2.next = 19;
              break;
            case 17:
              uni.showModal({
                title: '提示',
                content: '无法加载用户信息，请返回首页',
                showCancel: false,
                success: function success() {
                  uni.navigateBack({
                    fail: function fail() {
                      // 如果返回失败，尝试跳转到首页
                      uni.switchTab({
                        url: '/pages/index/index',
                        fail: function fail() {
                          console.error('无法返回首页');
                        }
                      });
                    }
                  });
                }
              });
              return _context2.abrupt("return");
            case 19:
              // 检查token是否无效，如果无效，提前生成一个新token
              if (!hasToken || !hasExpired) {
                console.log('token无效或过期，提前生成临时token');
                // 从store或缓存中获取用户ID
                userId = '';
                if (_store.store.userInfo && _store.store.userInfo._id) {
                  userId = _store.store.userInfo._id;
                } else {
                  localUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
                  if (localUserInfo && localUserInfo._id) {
                    userId = localUserInfo._id;
                  }
                }
                if (userId) {
                  // 创建临时token
                  timestamp = Date.now();
                  randomPart = Math.random().toString(36).substring(2, 10);
                  newToken = "".concat(userId, "_").concat(timestamp, "_").concat(randomPart);
                  _tokenExpired = timestamp + 7 * 24 * 60 * 60 * 1000; // 7天后过期
                  console.log('提前生成临时token:', newToken.substring(0, 10) + '...');
                  uni.setStorageSync('uni_id_token', newToken);
                  uni.setStorageSync('uni_id_token_expired', _tokenExpired);
                }
              }

              // 使用更安全的方式获取账号信息
              try {
                // 根据token状态决定是否尝试获取账号信息
                if (hasToken || uni.getStorageSync('uni_id_token')) {
                  // 先直接使用token验证方法
                  _this2.getAccountInfoSafe();
                } else {
                  console.log('未找到有效token，仅使用本地用户信息');
                  // 没有token但有用户信息，所以继续显示页面
                  _this2.hasPassword = false; // 默认设置为false
                }
              } catch (e) {
                console.error('加载用户信息时出错:', e);
                // 出错时仍继续显示页面
              }
            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  methods: {
    login: function login() {
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
        complete: function complete(e) {
          // console.log(e);
        }
      });
    },
    logout: function logout() {
      _store.mutations.logout();
    },
    bindMobileSuccess: function bindMobileSuccess() {
      _store.mutations.updateUserInfo();
    },
    changePassword: function changePassword() {
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd',
        complete: function complete(e) {
          // console.log(e);
        }
      });
    },
    bindMobile: function bindMobile() {
      this.$refs['bind-mobile-by-sms'].open();
    },
    univerify: function univerify() {
      var _this3 = this;
      uni.login({
        "provider": 'univerify',
        "univerifyStyle": this.univerifyStyle,
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    uniIdCo.bindMobileByUniverify(e.authResult).then(function (res) {
                      _store.mutations.updateUserInfo();
                    }).catch(function (e) {
                      console.log(e);
                    }).finally(function (e) {
                      // console.log(e);
                      uni.closeAuthView();
                    });
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }(),
        fail: function fail(err) {
          console.log(err);
          if (err.code == '30002' || err.code == '30001') {
            _this3.bindMobileBySmsCode();
          }
        }
      });
    },
    bindMobileBySmsCode: function bindMobileBySmsCode() {
      uni.navigateTo({
        url: './bind-mobile/bind-mobile'
      });
    },
    setNickname: function setNickname(nickname) {
      if (nickname) {
        _store.mutations.updateUserInfo({
          nickname: nickname
        });
        this.setNicknameIng = false;
        this.$refs.dialog.close();
      } else {
        this.$refs.dialog.open();
      }
    },
    deactivate: function deactivate() {
      uni.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
      });
    },
    bindThirdAccount: function bindThirdAccount(provider) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var uniIdCo, bindField;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                uniIdCo = uniCloud.importObject("uni-id-co");
                bindField = {
                  weixin: 'wx_openid',
                  alipay: 'ali_openid',
                  apple: 'apple_openid',
                  qq: 'qq_openid'
                }[provider.toLowerCase()];
                if (!_this4.userInfo[bindField]) {
                  _context6.next = 9;
                  break;
                }
                _context6.next = 5;
                return uniIdCo['unbind' + provider]();
              case 5:
                _context6.next = 7;
                return _store.mutations.updateUserInfo();
              case 7:
                _context6.next = 10;
                break;
              case 9:
                uni.login({
                  provider: provider.toLowerCase(),
                  onlyAuthorize: true,
                  success: function () {
                    var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(e) {
                      var res;
                      return _regenerator.default.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return uniIdCo['bind' + provider]({
                                code: e.code
                              });
                            case 2:
                              res = _context4.sent;
                              if (res.errCode) {
                                uni.showToast({
                                  title: res.errMsg || '绑定失败',
                                  duration: 3000
                                });
                              }
                              _context4.next = 6;
                              return _store.mutations.updateUserInfo();
                            case 6:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));
                    function success(_x2) {
                      return _success2.apply(this, arguments);
                    }
                    return success;
                  }(),
                  fail: function () {
                    var _fail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err) {
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              console.log(err);
                              uni.hideLoading();
                            case 2:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));
                    function fail(_x3) {
                      return _fail.apply(this, arguments);
                    }
                    return fail;
                  }()
                });
              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    realNameVerify: function realNameVerify() {
      uni.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"
      });
    },
    // 安全获取账号信息的方法
    getAccountInfoSafe: function getAccountInfoSafe() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var token, timeout, res, userId, localUserInfo, _res, timestamp, randomPart, newToken, tokenExpired, _timestamp, _randomPart, _newToken, _tokenExpired2, refreshResult, resRetry;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                // 先检查是否有token
                token = uni.getStorageSync('uni_id_token');
                if (token) {
                  _context7.next = 6;
                  break;
                }
                console.log('没有找到token，跳过获取账户信息');
                _this5.hasPassword = false; // 默认假设没有密码
                return _context7.abrupt("return");
              case 6:
                // 设置超时
                timeout = setTimeout(function () {
                  console.log('获取账户信息超时，使用默认设置');
                  _this5.hasPassword = false;
                }, 5000); // 延长超时时间以确保有足够的时间处理
                _context7.prev = 7;
                _context7.next = 10;
                return uniIdCo.getAccountInfo();
              case 10:
                res = _context7.sent;
                // 清除超时
                clearTimeout(timeout);
                console.log('获取账户信息响应:', res);

                // 更新用户信息和密码状态
                if (res && !res.code) {
                  console.log('获取账户信息成功');
                  _this5.hasPassword = !!res.isPasswordSet;

                  // 如果获取的信息比本地更新，则更新本地存储
                  if (res.userInfo && res.userInfo._id) {
                    _store.mutations.setUserInfo(res.userInfo, {
                      cover: false
                    });
                  }
                } else {
                  console.log('获取账户信息返回错误码:', res ? res.code : 'unknown');
                  _this5.hasPassword = false;
                }
                _context7.next = 82;
                break;
              case 16:
                _context7.prev = 16;
                _context7.t0 = _context7["catch"](7);
                // 清除超时
                clearTimeout(timeout);
                console.error('获取账户信息API调用失败:', _context7.t0);

                // 添加上下文信息，提高调试能力
                if (!(_context7.t0.message && _context7.t0.message.includes('token'))) {
                  _context7.next = 81;
                  break;
                }
                console.log('token可能已过期，尝试通过用户ID直接获取信息');

                // 直接从本地存储获取用户ID
                userId = '';
                _context7.prev = 23;
                // 首先尝试从store中获取用户ID
                if (_store.store.userInfo && _store.store.userInfo._id) {
                  userId = _store.store.userInfo._id;
                  console.log('从store中获取用户ID:', userId);
                }
                // 再尝试从本地存储获取
                else {
                  localUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
                  if (localUserInfo && localUserInfo._id) {
                    userId = localUserInfo._id;
                    console.log('从本地存储获取用户ID:', userId);
                  }
                }

                // 如果获取到了用户ID，直接通过云函数获取用户信息
                if (!userId) {
                  _context7.next = 58;
                  break;
                }
                console.log('使用用户ID直接获取用户信息:', userId);

                // 使用云函数获取用户信息
                _context7.prev = 27;
                _context7.next = 30;
                return uniCloud.callFunction({
                  name: 'getUserInfoById',
                  data: {
                    userId: userId
                  }
                });
              case 30:
                _res = _context7.sent;
                if (!(_res && _res.result && _res.result.code === 0 && _res.result.userInfo)) {
                  _context7.next = 45;
                  break;
                }
                console.log('通过云函数获取到用户信息:', _res.result);

                // 设置密码状态
                _this5.hasPassword = !!_res.result.isPasswordSet;

                // 更新本地存储
                _store.mutations.setUserInfo(_res.result.userInfo, {
                  cover: false
                });

                // 创建一个新token
                timestamp = Date.now();
                randomPart = Math.random().toString(36).substring(2, 10);
                newToken = "".concat(userId, "_").concat(timestamp, "_").concat(randomPart);
                tokenExpired = timestamp + 7 * 24 * 60 * 60 * 1000; // 7天后过期
                console.log('生成新token:', newToken.substring(0, 10) + '...');

                // 保存token
                uni.setStorageSync('uni_id_token', newToken);
                uni.setStorageSync('uni_id_token_expired', tokenExpired);
                return _context7.abrupt("return");
              case 45:
                console.error('云函数返回的用户信息无效:', _res === null || _res === void 0 ? void 0 : _res.result);
              case 46:
                _context7.next = 58;
                break;
              case 48:
                _context7.prev = 48;
                _context7.t1 = _context7["catch"](27);
                console.error('调用getUserInfoById云函数失败:', _context7.t1);

                // 如果getUserInfoById失败，直接生成token而不尝试查询数据库
                console.log('生成临时token，跳过用户信息查询');
                _timestamp = Date.now();
                _randomPart = Math.random().toString(36).substring(2, 10);
                _newToken = "".concat(userId, "_").concat(_timestamp, "_").concat(_randomPart);
                _tokenExpired2 = _timestamp + 7 * 24 * 60 * 60 * 1000; // 7天后过期
                // 保存token
                uni.setStorageSync('uni_id_token', _newToken);
                uni.setStorageSync('uni_id_token_expired', _tokenExpired2);
              case 58:
                _context7.next = 63;
                break;
              case 60:
                _context7.prev = 60;
                _context7.t2 = _context7["catch"](23);
                console.error('获取用户ID过程中出错:', _context7.t2);
              case 63:
                // 如果上面的直接数据库查询失败，尝试刷新token
                console.log('尝试刷新token');
                _context7.next = 66;
                return _this5.tryRefreshToken();
              case 66:
                refreshResult = _context7.sent;
                if (!refreshResult) {
                  _context7.next = 81;
                  break;
                }
                _context7.prev = 68;
                _context7.next = 71;
                return uniIdCo.getAccountInfo();
              case 71:
                resRetry = _context7.sent;
                console.log('使用新token获取账户信息响应:', resRetry);
                if (!(resRetry && !resRetry.code)) {
                  _context7.next = 76;
                  break;
                }
                _this5.hasPassword = !!resRetry.isPasswordSet;
                return _context7.abrupt("return");
              case 76:
                _context7.next = 81;
                break;
              case 78:
                _context7.prev = 78;
                _context7.t3 = _context7["catch"](68);
                console.error('使用新token重试获取账户信息失败:', _context7.t3);
              case 81:
                // 如果尝试刷新token后仍失败，回退到默认值
                _this5.hasPassword = false;
              case 82:
                _context7.next = 89;
                break;
              case 84:
                _context7.prev = 84;
                _context7.t4 = _context7["catch"](0);
                console.error('获取账户信息失败，但不影响页面使用:', _context7.t4);

                // token可能已过期，但我们已经有用户信息，所以继续显示页面
                if (_context7.t4.message && _context7.t4.message.includes('token校验未通过')) {
                  console.log('token校验未通过，使用缓存的用户信息继续显示页面');
                  // 尝试刷新token
                  _this5.tryRefreshToken();
                }

                // 默认设置hasPassword为false，避免影响界面显示
                _this5.hasPassword = false;
              case 89:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 84], [7, 16], [23, 60], [27, 48], [68, 78]]);
      }))();
    },
    // 尝试刷新token
    tryRefreshToken: function tryRefreshToken() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var localUserInfo, _userId, userId;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                // 尝试清除旧token
                console.log('尝试刷新token...');

                // 检查是否有用户信息
                if (!(!_store.store.userInfo || !_store.store.userInfo._id)) {
                  _context8.next = 11;
                  break;
                }
                console.log('没有用户信息，无法刷新token');

                // 尝试从本地存储获取用户ID
                localUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
                if (!(!localUserInfo || !localUserInfo._id)) {
                  _context8.next = 8;
                  break;
                }
                console.log('本地存储中也没有用户信息，无法刷新token');
                return _context8.abrupt("return", false);
              case 8:
                // 使用本地存储的用户ID
                _userId = localUserInfo._id;
                console.log('从本地存储获取用户ID:', _userId);
                return _context8.abrupt("return", _this6.refreshTokenWithUserId(_userId));
              case 11:
                // 使用store中的用户ID
                userId = _store.store.userInfo._id;
                console.log('准备刷新token，用户ID:', userId);
                return _context8.abrupt("return", _this6.refreshTokenWithUserId(userId));
              case 16:
                _context8.prev = 16;
                _context8.t0 = _context8["catch"](0);
                console.error('尝试刷新token时出错，继续使用当前用户信息:', _context8.t0);
                return _context8.abrupt("return", false);
              case 20:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 16]]);
      }))();
    },
    // 使用用户ID刷新token
    refreshTokenWithUserId: function refreshTokenWithUserId(userId) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var res;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return uniCloud.callFunction({
                  name: 'refreshToken',
                  data: {
                    userId: userId
                  }
                }).catch(function (e) {
                  console.error('调用刷新token云函数失败，继续使用当前用户信息:', e);

                  // 尝试使用备选方法：如果refreshToken云函数不存在，可以尝试使用getUserInfoByToken云函数
                  return _this7.fallbackRefreshToken(userId);
                });
              case 3:
                res = _context9.sent;
                if (!(res && res.result && res.result.code === 0 && res.result.token)) {
                  _context9.next = 11;
                  break;
                }
                // 保存新token
                console.log('刷新token成功，保存新token');
                uni.setStorageSync('uni_id_token', res.result.token);
                uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired);
                return _context9.abrupt("return", true);
              case 11:
                console.log('刷新token失败，尝试备选方案');
                // 尝试备选方案
                return _context9.abrupt("return", _this7.fallbackRefreshToken(userId));
              case 13:
                _context9.next = 19;
                break;
              case 15:
                _context9.prev = 15;
                _context9.t0 = _context9["catch"](0);
                console.error('刷新token过程中出错:', _context9.t0);
                // 尝试备选方案
                return _context9.abrupt("return", _this7.fallbackRefreshToken(userId));
              case 19:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 15]]);
      }))();
    },
    // 备选的token刷新方法
    fallbackRefreshToken: function fallbackRefreshToken(userId) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var result, timestamp, randomPart, newToken, tokenExpired;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                console.log('使用备选方法刷新token，用户ID:', userId);

                // 如果refreshToken云函数不存在，可以尝试使用getUserInfoByToken云函数
                // 因为我们在getUserInfoByToken中已经实现了支持使用userId直接查询用户信息的功能
                _context10.next = 4;
                return uniCloud.callFunction({
                  name: 'getUserInfoByToken',
                  data: {
                    userId: userId,
                    forceRefresh: true
                  }
                });
              case 4:
                result = _context10.sent;
                if (!(result && result.result && result.result.code === 0 && result.result.userInfo)) {
                  _context10.next = 16;
                  break;
                }
                console.log('通过备选方法获取用户信息成功');

                // 手动创建一个新token
                timestamp = Date.now();
                randomPart = Math.random().toString(36).substring(2, 10);
                newToken = "".concat(userId, "_").concat(timestamp, "_").concat(randomPart);
                tokenExpired = timestamp + 7 * 24 * 60 * 60 * 1000; // 7天后过期
                console.log('手动创建新token:', newToken.substring(0, 10) + '...');

                // 保存token和用户信息
                uni.setStorageSync('uni_id_token', newToken);
                uni.setStorageSync('uni_id_token_expired', tokenExpired);

                // 更新用户信息
                _store.mutations.setUserInfo(result.result.userInfo, {
                  cover: false
                });
                return _context10.abrupt("return", true);
              case 16:
                return _context10.abrupt("return", false);
              case 19:
                _context10.prev = 19;
                _context10.t0 = _context10["catch"](0);
                console.error('备选刷新token方法失败:', _context10.t0);
                return _context10.abrupt("return", false);
              case 23:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 19]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 370:
/*!******************************************************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue?vue&type=style&index=0&id=451985ee&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_style_index_0_id_451985ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./userinfo.vue?vue&type=style&index=0&id=451985ee&lang=scss&scoped=true& */ 371);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_style_index_0_id_451985ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_style_index_0_id_451985ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_style_index_0_id_451985ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_style_index_0_id_451985ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_userinfo_vue_vue_type_style_index_0_id_451985ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 371:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue?vue&type=style&index=0&id=451985ee&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[364,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/userinfo/userinfo.js.map