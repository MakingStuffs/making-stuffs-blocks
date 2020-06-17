/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/bundle.js":
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_selects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/selects */ "./src/js/modules/selects.js");


window.onload = function () {
  var _window$location = window.location,
      origin = _window$location.origin,
      search = _window$location.search,
      pathname = _window$location.pathname;
  var container = document.querySelector(".wp-block-msblocks-filterable-products-by-category");
  var selects = container.querySelectorAll("select");
  var submit = document.getElementById("submit_msblocks_price_query");
  var activeFilters = container.querySelectorAll(".msblocks-product-filtering-active__item");
  var priceInputs = container.querySelectorAll("input.msblocks-product-filtering-price__input");

  var handleMultipleQueries = function handleMultipleQueries(query) {
    var queries = query.split("&").map(function (value) {
      return value.split("=")[0];
    });
    return queries.join("|");
  };

  var checkQueryString = function checkQueryString(query) {
    var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var regex = /(((\?){1}(([a-zA-Z])+((_){1}([a-zA-Z])+)*)={1}([a-zA-Z\_0-9\%\ \-])+){1}((\&){1}(([a-zA-Z])+((_){1}([a-zA-Z])+)*)={1}([a-zA-Z\_0-9\%\ \-])+)*)+/g;

    while (query.length > 0) {
      var tempArray = query.split("");
      output += tempArray[0];
      tempArray.shift();
      return checkQueryString(tempArray.join(""), output);
    }

    return regex.test(output);
  };

  var formatQueryString = function formatQueryString(query) {
    var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var characterArray = query.split("");
    var regex = /[\?\&\=]/g;

    while (characterArray.length > 0) {
      if (regex.test(characterArray[0])) {
        regex.lastIndex = 0;

        if (!regex.test(output[output.length - 1]) && characterArray.length > 2) {
          output += characterArray[0];
        }
      } else {
        output += characterArray[0];
      }

      characterArray.shift();
      return formatQueryString(characterArray.join(""), output);
    }

    return output[0] === "?" ? output : "?".concat(output);
  };

  var getQueryKeys = function getQueryKeys(query) {
    return query.includes("&") ? handleMultipleQueries(query) : query.split("=")[0];
  };

  var getRegexFromQueryKeys = function getRegexFromQueryKeys(query) {
    var valueRegex = "(={1}([0-9a-zA-Z_ %-])+)";
    var queryKeys = getQueryKeys(query);
    return new RegExp("((".concat(queryKeys, ")").concat(valueRegex, ")+"), "g");
  };

  function handleInputChange() {
    var query = "".concat(this.dataset.query, "=").concat(this.value);
    var regex = new RegExp("(".concat(this.dataset.query, ")=([0-9a-zA-Z_ %-])+"));
    var submit = document.getElementById("submit_msblocks_price_query");

    if (submit.dataset.query) {
      !regex.test(submit.dataset.query) ? submit.setAttribute("data-query", "".concat(submit.dataset.query, "&").concat(query)) : submit.setAttribute("data-query", submit.dataset.query.replace(regex, query));
    } else {
      submit.setAttribute("data-query", query);
    }
  }

  function handleFilterSelect() {
    var queryRegex = getRegexFromQueryKeys(this.dataset.query);
    console.log(this);

    if (this.value === "null") {
      return handleFilterRemoval.call(this);
    } else {
      return queryRegex.test(window.location.search) ? handleFilterChange.call(this, queryRegex) : handleFilterAddition.call(this);
    }
  }

  function handleFilterAddition() {
    return window.location.href = search ? "".concat(search, "&").concat(this.dataset.query) : "?".concat(this.dataset.query);
  }

  function handleFilterRemoval() {
    var queryRegex = getRegexFromQueryKeys(this.dataset.key ? this.dataset.key : this.dataset.query);
    var currentUrl = "".concat(origin).concat(pathname);
    var newSearch = search.split("&").filter(function (term) {
      queryRegex.lastIndex = 0;
      if (!queryRegex.test(term)) return term;
    }).join("&");
    var newSearchFormatted = formatQueryString(newSearch);
    return window.location.href = checkQueryString(newSearchFormatted) ? "".concat(currentUrl).concat(newSearchFormatted) : currentUrl;
  }

  function handleFilterChange(regex) {
    var currentQuery = search.replace(regex, "");
    var formattedNewQuery = formatQueryString("?".concat(currentQuery, "&").concat(this.dataset.query));
    return checkQueryString(formattedNewQuery) ? window.location.href = "".concat(origin).concat(pathname).concat(formattedNewQuery) : window.location.href = "".concat(origin).concat(pathname);
  }

  submit.addEventListener("click", handleFilterSelect);
  priceInputs.forEach(function (input) {
    return input.addEventListener("input", handleInputChange);
  });
  activeFilters.forEach(function (filter) {
    return filter.addEventListener("click", handleFilterRemoval);
  });
  selects.forEach(function (select) {
    select.addEventListener("change", handleFilterSelect);
  });
  Object(_modules_selects__WEBPACK_IMPORTED_MODULE_0__["default"])(".wp-block-msblocks-filterable-products-by-category");
};

