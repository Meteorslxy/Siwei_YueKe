(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/booking"],{

/***/ 233:
/*!**************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/main.js?{"page":"pages%2Fuser%2Fbooking"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 38);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _booking = _interopRequireDefault(__webpack_require__(/*! ./pages/user/booking.vue */ 234));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_booking.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 234:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/booking.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./booking.vue?vue&type=template&id=6e50388e& */ 235);
/* harmony import */ var _booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./booking.vue?vue&type=script&lang=js& */ 237);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./booking.vue?vue&type=style&index=0&lang=scss& */ 239);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/user/booking.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 235:
/*!**************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/booking.vue?vue&type=template&id=6e50388e& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./booking.vue?vue&type=template&id=6e50388e& */ 236);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_template_id_6e50388e___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 236:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/booking.vue?vue&type=template&id=6e50388e& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    loadMore: function () {
      return __webpack_require__.e(/*! import() | components/load-more/load-more */ "components/load-more/load-more").then(__webpack_require__.bind(null, /*! @/components/load-more/load-more.vue */ 55))
    },
    emptyTip: function () {
      return __webpack_require__.e(/*! import() | components/empty-tip/empty-tip */ "components/empty-tip/empty-tip").then(__webpack_require__.bind(null, /*! @/components/empty-tip/empty-tip.vue */ 48))
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
  var l0 = _vm.__map(_vm.tabs, function (tab, index) {
    var $orig = _vm.__get_orig(tab)
    var m0 = _vm.getTabCount(tab.value)
    var m1 = m0 > 0 ? _vm.getTabCount(tab.value) : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
    }
  })
  var l1 = _vm.__map(_vm.filteredBookingList, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var m2 = _vm.getStatusText(item)
    var m3 = _vm.formatCourseTime(item)
    var m4 = _vm.formatBookingTime(item.createTime)
    var m5 = _vm.showActions(item)
    return {
      $orig: $orig,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
    }
  })
  var g0 = _vm.filteredBookingList.length
  var m6 = g0 === 0 ? _vm.getEmptyTipText() : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item
      var _temp, _temp2
      $event.stopPropagation()
      return (function ($event) {
        return _vm.cancelBooking(item, $event)
      })($event)
    }
    _vm.e1 = function ($event, item) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        item = _temp4.item
      var _temp3, _temp4
      $event.stopPropagation()
      return (function ($event) {
        return _vm.contactTeacher(item, $event)
      })($event)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1,
        g0: g0,
        m6: m6,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 237:
