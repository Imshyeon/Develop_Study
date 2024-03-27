"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/events/[...eventSlug]",{

/***/ "./pages/events/[...eventSlug].js":
/*!****************************************!*\
  !*** ./pages/events/[...eventSlug].js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FilteredEventsPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _dummy_data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dummy-data.js */ \"./dummy-data.js\");\n/* harmony import */ var _components_events_event_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/events/event-list.js */ \"./components/events/event-list.js\");\n/* harmony import */ var _components_events_results_title_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/events/results-title.js */ \"./components/events/results-title.js\");\n/* harmony import */ var _components_ui_button_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/ui/button.js */ \"./components/ui/button.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction FilteredEventsPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const filteredData = router.query.eventSlug;\n    if (!filteredData) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n            className: \"center\",\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"/Users/gangsuhyeon/Desktop/my/Front-end/study/개발/NextJS/06_project-events/pages/events/[...eventSlug].js\",\n            lineNumber: 11,\n            columnNumber: 12\n        }, this);\n    }\n    const filteredYear = filteredData[0];\n    const filteredMonth = filteredData[1];\n    const numYear = +filteredYear;\n    const numMonth = +filteredMonth;\n    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {\n        // 숫자가 아닌 경우와 year, month에 맞지 않는 결과값이 나오면\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n            className: \"center\",\n            children: \"유효하지 않은 필터값 입니다. 유효한 값을 입력하세요!\"\n        }, void 0, false, {\n            fileName: \"/Users/gangsuhyeon/Desktop/my/Front-end/study/개발/NextJS/06_project-events/pages/events/[...eventSlug].js\",\n            lineNumber: 29,\n            columnNumber: 7\n        }, this);\n    }\n    const filteredEvents = (0,_dummy_data_js__WEBPACK_IMPORTED_MODULE_2__.getFilteredEvents)({\n        year: numYear,\n        month: numMonth\n    });\n    if (!filteredEvents || filteredEvents.length === 0) {\n        // 필터링된 이벤트가 없는 경우\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"center\",\n                    children: \"입력한 필터에 대한 이벤트가 없습니다.\"\n                }, void 0, false, {\n                    fileName: \"/Users/gangsuhyeon/Desktop/my/Front-end/study/개발/NextJS/06_project-events/pages/events/[...eventSlug].js\",\n                    lineNumber: 44,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"center\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        link: \"/\",\n                        children: \"Show All Events\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gangsuhyeon/Desktop/my/Front-end/study/개발/NextJS/06_project-events/pages/events/[...eventSlug].js\",\n                        lineNumber: 46,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/gangsuhyeon/Desktop/my/Front-end/study/개발/NextJS/06_project-events/pages/events/[...eventSlug].js\",\n                    lineNumber: 45,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true);\n    }\n    const date = new Date(numYear, numMonth - 1);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_events_results_title_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                date: date\n            }, void 0, false, {\n                fileName: \"/Users/gangsuhyeon/Desktop/my/Front-end/study/개발/NextJS/06_project-events/pages/events/[...eventSlug].js\",\n                lineNumber: 55,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_events_event_list_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                items: filteredEvents\n            }, void 0, false, {\n                fileName: \"/Users/gangsuhyeon/Desktop/my/Front-end/study/개발/NextJS/06_project-events/pages/events/[...eventSlug].js\",\n                lineNumber: 56,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(FilteredEventsPage, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = FilteredEventsPage;\nvar _c;\n$RefreshReg$(_c, \"FilteredEventsPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9ldmVudHMvWy4uLmV2ZW50U2x1Z10uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQXdDO0FBQ2dCO0FBQ007QUFDTTtBQUNqQjtBQUVwQyxTQUFTSyxxQkFBcUI7O0lBQzNDLE1BQU1DLFNBQVNOLHNEQUFTQTtJQUN4QixNQUFNTyxlQUFlRCxPQUFPRSxLQUFLLENBQUNDLFNBQVM7SUFDM0MsSUFBSSxDQUFDRixjQUFjO1FBQ2pCLHFCQUFPLDhEQUFDRztZQUFFQyxXQUFVO3NCQUFTOzs7Ozs7SUFDL0IsQ0FBQztJQUVELE1BQU1DLGVBQWVMLFlBQVksQ0FBQyxFQUFFO0lBQ3BDLE1BQU1NLGdCQUFnQk4sWUFBWSxDQUFDLEVBQUU7SUFDckMsTUFBTU8sVUFBVSxDQUFDRjtJQUNqQixNQUFNRyxXQUFXLENBQUNGO0lBRWxCLElBQ0VHLE1BQU1GLFlBQ05FLE1BQU1ELGFBQ05ELFVBQVUsUUFDVkEsVUFBVSxRQUNWQyxXQUFXLEtBQ1hBLFdBQVcsSUFDWDtRQUNBLHlDQUF5QztRQUN6QyxxQkFDRSw4REFBQ0w7WUFBRUMsV0FBVTtzQkFBUzs7Ozs7O0lBSTFCLENBQUM7SUFFRCxNQUFNTSxpQkFBaUJoQixpRUFBaUJBLENBQUM7UUFDdkNpQixNQUFNSjtRQUNOSyxPQUFPSjtJQUNUO0lBRUEsSUFBSSxDQUFDRSxrQkFBa0JBLGVBQWVHLE1BQU0sS0FBSyxHQUFHO1FBQ2xELGtCQUFrQjtRQUNsQixxQkFDRTs7OEJBQ0UsOERBQUNWO29CQUFFQyxXQUFVOzhCQUFTOzs7Ozs7OEJBQ3RCLDhEQUFDVTtvQkFBSVYsV0FBVTs4QkFDYiw0RUFBQ1AsZ0VBQU1BO3dCQUFDa0IsTUFBSztrQ0FBSTs7Ozs7Ozs7Ozs7OztJQUl6QixDQUFDO0lBRUQsTUFBTUMsT0FBTyxJQUFJQyxLQUFLVixTQUFTQyxXQUFXO0lBQzFDLHFCQUNFOzswQkFDRSw4REFBQ1osMkVBQVlBO2dCQUFDb0IsTUFBTUE7Ozs7OzswQkFDcEIsOERBQUNyQix3RUFBU0E7Z0JBQUN1QixPQUFPUjs7Ozs7Ozs7QUFHeEIsQ0FBQztHQXBEdUJaOztRQUNQTCxrREFBU0E7OztLQURGSyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9ldmVudHMvWy4uLmV2ZW50U2x1Z10uanM/ZjliYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7IGdldEZpbHRlcmVkRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2R1bW15LWRhdGEuanNcIjtcbmltcG9ydCBFdmVudExpc3QgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvZXZlbnRzL2V2ZW50LWxpc3QuanNcIjtcbmltcG9ydCBSZXN1bHRzVGl0bGUgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvZXZlbnRzL3Jlc3VsdHMtdGl0bGUuanNcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvdWkvYnV0dG9uLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbHRlcmVkRXZlbnRzUGFnZSgpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IGZpbHRlcmVkRGF0YSA9IHJvdXRlci5xdWVyeS5ldmVudFNsdWc7XG4gIGlmICghZmlsdGVyZWREYXRhKSB7XG4gICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cImNlbnRlclwiPkxvYWRpbmcuLi48L3A+O1xuICB9XG5cbiAgY29uc3QgZmlsdGVyZWRZZWFyID0gZmlsdGVyZWREYXRhWzBdO1xuICBjb25zdCBmaWx0ZXJlZE1vbnRoID0gZmlsdGVyZWREYXRhWzFdO1xuICBjb25zdCBudW1ZZWFyID0gK2ZpbHRlcmVkWWVhcjtcbiAgY29uc3QgbnVtTW9udGggPSArZmlsdGVyZWRNb250aDtcblxuICBpZiAoXG4gICAgaXNOYU4obnVtWWVhcikgfHxcbiAgICBpc05hTihudW1Nb250aCkgfHxcbiAgICBudW1ZZWFyID4gMjAzMCB8fFxuICAgIG51bVllYXIgPCAyMDIxIHx8XG4gICAgbnVtTW9udGggPCAxIHx8XG4gICAgbnVtTW9udGggPiAxMlxuICApIHtcbiAgICAvLyDsiKvsnpDqsIAg7JWE64uMIOqyveyasOyZgCB5ZWFyLCBtb250aOyXkCDrp57sp4Ag7JWK64qUIOqysOqzvOqwkuydtCDrgpjsmKTrqbRcbiAgICByZXR1cm4gKFxuICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyXCI+XG4gICAgICAgIOycoO2aqO2VmOyngCDslYrsnYAg7ZWE7YSw6rCSIOyeheuLiOuLpC4g7Jyg7Zqo7ZWcIOqwkuydhCDsnoXroKXtlZjshLjsmpQhXG4gICAgICA8L3A+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGZpbHRlcmVkRXZlbnRzID0gZ2V0RmlsdGVyZWRFdmVudHMoe1xuICAgIHllYXI6IG51bVllYXIsXG4gICAgbW9udGg6IG51bU1vbnRoLFxuICB9KTtcblxuICBpZiAoIWZpbHRlcmVkRXZlbnRzIHx8IGZpbHRlcmVkRXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIO2VhO2EsOungeuQnCDsnbTrsqTtirjqsIAg7JeG64qUIOqyveyasFxuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjZW50ZXJcIj7snoXroKXtlZwg7ZWE7YSw7JeQIOuMgO2VnCDsnbTrsqTtirjqsIAg7JeG7Iq164uI64ukLjwvcD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgICA8QnV0dG9uIGxpbms9XCIvXCI+U2hvdyBBbGwgRXZlbnRzPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShudW1ZZWFyLCBudW1Nb250aCAtIDEpO1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8UmVzdWx0c1RpdGxlIGRhdGU9e2RhdGV9IC8+XG4gICAgICA8RXZlbnRMaXN0IGl0ZW1zPXtmaWx0ZXJlZEV2ZW50c30gLz5cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VSb3V0ZXIiLCJnZXRGaWx0ZXJlZEV2ZW50cyIsIkV2ZW50TGlzdCIsIlJlc3VsdHNUaXRsZSIsIkJ1dHRvbiIsIkZpbHRlcmVkRXZlbnRzUGFnZSIsInJvdXRlciIsImZpbHRlcmVkRGF0YSIsInF1ZXJ5IiwiZXZlbnRTbHVnIiwicCIsImNsYXNzTmFtZSIsImZpbHRlcmVkWWVhciIsImZpbHRlcmVkTW9udGgiLCJudW1ZZWFyIiwibnVtTW9udGgiLCJpc05hTiIsImZpbHRlcmVkRXZlbnRzIiwieWVhciIsIm1vbnRoIiwibGVuZ3RoIiwiZGl2IiwibGluayIsImRhdGUiLCJEYXRlIiwiaXRlbXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/events/[...eventSlug].js\n"));

/***/ })

});