(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["uni_modules/uni-id-pages/pages/login/login-withpwd"],{

/***/ 323:
/*!*****************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/main.js?{"page":"uni_modules%2Funi-id-pages%2Fpages%2Flogin%2Flogin-withpwd"} ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _loginWithpwd = _interopRequireDefault(__webpack_require__(/*! ./uni_modules/uni-id-pages/pages/login/login-withpwd.vue */ 324));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_loginWithpwd.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 324:
/*!******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/uni_modules/uni-id-pages/pages/login/login-withpwd.vue ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-withpwd.vue?vue&type=template&id=9dec0b32&scoped=true& */ 325);
/* harmony import */ var _login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login-withpwd.vue?vue&type=script&lang=js& */ 327);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _login_withpwd_vue_vue_type_style_index_0_id_9dec0b32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login-withpwd.vue?vue&type=style&index=0&id=9dec0b32&lang=scss&scoped=true& */ 330);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9dec0b32",
  null,
  false,
  _login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "uni_modules/uni-id-pages/pages/login/login-withpwd.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 325:
/*!*************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/uni_modules/uni-id-pages/pages/login/login-withpwd.vue?vue&type=template&id=9dec0b32&scoped=true& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login-withpwd.vue?vue&type=template&id=9dec0b32&scoped=true& */ 326);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_template_id_9dec0b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 326:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/uni_modules/uni-id-pages/pages/login/login-withpwd.vue?vue&type=template&id=9dec0b32&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uniForms: function () {
      return Promise.all(/*! import() | uni_modules/uni-forms/components/uni-forms/uni-forms */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-forms/components/uni-forms/uni-forms.vue */ 420))
    },
    uniFormsItem: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-forms/components/uni-forms-item/uni-forms-item */ "uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue */ 429))
    },
    uniEasyinput: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput */ "uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue */ 436))
    },
    uniCaptcha: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-captcha/components/uni-captcha/uni-captcha */ "uni_modules/uni-captcha/components/uni-captcha/uni-captcha").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-captcha/components/uni-captcha/uni-captcha.vue */ 443))
    },
    uniIdPagesAgreements: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-id-pages/components/uni-id-pages-agreements/uni-id-pages-agreements */ "uni_modules/uni-id-pages/components/uni-id-pages-agreements/uni-id-pages-agreements").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-id-pages/components/uni-id-pages-agreements/uni-id-pages-agreements.vue */ 457))
    },
    uniIdPagesFabLogin: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login */ "uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue */ 464))
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
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.focusUsername = false
    }
    _vm.e1 = function ($event) {
      _vm.focusPassword = false
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 327:
/*!*******************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/uni_modules/uni-id-pages/pages/login/login-withpwd.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login-withpwd.vue?vue&type=script&lang=js& */ 328);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 328:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/uni_modules/uni-id-pages/pages/login/login-withpwd.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _loginPageMixin = _interopRequireDefault(__webpack_require__(/*! @/uni_modules/uni-id-pages/common/login-page.mixin.js */ 320));
var _config = _interopRequireDefault(__webpack_require__(/*! @/uni_modules/uni-id-pages/config.js */ 46));
var _vuex = __webpack_require__(/*! vuex */ 329);
var _store = __webpack_require__(/*! @/uni_modules/uni-id-pages/common/store.js */ 116);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var uniIdCo = uniCloud.importObject("uni-id-co", {
  errorOptions: {
    type: 'toast'
  }
});