/*!********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/booking.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./booking.vue?vue&type=script&lang=js& */ 238);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 238:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/booking.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      // 状态筛选标签
      tabs: [{
        label: '全部',
        value: 'all'
      }, {
        label: '已预约',
        value: 'booked'
      }, {
        label: '已完成',
        value: 'finished'
      }, {
        label: '已取消',
        value: 'cancelled'
      }],
      currentStatus: 'all',
      // 列表数据
      bookingList: [],
      page: 1,
      limit: 10,
      total: 0,
      loadMoreStatus: 'more',
      // more-加载更多 loading-加载中 noMore-没有更多了

      // 当前操作的预约
      currentBooking: null,
      // 缓存的各状态预约数量
      statusCounts: {
        all: 0,
        booked: 0,
        finished: 0,
        cancelled: 0
      },
      // 是否已加载本地取消记录
      localCancelledLoaded: false
    };
  },
  computed: {
    // 根据当前选择的状态过滤预约列表
    filteredBookingList: function filteredBookingList() {
      var _this = this;
      // 首先确保bookingList是数组且过滤掉无效项
      var validBookings = Array.isArray(this.bookingList) ? this.bookingList.filter(function (item) {
        return item && (0, _typeof2.default)(item) === 'object' && item._id;
      }) : [];
      if (this.currentStatus === 'all') {
        return validBookings;
      }
      if (this.currentStatus === 'booked') {
        // 已预约包含所有非取消和非完成的状态
        return validBookings.filter(function (booking) {
          return booking.status === 'pending' || booking.status === 'confirmed_unpaid' || booking.status === 'confirmed';
        });
      }
      if (this.currentStatus === 'cancelled') {
        // 已取消状态的过滤条件
        return validBookings.filter(function (booking) {
          return booking.status === 'cancelled' || booking.paymentStatus === 'cancelled' || booking.status === 'cancel';
        });
      }

      // 其他状态直接按状态筛选
      return validBookings.filter(function (booking) {
        return booking.status === _this.currentStatus;
      });
    }
  },
  onLoad: function onLoad(options) {
    console.log('booking页面加载，参数:', options);

    // 处理特殊状态
    if (options.status) {
      // 处理booked状态（表示已预约的课程，包括待确认和已确认）
      if (options.status === 'usable' || options.status === 'booked') {
        this.currentStatus = 'booked';
      }
      // 处理expired状态（表示已过期，即已完成）
      else if (options.status === 'expired' || options.status === 'finished') {
        this.currentStatus = 'finished';
      }
      // 处理canceled/cancelled状态（表示已取消）
      else if (options.status === 'canceled' || options.status === 'cancelled') {
        this.currentStatus = 'cancelled';
      }
      // 其他状态直接使用all
      else {
        this.currentStatus = 'all';
      }
    }
    console.log('设置当前状态为:', this.currentStatus);

    // 无论当前标签是什么，先加载本地已取消记录的数量
    this.loadLocalCancelledCount();

    // 加载预约记录
    this.loadBookingList();
  },
  onShow: function onShow() {
    // 检查是否有预约状态变更
    var hasBookingChanged = uni.getStorageSync('booking_changed') === 'true';
    if (hasBookingChanged) {
      console.log('检测到预约状态变更，刷新列表');
      this.resetList();
      this.loadBookingList();
      // 重置标记
      uni.setStorageSync('booking_changed', 'false');
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.resetList();
    this.loadBookingList().then(function () {
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom: function onReachBottom() {
    if (this.loadMoreStatus === 'more') {
      this.loadMore();
    }
  },
  methods: {
    // 切换筛选标签
    changeTab: function changeTab(status) {
      if (this.currentStatus === status) return;
      this.currentStatus = status;
      this.resetList();

      // 如果切换到已取消标签页，确保本地存储的已取消记录被加载
      if (status === 'cancelled') {
        console.log('切换到已取消标签页，确保加载本地记录');
        // 先尝试显示本地已取消记录
        try {
          var userInfoStr = uni.getStorageSync('userInfo');
          if (userInfoStr) {
            try {
              // 检查是否已经是对象
              var userData = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
              var userId = userData.userId || userData._id || userData.uid || userData.userInfo && userData.userInfo._id || userData.userInfo && userData.userInfo.uid || '';
              if (userId) {
                // 从本地存储获取已取消预约
                var localCancelledBookings = this.getLocalCancelledBookings(userId);
                if (localCancelledBookings && localCancelledBookings.length > 0) {
                  console.log("\u627E\u5230".concat(localCancelledBookings.length, "\u6761\u672C\u5730\u5DF2\u53D6\u6D88\u8BB0\u5F55\uFF0C\u7ACB\u5373\u663E\u793A"));
                  this.bookingList = localCancelledBookings;
                  this.total = localCancelledBookings.length;
                  this.$forceUpdate();
                }
              }
            } catch (e) {
              console.error('尝试直接加载本地已取消记录失败:', e);
            }
          }
        } catch (e) {
          console.error('尝试直接加载本地已取消记录失败:', e);
        }
      }
      this.loadBookingList();
    },
    // 重置列表数据
    resetList: function resetList() {
      this.page = 1;
      this.bookingList = [];
    },
    // 加载更多
    loadMore: function loadMore() {
      this.page++;
      this.loadBookingList();
    },
    // 加载预约记录列表
    loadBookingList: function loadBookingList() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var userInfoStr, userData, userId, localCancelledBookings, status, useClientFiltering, statusForLog, res, allBookings, totalCount, cancelledInList, cancelledBookings, _localCancelledBookings, existingIds, newLocalCancelled, _userId, _localCancelledBookings2;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.loadMoreStatus = 'loading';
                _context.prev = 1;
                userInfoStr = uni.getStorageSync('userInfo');
                if (userInfoStr) {
                  _context.next = 8;
                  break;
                }
                console.log('用户未登录，无法获取预约记录');
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                setTimeout(function () {
                  uni.redirectTo({
                    url: '/pages/user/user'
                  });
                }, 1500);
                return _context.abrupt("return", Promise.resolve());
              case 8:
                userData = null;
                _context.prev = 9;
                // 检查是否已经是对象
                userData = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
                console.log('解析到的用户信息:', userData);
                _context.next = 19;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](9);
                console.error('解析用户信息失败:', _context.t0);
                uni.showToast({
                  title: '用户数据异常',
                  icon: 'none'
                });
                return _context.abrupt("return", Promise.resolve());
              case 19:
                userId = userData.userId || userData._id || userData.uid || userData.userInfo && userData.userInfo._id || userData.userInfo && userData.userInfo.uid || '';
                if (userId) {
                  _context.next = 24;
                  break;
                }
                console.error('未找到有效的用户ID');
                uni.showToast({
                  title: '用户ID不存在',
                  icon: 'none'
                });
                return _context.abrupt("return", Promise.resolve());
              case 24:
                // 如果是已取消标签，先检查本地存储中是否有取消记录
                if (_this2.currentStatus === 'cancelled') {
                  console.log('当前为已取消标签，优先检查本地存储');
                  localCancelledBookings = _this2.getLocalCancelledBookings(userId).filter(function (item) {
                    return item && item._id;
                  });
                  if (localCancelledBookings.length > 0) {
                    console.log("\u627E\u5230".concat(localCancelledBookings.length, "\u6761\u672C\u5730\u5DF2\u53D6\u6D88\u8BB0\u5F55\uFF0C\u7ACB\u5373\u663E\u793A"));
                    // 不完全替换，而是先加载本地数据
                    _this2.bookingList = localCancelledBookings;
                    _this2.total = localCancelledBookings.length;
                    // 更新计数
                    _this2.statusCounts.cancelled = localCancelledBookings.length;
                    // 强制刷新UI
                    _this2.$forceUpdate();
                    uni.showToast({
                      title: "\u52A0\u8F7D\u4E86".concat(localCancelledBookings.length, "\u6761\u5DF2\u53D6\u6D88\u8BB0\u5F55"),
                      icon: 'none',
                      duration: 1500
                    });
                  }
                }

                // 根据当前选择的状态获取查询参数
                // 注意：为了解决服务器可能存在的问题，始终获取所有预约记录，然后在前端过滤
                status = '';
                useClientFiltering = false; // 只为日志显示
                statusForLog = _this2.currentStatus; // 如果请求特定状态并且不是全部，使用前端过滤
                if (_this2.currentStatus !== 'all') {
                  useClientFiltering = true;
                }
                console.log('查询预约记录，状态:', statusForLog, '用户ID:', userId, '使用前端过滤:', useClientFiltering);

                // 调用云函数获取预约记录
                _context.next = 32;
                return uniCloud.callFunction({
                  name: 'getBookings',
                  data: {
                    userId: userId,
                    status: '',
                    // 获取所有状态的预约
                    limit: _this2.limit * 5,
                    // 增加获取数量以确保足够多的记录用于筛选
                    skip: 0 // 从0开始获取以确保全部记录都获取到
                  }
                });
              case 32:
                res = _context.sent;
                console.log('getBookings原始返回结果:', res.result);
                if (res.result && res.result.success) {
                  // 过滤掉undefined和null值
                  allBookings = (res.result.data || []).filter(function (item) {
                    return item && item._id;
                  });
                  totalCount = res.result.total || 0;
                  console.log("API\u83B7\u53D6\u5230".concat(allBookings.length, "\u6761\u9884\u7EA6\u8BB0\u5F55\uFF0C\u603B\u6570: ").concat(totalCount));

                  // 更新总计数
                  _this2.statusCounts.all = allBookings.length;

                  // 计算各状态数量
                  _this2.statusCounts.booked = allBookings.filter(function (item) {
                    return item && (item.status === 'pending' || item.status === 'confirmed_unpaid' || item.status === 'confirmed');
                  }).length;
                  _this2.statusCounts.finished = allBookings.filter(function (item) {
                    return item && item.status === 'finished';
                  }).length;
                  cancelledInList = allBookings.filter(function (item) {
                    return item && (item.status === 'cancelled' || item.paymentStatus === 'cancelled' || item.status === 'cancel');
                  }).length; // 如果已经从本地加载了取消记录，使用更大的值
                  if (!_this2.localCancelledLoaded || cancelledInList > _this2.statusCounts.cancelled) {
                    _this2.statusCounts.cancelled = cancelledInList;
                  }

                  // 确保每个预约都有_id字段
                  allBookings = allBookings.filter(function (item) {
                    return item && item._id;
                  });

                  // 更新列表
                  _this2.bookingList = allBookings;
                  _this2.total = allBookings.length;
                  console.log("\u524D\u7AEF\u7B5B\u9009\u540E\u7684\u9884\u7EA6\u8BB0\u5F55\u6570: ".concat(_this2.bookingList.length));

                  // 更新加载状态
                  _this2.loadMoreStatus = 'noMore'; // 已获取全部数据

                  // 在前端根据状态筛选
                  if (useClientFiltering) {
                    if (_this2.currentStatus === 'booked') {
                      allBookings = allBookings.filter(function (item) {
                        return item && (item.status === 'pending' || item.status === 'confirmed_unpaid' || item.status === 'confirmed');
                      });
                    } else if (_this2.currentStatus === 'finished') {
                      allBookings = allBookings.filter(function (item) {
                        return item && item.status === 'finished';
                      });
                    } else if (_this2.currentStatus === 'cancelled') {
                      // 重点：筛选出已取消的预约（包含本地存储的）
                      cancelledBookings = allBookings.filter(function (item) {
                        return item && (item.status === 'cancelled' || item.paymentStatus === 'cancelled' || item.status === 'cancel');
                      }); // 获取本地已取消的预约
                      _localCancelledBookings = _this2.getLocalCancelledBookings(userId).filter(function (item) {
                        return item && item._id;
                      }); // 合并本地和远程的已取消预约，避免重复
                      if (_localCancelledBookings.length > 0) {
                        existingIds = cancelledBookings.map(function (item) {
                          return item._id;
                        });
                        newLocalCancelled = _localCancelledBookings.filter(function (item) {
                          return !existingIds.includes(item._id);
                        });
                        if (newLocalCancelled.length > 0) {
                          console.log("\u6DFB\u52A0".concat(newLocalCancelled.length, "\u6761\u672C\u5730\u5DF2\u53D6\u6D88\u9884\u7EA6\u5230\u5217\u8868"));
                          cancelledBookings = [].concat((0, _toConsumableArray2.default)(cancelledBookings), (0, _toConsumableArray2.default)(newLocalCancelled));
                        }
                      }
                      allBookings = cancelledBookings;

                      // 打印筛选后的已取消记录
                      console.log('前端筛选后的已取消预约记录:', allBookings);
                    }
                  }
                } else {
                  console.error('获取预约记录API返回失败:', res.result);
                  // 显示错误提示
                  uni.showToast({
                    title: '获取预约记录失败',
                    icon: 'none'
                  });

                  // 错误情况下，尝试从本地加载已取消预约
                  if (_this2.currentStatus === 'cancelled') {
                    try {
                      _userId = _this2.getUserId();
                      if (_userId) {
                        _localCancelledBookings2 = _this2.getLocalCancelledBookings(_userId);
                        if (_localCancelledBookings2.length > 0) {
                          _this2.bookingList = _localCancelledBookings2;
                          _this2.statusCounts.cancelled = _localCancelledBookings2.length;
                          _this2.total = _localCancelledBookings2.length;
                          _this2.localCancelledLoaded = true;
                          console.log("\u52A0\u8F7D\u4E86".concat(_localCancelledBookings2.length, "\u6761\u672C\u5730\u5DF2\u53D6\u6D88\u8BB0\u5F55"));
                          _this2.$forceUpdate();
                        }
                      }
                    } catch (localErr) {
                      console.error('加载本地已取消记录失败:', localErr);
                    }
                  }
                }
                _context.next = 41;
                break;
              case 37:
                _context.prev = 37;
                _context.t1 = _context["catch"](1);
                console.error('获取预约记录失败:', _context.t1);
                // 显示错误提示
                uni.showToast({
                  title: '获取预约记录失败',
                  icon: 'none'
                });
              case 41:
                // 更新UI显示
                _this2.$forceUpdate();
                return _context.abrupt("return", Promise.resolve());
              case 43:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 37], [9, 14]]);
      }))();
    },
    // 从本地存储获取已取消的预约记录
    getLocalCancelledBookings: function getLocalCancelledBookings(userId) {
      try {
        // 参数检查
        if (!userId) {
          console.warn('获取本地已取消预约记录: 用户ID为空');
          return [];
        }

        // 获取已取消预约ID列表
        var cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
        try {
          // 检查是否已经是数组
          cancelledIds = typeof cancelledIds === 'string' ? JSON.parse(cancelledIds) : cancelledIds;
          if (!Array.isArray(cancelledIds)) {
            console.warn('已取消预约ID列表格式不正确，重置为空数组');
            cancelledIds = [];
          }
        } catch (e) {
          console.error('解析已取消预约ID列表失败:', e);
          cancelledIds = [];
        }
        if (!cancelledIds.length) {
          return [];
        }

        // 从本地存储获取每个已取消预约的详细信息
        var cancelledBookings = [];
        var _iterator = _createForOfIteratorHelper(cancelledIds),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var id = _step.value;
            if (!id) continue; // 跳过无效ID

            var key = "cancelled_booking_".concat(id);
            var bookingStr = void 0;
            try {
              bookingStr = uni.getStorageSync(key);
            } catch (e) {
              console.error("\u83B7\u53D6\u9884\u7EA6\u6570\u636E\u5931\u8D25 (ID: ".concat(id, "):"), e);
              continue;
            }
            if (bookingStr) {
              try {
                // 检查是否已经是对象
                var booking = typeof bookingStr === 'string' ? JSON.parse(bookingStr) : bookingStr;

                // 确保必要字段存在
                if (!booking || !booking._id) {
                  console.warn("\u65E0\u6548\u7684\u9884\u7EA6\u6570\u636E (ID: ".concat(id, ")\uFF0C\u8DF3\u8FC7"));
                  continue;
                }

                // 确保状态为cancelled
                booking.status = 'cancelled';

                // 确保有取消时间
                if (!booking.cancelTime) {
                  booking.cancelTime = new Date().toISOString();
                }

                // 确保有课程标题
                if (!booking.title && booking.courseName) {
                  booking.title = booking.courseName;
                }

                // 确保有课程ID
                if (!booking.courseId && booking.course_id) {
                  booking.courseId = booking.course_id;
                }

                // 确保用户ID匹配
                if (booking.userId === userId) {
                  cancelledBookings.push(booking);
                } else if (String(booking.userId) === String(userId)) {
                  // 类型不同但值相同的情况
                  console.log("\u9884\u7EA6\u7528\u6237ID\u7C7B\u578B\u4E0D\u540C\uFF0C\u4FEE\u6B63\u540E\u5339\u914D (\u9884\u7EA6ID: ".concat(id, ")"));
                  booking.userId = userId; // 统一为传入的userId格式
                  cancelledBookings.push(booking);
                } else {
                  console.log("\u9884\u7EA6\u7528\u6237ID\u4E0D\u5339\u914D (\u9884\u7EA6ID: ".concat(id, ", \u9884\u7EA6\u7528\u6237: ").concat(booking.userId, ", \u5F53\u524D\u7528\u6237: ").concat(userId, ")"));
                }
              } catch (e) {
                console.error('解析已取消预约数据失败:', e);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        console.log("\u4E3A\u7528\u6237 ".concat(userId, " \u83B7\u53D6\u5230 ").concat(cancelledBookings.length, " \u6761\u672C\u5730\u5DF2\u53D6\u6D88\u9884\u7EA6\u8BB0\u5F55"));

        // 异步同步本地已取消预约到数据库
        this.syncCancelledBookingsToCloud(cancelledBookings);
        return cancelledBookings;
      } catch (e) {
        console.error('获取本地已取消预约记录失败:', e);
        return [];
      }
    },
    // 将本地已取消的预约同步到云数据库
    syncCancelledBookingsToCloud: function syncCancelledBookingsToCloud(bookings) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var syncedIds, newSyncedIds, syncCount, _iterator2, _step2, booking, result;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!bookings || !bookings.length)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                console.log("\u5C1D\u8BD5\u540C\u6B65 ".concat(bookings.length, " \u6761\u5DF2\u53D6\u6D88\u9884\u7EA6\u5230\u4E91\u6570\u636E\u5E93"));

                // 获取已同步ID缓存，避免重复同步
                syncedIds = uni.getStorageSync('synced_cancelled_ids') || '[]';
                try {
                  // 检查是否已经是数组
                  syncedIds = typeof syncedIds === 'string' ? JSON.parse(syncedIds) : syncedIds;
                  if (!Array.isArray(syncedIds)) {
                    syncedIds = [];
                  }
                } catch (e) {
                  console.error('解析已同步ID列表失败:', e);
                  syncedIds = [];
                }
                newSyncedIds = (0, _toConsumableArray2.default)(syncedIds);
                syncCount = 0;
                _iterator2 = _createForOfIteratorHelper(bookings);
                _context2.prev = 8;
                _iterator2.s();
              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 34;
                  break;
                }
                booking = _step2.value;
                _context2.prev = 12;
                if (booking._id) {
                  _context2.next = 15;
                  break;
                }
                return _context2.abrupt("continue", 32);
              case 15:
                if (!syncedIds.includes(booking._id)) {
                  _context2.next = 17;
                  break;
                }
                return _context2.abrupt("continue", 32);
              case 17:
                _context2.prev = 17;
                _context2.next = 20;
                return uniCloud.callFunction({
                  name: 'forceUpdateBooking',
                  data: {
                    bookingId: booking._id,
                    status: 'cancelled',
                    updateCourseCount: true // 确保更新课程报名人数
                  }
                });
              case 20:
                result = _context2.sent;
                if (result.result && result.result.success) {
                  syncCount++;
                  newSyncedIds.push(booking._id);

                  // 不要频繁打印日志，只在首次同步和最后一条时打印
                  if (syncCount === 1 || syncCount === bookings.length) {
                    console.log("\u5DF2\u6210\u529F\u540C\u6B65 ".concat(syncCount, "/").concat(bookings.length, " \u6761\u5DF2\u53D6\u6D88\u9884\u7EA6"));
                  }

                  // 每成功同步5条记录就保存一次同步缓存
                  if (syncCount % 5 === 0) {
                    uni.setStorageSync('synced_cancelled_ids', JSON.stringify(newSyncedIds));
                  }
                }
                _context2.next = 27;
                break;
              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](17);
                console.error("\u540C\u6B65\u5DF2\u53D6\u6D88\u9884\u7EA6 ".concat(booking._id, " \u5931\u8D25:"), _context2.t0);
              case 27:
                _context2.next = 32;
                break;
              case 29:
                _context2.prev = 29;
                _context2.t1 = _context2["catch"](12);
                console.error("\u5904\u7406\u5DF2\u53D6\u6D88\u9884\u7EA6 ".concat(booking._id, " \u51FA\u9519:"), _context2.t1);
              case 32:
                _context2.next = 10;
                break;
              case 34:
                _context2.next = 39;
                break;
              case 36:
                _context2.prev = 36;
                _context2.t2 = _context2["catch"](8);
                _iterator2.e(_context2.t2);
              case 39:
                _context2.prev = 39;
                _iterator2.f();
                return _context2.finish(39);
              case 42:
                // 保存最终的同步缓存
                if (syncCount > 0) {
                  uni.setStorageSync('synced_cancelled_ids', JSON.stringify(newSyncedIds));
                  console.log("\u672C\u6B21\u5171\u540C\u6B65 ".concat(syncCount, " \u6761\u5DF2\u53D6\u6D88\u9884\u7EA6\uFF0C\u66F4\u65B0\u540C\u6B65\u7F13\u5B58"));
                }
              case 43:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[8, 36, 39, 42], [12, 29], [17, 24]]);
      }))();
    },
    // 获取状态文本
    getStatusText: function getStatusText(item) {
      // 对于特殊状态的处理
      if (item.status === 'pending' && item.paymentStatus === 'paid') {
        return '已缴费';
      }
      if (item.status === 'confirmed' && item.paymentStatus === 'unpaid') {
        return '未缴费';
      }

      // 标准状态的显示
      var statusMap = {
        'pending': '未缴费',
        'confirmed_unpaid': '未缴费',
        'confirmed': '已缴费',
        'finished': '已完成',
        'cancelled': '已取消'
      };
      return statusMap[item.status] || '未知状态';
    },
    // 格式化课程时间
    formatCourseTime: function formatCourseTime(item) {
      // 如果有courseTime字段，优先使用该字段
      if (item.courseTime) {
        return item.courseTime;
      }

      // 日期范围格式化
      var formatDateRange = function formatDateRange() {
        // 确保有日期数据
        if (!item.courseStartDate && !item.courseEndDate) {
          return '';
        }

        // 格式化单个日期
        var formatDate = function formatDate(dateStr) {
          try {
            if (!dateStr) return '';
            var date = new Date(dateStr);
            if (isNaN(date.getTime())) {
              return dateStr;
            }
            return "".concat(date.getFullYear(), "-").concat((date.getMonth() + 1).toString().padStart(2, '0'), "-").concat(date.getDate().toString().padStart(2, '0'));
          } catch (e) {
            return dateStr;
          }
        };

        // 如果有开始和结束日期，显示范围
        if (item.courseStartDate && item.courseEndDate) {
          return "".concat(formatDate(item.courseStartDate), "\u81F3").concat(formatDate(item.courseEndDate));
        } else if (item.courseStartDate) {
          return formatDate(item.courseStartDate);
        } else if (item.courseEndDate) {
          return formatDate(item.courseEndDate);
        }
        return '';
      };

      // 时间段格式化
      var formatTimeRange = function formatTimeRange() {
        // 确保有时间数据
        if (!item.courseStartTime && !item.courseEndTime) {
          return '';
        }

        // 处理简单的时间字符串
        var formatTime = function formatTime(timeStr) {
          if (!timeStr) return '';

          // 如果是简单的时间字符串，直接返回
          if (typeof timeStr === 'string' && (timeStr.includes(':') || timeStr.match(/^\d{1,2}:\d{2}$/))) {
            return timeStr;
          }

          // 如果是日期时间，提取时间部分
          try {
            var date = new Date(timeStr);
            if (!isNaN(date.getTime())) {
              return "".concat(date.getHours().toString().padStart(2, '0'), ":").concat(date.getMinutes().toString().padStart(2, '0'));
            }
          } catch (e) {
            // 忽略错误
          }
          return timeStr;
        };

        // 如果有开始和结束时间，显示范围
        if (item.courseStartTime && item.courseEndTime) {
          return "".concat(formatTime(item.courseStartTime), "-").concat(formatTime(item.courseEndTime));
        } else if (item.courseStartTime) {
          return formatTime(item.courseStartTime);
        } else if (item.courseEndTime) {
          return formatTime(item.courseEndTime);
        }
        return '';
      };

      // 组合日期和时间
      var dateRange = formatDateRange();
      var timeRange = formatTimeRange();
      if (dateRange && timeRange) {
        return "".concat(dateRange, " ").concat(timeRange);
      } else if (dateRange) {
        return dateRange;
      } else if (timeRange) {
        return timeRange;
      }

      // 处理原始的startTime和endTime（如果存在）
      if (item.startTime || item.endTime) {
        try {
          var formatFullDateTime = function formatFullDateTime(dateTimeStr) {
            if (!dateTimeStr) return '';
            var date = new Date(dateTimeStr);
            if (isNaN(date.getTime())) {
              return dateTimeStr;
            }
            var dateStr = "".concat(date.getFullYear(), "-").concat((date.getMonth() + 1).toString().padStart(2, '0'), "-").concat(date.getDate().toString().padStart(2, '0'));
            var timeStr = "".concat(date.getHours().toString().padStart(2, '0'), ":").concat(date.getMinutes().toString().padStart(2, '0'));
            return "".concat(dateStr, " ").concat(timeStr);
          };
          if (item.startTime && item.endTime) {
            return "".concat(formatFullDateTime(item.startTime), "\u81F3").concat(formatFullDateTime(item.endTime));
          } else if (item.startTime) {
            return formatFullDateTime(item.startTime);
          } else if (item.endTime) {
            return formatFullDateTime(item.endTime);
          }
        } catch (e) {
          console.error('格式化完整日期时间出错:', e);
        }
      }
      return '暂无';
    },
    // 格式化预约时间
    formatBookingTime: function formatBookingTime(timeStr) {
      if (!timeStr) return '';
      var date = new Date(timeStr);
      return "".concat(date.getFullYear(), "-").concat((date.getMonth() + 1).toString().padStart(2, '0'), "-").concat(date.getDate().toString().padStart(2, '0'), " ").concat(date.getHours().toString().padStart(2, '0'), ":").concat(date.getMinutes().toString().padStart(2, '0'));
    },
    // 查看预约详情
    viewDetail: function viewDetail(booking, event) {
      // 检查点击事件的数据
      try {
        // 如果booking为空，尝试从事件对象中获取数据
        if (!booking) {
          var eventTarget = event && event.currentTarget;
          if (eventTarget) {
            var bookingId = eventTarget.dataset.bookingId;
            var courseId = eventTarget.dataset.courseId;
            console.log('从事件对象获取数据:', {
              bookingId: bookingId,
              courseId: courseId
            });

            // 如果可以直接获取课程ID，则直接跳转
            if (courseId) {
              this.navigateToCourse(courseId);
              return;
            }

            // 如果只有预约ID，则跳转到预约详情
            if (bookingId) {
              uni.navigateTo({
                url: "/pages/user/booking-detail?id=".concat(bookingId)
              });
              return;
            }
          }
          console.warn('预约数据为空，无法处理点击事件');
          return;
        }

        // 检查booking参数是否有效
        if ((0, _typeof2.default)(booking) !== 'object') {
          console.error('无效的预约数据类型:', (0, _typeof2.default)(booking));
          uni.showToast({
            title: '无效的预约数据',
            icon: 'none'
          });
          return;
        }

        // 确保booking对象有_id或courseId至少一个
        if (!booking._id && !booking.courseId) {
          console.error('预约数据缺少必要字段:', booking);
          uni.showToast({
            title: '无效的预约数据',
            icon: 'none'
          });
          return;
        }

        // 如果存在课程ID，则直接跳转到课程详情页
        if (booking.courseId) {
          console.log('跳转到课程详情页:', booking.courseId);
          this.navigateToCourse(booking.courseId);
          return;
        }

        // 否则跳转到预约详情页
        console.log('跳转到预约详情页:', booking._id);
        uni.navigateTo({
          url: "/pages/user/booking-detail?id=".concat(booking._id)
        });
      } catch (error) {
        console.error('处理预约点击事件出错:', error);
        uni.showToast({
          title: '处理失败，请重试',
          icon: 'none'
        });
      }
    },
    // 取消预约
    cancelBooking: function cancelBooking(booking, e) {
      var _this3 = this;
      // 阻止事件冒泡（使用传入的事件参数e）
      if (e) e.stopPropagation();

      // 确保booking参数存在且有效
      if (!booking || (0, _typeof2.default)(booking) !== 'object') {
        console.error('无效的预约数据:', booking);
        uni.showToast({
          title: '无效的预约数据',
          icon: 'none'
        });
        return;
      }

      // 检查支付状态
      var hasPaid = booking.paymentStatus === 'paid' || booking.status === 'confirmed' || booking.isPaid === true;

      // 确认是否取消
      uni.showModal({
        title: '取消预约',
        content: hasPaid ? '您已完成缴费，确定要取消此次预约吗？' : '确定要取消此次预约吗？',
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(res) {
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (res.confirm) {
                      _this3.handleCancel(booking);
                    }
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
        }()
      });
    },
    // 新增处理取消操作的方法
    handleCancel: function handleCancel(booking) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var userInfoStr, userId, userInfo, bookingDocId, updateSuccess, cloudResult, updateResult, _updateResult$result, forceResult, _updateResult, db, _updateResult2, _updateResult3, previousStatus, previouslyCancelled, cancelledBooking, existingIndex;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('准备取消预约:', JSON.stringify(booking));
                _context4.prev = 1;
                uni.showLoading({
                  title: '取消中...'
                });

                // 获取当前用户ID，提高安全性
                userInfoStr = uni.getStorageSync('userInfo');
                userId = '';
                if (userInfoStr) {
                  try {
                    // 检查是否已经是对象
                    userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
                    userId = userInfo.userId || userInfo._id || userInfo.uid || userInfo.userInfo && userInfo.userInfo._id || userInfo.userInfo && userInfo.userInfo.uid || '';
                  } catch (e) {
                    console.error('解析用户信息失败:', e);
                  }
                }

                // 确保bookingDocId有值
                bookingDocId = booking._id || '';
                if (bookingDocId) {
                  _context4.next = 12;
                  break;
                }
                console.error('预约ID无效:', booking);
                uni.showToast({
                  title: '预约ID无效',
                  icon: 'none'
                });
                uni.hideLoading();
                return _context4.abrupt("return");
              case 12:
                console.log('取消预约:', {
                  _id: bookingDocId,
                  bookingId: booking.bookingId || '',
                  courseId: booking.courseId || '',
                  userId: userId,
                  bookingUserId: booking.userId || '',
                  status: booking.status || 'unknown'
                });
                updateSuccess = false; // 尝试方法1：使用cancelBooking云函数
                _context4.prev = 14;
                console.log('尝试方法1：使用cancelBooking云函数');
                _context4.next = 18;
                return uniCloud.callFunction({
                  name: 'cancelBooking',
                  data: {
                    bookingId: bookingDocId,
                    userId: userId
                  }
                });
              case 18:
                cloudResult = _context4.sent;
                console.log('方法1结果:', JSON.stringify(cloudResult.result));
                if (!(cloudResult.result && cloudResult.result.success)) {
                  _context4.next = 40;
                  break;
                }
                updateSuccess = true;
                console.log('方法1成功：使用cancelBooking云函数更新成功');

                // 检查课程更新状态
                if (!(cloudResult.result.data && cloudResult.result.data.courseUpdated !== undefined)) {
                  _context4.next = 40;
                  break;
                }
                console.log('课程更新状态:', cloudResult.result.data.courseUpdated ? '成功' : '失败');
                if (cloudResult.result.data.courseUpdated) {
                  _context4.next = 40;
                  break;
                }
                console.warn('❌ 警告: 预约已取消，但课程报名人数可能未减少，尝试直接更新');

                // 如果课程bookingCount未更新，尝试使用forceUpdateBooking云函数直接更新
                if (!booking.courseId) {
                  _context4.next = 40;
                  break;
                }
                _context4.prev = 28;
                console.log('尝试使用forceUpdateBooking云函数直接更新课程报名人数, 课程ID:', booking.courseId);
                _context4.next = 32;
                return uniCloud.callFunction({
                  name: 'forceUpdateBooking',
                  data: {
                    courseId: booking.courseId,
                    updateCourseOnly: true,
                    decreaseBookingCount: true
                  }
                });
              case 32:
                updateResult = _context4.sent;
                console.log('直接更新课程报名人数结果:', JSON.stringify(updateResult.result));
                if (updateResult.result && updateResult.result.code === 0) {
                  console.log('✅ 直接更新课程报名人数成功');
                } else {
                  console.warn('❌ 直接更新课程报名人数失败:', ((_updateResult$result = updateResult.result) === null || _updateResult$result === void 0 ? void 0 : _updateResult$result.message) || '未知错误');
                }
                _context4.next = 40;
                break;
              case 37:
                _context4.prev = 37;
                _context4.t0 = _context4["catch"](28);
                console.error('直接更新课程报名人数失败:', _context4.t0);
              case 40:
                _context4.next = 45;
                break;
              case 42:
                _context4.prev = 42;
                _context4.t1 = _context4["catch"](14);
                console.error('方法1失败:', _context4.t1);
              case 45:
                if (updateSuccess) {
                  _context4.next = 76;
                  break;
                }
                _context4.prev = 46;
                console.log('尝试方法2：使用forceUpdateBooking云函数');
                _context4.next = 50;
                return uniCloud.callFunction({
                  name: 'forceUpdateBooking',
                  data: {
                    bookingId: bookingDocId,
                    status: 'cancelled',
                    updateCourseCount: true // 确保更新课程报名人数
                  }
                });
              case 50:
                forceResult = _context4.sent;
                console.log('方法2结果:', JSON.stringify(forceResult.result));
                if (!(forceResult.result && forceResult.result.success)) {
                  _context4.next = 70;
                  break;
                }
                updateSuccess = true;
                console.log('方法2成功：使用forceUpdateBooking云函数更新成功');

                // 检查课程更新状态，如果未更新，则尝试直接更新
                if (!(forceResult.result.data && forceResult.result.data.courseUpdated !== undefined && !forceResult.result.data.courseUpdated)) {
                  _context4.next = 68;
                  break;
                }
                if (!booking.courseId) {
                  _context4.next = 68;
                  break;
                }
                _context4.prev = 57;
                console.log('尝试使用forceUpdateBooking云函数直接更新课程报名人数, 课程ID:', booking.courseId);
                _context4.next = 61;
                return uniCloud.callFunction({
                  name: 'forceUpdateBooking',
                  data: {
                    courseId: booking.courseId,
                    updateCourseOnly: true,
                    decreaseBookingCount: true
                  }
                });
              case 61:
                _updateResult = _context4.sent;
                console.log('直接更新课程报名人数结果:', JSON.stringify(_updateResult.result));
                _context4.next = 68;
                break;
              case 65:
                _context4.prev = 65;
                _context4.t2 = _context4["catch"](57);
                console.error('直接更新课程报名人数失败:', _context4.t2);
              case 68:
                _context4.next = 71;
                break;
              case 70:
                console.error('方法2失败，返回结果:', forceResult.result);
              case 71:
                _context4.next = 76;
                break;
              case 73:
                _context4.prev = 73;
                _context4.t3 = _context4["catch"](46);
                console.error('方法2失败，错误信息:', _context4.t3);
              case 76:
                if (updateSuccess) {
                  _context4.next = 104;
                  break;
                }
                _context4.prev = 77;
                console.log('尝试方法3：直接操作数据库');
                db = uniCloud.database();
                _context4.next = 82;
                return db.collection('bookings').doc(bookingDocId).update({
                  status: 'cancelled',
                  updateTime: new Date(),
                  cancelTime: new Date()
                });
              case 82:
                _updateResult2 = _context4.sent;
                console.log('方法3结果:', _updateResult2);
                if (!(_updateResult2 && _updateResult2.updated > 0)) {
                  _context4.next = 99;
                  break;
                }
                updateSuccess = true;
                console.log('方法3成功：直接更新数据库成功');

                // 更新课程报名人数，使用forceUpdateBooking云函数
                if (!booking.courseId) {
                  _context4.next = 99;
                  break;
                }
                _context4.prev = 88;
                console.log('尝试使用forceUpdateBooking云函数直接更新课程报名人数, 课程ID:', booking.courseId);
                _context4.next = 92;
                return uniCloud.callFunction({
                  name: 'forceUpdateBooking',
                  data: {
                    courseId: booking.courseId,
                    updateCourseOnly: true,
                    decreaseBookingCount: true
                  }
                });
              case 92:
                _updateResult3 = _context4.sent;
                console.log('直接更新课程报名人数结果:', JSON.stringify(_updateResult3.result));
                _context4.next = 99;
                break;
              case 96:
                _context4.prev = 96;
                _context4.t4 = _context4["catch"](88);
                console.error('更新课程报名人数失败:', _context4.t4);
              case 99:
                _context4.next = 104;
                break;
              case 101:
                _context4.prev = 101;
                _context4.t5 = _context4["catch"](77);
                console.error('方法3失败:', _context4.t5);
              case 104:
                // 无论是否成功更新数据库，都更新本地状态
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

                // 更新预约状态计数（无论是否成功更新服务器）
                previousStatus = booking.status || 'unknown'; // 如果之前是已预约状态，减少已预约计数
                if (previousStatus !== 'cancelled' && (previousStatus === 'pending' || previousStatus === 'confirmed_unpaid' || previousStatus === 'confirmed')) {
                  _this4.statusCounts.booked = Math.max(0, _this4.statusCounts.booked - 1);
                }
                // 如果之前是已完成状态，减少已完成计数
                else if (previousStatus === 'finished') {
                  _this4.statusCounts.finished = Math.max(0, _this4.statusCounts.finished - 1);
                }

                // 增加已取消计数，确保不重复计算
                previouslyCancelled = booking.status === 'cancelled';
                if (!previouslyCancelled) {
                  _this4.statusCounts.cancelled++;
                }

                // 在内存中更新预约状态
                _this4.updateBookingStatus(bookingDocId, 'cancelled');

                // 如果当前不是"已取消"选项卡，从当前列表中移除该项
                if (_this4.currentStatus !== 'cancelled') {
                  _this4.removeBookingFromList(bookingDocId);

                  // 提示用户可以在"已取消"标签查看
                  setTimeout(function () {
                    uni.showToast({
                      title: "\u5DF2\u53D6\u6D88\uFF0C\u53EF\u5728\"\u5DF2\u53D6\u6D88(".concat(_this4.getTabCount('cancelled'), ")\"\u6807\u7B7E\u67E5\u770B"),
                      icon: 'none',
                      duration: 2000
                    });
                  }, 1500);
                }

                // 保存到本地存储
                cancelledBooking = _objectSpread(_objectSpread({}, booking), {}, {
                  status: 'cancelled',
                  cancelTime: new Date().toISOString()
                });
                _this4.storeCancelledBooking(cancelledBooking);

                // 标记预约状态已变更
                _this4.markBookingChanged();

                // 发送取消事件，更新相关页面
                uni.$emit('booking:cancel', {
                  courseId: booking.courseId || '',
                  userId: userId,
                  bookingId: bookingDocId
                });

                // 如果当前在"已取消"标签页，重新加载列表以显示最新数据
                if (_this4.currentStatus === 'cancelled') {
                  // 将刚刚取消的预约添加到列表头部
                  if (cancelledBooking && cancelledBooking._id) {
                    // 避免重复添加
                    existingIndex = _this4.bookingList.findIndex(function (item) {
                      return item && item._id === cancelledBooking._id;
                    });
                    if (existingIndex === -1) {
                      console.log('在已取消标签中添加最新取消的预约记录到头部');
                      _this4.bookingList.unshift(cancelledBooking);
                      _this4.total = _this4.bookingList.length;
                      _this4.$forceUpdate();
                    } else {
                      console.log('预约记录已存在于列表中，更新状态');
                      _this4.bookingList[existingIndex].status = 'cancelled';
                      _this4.$forceUpdate();
                    }
                  } else {
                    // 如果无法直接添加，则重新加载整个列表
                    console.log('无法直接添加取消的预约，刷新整个列表');
                    _this4.resetList();
                    _this4.loadBookingList();
                  }
                }
                _context4.next = 122;
                break;
              case 118:
                _context4.prev = 118;
                _context4.t6 = _context4["catch"](1);
                console.error('取消预约失败:', _context4.t6);
                uni.showToast({
                  title: '取消失败，请稍后重试',
                  icon: 'none'
                });
              case 122:
                _context4.prev = 122;
                uni.hideLoading();
                return _context4.finish(122);
              case 125:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 118, 122, 125], [14, 42], [28, 37], [46, 73], [57, 65], [77, 101], [88, 96]]);
      }))();
    },
    // 联系老师
    contactTeacher: function contactTeacher(booking, e) {
      // 阻止事件冒泡
      if (e) e.stopPropagation();

      // 检查参数有效性
      if (!booking || (0, _typeof2.default)(booking) !== 'object') {
        console.error('无效的预约数据:', booking);
        uni.showToast({
          title: '无效的预约数据',
          icon: 'none'
        });
        return;
      }

      // 检查是否有联系电话
      var phoneNumber = booking.contactPhone || booking.teacherPhone || '';
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
    // 查看课程详情
    navigateToCourse: function navigateToCourse(courseId, e) {
      // 阻止事件冒泡
      if (e) e.stopPropagation();

      // 检查参数有效性
      if (!courseId) {
        console.error('无效的课程ID:', courseId);
        uni.showToast({
          title: '无效的课程ID',
          icon: 'none'
        });
        return;
      }

      // 检查课程ID是否为有效的MongoDB ObjectId格式
      if (typeof courseId !== 'string' || courseId.length !== 24) {
        console.warn('课程ID格式可能不正确:', courseId);
      }

      // 跳转到课程详情页
      uni.navigateTo({
        url: "/pages/course/detail?id=".concat(courseId)
      });
    },
    // 存储已取消的预约
    storeCancelledBooking: function storeCancelledBooking(booking) {
      try {
        // 参数检查
        if (!booking || (0, _typeof2.default)(booking) !== 'object') {
          console.error('存储已取消预约失败: 无效的预约数据', booking);
          return;
        }

        // 确保booking有_id字段
        if (!booking._id) {
          console.error('无法保存没有_id的预约记录', booking);
          return;
        }

        // 深拷贝booking对象，避免引用问题
        var bookingCopy = JSON.parse(JSON.stringify(booking));

        // 确保booking有完整的信息
        bookingCopy.status = 'cancelled';
        bookingCopy.cancelTime = bookingCopy.cancelTime || new Date().toISOString();

        // 构建存储键名
        var key = "cancelled_booking_".concat(bookingCopy._id);

        // 检查是否已经存储过
        var existingData = uni.getStorageSync(key);
        var isNewStorage = !existingData;

        // 保存已取消的预约数据
        uni.setStorageSync(key, JSON.stringify(bookingCopy));

        // 只有首次存储才打印日志和执行后续逻辑
        if (isNewStorage) {
          console.log('已保存已取消预约数据:', bookingCopy._id);

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
          var alreadyExists = cancelledIds.includes(bookingCopy._id);

          // 添加到列表头部（如果不存在）
          if (!alreadyExists) {
            cancelledIds.unshift(bookingCopy._id);
            // 最多保存20条
            if (cancelledIds.length > 20) {
              cancelledIds = cancelledIds.slice(0, 20);
            }

            // 更新计数和标记
            this.statusCounts.cancelled = cancelledIds.length;
            this.localCancelledLoaded = true;

            // 保存更新后的ID列表
            uni.setStorageSync('cancelled_booking_ids', JSON.stringify(cancelledIds));

            // 如果是通过按钮取消的预约，且不在已取消标签页，延迟后切换到已取消标签
            if (this.currentStatus !== 'cancelled' && !this.autoSwitchToCancel) {
              this.switchToCancelledTab();
            }
          }
        }
      } catch (e) {
        console.error('保存已取消预约数据失败:', e);
      }
      return true;
    },
    // 切换到已取消标签页
    switchToCancelledTab: function switchToCancelledTab() {
      var _this5 = this;
      setTimeout(function () {
        uni.showToast({
          title: '正在前往已取消列表',
          icon: 'none',
          duration: 1500
        });
        setTimeout(function () {
          _this5.changeTab('cancelled');
        }, 1500);
      }, 800);
    },
    // 获取空数据提示文本
    getEmptyTipText: function getEmptyTipText() {
      switch (this.currentStatus) {
        case 'all':
          return '暂无任何预约记录';
        case 'booked':
          return '暂无进行中的预约';
        case 'finished':
          return '暂无已完成的预约';
        case 'cancelled':
          return '暂无已取消的预约记录';
        default:
          return '暂无预约记录';
      }
    },
    // 获取标签对应的预约数量
    getTabCount: function getTabCount(status) {
      // 使用缓存的数量
      return this.statusCounts[status] || 0;
    },
    // 加载本地已取消记录数量
    loadLocalCancelledCount: function loadLocalCancelledCount() {
      if (this.localCancelledLoaded) return;
      try {
        var userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          // 检查是否已经是对象
          var userData = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
          var userId = userData.userId || userData._id || userData.uid || userData.userInfo && userData.userInfo._id || userData.userInfo && userData.userInfo.uid || '';
          if (userId) {
            var cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
            try {
              // 检查是否已经是数组
              var ids = typeof cancelledIds === 'string' ? JSON.parse(cancelledIds) : cancelledIds;
              if (Array.isArray(ids)) {
                this.statusCounts.cancelled = ids.length;
                this.localCancelledLoaded = true;
                console.log("\u52A0\u8F7D\u5230".concat(ids.length, "\u6761\u672C\u5730\u5DF2\u53D6\u6D88\u9884\u7EA6"));
              }
            } catch (e) {
              console.error('解析已取消预约ID列表失败:', e);
            }
          }
        }
      } catch (e) {
        console.error('加载本地已取消预约数量失败:', e);
      }
    },
    // 更新预约状态
    updateBookingStatus: function updateBookingStatus(bookingId, status) {
      if (!bookingId || !status) return;
      console.log("\u66F4\u65B0\u9884\u7EA6".concat(bookingId, "\u72B6\u6001\u4E3A").concat(status));

      // 查找匹配的预约
      var index = this.bookingList.findIndex(function (item) {
        return item && item._id === bookingId;
      });
      if (index !== -1) {
        console.log("\u627E\u5230\u9884\u7EA6\u5728\u5217\u8868\u4E2D\u7684\u4F4D\u7F6E: ".concat(index, ", \u66F4\u65B0\u72B6\u6001"));
        this.bookingList[index].status = status;
        this.$forceUpdate();
      } else {
        console.log("\u672A\u5728\u5F53\u524D\u5217\u8868\u4E2D\u627E\u5230\u9884\u7EA6: ".concat(bookingId));
      }
    },
    // 从列表中移除预约
    removeBookingFromList: function removeBookingFromList(bookingId) {
      if (!bookingId) return;
      console.log("\u4ECE\u5217\u8868\u4E2D\u79FB\u9664\u9884\u7EA6: ".concat(bookingId));

      // 查找匹配的预约
      var index = this.bookingList.findIndex(function (item) {
        return item && item._id === bookingId;
      });
      if (index !== -1) {
        console.log("\u627E\u5230\u9884\u7EA6\u5728\u5217\u8868\u4E2D\u7684\u4F4D\u7F6E: ".concat(index, ", \u79FB\u9664\u5B83"));
        this.bookingList.splice(index, 1);
        this.total = Math.max(0, this.total - 1);
        this.$forceUpdate();
      } else {
        console.log("\u672A\u5728\u5F53\u524D\u5217\u8868\u4E2D\u627E\u5230\u9884\u7EA6: ".concat(bookingId));
      }
    },
    // 标记预约状态已变更
    markBookingChanged: function markBookingChanged() {
      console.log('标记预约状态已变更');
      uni.setStorageSync('booking_changed', 'true');
    },
    // 获取用户ID
    getUserId: function getUserId() {
      try {
        var userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          // 检查是否已经是对象
          var userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
          return userInfo.userId || userInfo._id || userInfo.uid || userInfo.userInfo && userInfo.userInfo._id || userInfo.userInfo && userInfo.userInfo.uid || '';
        }
      } catch (e) {
        console.error('获取用户ID失败:', e);
      }
      return '';
    },
    // 在methods部分添加检查是否显示操作按钮的方法
    showActions: function showActions(item) {
      return item && (item.status !== 'cancelled' && item.status !== 'finished' || item.status === 'confirmed' || item.status === 'confirmed_unpaid' || item.status !== 'cancelled');
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"]))

/***/ }),

/***/ 239:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/booking.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.55.2025030718/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./booking.vue?vue&type=style&index=0&lang=scss& */ 240);
/* harmony import */ var _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 240:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/YueKe/Siwei_YueKe/pages/user/booking.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[233,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/booking.js.map