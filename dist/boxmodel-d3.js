(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["boxmodel-d3"] = factory(require("d3"));
	else
		root["boxmodel-d3"] = factory(root["d3"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_d3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/boxmodel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/boxmodel.js":
/*!*************************!*\
  !*** ./src/boxmodel.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return boxmodel; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "d3");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(d3__WEBPACK_IMPORTED_MODULE_0__);

function boxmodel() {
  // v.1.1.0 | by Peter Hofmann, 03/2019
  var isContainer,
      spanHeight,
      edgeMargins = false,
      vAlign;
  var padding, margin, minContainerSize, maxLineWidth, nodeSize;
  var lineMap = [];

  function compute(root) {
    root.eachAfter(scaleNode);
    root.eachBefore(scaleToParent);
    root.eachBefore(positionNode);
    return root;
  }

  compute.vAlign = function (x) {
    return arguments.length ? (vAlign = x, compute) : vAlign;
  };

  compute.edgeMargins = function (x) {
    return arguments.length ? (edgeMargins = x, compute) : edgeMargins;
  };

  compute.isContainer = function (x) {
    return arguments.length ? (isContainer = typeof x === 'function' ? x : constant(+x), compute) : isContainer;
  };

  compute.spanHeight = function (x) {
    return arguments.length ? (spanHeight = typeof x === 'function' ? x : constant(+x), compute) : spanHeight;
  };

  compute.padding = function (x) {
    return arguments.length ? (padding = typeof x === 'function' ? x : constant(+x), compute) : padding;
  };

  compute.margin = function (x) {
    return arguments.length ? (margin = typeof x === 'function' ? x : constant(+x), compute) : margin;
  };

  compute.nodeSize = function (x) {
    return arguments.length ? (nodeSize = typeof x === 'function' ? x : constant(+x), compute) : nodeSize;
  };

  compute.minContainerSize = function (x) {
    return arguments.length ? (minContainerSize = typeof x === 'function' ? x : constant(+x), compute) : minContainerSize;
  };

  compute.maxLineWidth = function (x) {
    return arguments.length ? (maxLineWidth = typeof x === 'function' ? x : constant(+x), compute) : maxLineWidth;
  }; // --------------
  // Main functions


  function scaleNode(node) {
    // set size to fixed definition by default
    var w = nodeSize(node).width,
        h = nodeSize(node).height;

    if (isContainer(node)) {
      w = h = 0; // containers have no fixed size, so we nullify

      if (node.children) {
        // For non-empty containers, size and margin between children must be summed up.
        // To do this, we need to determine when a line of children widths/margins surpasses maxLineWidth
        // and if so, add to an array that stores this line width as well as the interval of child indizes
        var lines = generateLines(node); // now loop through all lines and their elements to calculate the line heights

        for (var l = 0; l < lines.length; l++) {
          lines[l].height = calcLineHeight(node, lines, l); // add as line property
        } // add line array to a global line map


        lineMap.push({
          box: node,
          lines: lines
        }); // add the largest of all line widths to the width

        w += d3__WEBPACK_IMPORTED_MODULE_0__["max"](lines, function (l) {
          return l.width;
        }); // add the sum of all line heights to the height

        h += d3__WEBPACK_IMPORTED_MODULE_0__["sum"](lines, function (l) {
          return l.height;
        });
      } // no specified size => combined padding OR minSize (if paddings smaller)


      w += padding(node).left + padding(node).right;
      h += padding(node).top + padding(node).bottom;
      w = Math.max(w, minContainerSize(node).width);
      h = Math.max(h, minContainerSize(node).height);
    } // finally, assign w/h to node coordinates


    node.x0 = node.y0 = 0;
    node.x1 = w, node.y1 = h;
  } // ------ end scaleNode() -------


  function scaleToParent(node) {
    // spanHeight and other scaling operations that refer to container/line size
    // can only be realized after all container scaling has been done
    var h = node.y1; // if element spans height of its container/line, calculate new height

    if (node.parent && spanHeight(node)) {
      h = getOwnLine(node).height;
      var parentLines = getLines(node.parent);
      var lineIndex = getLineIndex(node, parentLines);
      h -= !edgeMargins && lineIndex === 0 ? 0 : margin(node).top;
      h -= !edgeMargins && lineIndex === parentLines.length - 1 ? 0 : margin(node).bottom; // now adjust the line heights accordingly by distributing the excess height

      var heightDiff = h - node.y1;
      console.log('y1:' + node.y1 + ' h:' + h + ' diff:' + heightDiff);

      if (isContainer(node) && node.children && heightDiff > 0) {
        var lines = getLines(node);
        console.log(lines);
        var excess = heightDiff / lines.length;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var line = _step.value;
            line.height += excess;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }

    node.y1 = h;
  }

  function positionNode(node) {
    var w = node.x1 - node.x0;
    var h = node.y1 - node.y0;

    if (node.parent) {
      // y-position children relative to parent container y + padding
      node.y0 = node.parent.y0 + padding(node.parent).top;
      var order = node.parent.children.indexOf(node);

      if (order === 0 || lineBreak(node)) {
        // x-position 1. children (of line) relative to parent container x + padding
        node.x0 += node.parent.x0 + padding(node.parent).left;
        if (edgeMargins) node.x0 += margin(node).left;
      } else {
        // all subsequent children can be x-positioned relative to their left neighbour
        var neighbourLeft = node.parent.children[order - 1];
        node.x0 = neighbourLeft.x1; // margins of both children are collapsed to the max value

        node.x0 += Math.max(margin(neighbourLeft).right, margin(node).left);
      }
    } // if no parent, position is dependent only on vertical alignment
    else {
        switch (vAlign) {
          case 'top':
            node.y0 = 0;
            break;

          case 'middle':
            node.y0 = h / 2;
            break;

          case 'bottom':
            node.y0 = h;
            break;
        }
      } // shift height in middle and bottom alignments
    // for children, add vertical margins and also shift to the y-position of their line


    switch (vAlign) {
      case 'top':
        if (node.parent) {
          var lineIndex = getLineIndex(node);
          node.y0 += !edgeMargins && lineIndex === 0 ? 0 : margin(node).top;
          node.y0 += calcLineShift(node);
        }

        break;

      case 'middle':
        if (node.parent) node.y0 += calcLineShift(node) + getOwnLine(node).height / 2;
        node.y0 -= h / 2;
        break;

      case 'bottom':
        if (node.parent) {
          var lines = getLines(node.parent),
              _lineIndex = getLineIndex(node, lines);

          node.y0 -= !edgeMargins && _lineIndex === lines.length - 1 ? 0 : margin(node).bottom;
          node.y0 += calcLineShift(node, true);
        }

        node.y0 -= h;
        break;
    } // last, assign w/h shift to coordinates


    node.x1 = node.x0 + w;
    node.y1 = node.y0 + h;
  } // ------ end positionNode() -------
  // -------------------
  // Essential functions


  function generateLines(node) {
    var lines = [];
    var lineWidth = 0,
        flexHeight = false,
        startIndex = 0,
        newLine = true;
    node.children.forEach(function (child, i) {
      // determine if at least one of the children in a line has a property to span container height
      if (spanHeight(child) && !flexHeight) flexHeight = true; // add width of each child

      lineWidth += child.x1 - child.x0; // add largest of the two margins between children and left outer margin (if edgeMargins true)

      lineWidth += newLine ? edgeMargins ? margin(child).left : 0 : Math.max(margin(child).left, margin(node.children[i - 1]).right); // right margin is only added at the end of a line (if edgeMargins true)

      var marginRight = edgeMargins ? margin(child).right : 0;
      if (lineWidth + marginRight > maxLineWidth(node) || i === node.children.length - 1) lineWidth += marginRight; // line breaks if maxLineWidth is surpassed or it's the last one

      if (lineWidth > maxLineWidth(node) || i === node.children.length - 1) {
        // if true, add child interval to lines array and save line width
        lines.push({
          from: startIndex,
          to: i,
          width: lineWidth,
          flexHeight: flexHeight
        }); // if not last line, reset variables

        if (i < node.children.length - 1) startIndex = i + 1, lineWidth = 0, flexHeight = false, newLine = true;
      } else newLine = false;
    });
    return lines;
  }

  function calcLineHeight(node, lines, lineIndex) {
    var line = lines[lineIndex];
    var lineHeight = 0;

    for (var i = line.from; i <= line.to; i++) {
      var child = node.children[i]; // calculate the raw children height

      var childH = child.y1 - child.y0; // add vertical margins between children and (if edgeMargins true) outer vertical margins
      // note: collapsing individual vertical margins is too messy and complicated, so I left this out

      var marginsVert = (!edgeMargins && lineIndex === 0 ? 0 : margin(child).top) + (!edgeMargins && lineIndex === lines.length - 1 ? 0 : margin(child).bottom); // set line height if it surpasses line height of previous childs

      if (childH + marginsVert > lineHeight) lineHeight = childH + marginsVert;
    }

    return Math.max(lineHeight, minContainerSize(node).height);
  } // ----------------
  // Helper functions


  function getLines(node) {
    return lineMap[lineMap.findIndex(function (m) {
      return m.box === node;
    })].lines;
  }

  function getLineIndex(node, parentLines) {
    if (node.parent) {
      var lines = arguments.length > 1 ? parentLines : getLines(node.parent);
      var index = node.parent.children.indexOf(node);
      return lines.findIndex(function (l) {
        return index >= l.from && index <= l.to;
      });
    }

    return null;
  }

  function getOwnLine(node) {
    var lines = getLines(node.parent);
    var lineIndex = getLineIndex(node, lines);
    return lines[lineIndex];
  }

  function calcLineShift(node) {
    var include = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (node.parent) {
      var lines = getLines(node.parent);
      var lineIndex = getLineIndex(node, lines);
      var lineTo = include ? lineIndex : lineIndex - 1;
      return d3__WEBPACK_IMPORTED_MODULE_0__["sum"](lines.filter(function (l, i) {
        return i <= lineTo;
      }), function (l) {
        return l.height;
      });
    }

    return null;
  }

  function lineBreak(node) {
    if (node.parent) {
      var index = node.parent.children.indexOf(node);
      var lines = getLines(node.parent);
      var line = lines[getLineIndex(node, lines)];
      return line.from === index;
    }

    return null;
  }

  function constant(x) {
    // from D3 source
    return function () {
      return x;
    };
  }

  return compute;
}

/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_d3__;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3htb2RlbC1kMy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvLi9zcmMvYm94bW9kZWwuanMiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvZXh0ZXJuYWwgXCJkM1wiIl0sIm5hbWVzIjpbImJveG1vZGVsIiwiaXNDb250YWluZXIiLCJzcGFuSGVpZ2h0IiwiZWRnZU1hcmdpbnMiLCJ2QWxpZ24iLCJwYWRkaW5nIiwibWFyZ2luIiwibWluQ29udGFpbmVyU2l6ZSIsIm1heExpbmVXaWR0aCIsIm5vZGVTaXplIiwibGluZU1hcCIsImNvbXB1dGUiLCJyb290IiwiZWFjaEFmdGVyIiwic2NhbGVOb2RlIiwiZWFjaEJlZm9yZSIsInNjYWxlVG9QYXJlbnQiLCJwb3NpdGlvbk5vZGUiLCJ4IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY29uc3RhbnQiLCJub2RlIiwidyIsIndpZHRoIiwiaCIsImhlaWdodCIsImNoaWxkcmVuIiwibGluZXMiLCJnZW5lcmF0ZUxpbmVzIiwibCIsImNhbGNMaW5lSGVpZ2h0IiwicHVzaCIsImJveCIsImQzIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiTWF0aCIsIm1heCIsIngwIiwieTAiLCJ4MSIsInkxIiwicGFyZW50IiwiZ2V0T3duTGluZSIsInBhcmVudExpbmVzIiwiZ2V0TGluZXMiLCJsaW5lSW5kZXgiLCJnZXRMaW5lSW5kZXgiLCJoZWlnaHREaWZmIiwiY29uc29sZSIsImxvZyIsImV4Y2VzcyIsImxpbmUiLCJvcmRlciIsImluZGV4T2YiLCJsaW5lQnJlYWsiLCJuZWlnaGJvdXJMZWZ0IiwiY2FsY0xpbmVTaGlmdCIsImxpbmVXaWR0aCIsImZsZXhIZWlnaHQiLCJzdGFydEluZGV4IiwibmV3TGluZSIsImZvckVhY2giLCJjaGlsZCIsImkiLCJtYXJnaW5SaWdodCIsImZyb20iLCJ0byIsImxpbmVIZWlnaHQiLCJjaGlsZEgiLCJtYXJnaW5zVmVydCIsImZpbmRJbmRleCIsIm0iLCJpbmRleCIsImluY2x1ZGUiLCJsaW5lVG8iLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZSxTQUFTQSxRQUFULEdBQW9CO0FBQy9CO0FBRUEsTUFBSUMsV0FBSjtBQUFBLE1BQ0lDLFVBREo7QUFBQSxNQUVJQyxXQUFXLEdBQUcsS0FGbEI7QUFBQSxNQUdJQyxNQUhKO0FBSUEsTUFBSUMsT0FBSixFQUNJQyxNQURKLEVBRUlDLGdCQUZKLEVBR0lDLFlBSEosRUFJSUMsUUFKSjtBQUtBLE1BQU1DLE9BQU8sR0FBRyxFQUFoQjs7QUFFQSxXQUFTQyxP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b24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkM1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJkM1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJib3htb2RlbC1kM1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImQzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJib3htb2RlbC1kM1wiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9kM19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYm94bW9kZWwuanNcIik7XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJveG1vZGVsKCkge1xuICAgIC8vIHYuMS4xLjAgfCBieSBQZXRlciBIb2ZtYW5uLCAwMy8yMDE5XG4gICAgXG4gICAgbGV0IGlzQ29udGFpbmVyLFxuICAgICAgICBzcGFuSGVpZ2h0LFxuICAgICAgICBlZGdlTWFyZ2lucyA9IGZhbHNlLFxuICAgICAgICB2QWxpZ247XG4gICAgbGV0IHBhZGRpbmcsXG4gICAgICAgIG1hcmdpbixcbiAgICAgICAgbWluQ29udGFpbmVyU2l6ZSxcbiAgICAgICAgbWF4TGluZVdpZHRoLFxuICAgICAgICBub2RlU2l6ZTtcbiAgICBjb25zdCBsaW5lTWFwID0gW107XG4gICAgXG4gICAgZnVuY3Rpb24gY29tcHV0ZShyb290KSB7ICAgIFxuICAgICAgcm9vdC5lYWNoQWZ0ZXIoc2NhbGVOb2RlKTtcbiAgICAgIHJvb3QuZWFjaEJlZm9yZShzY2FsZVRvUGFyZW50KTtcbiAgICAgIHJvb3QuZWFjaEJlZm9yZShwb3NpdGlvbk5vZGUpO1xuICAgICAgXG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG4gICAgXG4gICAgY29tcHV0ZS52QWxpZ24gPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh2QWxpZ24gPSB4LCBjb21wdXRlKSA6IHZBbGlnbjtcbiAgICB9O1xuICAgIGNvbXB1dGUuZWRnZU1hcmdpbnMgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChlZGdlTWFyZ2lucyA9IHgsIGNvbXB1dGUpIDogZWRnZU1hcmdpbnM7XG4gICAgfTtcbiAgICBjb21wdXRlLmlzQ29udGFpbmVyID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoaXNDb250YWluZXIgPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogaXNDb250YWluZXI7XG4gICAgfTtcbiAgICBjb21wdXRlLnNwYW5IZWlnaHQgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChzcGFuSGVpZ2h0ID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IHNwYW5IZWlnaHQ7XG4gICAgfTtcbiAgICBjb21wdXRlLnBhZGRpbmcgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChwYWRkaW5nID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IHBhZGRpbmc7XG4gICAgfTtcbiAgICBjb21wdXRlLm1hcmdpbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG1hcmdpbiA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBtYXJnaW47XG4gICAgfTtcbiAgICBjb21wdXRlLm5vZGVTaXplID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobm9kZVNpemUgPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogbm9kZVNpemU7XG4gICAgfTtcbiAgICBjb21wdXRlLm1pbkNvbnRhaW5lclNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChtaW5Db250YWluZXJTaXplID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IG1pbkNvbnRhaW5lclNpemU7XG4gICAgfTtcbiAgICBjb21wdXRlLm1heExpbmVXaWR0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG1heExpbmVXaWR0aCA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBtYXhMaW5lV2lkdGg7XG4gICAgfTtcbiAgICBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLVxuICAgIC8vIE1haW4gZnVuY3Rpb25zXG4gICAgXG4gICAgZnVuY3Rpb24gc2NhbGVOb2RlKG5vZGUpIHtcbiAgICAgIC8vIHNldCBzaXplIHRvIGZpeGVkIGRlZmluaXRpb24gYnkgZGVmYXVsdFxuICAgICAgbGV0IHcgPSBub2RlU2l6ZShub2RlKS53aWR0aCwgaCA9IG5vZGVTaXplKG5vZGUpLmhlaWdodDtcbiAgICAgIFxuICAgICAgaWYgKGlzQ29udGFpbmVyKG5vZGUpKSB7XG4gICAgICAgIHcgPSBoID0gMDsgLy8gY29udGFpbmVycyBoYXZlIG5vIGZpeGVkIHNpemUsIHNvIHdlIG51bGxpZnlcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgLy8gRm9yIG5vbi1lbXB0eSBjb250YWluZXJzLCBzaXplIGFuZCBtYXJnaW4gYmV0d2VlbiBjaGlsZHJlbiBtdXN0IGJlIHN1bW1lZCB1cC5cbiAgICAgICAgICAvLyBUbyBkbyB0aGlzLCB3ZSBuZWVkIHRvIGRldGVybWluZSB3aGVuIGEgbGluZSBvZiBjaGlsZHJlbiB3aWR0aHMvbWFyZ2lucyBzdXJwYXNzZXMgbWF4TGluZVdpZHRoXG4gICAgICAgICAgLy8gYW5kIGlmIHNvLCBhZGQgdG8gYW4gYXJyYXkgdGhhdCBzdG9yZXMgdGhpcyBsaW5lIHdpZHRoIGFzIHdlbGwgYXMgdGhlIGludGVydmFsIG9mIGNoaWxkIGluZGl6ZXNcbiAgICAgICAgICBjb25zdCBsaW5lcyA9IGdlbmVyYXRlTGluZXMobm9kZSk7XG4gICAgICAgICAgLy8gbm93IGxvb3AgdGhyb3VnaCBhbGwgbGluZXMgYW5kIHRoZWlyIGVsZW1lbnRzIHRvIGNhbGN1bGF0ZSB0aGUgbGluZSBoZWlnaHRzXG4gICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCBsaW5lcy5sZW5ndGg7IGwrKykge1xuICAgICAgICAgICAgbGluZXNbbF0uaGVpZ2h0ID0gY2FsY0xpbmVIZWlnaHQobm9kZSxsaW5lcyxsKTsgLy8gYWRkIGFzIGxpbmUgcHJvcGVydHlcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gYWRkIGxpbmUgYXJyYXkgdG8gYSBnbG9iYWwgbGluZSBtYXBcbiAgICAgICAgICBsaW5lTWFwLnB1c2goe2JveDogbm9kZSwgbGluZXM6IGxpbmVzfSk7XG4gICAgICAgICAgLy8gYWRkIHRoZSBsYXJnZXN0IG9mIGFsbCBsaW5lIHdpZHRocyB0byB0aGUgd2lkdGhcbiAgICAgICAgICB3ICs9IGQzLm1heChsaW5lcywgbCA9PiBsLndpZHRoKTtcbiAgICAgICAgICAvLyBhZGQgdGhlIHN1bSBvZiBhbGwgbGluZSBoZWlnaHRzIHRvIHRoZSBoZWlnaHRcbiAgICAgICAgICBoICs9IGQzLnN1bShsaW5lcywgbCA9PiBsLmhlaWdodCk7ICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLyBubyBzcGVjaWZpZWQgc2l6ZSA9PiBjb21iaW5lZCBwYWRkaW5nIE9SIG1pblNpemUgKGlmIHBhZGRpbmdzIHNtYWxsZXIpXG4gICAgICAgIHcgKz0gcGFkZGluZyhub2RlKS5sZWZ0ICsgcGFkZGluZyhub2RlKS5yaWdodDtcbiAgICAgICAgaCArPSBwYWRkaW5nKG5vZGUpLnRvcCArIHBhZGRpbmcobm9kZSkuYm90dG9tO1xuICAgICAgICB3ID0gTWF0aC5tYXgodywgbWluQ29udGFpbmVyU2l6ZShub2RlKS53aWR0aCk7XG4gICAgICAgIGggPSBNYXRoLm1heChoLCBtaW5Db250YWluZXJTaXplKG5vZGUpLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIGZpbmFsbHksIGFzc2lnbiB3L2ggdG8gbm9kZSBjb29yZGluYXRlc1xuICAgICAgbm9kZS54MCA9IG5vZGUueTAgPSAwO1xuICAgICAgbm9kZS54MSA9IHcsIG5vZGUueTEgPSBoO1xuICAgICAgXG4gICAgfSAvLyAtLS0tLS0gZW5kIHNjYWxlTm9kZSgpIC0tLS0tLS1cbiAgICBcbiAgICBmdW5jdGlvbiBzY2FsZVRvUGFyZW50KG5vZGUpIHtcbiAgICAgIC8vIHNwYW5IZWlnaHQgYW5kIG90aGVyIHNjYWxpbmcgb3BlcmF0aW9ucyB0aGF0IHJlZmVyIHRvIGNvbnRhaW5lci9saW5lIHNpemVcbiAgICAgIC8vIGNhbiBvbmx5IGJlIHJlYWxpemVkIGFmdGVyIGFsbCBjb250YWluZXIgc2NhbGluZyBoYXMgYmVlbiBkb25lXG4gICAgICBsZXQgaCA9IG5vZGUueTE7XG4gICAgICBcbiAgICAgIC8vIGlmIGVsZW1lbnQgc3BhbnMgaGVpZ2h0IG9mIGl0cyBjb250YWluZXIvbGluZSwgY2FsY3VsYXRlIG5ldyBoZWlnaHRcbiAgICAgIGlmIChub2RlLnBhcmVudCAmJiBzcGFuSGVpZ2h0KG5vZGUpKSB7XG4gICAgICAgIGggPSBnZXRPd25MaW5lKG5vZGUpLmhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBhcmVudExpbmVzID0gZ2V0TGluZXMobm9kZS5wYXJlbnQpO1xuICAgICAgICBjb25zdCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgcGFyZW50TGluZXMpO1xuICBcbiAgICAgICAgaCAtPSAhZWRnZU1hcmdpbnMgJiYgbGluZUluZGV4ID09PSAwID8gMCA6IG1hcmdpbihub2RlKS50b3A7XG4gICAgICAgIGggLT0gIWVkZ2VNYXJnaW5zICYmIGxpbmVJbmRleCA9PT0gKHBhcmVudExpbmVzLmxlbmd0aC0xKSA/IDAgOiBtYXJnaW4obm9kZSkuYm90dG9tO1xuICAgICAgICBcbiAgICAgICAgLy8gbm93IGFkanVzdCB0aGUgbGluZSBoZWlnaHRzIGFjY29yZGluZ2x5IGJ5IGRpc3RyaWJ1dGluZyB0aGUgZXhjZXNzIGhlaWdodFxuICAgICAgICBjb25zdCBoZWlnaHREaWZmID0gaCAtIG5vZGUueTE7XG4gICAgICAgIGNvbnNvbGUubG9nKCd5MTonK25vZGUueTEgKyAnIGg6JytoKycgZGlmZjonK2hlaWdodERpZmYpO1xuICAgICAgICBpZiAoaXNDb250YWluZXIobm9kZSkgJiYgbm9kZS5jaGlsZHJlbiAmJiBoZWlnaHREaWZmID4gMCkge1xuICAgICAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZSk7XG4gICAgICAgICAgY29uc29sZS5sb2cobGluZXMpO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGV4Y2VzcyA9IGhlaWdodERpZmYgLyBsaW5lcy5sZW5ndGg7XG4gICAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICAgICAgICBsaW5lLmhlaWdodCArPSBleGNlc3M7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIG5vZGUueTEgPSBoO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBwb3NpdGlvbk5vZGUobm9kZSkgeyAgICBcbiAgICAgIGNvbnN0IHcgPSBub2RlLngxIC0gbm9kZS54MDtcbiAgICAgIGNvbnN0IGggPSBub2RlLnkxIC0gbm9kZS55MDtcbiAgICAgIFxuICAgICAgaWYgKG5vZGUucGFyZW50KSB7ICAgICAgXG4gICAgICAgIC8vIHktcG9zaXRpb24gY2hpbGRyZW4gcmVsYXRpdmUgdG8gcGFyZW50IGNvbnRhaW5lciB5ICsgcGFkZGluZ1xuICAgICAgICBub2RlLnkwID0gbm9kZS5wYXJlbnQueTAgKyBwYWRkaW5nKG5vZGUucGFyZW50KS50b3A7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvcmRlciA9IG5vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2Yobm9kZSk7XG4gICAgICAgIGlmIChvcmRlciA9PT0gMCB8fCBsaW5lQnJlYWsobm9kZSkpIHtcbiAgICAgICAgICAvLyB4LXBvc2l0aW9uIDEuIGNoaWxkcmVuIChvZiBsaW5lKSByZWxhdGl2ZSB0byBwYXJlbnQgY29udGFpbmVyIHggKyBwYWRkaW5nXG4gICAgICAgICAgbm9kZS54MCArPSBub2RlLnBhcmVudC54MCArIHBhZGRpbmcobm9kZS5wYXJlbnQpLmxlZnQ7XG4gICAgICAgICAgaWYgKGVkZ2VNYXJnaW5zKSBub2RlLngwICs9IG1hcmdpbihub2RlKS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIGFsbCBzdWJzZXF1ZW50IGNoaWxkcmVuIGNhbiBiZSB4LXBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gdGhlaXIgbGVmdCBuZWlnaGJvdXJcbiAgICAgICAgICBjb25zdCBuZWlnaGJvdXJMZWZ0ID0gbm9kZS5wYXJlbnQuY2hpbGRyZW5bb3JkZXItMV07XG4gICAgICAgICAgbm9kZS54MCA9IG5laWdoYm91ckxlZnQueDE7XG4gICAgICAgICAgLy8gbWFyZ2lucyBvZiBib3RoIGNoaWxkcmVuIGFyZSBjb2xsYXBzZWQgdG8gdGhlIG1heCB2YWx1ZVxuICAgICAgICAgIG5vZGUueDAgKz0gTWF0aC5tYXgoIG1hcmdpbihuZWlnaGJvdXJMZWZ0KS5yaWdodCwgbWFyZ2luKG5vZGUpLmxlZnQgKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBpZiBubyBwYXJlbnQsIHBvc2l0aW9uIGlzIGRlcGVuZGVudCBvbmx5IG9uIHZlcnRpY2FsIGFsaWdubWVudFxuICAgICAgZWxzZSB7XG4gICAgICAgIHN3aXRjaCAodkFsaWduKSB7XG4gICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIG5vZGUueTAgPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWlkZGxlJzpcbiAgICAgICAgICAgIG5vZGUueTAgPSBoLzI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgbm9kZS55MCA9IGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBzaGlmdCBoZWlnaHQgaW4gbWlkZGxlIGFuZCBib3R0b20gYWxpZ25tZW50c1xuICAgICAgLy8gZm9yIGNoaWxkcmVuLCBhZGQgdmVydGljYWwgbWFyZ2lucyBhbmQgYWxzbyBzaGlmdCB0byB0aGUgeS1wb3NpdGlvbiBvZiB0aGVpciBsaW5lXG4gICAgICBzd2l0Y2ggKHZBbGlnbikge1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgY29uc3QgbGluZUluZGV4ID0gZ2V0TGluZUluZGV4KG5vZGUpO1xuICAgICAgICAgICAgbm9kZS55MCArPSAhZWRnZU1hcmdpbnMgJiYgbGluZUluZGV4ID09PSAwID8gMCA6IG1hcmdpbihub2RlKS50b3A7XG4gICAgICAgICAgICBub2RlLnkwICs9IGNhbGNMaW5lU2hpZnQobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICAgIGlmIChub2RlLnBhcmVudCkgbm9kZS55MCArPSBjYWxjTGluZVNoaWZ0KG5vZGUpICsgZ2V0T3duTGluZShub2RlKS5oZWlnaHQvMjtcbiAgICAgICAgICBub2RlLnkwIC09IGgvMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZS5wYXJlbnQpLCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgICAgICAgICAgbm9kZS55MCAtPSAhZWRnZU1hcmdpbnMgJiYgbGluZUluZGV4ID09PSAobGluZXMubGVuZ3RoLTEpID8gMCA6IG1hcmdpbihub2RlKS5ib3R0b207XG4gICAgICAgICAgICBub2RlLnkwICs9IGNhbGNMaW5lU2hpZnQobm9kZSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vZGUueTAgLT0gaDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH0gXG4gICAgICBcbiAgICAgIC8vIGxhc3QsIGFzc2lnbiB3L2ggc2hpZnQgdG8gY29vcmRpbmF0ZXNcbiAgICAgIG5vZGUueDEgPSBub2RlLngwICsgdzsgXG4gICAgICBub2RlLnkxID0gbm9kZS55MCArIGg7XG4gICAgICBcbiAgICB9IC8vIC0tLS0tLSBlbmQgcG9zaXRpb25Ob2RlKCkgLS0tLS0tLVxuICAgIFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBFc3NlbnRpYWwgZnVuY3Rpb25zXG4gICAgXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVMaW5lcyhub2RlKSB7XG4gICAgICBjb25zdCBsaW5lcyA9IFtdO1xuICAgICAgbGV0IGxpbmVXaWR0aCA9IDAsIGZsZXhIZWlnaHQgPSBmYWxzZSwgc3RhcnRJbmRleCA9IDAsIG5ld0xpbmUgPSB0cnVlO1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQsaSkgPT4ge1xuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIG9mIHRoZSBjaGlsZHJlbiBpbiBhIGxpbmUgaGFzIGEgcHJvcGVydHkgdG8gc3BhbiBjb250YWluZXIgaGVpZ2h0XG4gICAgICAgIGlmIChzcGFuSGVpZ2h0KGNoaWxkKSAmJiAhZmxleEhlaWdodCkgZmxleEhlaWdodCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICAvLyBhZGQgd2lkdGggb2YgZWFjaCBjaGlsZFxuICAgICAgICBsaW5lV2lkdGggKz0gKGNoaWxkLngxIC0gY2hpbGQueDApO1xuICBcbiAgICAgICAgLy8gYWRkIGxhcmdlc3Qgb2YgdGhlIHR3byBtYXJnaW5zIGJldHdlZW4gY2hpbGRyZW4gYW5kIGxlZnQgb3V0ZXIgbWFyZ2luIChpZiBlZGdlTWFyZ2lucyB0cnVlKVxuICAgICAgICBsaW5lV2lkdGggKz0gbmV3TGluZSA/IChlZGdlTWFyZ2lucyA/IG1hcmdpbihjaGlsZCkubGVmdCA6IDApIDogXG4gICAgICAgIE1hdGgubWF4KG1hcmdpbihjaGlsZCkubGVmdCwgbWFyZ2luKG5vZGUuY2hpbGRyZW5baS0xXSkucmlnaHQpO1xuICAgICAgICAvLyByaWdodCBtYXJnaW4gaXMgb25seSBhZGRlZCBhdCB0aGUgZW5kIG9mIGEgbGluZSAoaWYgZWRnZU1hcmdpbnMgdHJ1ZSlcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQgPSBlZGdlTWFyZ2lucyA/IG1hcmdpbihjaGlsZCkucmlnaHQgOiAwO1xuICAgICAgICBpZiAobGluZVdpZHRoICsgbWFyZ2luUmlnaHQgPiBtYXhMaW5lV2lkdGgobm9kZSkgfHzCoGkgPT09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTEpIFxuICAgICAgICAgIGxpbmVXaWR0aCArPSBtYXJnaW5SaWdodDtcbiAgXG4gICAgICAgIC8vIGxpbmUgYnJlYWtzIGlmIG1heExpbmVXaWR0aCBpcyBzdXJwYXNzZWQgb3IgaXQncyB0aGUgbGFzdCBvbmVcbiAgICAgICAgaWYgKGxpbmVXaWR0aCA+IG1heExpbmVXaWR0aChub2RlKSB8fMKgaSA9PT0gbm9kZS5jaGlsZHJlbi5sZW5ndGgtMSkge1xuICAgICAgICAgIC8vIGlmIHRydWUsIGFkZCBjaGlsZCBpbnRlcnZhbCB0byBsaW5lcyBhcnJheSBhbmQgc2F2ZSBsaW5lIHdpZHRoXG4gICAgICAgICAgbGluZXMucHVzaCh7ZnJvbTogc3RhcnRJbmRleCwgdG86IGksIHdpZHRoOiBsaW5lV2lkdGgsIGZsZXhIZWlnaHQ6IGZsZXhIZWlnaHR9KTtcbiAgICAgICAgICAvLyBpZiBub3QgbGFzdCBsaW5lLCByZXNldCB2YXJpYWJsZXNcbiAgICAgICAgICBpZiAoaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTEpIHN0YXJ0SW5kZXggPSBpKzEsIGxpbmVXaWR0aCA9IDAsIGZsZXhIZWlnaHQgPSBmYWxzZSwgbmV3TGluZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBuZXdMaW5lID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaW5lcztcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsY0xpbmVIZWlnaHQobm9kZSwgbGluZXMsIGxpbmVJbmRleCkge1xuICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2xpbmVJbmRleF07XG4gICAgICBsZXQgbGluZUhlaWdodCA9IDA7XG4gICAgICBcbiAgICAgIGZvciAobGV0IGkgPSBsaW5lLmZyb207IGkgPD0gbGluZS50bzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSByYXcgY2hpbGRyZW4gaGVpZ2h0XG4gICAgICAgIGNvbnN0IGNoaWxkSCA9IGNoaWxkLnkxIC0gY2hpbGQueTA7XG4gICAgICAgIC8vIGFkZCB2ZXJ0aWNhbCBtYXJnaW5zIGJldHdlZW4gY2hpbGRyZW4gYW5kIChpZiBlZGdlTWFyZ2lucyB0cnVlKSBvdXRlciB2ZXJ0aWNhbCBtYXJnaW5zXG4gICAgICAgIC8vIG5vdGU6IGNvbGxhcHNpbmcgaW5kaXZpZHVhbCB2ZXJ0aWNhbCBtYXJnaW5zIGlzIHRvbyBtZXNzeSBhbmQgY29tcGxpY2F0ZWQsIHNvIEkgbGVmdCB0aGlzIG91dFxuICAgICAgICBjb25zdCBtYXJnaW5zVmVydCA9ICghZWRnZU1hcmdpbnMgJiYgbGluZUluZGV4PT09MCA/IDAgOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luKGNoaWxkKS50b3ApICtcbiAgICAgICAgICAgICAgKCFlZGdlTWFyZ2lucyAmJiBsaW5lSW5kZXg9PT0obGluZXMubGVuZ3RoLTEpID8gMCA6IFxuICAgICAgICAgICAgICAgbWFyZ2luKGNoaWxkKS5ib3R0b20pO1xuICAgICAgICAvLyBzZXQgbGluZSBoZWlnaHQgaWYgaXQgc3VycGFzc2VzIGxpbmUgaGVpZ2h0IG9mIHByZXZpb3VzIGNoaWxkc1xuICAgICAgICBpZiAoY2hpbGRIICsgbWFyZ2luc1ZlcnQgPiBsaW5lSGVpZ2h0KSBsaW5lSGVpZ2h0ID0gY2hpbGRIICsgbWFyZ2luc1ZlcnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWF0aC5tYXgobGluZUhlaWdodCwgbWluQ29udGFpbmVyU2l6ZShub2RlKS5oZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICAgICAgXG4gICAgZnVuY3Rpb24gZ2V0TGluZXMobm9kZSkge1xuICAgICAgcmV0dXJuIGxpbmVNYXBbbGluZU1hcC5maW5kSW5kZXgobSA9PiBtLmJveCA9PT0gbm9kZSldLmxpbmVzO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBnZXRMaW5lSW5kZXgobm9kZSwgcGFyZW50TGluZXMpIHtcbiAgICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgICBjb25zdCBsaW5lcyA9IChhcmd1bWVudHMubGVuZ3RoID4gMSkgPyBwYXJlbnRMaW5lcyA6IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGxpbmVzLmZpbmRJbmRleChsID0+IHsgcmV0dXJuIChpbmRleCA+PSBsLmZyb20pICYmIChpbmRleCA8PSBsLnRvKTsgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0T3duTGluZShub2RlKSB7XG4gICAgICBjb25zdCBsaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgIGNvbnN0IGxpbmVJbmRleCA9IGdldExpbmVJbmRleChub2RlLCBsaW5lcyk7XG4gICAgICByZXR1cm4gbGluZXNbbGluZUluZGV4XTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsY0xpbmVTaGlmdChub2RlLCBpbmNsdWRlID0gZmFsc2UpIHtcbiAgICAgIGlmIChub2RlLnBhcmVudCkgeyAgICAgIFxuICAgICAgICBjb25zdCBsaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgICAgY29uc3QgbGluZUluZGV4ID0gZ2V0TGluZUluZGV4KG5vZGUsIGxpbmVzKTtcbiAgICAgICAgY29uc3QgbGluZVRvID0gaW5jbHVkZSA/IGxpbmVJbmRleCA6IGxpbmVJbmRleC0xO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGQzLnN1bShsaW5lcy5maWx0ZXIoIChsLGkpID0+IChpIDw9IGxpbmVUbykgKSwgbCA9PiBsLmhlaWdodCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbGluZUJyZWFrKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLnBhcmVudCkgeyBcbiAgICAgICAgY29uc3QgaW5kZXggPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgICBjb25zdCBsaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2dldExpbmVJbmRleChub2RlLCBsaW5lcyldO1xuICAgICAgICByZXR1cm4gbGluZS5mcm9tID09PSBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgXG4gICAgZnVuY3Rpb24gY29uc3RhbnQoeCkgeyAvLyBmcm9tIEQzIHNvdXJjZVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICAgIH07XG4gICAgfVxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgcmV0dXJuIGNvbXB1dGU7XG4gIH0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZDNfXzsiXSwic291cmNlUm9vdCI6IiJ9