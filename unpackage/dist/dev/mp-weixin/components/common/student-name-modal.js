(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/common/student-name-modal"],{

/***/ 445:
/*!********************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/common/student-name-modal.vue ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./student-name-modal.vue?vue&type=template&id=465f3d94& */ 446);
/* harmony import */ var _student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./student-name-modal.vue?vue&type=script&lang=js& */ 448);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs




/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__["render"],
  _student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/common/student-name-modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 446:
/*!***************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/common/student-name-modal.vue?vue&type=template&id=465f3d94& ***!
  \***************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./student-name-modal.vue?vue&type=template&id=465f3d94& */ 447);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_template_id_465f3d94___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 447:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/common/student-name-modal.vue?vue&type=template&id=465f3d94& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 529))
    },
    uniPopupDialog: function () {
      return Promise.all(/*! import() | uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue */ 536))
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

/***/ 448:
/*!*********************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/common/student-name-modal.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./student-name-modal.vue?vue&type=script&lang=js& */ 449);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_student_name_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 449:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/yueke/Siwei_chuzhong/components/common/student-name-modal.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
//
//
//
//
//
//
//
//
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
  name: 'StudentNameModal',
  data: function data() {
    return {
      studentName: ''
    };
  },
  methods: {
    // 打开弹窗
    open: function open() {
      try {
        console.log('开始检查是否需要设置学生姓名');
        // 从本地获取用户信息
        var userInfo = uni.getStorageSync('userInfo');

        // 确保userInfo是对象
        if (typeof userInfo === 'string') {
          try {
            userInfo = JSON.parse(userInfo);
          } catch (e) {
            console.log('解析userInfo字符串失败，尝试获取另一个存储的用户信息');
            userInfo = null;
          }
        }

        // 如果用户信息为空，尝试获取uni-id-pages-userInfo
        if (!userInfo) {
          userInfo = uni.getStorageSync('uni-id-pages-userInfo');
          console.log('从uni-id-pages-userInfo获取用户信息', userInfo ? '成功' : '失败');
        }

        // 如果没有用户信息，则不显示弹窗
        if (!userInfo) {
          console.log('用户未登录，不显示设置弹窗');
          return;
        }

        // 检查用户是否有昵称
        if (!userInfo.nickname && !userInfo.nickName) {
          console.log('用户没有昵称，不显示设置弹窗');
          return;
        }
        var nickname = userInfo.nickname || userInfo.nickName;

        // 检查用户是否已设置过姓名标记
        var hasSetStudentName = uni.getStorageSync('hasSetStudentName') === true || uni.getStorageSync('hasSetStudentName') === 'true';

        // 检查用户是否有真实姓名
        var hasRealName = userInfo.real_name && userInfo.real_name.trim() !== '';

        // 检查昵称是否为系统生成的临时昵称
        var isAutoGeneratedNickname = nickname.startsWith('用户') || nickname === '微信用户' || /^用户\d+$/.test(nickname);
        console.log('当前昵称:', nickname, isAutoGeneratedNickname ? '(自动生成的昵称)' : '(非自动生成)', '已设置姓名标记:', hasSetStudentName ? '是' : '否', '有真实姓名:', hasRealName ? '是' : '否');

        // 如果用户已有真实姓名或已设置过姓名标记且昵称不是自动生成的，不显示弹窗
        if (hasRealName) {
          console.log('用户已有真实姓名，不显示弹窗');
          // 确保设置标记
          if (!hasSetStudentName) {
            uni.setStorageSync('hasSetStudentName', true);
          }
          return;
        }
        if (hasSetStudentName && !isAutoGeneratedNickname) {
          console.log('用户已设置姓名且昵称不是自动生成的，不显示弹窗');
          return;
        }

        // 如果是自动生成的昵称，才需要显示弹窗
        if (isAutoGeneratedNickname) {
          console.log('检测到自动生成的昵称，清除设置标记，确保弹出设置弹窗');
          uni.removeStorageSync('hasSetStudentName');
          // 显示弹窗
          this.showNameDialog();
        } else {
          // 如果没有明确标记但昵称不是自动生成的，认为已设置
          console.log('昵称不是自动生成的，可能是真实姓名，设置标记并跳过');
          uni.setStorageSync('hasSetStudentName', true);
          return;
        }
      } catch (e) {
        console.error('打开姓名设置弹窗错误:', e);
      }
    },
    // 显示姓名设置弹窗
    showNameDialog: function showNameDialog() {
      var _this = this;
      // 强制显示弹窗
      console.log('需要设置学生姓名，显示设置弹窗');

      // 确保弹窗已加载完成
      this.$nextTick(function () {
        if (_this.$refs.popup) {
          _this.$refs.popup.open();
        } else {
          console.error('弹窗组件未找到');
        }
      });
    },
    // 关闭弹窗
    close: function close() {
      console.log('student-name-modal关闭弹窗');
      if (this.$refs.popup) {
        this.$refs.popup.close();
      }
    },
    // 确认姓名
    confirmName: function confirmName(name) {
      console.log('学生姓名确认:', name);
      if (!name || name.trim() === '') {
        uni.showToast({
          title: '姓名不能为空',
          icon: 'none'
        });

        // 姓名为空时不关闭弹窗，继续等待输入
        return;
      }

      // 更新用户昵称到云数据库
      this.updateUserNickname(name);
    },
    // 用户取消设置姓名 - 禁用了取消按钮，但保留此方法以防意外调用
    closeDialog: function closeDialog() {
      console.log('用户试图取消设置姓名，但此操作被禁止');
      // 提示用户必须设置姓名
      uni.showToast({
        title: '请输入学生真实姓名',
        icon: 'none'
      });

      // 不执行任何关闭操作，保持弹窗打开状态
      return;
    },
    // 更新用户昵称到云数据库
    updateUserNickname: function updateUserNickname(name) {
      var _arguments = arguments,
        _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var isTemporary, token, userInfo, userId, success, result, uniIdCo, res, storedUserInfo, currentToken;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isTemporary = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : false;
                _context.prev = 1;
                uni.showLoading({
                  title: '保存中...',
                  mask: true
                });
                console.log('准备更新用户昵称:', name, isTemporary ? '(临时姓名)' : '(正式姓名)');
                if (!(!name || name.trim() === '')) {
                  _context.next = 6;
                  break;
                }
                throw new Error('姓名不能为空');
              case 6:
                // 获取token并传递给云函数
                token = uni.getStorageSync('uni_id_token');
                if (token) {
                  _context.next = 9;
                  break;
                }
                throw new Error('未登录，请重新登录');
              case 9:
                // 获取用户ID
                userInfo = uni.getStorageSync('uni-id-pages-userInfo') || {};
                userId = userInfo._id || userInfo.uid || userInfo.userId || '';
                console.log('传递token给云函数:', token.substring(0, 10) + '...');
                if (userId) {
                  console.log('传递用户ID:', userId);
                }

                // 使用多种方式进行更新，如果一种失败，尝试另一种
                success = false; // 如果是临时姓名并且不需要发送到服务器，则只更新本地存储
                if (!isTemporary) {
                  _context.next = 19;
                  break;
                }
                console.log('设置临时姓名，仅更新本地存储');
                success = true;
                _context.next = 45;
                break;
              case 19:
                _context.prev = 19;
                console.log('方法1: 使用自定义云函数更新昵称');
                _context.next = 23;
                return uniCloud.callFunction({
                  name: 'updateUserInfo',
                  data: {
                    nickname: name,
                    nickName: name,
                    token: token,
                    uni_id_token: token,
                    userId: userId,
                    uid: userId,
                    _id: userId,
                    mobile: userInfo.mobile || userInfo.phoneNumber || '',
                    isRealName: true,
                    // 标记这是真实姓名
                    real_name: name // 同时设置real_name字段
                  }
                });
              case 23:
                result = _context.sent;
                console.log('方法1结果:', result);
                if (result.result && result.result.code === 0) {
                  success = true;

                  // 保存服务器返回的新token（如果有）
                  if (result.result.token) {
                    console.log('保存服务器返回的新token');
                    uni.setStorageSync('uni_id_token', result.result.token);

                    // 同时更新token过期时间
                    if (result.result.tokenExpired) {
                      uni.setStorageSync('uni_id_token_expired', result.result.tokenExpired);
                    }
                  }

                  // 更新用户信息
                  if (result.result.data) {
                    console.log('更新本地用户信息');
                    uni.setStorageSync('uni-id-pages-userInfo', result.result.data);
                    uni.setStorageSync('userInfo', result.result.data);
                  }
                }
                _context.next = 31;
                break;
              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](19);
                console.error('方法1失败:', _context.t0);
              case 31:
                if (success) {
                  _context.next = 45;
                  break;
                }
                _context.prev = 32;
                console.log('方法2: 使用uni-id-co更新昵称');
                uniIdCo = uniCloud.importObject('uni-id-co', {
                  customUI: true
                });
                _context.next = 37;
                return uniIdCo.updateUser({
                  nickname: name,
                  real_name: name // 同时更新真实姓名字段
                });
              case 37:
                res = _context.sent;
                console.log('方法2结果:', res);
                if (res.errCode === 0) {
                  success = true;

                  // 保存服务器返回的新token（如果有）
                  if (res.token) {
                    console.log('保存服务器返回的新token');
                    uni.setStorageSync('uni_id_token', res.token);

                    // 同时更新token过期时间
                    if (res.tokenExpired) {
                      uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
                    }
                  }

                  // 更新用户信息
                  if (res.userInfo) {
                    console.log('更新本地用户信息');
                    uni.setStorageSync('uni-id-pages-userInfo', res.userInfo);
                    uni.setStorageSync('userInfo', res.userInfo);
                  }
                }
                _context.next = 45;
                break;
              case 42:
                _context.prev = 42;
                _context.t1 = _context["catch"](32);
                console.error('方法2失败:', _context.t1);
              case 45:
                // 无论云端是否更新成功，都更新本地存储
                // 更新本地存储
                storedUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {};
                storedUserInfo.nickname = name;
                storedUserInfo.nickName = name;
                storedUserInfo.real_name = name; // 同时更新real_name字段
                uni.setStorageSync('uni-id-pages-userInfo', storedUserInfo);

                // 同时更新自定义存储
                uni.setStorageSync('userInfo', storedUserInfo);

                // 确保token是有效的
                currentToken = uni.getStorageSync('uni_id_token');
                if (!currentToken) {
                  console.warn('设置姓名后发现token丢失，尝试恢复登录状态');
                  // 触发重新登录事件
                  uni.$emit('check:login');
                }

                // 触发用户信息更新事件
                uni.$emit('user:updated', storedUserInfo);
                if (!isTemporary) {
                  uni.showToast({
                    title: success ? '保存成功' : '本地保存成功',
                    icon: 'success'
                  });

                  // 只有非临时姓名才记录已设置姓名
                  uni.setStorageSync('hasSetStudentName', true);
                } else {
                  // 对于临时姓名，确保下次登录时仍然弹出设置框
                  uni.removeStorageSync('hasSetStudentName');
                }

                // 关闭弹窗前，确保用户登录状态稳定
                setTimeout(function () {
                  // 在保存完成后触发刷新用户界面
                  uni.$emit('refresh:user-info');

                  // 关闭弹窗
                  _this2.close();

                  // 等待弹窗完全关闭后刷新页面
                  setTimeout(function () {
                    // 触发页面刷新
                    uni.$emit('page:refresh');

                    // 尝试重新加载页面数据
                    var currentPage = getCurrentPages()[getCurrentPages().length - 1];
                    if (currentPage && currentPage.$vm && typeof currentPage.$vm.refreshPage === 'function') {
                      console.log('调用页面的refreshPage方法');
                      currentPage.$vm.refreshPage();
                    }
                  }, 300);
                }, 500);
                _context.next = 62;
                break;
              case 58:
                _context.prev = 58;
                _context.t2 = _context["catch"](1);
                console.error('更新用户昵称失败:', _context.t2);
                uni.showToast({
                  title: '保存失败: ' + (_context.t2.message || '未知错误'),
                  icon: 'none'
                });
              case 62:
                _context.prev = 62;
                uni.hideLoading();
                return _context.finish(62);
              case 65:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 58, 62, 65], [19, 28], [32, 42]]);
      }))();
    }
  },
  mounted: function mounted() {
    // 不需要额外设置maskClick，因为我们已经通过props直接设置了isMaskClick=false
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/common/student-name-modal.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/student-name-modal-create-component',
    {
        'components/common/student-name-modal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(445))
        })
    },
    [['components/common/student-name-modal-create-component']]
]);