/***/ }),

/***/ "./src/js/modules/selects.js":
/*!***********************************!*\
  !*** ./src/js/modules/selects.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createDivClone = function createDivClone(element, index) {
  var selectContainer = document.createElement("div");
  selectContainer.classList = "msblocks-select-container";
  selectContainer.dataset.id = "msblocks-select-".concat(index);
  selectContainer.setAttribute("aria-expanded", false);
  var activeOption = Array.from(element.options).find(function (option) {
    return option.hasAttribute('selected') || option.hasAttribute("active");
  });
  var activeOptionDiv = setAttributes(document.createElement("div"), element.attributes);
  activeOptionDiv.classList.add("msblocks-select-selected");
  activeOptionDiv.tabIndex = 0;
  activeOptionDiv.textContent = activeOption ? activeOption.textContent : element.options[0].textContent;
  activeOptionDiv.dataset.id = "msblocks-select-".concat(index);
  activeOptionDiv.dataset.query = activeOption && activeOption.value.includes("=") ? activeOption.value : activeOption && !activeOption.value.includes("=") ? "".concat(element.getAttribute("name"), "=").concat(activeOption.value) : element.options[0].value.includes("=") ? element.options[0].value : "".concat(element.getAttribute("name"), "=").concat(element.options[0].value);
  activeOptionDiv.setAttribute("value", activeOptionDiv.dataset.query || element.options[0].value);
  activeOptionDiv.addEventListener("click", toggleMenu);
  var optionsContainer = createOptions(element);
  optionsContainer.dataset.id = "msblocks-select-".concat(index);
  selectContainer.append(activeOptionDiv, optionsContainer);
  element.dataset.id = "msblocks-select-".concat(index);
  element.style.display = "none";
  element.parentElement.appendChild(selectContainer);
};

var setAttributes = function setAttributes(element, attributes) {
  var _iterator = _createForOfIteratorHelper(attributes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var attribute = _step.value;
      element.setAttribute(attribute.name, attribute.value);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return element;
};

var createOptions = function createOptions(element) {
  var optionsContainer = document.createElement("div");
  optionsContainer.classList = "msblocks-select-options__list";
  Array.from(element.options).forEach(function (option) {
    var optionElement = setAttributes(document.createElement("div"), option.attributes);
    optionElement.classList = "msblocks-select-options__item";
    optionElement.textContent = option.textContent;
    optionElement.tabIndex = 0;
    optionsContainer.appendChild(optionElement);
    optionElement.addEventListener("click", handleOptionSelect);
  });
  return optionsContainer;
};

function handleOptionSelect() {
  var id = this.parentElement.dataset.id;
  var value = this.getAttribute("value");
  var pairedSelectElement = document.querySelector("select[data-id=\"".concat(id, "\"]"));
  var pairedSelectOptions = Array.from(pairedSelectElement.querySelectorAll("option"));
  var activeOption = pairedSelectOptions.filter(function (option) {
    return option.hasAttribute("selected");
  })[0];
  var selectedOption = pairedSelectOptions.filter(function (option) {
    return option.value === value;
  })[0];
  var selectedDiv = document.querySelector(".msblocks-select-selected[data-id=\"".concat(id, "\"]"));
  activeOption.removeAttribute("selected");
  selectedOption.setAttribute("selected", "selected");
  pairedSelectElement.value = value;
  pairedSelectElement.setAttribute("data-query", value.includes("=") ? value : "".concat(pairedSelectElement.getAttribute("name"), "=").concat(value));
  selectedDiv.textContent = this.textContent;
  selectedDiv.dataset.query = value.includes("=") ? value : "".concat(pairedSelectElement.getAttribute("name"), "=").concat(value);
  pairedSelectElement.dispatchEvent(new Event("change"));
  return toggleMenu.call(this);
}

function toggleMenu(element) {
  var _this = this;

  var container = document.querySelector(".msblocks-select-container[data-id=\"".concat(this.parentElement.dataset.id, "\"]"));

  var handleClick = function handleClick(event) {
    if (element && !element.target.contains(event.target) || event.target.classList.contains("msblocks-select-options__item")) {
      container.setAttribute("aria-expanded", "false");
      return removeListener();
    } else if (event.target === _this && container.getAttribute("aria-expanded") === "false" && element.target === _this) {
      return removeListener();
    }
  };

  var removeListener = function removeListener() {
    return document.removeEventListener("click", handleClick);
  };

  return container.getAttribute("aria-expanded") === "false" ? (container.setAttribute("aria-expanded", "true"), document.addEventListener("click", handleClick)) : container.setAttribute("aria-expanded", "false");
}

var renderCustomSelects = function renderCustomSelects() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "body";
  var container = document.querySelector(selector);
  var selectElements = container.querySelectorAll("select");
  selectElements.forEach(function (select, index) {
    return createDivClone(select, index);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (renderCustomSelects);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map