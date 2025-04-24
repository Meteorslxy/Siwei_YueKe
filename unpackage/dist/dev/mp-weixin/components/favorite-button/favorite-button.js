(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/favorite-button/favorite-button"],{

/***/ 83:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/favorite-button/favorite-button.vue ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./favorite-button.vue?vue&type=template&id=6c434d0c& */ 84);
/* harmony import */ var _favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./favorite-button.vue?vue&type=script&lang=js& */ 86);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _favorite_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./favorite-button.vue?vue&type=style&index=0&lang=scss& */ 88);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/favorite-button/favorite-button.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 84:
/*!*********************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/favorite-button/favorite-button.vue?vue&type=template&id=6c434d0c& ***!
  \*********************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./favorite-button.vue?vue&type=template&id=6c434d0c& */ 85);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_template_id_6c434d0c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 85:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/favorite-button/favorite-button.vue?vue&type=template&id=6c434d0c& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 86:
/*!***************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/favorite-button/favorite-button.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./favorite-button.vue?vue&type=script&lang=js& */ 87);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 87:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/favorite-button/favorite-button.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _default = {
  name: 'favorite-button',
  props: {
    // 项目ID
    itemId: {
      type: String,
      required: true
    },
    // 项目类型（lecture, course, teacher等）
    itemType: {
      type: String,
      default: 'course'
    },
    // 项目标题
    itemTitle: {
      type: String,
      default: ''
    },
    // 项目封面图
    itemCover: {
      type: String,
      default: ''
    },
    // 项目URL
    itemUrl: {
      type: String,
      default: ''
    },
    // 初始收藏状态
    initialFavorite: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      isFavorite: this.initialFavorite,
      favoriteId: '',
      // 收藏记录ID
      loading: false,
      navBarHeight: 0,
      // 导航栏高度
      statusBarHeight: 0 // 状态栏高度
    };
  },
  created: function created() {
    var _this = this;
    // 确保收藏表已初始化
    this.ensureFavoriteTableExists();

    // 从父组件传入的initialFavorite进行初始化
    if (this.initialFavorite) {
      console.log('使用父组件传递的初始收藏状态:', this.initialFavorite);
      this.isFavorite = true;
    } else {
      // 立即检查一次收藏状态
      this.checkFavoriteStatus();

      // 延迟300ms后再检查一次，确保状态正确
      setTimeout(function () {
        console.log('延迟检查收藏状态...');
        _this.checkFavoriteStatus();
      }, 300);
    }

    // 获取系统信息
    try {
      var systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
      // 小程序导航栏高度（单位px）
      var navBarHeight = 44; // 默认导航栏高度
      this.navBarHeight = navBarHeight;
      console.log('状态栏高度:', this.statusBarHeight);
      console.log('导航栏高度:', this.navBarHeight);

      // 通知父组件状态栏和导航栏高度
      this.$emit('statusBarHeight', this.statusBarHeight);
      this.$emit('navBarHeight', this.navBarHeight);
    } catch (e) {
      console.error('获取系统信息失败:', e);
    }
  },
  methods: {
    // 确保收藏表已初始化
    ensureFavoriteTableExists: function ensureFavoriteTableExists() {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var initResult;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return uniCloud.callFunction({
                  name: 'initFavoriteTable'
                });
              case 3:
                initResult = _context.sent;
                console.log('初始化收藏表结果:', initResult);
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error('初始化收藏表失败:', _context.t0);
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    // 检查收藏状态
    checkFavoriteStatus: function checkFavoriteStatus() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userInfo, userData, userId, res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.itemId) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _context2.prev = 2;
                userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                  _context2.next = 6;
                  break;
                }
                return _context2.abrupt("return");
              case 6:
                try {
                  userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
                } catch (e) {
                  console.error('解析用户数据失败:', e);
                  userData = userInfo; // 如果解析失败，使用原始数据
                }
                userId = userData.userId || userData._id || userData.uid || userData.userInfo && userData.userInfo._id || userData.userInfo && userData.userInfo.uid || '';
                if (userId) {
                  _context2.next = 10;
                  break;
                }
                return _context2.abrupt("return");
              case 10:
                _context2.next = 12;
                return _this2.$api.user.checkFavorite({
                  userId: userId,
                  itemId: _this2.itemId,
                  itemType: _this2.itemType
                });
              case 12:
                res = _context2.sent;
                console.log('检查收藏状态返回详细结果:', JSON.stringify(res));
                if (res && res.code === 0) {
                  // 1. 优先检查结果对象中的isFavorite字段
                  if (typeof res.isFavorite === 'boolean') {
                    _this2.isFavorite = res.isFavorite;
                  }
                  // 2. 检查data中的isFavorite字段
                  else if (res.data && typeof res.data.isFavorite === 'boolean') {
                    _this2.isFavorite = res.data.isFavorite;
                  }
                  // 3. 如果data存在且不为空，则视为已收藏
                  else if (res.data && res.data._id) {
                    _this2.isFavorite = true;
                  }
                  // 4. 都不符合则未收藏
                  else {
                    _this2.isFavorite = false;
                  }

                  // 获取收藏ID
                  _this2.favoriteId = res.data && res.data._id || '';
                  console.log('❤️ 最终收藏状态:', _this2.isFavorite ? '已收藏' : '未收藏', '收藏ID:', _this2.favoriteId);
                } else {
                  _this2.isFavorite = false;
                  _this2.favoriteId = '';
                }
                _context2.next = 20;
                break;
              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](2);
                console.error('检查收藏状态失败:', _context2.t0);
              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 17]]);
      }))();
    },
    // 检查是否已收藏
    checkIsFavorite: function checkIsFavorite() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var userInfo, userData, userId, checkData, res;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                if (!(!_this3.itemType || !_this3.itemId)) {
                  _context3.next = 6;
                  break;
                }
                console.error('收藏检查失败: 缺少必要参数', _this3.itemType, _this3.itemId);
                _this3.isFavorite = false;
                _this3.favoriteId = '';
                return _context3.abrupt("return");
              case 6:
                userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                  _context3.next = 11;
                  break;
                }
                _this3.isFavorite = false;
                _this3.favoriteId = '';
                return _context3.abrupt("return");
              case 11:
                try {
                  userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
                } catch (e) {
                  console.error('解析用户数据失败:', e);
                  userData = userInfo; // 如果解析失败，使用原始数据
                }
                userId = userData.userId || userData._id || userData.uid || userData.userInfo && userData.userInfo._id || userData.userInfo && userData.userInfo.uid || '';
                if (userId) {
                  _context3.next = 18;
                  break;
                }
                console.log('无法获取用户ID，视为未收藏');
                _this3.isFavorite = false;
                _this3.favoriteId = '';
                return _context3.abrupt("return");
              case 18:
                // 构建检查参数
                checkData = {
                  userId: userId,
                  itemType: _this3.itemType,
                  itemId: _this3.itemId
                };
                console.log('检查收藏状态，参数:', checkData);

                // 调用API检查是否已收藏
                _context3.next = 22;
                return _this3.$api.user.checkFavorite(checkData);
              case 22:
                res = _context3.sent;
                console.log('检查收藏状态返回详细结果:', JSON.stringify(res));
                if (res && res.code === 0) {
                  // 1. 优先检查结果对象中的isFavorite字段
                  if (typeof res.isFavorite === 'boolean') {
                    _this3.isFavorite = res.isFavorite;
                  }
                  // 2. 检查data中的isFavorite字段
                  else if (res.data && typeof res.data.isFavorite === 'boolean') {
                    _this3.isFavorite = res.data.isFavorite;
                  }
                  // 3. 如果data存在且不为空，则视为已收藏
                  else if (res.data && res.data._id) {
                    _this3.isFavorite = true;
                  }
                  // 4. 都不符合则未收藏
                  else {
                    _this3.isFavorite = false;
                  }

                  // 获取收藏ID
                  _this3.favoriteId = res.data && res.data._id || '';
                  console.log('❤️ 最终收藏状态:', _this3.isFavorite ? '已收藏' : '未收藏', '收藏ID:', _this3.favoriteId);
                } else {
                  _this3.isFavorite = false;
                  _this3.favoriteId = '';
                }
                _context3.next = 32;
                break;
              case 27:
                _context3.prev = 27;
                _context3.t0 = _context3["catch"](0);
                console.error('检查收藏状态失败:', _context3.t0);
                _this3.isFavorite = false;
                _this3.favoriteId = '';
              case 32:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 27]]);
      }))();
    },
    // 切换收藏状态
    toggleFavorite: function toggleFavorite() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var userInfo, userData, token, userDetailRes, freshUserInfo, userId, _token, tokenParts, base64Payload, payload, uniIdUserInfo, uniIdData, deviceId, res, favoriteData, _res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // 检查登录状态
                userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                  _context4.next = 4;
                  break;
                }
                uni.showModal({
                  title: '提示',
                  content: '请先登录',
                  confirmText: '去登录',
                  success: function success(res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '/pages/login/login'
                      });
                    }
                  }
                });
                return _context4.abrupt("return");
              case 4:
                _context4.prev = 4;
                // 安全地解析用户数据

                try {
                  userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
                } catch (e) {
                  console.error('解析用户数据失败:', e);
                  userData = userInfo; // 如果解析失败，使用原始数据
                }

                console.log('用户数据:', userData);

                // 更新用户信息：尝试通过云函数获取最新信息
                _context4.prev = 7;
                console.log('尝试获取最新用户信息...');

                // 获取token
                token = uni.getStorageSync('uni_id_token');
                if (!token) {
                  _context4.next = 16;
                  break;
                }
                _context4.next = 13;
                return uniCloud.callFunction({
                  name: 'getUserInfoByToken',
                  data: {
                    uniIdToken: token
                  }
                });
              case 13:
                userDetailRes = _context4.sent;
                console.log('getUserInfoByToken结果:', userDetailRes);
                if (userDetailRes.result && userDetailRes.result.code === 0 && userDetailRes.result.userInfo) {
                  freshUserInfo = userDetailRes.result.userInfo;
                  console.log('获取到最新用户信息:', freshUserInfo);

                  // 更新到本地存储
                  uni.setStorageSync('userInfo', freshUserInfo);

                  // 更新当前使用的userData
                  userData = freshUserInfo;
                }
              case 16:
                _context4.next = 21;
                break;
              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](7);
                console.error('刷新用户信息失败:', _context4.t0);
              case 21:
                // 获取用户ID，支持多种字段格式
                userId = ''; // 第1步：尝试直接从uni-id-token中获取uid
                try {
                  _token = uni.getStorageSync('uni_id_token');
                  if (_token) {
                    console.log('尝试从token中解析获取用户ID');
                    try {
                      // 解析token
                      tokenParts = _token.split('.');
                      if (tokenParts.length === 3) {
                        // 解码payload部分
                        base64Payload = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
                        payload = JSON.parse(atob(base64Payload));
                        console.log('Token payload:', payload);
                        if (payload.uid) {
                          userId = payload.uid;
                          console.log('从token获取到用户ID(uid):', userId);
                        }
                      }
                    } catch (tokenError) {
                      console.error('解析token失败:', tokenError);
                    }
                  }
                } catch (e) {
                  console.error('获取token失败:', e);
                }

                // 第2步：如果没有从token获取，尝试从用户对象获取
                if (!userId) {
                  if (userData._id) {
                    userId = userData._id;
                    console.log('使用用户对象中的_id:', userId);
                  } else if (userData.uid) {
                    userId = userData.uid;
                    console.log('使用用户对象中的uid:', userId);
                  } else if (userData.userId) {
                    userId = userData.userId;
                    console.log('使用用户对象中的userId:', userId);
                  } else if (userData.userInfo && userData.userInfo._id) {
                    userId = userData.userInfo._id;
                    console.log('使用嵌套userInfo中的_id:', userId);
                  } else if (userData.userInfo && userData.userInfo.uid) {
                    userId = userData.userInfo.uid;
                    console.log('使用嵌套userInfo中的uid:', userId);
                  }
                }

                // 第3步：如果还没有ID，尝试从uni-id-pages-userInfo获取
                if (!userId) {
                  try {
                    uniIdUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
                    if (uniIdUserInfo) {
                      console.log('尝试从uni-id-pages-userInfo获取用户ID');
                      uniIdData = typeof uniIdUserInfo === 'string' ? JSON.parse(uniIdUserInfo) : uniIdUserInfo;
                      if (uniIdData._id) userId = uniIdData._id;else if (uniIdData.uid) userId = uniIdData.uid;
                    }
                  } catch (e) {
                    console.error('从uni-id-pages-userInfo获取ID失败:', e);
                  }
                }

                // 第4步：如果还是没有用户ID，使用临时ID
                if (!userId) {
                  // 生成一个持久的设备ID
                  deviceId = uni.getStorageSync('device_id');
                  if (!deviceId) {
                    deviceId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
                    uni.setStorageSync('device_id', deviceId);
                  }
                  userId = deviceId;
                  console.log('使用临时设备ID作为用户ID:', userId);
                }

                // 检查用户ID
                if (userId) {
                  _context4.next = 31;
                  break;
                }
                console.error('收藏操作失败: 无法获取用户ID', userData);
                uni.showToast({
                  title: '用户信息不完整，请重新登录',
                  icon: 'none'
                });

                // 跳转到登录页面
                setTimeout(function () {
                  uni.navigateTo({
                    url: '/pages/login/login'
                  });
                }, 1500);
                return _context4.abrupt("return");
              case 31:
                if (!(!_this4.itemType || !_this4.itemId)) {
                  _context4.next = 35;
                  break;
                }
                console.error('收藏操作失败: 缺少必要参数', _this4.itemType, _this4.itemId);
                uni.showToast({
                  title: '参数错误',
                  icon: 'none'
                });
                return _context4.abrupt("return");
              case 35:
                uni.showLoading({
                  title: _this4.isFavorite ? '移出中' : '添加中'
                });
                if (!_this4.isFavorite) {
                  _context4.next = 48;
                  break;
                }
                if (_this4.favoriteId) {
                  _context4.next = 42;
                  break;
                }
                console.error('从购物车移出失败: 缺少ID');
                uni.hideLoading();
                uni.showToast({
                  title: '操作失败',
                  icon: 'none'
                });
                return _context4.abrupt("return");
              case 42:
                _context4.next = 44;
                return _this4.$api.user.removeFavorite(_this4.favoriteId);
              case 44:
                res = _context4.sent;
                if (res && res.code === 0) {
                  _this4.isFavorite = false;
                  _this4.favoriteId = '';
                  uni.hideLoading();
                  uni.showToast({
                    title: '已移出购物车',
                    icon: 'success'
                  });

                  // 强制更新购物车状态（解决有时状态不更新的问题）
                  _this4.$nextTick(function () {
                    console.log('强制更新购物车状态为:', false);
                    _this4.isFavorite = false;
                  });
                  _this4.$emit('favoriteChange', false);
                } else {
                  uni.hideLoading();
                  uni.showToast({
                    title: '操作失败',
                    icon: 'none'
                  });
                }
                _context4.next = 55;
                break;
              case 48:
                // 添加到购物车
                // 构建数据
                favoriteData = {
                  userId: userId,
                  // 确保使用正确的用户ID
                  itemType: _this4.itemType,
                  itemId: _this4.itemId,
                  itemTitle: _this4.itemTitle || '',
                  itemCover: _this4.itemCover || '',
                  itemUrl: _this4.itemUrl || "/pages/".concat(_this4.itemType, "/detail?id=").concat(_this4.itemId),
                  createTime: Date.now()
                };
                console.log('添加购物车数据:', favoriteData);

                // 根据类型调整URL
                if (_this4.itemType === 'lecture') {
                  favoriteData.itemUrl = "/pages/course/lecture-detail?id=".concat(_this4.itemId);
                } else if (_this4.itemType === 'teacher') {
                  favoriteData.itemUrl = "/pages/teacher/detail?id=".concat(_this4.itemId);
                }
                _context4.next = 53;
                return _this4.$api.user.addFavorite(favoriteData);
              case 53:
                _res = _context4.sent;
                if (_res && _res.code === 0) {
                  _this4.isFavorite = true;
                  _this4.favoriteId = _res.data._id || _res.data.favoriteId || '';
                  uni.hideLoading();
                  uni.showToast({
                    title: '已加入购物车',
                    icon: 'success'
                  });

                  // 强制更新购物车状态（解决有时状态不更新的问题）
                  _this4.$nextTick(function () {
                    console.log('强制更新购物车状态为:', true);
                    _this4.isFavorite = true;
                  });
                  _this4.$emit('favoriteChange', true);
                } else {
                  uni.hideLoading();
                  uni.showToast({
                    title: '操作失败',
                    icon: 'none',
                    duration: 3000
                  });
                  if (_res && _res.message) {
                    console.error('加入购物车失败原因:', _res.message);
                  }
                }
              case 55:
                _context4.next = 62;
                break;
              case 57:
                _context4.prev = 57;
                _context4.t1 = _context4["catch"](4);
                console.error('收藏操作失败:', _context4.t1);
                uni.hideLoading();
                uni.showToast({
                  title: '操作失败',
                  icon: 'none'
                });
              case 62:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 57], [7, 18]]);
      }))();
    },
    // 手动更新收藏状态
    updateFavoriteStatus: function updateFavoriteStatus(status) {
      var favoriteId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      console.log('手动更新收藏状态:', status, '收藏ID:', favoriteId);
      this.isFavorite = !!status;
      if (favoriteId) {
        this.favoriteId = favoriteId;
      }
    },
    // 获取项目URL
    getItemUrl: function getItemUrl() {
      var url = '';
      switch (this.itemType) {
        case 'course':
          url = "/pages/course/detail?id=".concat(this.itemId);
          break;
        case 'lecture':
          url = "/pages/course/lecture-detail?id=".concat(this.itemId);
          break;
        case 'teacher':
          url = "/pages/teacher/detail?id=".concat(this.itemId);
          break;
        default:
          url = '';
      }
      return url;
    },
    // 处理图片资源地址，添加默认图片处理
    processImageUrl: function processImageUrl(url) {
      if (!url) {
        return this.getDefaultImage();
      }

      // 检查图片是否为本地路径
      if (url.startsWith('/static/')) {
        // 添加错误处理，在图片加载失败时使用默认图片
        console.log('处理本地图片路径:', url);
        return url;
      }
      return url;
    },
    // 获取默认图片
    getDefaultImage: function getDefaultImage() {
      switch (this.itemType) {
        case 'course':
          return '/static/images/default-course.jpg';
        case 'lecture':
          return '/static/images/default-lecture.jpg';
        case 'teacher':
          return '/static/images/default-teacher.jpg';
        default:
          return '/static/images/default.jpg';
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 26)["uniCloud"]))

/***/ }),

/***/ 88:
/*!************************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/favorite-button/favorite-button.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./favorite-button.vue?vue&type=style&index=0&lang=scss& */ 89);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_favorite_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 89:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/favorite-button/favorite-button.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/favorite-button/favorite-button.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/favorite-button/favorite-button-create-component',
    {
        'components/favorite-button/favorite-button-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(83))
        })
    },
    [['components/favorite-button/favorite-button-create-component']]
]);