// 获取平台信息函数
function getPlatform() {
  return 'mp-weixin';

  // 其他平台
  return 'other';
}
var _default = {
  mixins: [_loginPageMixin.default],
  data: function data() {
    var _getCurrentPages$, _this$mixinDatacomPag, _ref;
    var currentPage = (_getCurrentPages$ = getCurrentPages()[0]) === null || _getCurrentPages$ === void 0 ? void 0 : _getCurrentPages$.route;
    return _ref = {
      config: _objectSpread(_objectSpread({}, (_this$mixinDatacomPag = this.mixinDatacomPage) === null || _this$mixinDatacomPag === void 0 ? void 0 : _this$mixinDatacomPag.options), _config.default),
      //应用配置信息
      type: '',
      //密码类型
      errorType: ["account", "password", "captcha", "mobile", 'nickname'],
      focusAccount: false,
      focusPassword: false,
      logo: 'https://mp-d0c06b27-ec33-40fe-b28b-337811bd2f29.cdn.bspapp.com/images/logo.png',
      showPassword: false,
      //是否显示密码
      username: "",
      password: "",
      captchaCode: "",
      needCaptcha: false,
      //是否需要验证码
      loginErr: "",
      loginType: _config.default.defaultLoginType,
      currentLoginType: null,
      //当前登录类型
      phoneMod: '',
      //手机型号安卓ios ...

      isMask: false,
      loginErrorCount: uni.getStorageSync('login_error_count') || 0,
      loginRetryAttempts: 0,
      // 记录重试次数
      focusUsername: false
    }, (0, _defineProperty2.default)(_ref, "focusPassword", false), (0, _defineProperty2.default)(_ref, "isPhone", false), (0, _defineProperty2.default)(_ref, "errorText", {
      phone: '',
      username: '',
      password: ''
    }), (0, _defineProperty2.default)(_ref, "loginLockTime", uni.getStorageSync('login_lock_time') || 0), (0, _defineProperty2.default)(_ref, "loginLocked", false), (0, _defineProperty2.default)(_ref, "lockCountdown", 0), (0, _defineProperty2.default)(_ref, "countdownTimer", null), (0, _defineProperty2.default)(_ref, "captchaLoading", false), _ref;
  },
  computed: {
    isIPad: function isIPad() {
      return getPlatform() == 'iPad';
    },
    canSubmit: function canSubmit() {
      return this.username.length > 0 && this.password.length > 0 && (!this.needCaptcha || this.captcha.length == 4);
    }
  },
  created: function created() {
    // 检查是否需要显示验证码
    this.checkCaptchaRequired();
  },
  onShow: function onShow() {
    var _this = this;
    // 检查是否存在登录锁定
    var loginLockTime = uni.getStorageSync('login_lock_time');
    if (loginLockTime) {
      var now = Date.now();
      var remainTime = loginLockTime - now;
      if (remainTime > 0) {
        // 仍在锁定期内
        this.loginLocked = true;
        this.lockCountdown = Math.ceil(remainTime / 1000);
        this.startCountdown();
      } else {
        // 锁定已过期，清除
        uni.removeStorageSync('login_lock_time');
        uni.removeStorageSync('login_error_count');
      }
    }

    // 恢复错误计数
    var savedErrorCount = uni.getStorageSync('login_error_count') || 0;
    this.loginErrorCount = savedErrorCount;

    // 如果之前登录错误次数超过2次，就显示验证码
    if (savedErrorCount >= 2) {
      this.needCaptcha = true;
      this.$nextTick(function () {
        if (_this.$refs.captcha) {
          _this.$refs.captcha.getImageCaptcha();
        }
      });
    }
  },
  onUnload: function onUnload() {
    // 清除倒计时定时器
    this.clearCountdown();
  },
  methods: {
    // 开始倒计时
    startCountdown: function startCountdown() {
      var _this2 = this;
      // 先清除可能存在的定时器
      this.clearCountdown();

      // 设置新的定时器
      this.countdownTimer = setInterval(function () {
        _this2.lockCountdown -= 1;
        if (_this2.lockCountdown <= 0) {
          // 倒计时结束，解除锁定
          _this2.loginLocked = false;
          _this2.loginErrorCount = 0;
          uni.removeStorageSync('login_lock_time');
          uni.removeStorageSync('login_error_count');
          _this2.clearCountdown();
        }
      }, 1000);
    },
    // 清除倒计时
    clearCountdown: function clearCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    },
    // 锁定登录
    lockLogin: function lockLogin(minutes) {
      var lockTime = Date.now() + minutes * 60 * 1000;
      uni.setStorageSync('login_lock_time', lockTime);
      uni.setStorageSync('login_error_count', this.loginErrorCount);
      this.loginLocked = true;
      this.lockCountdown = minutes * 60;
      this.startCountdown();
      uni.showModal({
        title: '登录已锁定',
        content: "\u7531\u4E8E\u591A\u6B21\u5BC6\u7801\u9519\u8BEF\uFF0C\u8D26\u53F7\u5DF2\u88AB\u9501\u5B9A".concat(minutes, "\u5206\u949F\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"),
        showCancel: false
      });
    },
    // 检查是否需要验证码
    checkCaptchaRequired: function checkCaptchaRequired() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                if (!(_this3.loginErrorCount >= 2)) {
                  _context.next = 4;
                  break;
                }
                _this3.needCaptcha = true;
                return _context.abrupt("return");
              case 4:
                // 不直接调用云函数，而是根据登录错误次数决定是否需要验证码
                _this3.needCaptcha = _this3.loginErrorCount >= 1;

                // 如果需要验证码，则主动获取
                if (_this3.needCaptcha) {
                  _this3.$nextTick(function () {
                    if (_this3.$refs.captcha) {
                      _this3.$refs.captcha.getImageCaptcha();
                    }
                  });
                }
                _context.next = 12;
                break;
              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error('检查验证码状态出错:', _context.t0);
                // 出错时为安全起见显示验证码
                _this3.needCaptcha = true;
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    // 页面跳转，找回密码
    toRetrievePwd: function toRetrievePwd() {
      var url = '/uni_modules/uni-id-pages/pages/retrieve/retrieve';
      //如果刚好用户名输入框的值为手机号码，就把它传到retrieve页面，根据该手机号找回密码
      if (/^1\d{10}$/.test(this.username)) {
        url += "?phoneNumber=".concat(this.username);
      }
      uni.navigateTo({
        url: url
      });
    },
    /**
     * 密码登录
     */
    pwdLogin: function pwdLogin() {
      var _this4 = this;
      // 安全检查: 防止无限重试
      if (this.loginRetryAttempts > 2) {
        uni.showModal({
          title: '登录暂时无法完成',
          content: '您的登录请求遇到了系统问题，请稍后再试',
          showCancel: false,
          success: function success() {
            // 重置重试计数器
            _this4.loginRetryAttempts = 0;
            // 清空密码
            _this4.password = '';
            // 刷新验证码
            if (_this4.needCaptcha) {
              _this4.$refs.captcha.getImageCaptcha();
            }
          }
        });
        return;
      }

      // 自增重试计数
      this.loginRetryAttempts++;

      // 验证规则
      if (!this.username) {
        this.loginErr = this.i18n.account.accountRequiredTips;
        return;
      }

      // 验证码必填验证
      if (this.needCaptcha && !this.captchaCode) {
        this.loginErr = this.i18n.account.captchaRequiredTips;
        return;
      }

      // 检查是否被锁定
      if (this.loginLocked) {
        return uni.showModal({
          title: '登录已锁定',
          content: "\u7531\u4E8E\u591A\u6B21\u5BC6\u7801\u9519\u8BEF\uFF0C\u8D26\u53F7\u5DF2\u88AB\u9501\u5B9A\uFF0C\u8BF7".concat(this.lockCountdown, "\u79D2\u540E\u518D\u8BD5"),
          showCancel: false
        });
      }

      // 基本数据检查
      if (!this.password || !this.username) {
        if (!this.username) {
          this.focusUsername = true;
          uni.showToast({
            title: '请输入账号',
            icon: 'none'
          });
          return;
        }
        if (!this.password) {
          this.focusPassword = true;
          uni.showToast({
            title: '请输入密码',
            icon: 'none'
          });
          return;
        }
      }

      // 检查验证码
      if (this.needCaptcha && (!this.captcha || this.captcha.length !== 4)) {
        uni.showToast({
          title: '请输入4位图形验证码',
          icon: 'none'
        });
        // 重新获取验证码
        this.$nextTick(function () {
          if (_this4.$refs.captcha) {
            _this4.$refs.captcha.getImageCaptcha();
          }
        });
        return;
      }
      if (!/^.{6,20}$/.test(this.password)) {
        this.focusPassword = true;
        return uni.showToast({
          title: '密码长度应在6-20位之间',
          icon: 'none'
        });
      }

      // 构建登录数据
      var data = {
        password: this.password.trim() // 确保密码无空格
      };

      // 判断平台
      if (this.isPhone) {
        data.mobile = this.username;
        data.loginType = 'mobile-pwd';
      } else if (/^1\d{10}$/.test(this.username)) {
        // 若为完整手机号则作为手机号登录
        data.mobile = this.username;
        data.loginType = 'mobile-pwd';
      } else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.username)) {
        // 若包含@符号则视为邮箱
        data.email = this.username;
      } else if (/^[a-zA-Z0-9_-]+$/.test(this.username)) {
        // 若满足用户名规则，则作为用户名登录
        data.username = this.username;
      } else {
        // 不满足任何格式要求，尝试作为一个集成字段处理
        // 可能是手机号、用户ID、用户名等多种可能
        data.identifier = this.username;
        data.loginType = 'detail';

        // 添加额外辅助信息，帮助服务端识别
        data.extraInfo = {
          isNumeric: /^\d+$/.test(this.username),
          length: this.username.length,
          containsSpecial: /[^\w\d-_]/.test(this.username)
        };
      }

      // 如果需要验证码，则添加验证码信息
      if (this.needCaptcha) {
        data.captcha = this.captcha;
      }

      // 显示登录中
      uni.showLoading({
        title: '登录中...',
        mask: true
      });

      // 确保请求数据格式正确 - 调试输出
      console.log('登录请求数据:', JSON.stringify(data));

      // 检查password是否存在且正确
      if (!data.password) {
        console.error('密码未正确传递，手动添加');
        data.password = this.password.trim();
      }

      // 最后的数据验证
      console.log('最终登录请求数据:', JSON.stringify(data));
      console.log('开始尝试登录...');

      // 开始登录请求
      uniIdCo.login(data).then(function (e) {
        // 登录成功后，重置计数器
        _this4.loginErrorCount = 0;
        _this4.loginRetryAttempts = 0;
        uni.removeStorageSync('login_error_count');
        _this4.needCaptcha = false;
        uni.hideLoading();

        // 添加token格式检查和修复
        try {
          // 获取用户ID
          var userId = e.uid || e.userInfo && e.userInfo._id;

          // 检查token是否为字符串
          if (userId && e.token && typeof e.token === 'string') {
            console.log('检测到字符串token，尝试修复格式');

            // 直接调用已导入的fixTokenFormat函数
            (0, _store.fixTokenFormat)(userId).then(function () {
              console.log('token格式修复完成');
            }).catch(function (fixErr) {
              console.error('修复token格式失败:', fixErr);
            });
          }
        } catch (err) {
          console.error('处理token格式时出错:', err);
        }
        _this4.loginSuccess(e);
      }).catch(function (e) {
        // 添加错误分析代码
        console.error('登录错误详细信息:', e);

        // 输出错误的堆栈信息
        if (e.stack) {
          console.error('错误堆栈:', e.stack);
        }

        // 检测错误是否与token相关
        if (e.errMsg && e.errMsg.indexOf('filter is not a function') !== -1) {
          console.error('检测到token过滤错误');

          // 尝试输出错误位置的代码
          if (e.stack) {
            var matches = e.stack.match(/at\s+(\S+)\s+\(([^:]+):(\d+):(\d+)\)/g);
            if (matches) {
              console.log('错误位置:', matches[0]);
            }
          }
        }

        // 输出用户查询信息（如果存在）
        if (e.userRecord) {
          console.log('查询到的用户数据:', JSON.stringify(e.userRecord, null, 2));
          // 特别检查token字段
          if (e.userRecord.token) {
            console.log('用户token类型:', (0, _typeof2.default)(e.userRecord.token));
            console.log('用户token值:', e.userRecord.token);
            console.log('是否为数组:', Array.isArray(e.userRecord.token));
            if (typeof e.userRecord.token === 'string') {
              console.log('警告: token是字符串而不是数组');
            }
          } else {
            console.log('用户没有token字段');
          }
        }

        // 原始错误处理代码继续
        uni.hideLoading();
        if (e.errCode == 'uni-id-captcha-required') {
          _this4.needCaptcha = true;
          _this4.$nextTick(function () {
            // 主动获取新的验证码图片
            if (_this4.$refs.captcha) {
              _this4.$refs.captcha.getImageCaptcha();
            }
          });
          // 显示友好提示
          uni.showToast({
            title: '请输入图形验证码',
            icon: 'none',
            duration: 2000
          });
        } else if (_this4.needCaptcha) {
          //登录失败，自动重新获取验证码
          _this4.$refs.captcha.getImageCaptcha();
        }

        // 处理密码错误
        if (e.errCode === 'PASSWORD_ERROR') {
          _this4.loginErrorCount += 1;
          uni.setStorageSync('login_error_count', _this4.loginErrorCount);

          // 清空密码字段
          _this4.password = '';
          _this4.focusPassword = true;

          // 根据错误次数采取不同措施
          if (_this4.loginErrorCount >= 3) {
            // 锁定账号5分钟
            _this4.lockLogin(5);
          } else {
            // 显示错误信息
            uni.showModal({
              title: '登录失败',
              content: "\u5BC6\u7801\u9519\u8BEF\uFF0C\u60A8\u8FD8\u6709".concat(3 - _this4.loginErrorCount, "\u6B21\u673A\u4F1A"),
              showCancel: false
            });
          }
        } else if (e.errCode === 'uni-id-account-not-exists') {
          // 处理账号不存在的情况
          console.error('账号不存在详情:', e);

          // 显示错误信息
          uni.showModal({
            title: '登录失败',
            content: '此账号未注册，请先注册账号',
            confirmText: '去注册',
            cancelText: '取消',
            success: function success(res) {
              if (res.confirm) {
                _this4.toRegister();
              }
            }
          });
        } else if (e.errMsg && e.errMsg.indexOf('filter is not a function') !== -1) {
          // 特殊处理token过滤错误（已修复，以防万一）
          console.error('Token处理错误，将清除token并重试:', e);

          // 详细分析错误
          if (e.userInfo && e.userInfo.token) {
            console.log('出错用户token值:', e.userInfo.token);
            console.log('token类型:', (0, _typeof2.default)(e.userInfo.token));
            try {
              // 尝试手动过滤
              if (typeof e.userInfo.token === 'string') {
                console.log('错误原因: token是字符串，不是数组，不能使用filter方法');
              } else if (Array.isArray(e.userInfo.token)) {
                console.log('token是数组，但仍然出错，这很奇怪');
              } else {
                console.log('token类型异常:', Object.prototype.toString.call(e.userInfo.token));
              }
            } catch (filterErr) {
              console.error('尝试分析token时出错:', filterErr);
            }
          } else {
            console.log('错误对象中不包含userInfo.token数据');
            // 遍历错误对象寻找token相关信息
            for (var key in e) {
              try {
                if ((0, _typeof2.default)(e[key]) === 'object' && e[key] !== null) {
                  console.log("".concat(key, "\u5185\u5BB9:"), JSON.stringify(e[key]));
                }
              } catch (err) {}
            }
          }

          // 清空密码和token相关存储
          _this4.password = '';
          uni.removeStorageSync('uni_id_token');
          uni.removeStorageSync('uni_id_token_expired');

          // 显示加载提示
          uni.showLoading({
            title: '正在重试...',
            mask: true
          });

          // 如果已经重试过，增加等待时间，防止无限循环
          if (_this4.loginRetryAttempts > 1) {
            setTimeout(function () {
              uni.hideLoading();
              uni.showModal({
                title: '登录遇到问题',
                content: '系统暂时无法完成登录，请稍后再试',
                showCancel: false,
                success: function success() {
                  // 重置重试计数器
                  _this4.loginRetryAttempts = 0;
                }
              });
            }, 1000);
            return;
          }

          // 1秒后重试登录
          setTimeout(function () {
            uni.hideLoading();
            _this4.pwdLogin();
          }, 1000);
        } else {
          uni.hideLoading();
          console.log(e.errMsg);
          _this4.loginErrorCount++;
          uni.setStorageSync('login_error_count', _this4.loginErrorCount);

          // 检查登录重试次数，超过限制则显示特殊提示
          if (_this4.loginRetryAttempts > 2) {
            uni.showModal({
              content: '登录失败次数过多，请稍后再试',
              showCancel: false,
              success: function success() {
                // 重置重试计数器
                _this4.loginRetryAttempts = 0;
              }
            });
            return;
          }

          // 针对不同错误进行处理
          if (e.errCode == 'uni-id-account-not-exists') {
            // 这部分代码已在上面处理，不应重复出现
            console.error('重复的账号不存在处理被忽略');
          } else {
            // 其他错误
            uni.showModal({
              title: '登录失败',
              content: e.message || '未知错误',
              showCancel: false
            });

            // 添加错误详情输出到控制台
            console.error('登录失败详情:', e);
            console.error('错误完整信息:', JSON.stringify(e));

            // 使用更加可靠的方式遍历错误对象
            console.error('==== 错误对象的所有属性 ====');
            for (var _key in e) {
              try {
                console.error("".concat(_key, ":"), (0, _typeof2.default)(e[_key]) === 'object' ? JSON.stringify(e[_key]) : e[_key]);
              } catch (jsonErr) {
                console.error("".concat(_key, ": [\u65E0\u6CD5\u5E8F\u5217\u5316]"));
              }
            }

            // 检查并展示用户查询结果
            if (e.details) {
              console.error('用户搜索结果详情:', JSON.stringify(e.details));
              console.error('搜索的手机号:', e.mobile || (e.details.query ? e.details.query.mobile : '未知'));
              if (e.details.results) {
                console.error('搜索结果汇总:', 'total:', e.details.results.total, 'matched:', e.details.results.matched, 'usersTable:', e.details.results.usersTable || 0);
              }
              if (e.details.query) {
                console.error('用户查询参数:', JSON.stringify(e.details.query));
              }

              // 显示更加友好的错误信息
              uni.showModal({
                title: '提示',
                content: '该手机号尚未注册，是否立即注册?',
                confirmText: '去注册',
                success: function success(res) {
                  if (res.confirm) {
                    _this4.toRegister();
                  }
                }
              });
            } else {
              console.error('没有获取到搜索结果详情');
            }

            // 将错误消息显示到界面
            _this4.$nextTick(function () {
              uni.showToast({
                title: '详细错误已记录到控制台',
                icon: 'none',
                duration: 3000
              });
            });
          }
        }
      });
    },
    /* 前往注册 */toRegister: function toRegister() {
      uni.navigateTo({
        url: this.config.isAdmin ? '/uni_modules/uni-id-pages/pages/register/register-admin' : '/uni_modules/uni-id-pages/pages/register/register',
        fail: function fail(e) {
          console.error(e);
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 330:
/*!****************************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/uni_modules/uni-id-pages/pages/login/login-withpwd.vue?vue&type=style&index=0&id=9dec0b32&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_style_index_0_id_9dec0b32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login-withpwd.vue?vue&type=style&index=0&id=9dec0b32&lang=scss&scoped=true& */ 331);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_style_index_0_id_9dec0b32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_style_index_0_id_9dec0b32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_style_index_0_id_9dec0b32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_style_index_0_id_9dec0b32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_withpwd_vue_vue_type_style_index_0_id_9dec0b32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 331:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/siwei_chuzhong/uni_modules/uni-id-pages/pages/login/login-withpwd.vue?vue&type=style&index=0&id=9dec0b32&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[323,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/login/login-withpwd.js.map