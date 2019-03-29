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
  // v.1.2.0 | by Peter Hofmann, 03/2019
  var isContainer, spanHeight, edgeMargins, vAlign;
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
    return arguments.length ? (edgeMargins = typeof x === 'function' ? x : constant(+x), compute) : edgeMargins;
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
      h -= !edgeMargins(node.parent) && lineIndex === 0 ? 0 : margin(node).top;
      h -= !edgeMargins(node.parent) && lineIndex === parentLines.length - 1 ? 0 : margin(node).bottom; // now adjust the line heights accordingly by distributing the excess height

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
        if (edgeMargins(node.parent)) node.x0 += margin(node).left;
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
          node.y0 += !edgeMargins(node.parent) && lineIndex === 0 ? 0 : margin(node).top;
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

          node.y0 -= !edgeMargins(node.parent) && _lineIndex === lines.length - 1 ? 0 : margin(node).bottom;
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

      lineWidth += newLine ? edgeMargins(node) ? margin(child).left : 0 : Math.max(margin(child).left, margin(node.children[i - 1]).right); // right margin is only added at the end of a line (if edgeMargins true)

      var marginRight = edgeMargins(node) ? margin(child).right : 0;
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

      var marginsVert = (!edgeMargins(node) && lineIndex === 0 ? 0 : margin(child).top) + (!edgeMargins(node) && lineIndex === lines.length - 1 ? 0 : margin(child).bottom); // set line height if it surpasses line height of previous childs

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3htb2RlbC1kMy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvLi9zcmMvYm94bW9kZWwuanMiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvZXh0ZXJuYWwgXCJkM1wiIl0sIm5hbWVzIjpbImJveG1vZGVsIiwiaXNDb250YWluZXIiLCJzcGFuSGVpZ2h0IiwiZWRnZU1hcmdpbnMiLCJ2QWxpZ24iLCJwYWRkaW5nIiwibWFyZ2luIiwibWluQ29udGFpbmVyU2l6ZSIsIm1heExpbmVXaWR0aCIsIm5vZGVTaXplIiwibGluZU1hcCIsImNvbXB1dGUiLCJyb290IiwiZWFjaEFmdGVyIiwic2NhbGVOb2RlIiwiZWFjaEJlZm9yZSIsInNjYWxlVG9QYXJlbnQiLCJwb3NpdGlvbk5vZGUiLCJ4IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY29uc3RhbnQiLCJub2RlIiwidyIsIndpZHRoIiwiaCIsImhlaWdodCIsImNoaWxkcmVuIiwibGluZXMiLCJnZW5lcmF0ZUxpbmVzIiwibCIsImNhbGNMaW5lSGVpZ2h0IiwicHVzaCIsImJveCIsImQzIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiTWF0aCIsIm1heCIsIngwIiwieTAiLCJ4MSIsInkxIiwicGFyZW50IiwiZ2V0T3duTGluZSIsInBhcmVudExpbmVzIiwiZ2V0TGluZXMiLCJsaW5lSW5kZXgiLCJnZXRMaW5lSW5kZXgiLCJoZWlnaHREaWZmIiwiY29uc29sZSIsImxvZyIsImV4Y2VzcyIsImxpbmUiLCJvcmRlciIsImluZGV4T2YiLCJsaW5lQnJlYWsiLCJuZWlnaGJvdXJMZWZ0IiwiY2FsY0xpbmVTaGlmdCIsImxpbmVXaWR0aCIsImZsZXhIZWlnaHQiLCJzdGFydEluZGV4IiwibmV3TGluZSIsImZvckVhY2giLCJjaGlsZCIsImkiLCJtYXJnaW5SaWdodCIsImZyb20iLCJ0byIsImxpbmVIZWlnaHQiLCJjaGlsZEgiLCJtYXJnaW5zVmVydCIsImZpbmRJbmRleCIsIm0iLCJpbmRleCIsImluY2x1ZGUiLCJsaW5lVG8iLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZSxTQUFTQSxRQUFULEdBQW9CO0FBQ2pDO0FBRUEsTUFBSUMsV0FBSixFQUNJQyxVQURKLEVBRUlDLFdBRkosRUFHSUMsTUFISjtBQUlBLE1BQUlDLE9BQUosRUFDSUMsTUFESixFQUVJQyxnQkFGSixFQUdJQyxZQUhKLEVBSUlDLFFBSko7QUFLQSxNQUFNQyxPQUFPLEdBQUcsRUFBaEI7O0FBRUEsV0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFD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QUNBLGFBQU8yQixJQUFJLENBQUNjLElBQUwsS0FBY08sS0FBckI7QUFDRDs7QUFDRCxXQUFPLElBQVA7QUFDRDs7QUFFRCxXQUFTdkQsUUFBVCxDQUFrQkgsQ0FBbEIsRUFBcUI7QUFBRTtBQUNyQixXQUFPLFlBQVc7QUFDaEIsYUFBT0EsQ0FBUDtBQUNELEtBRkQ7QUFHRDs7QUFFRCxTQUFPUCxPQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7QUNyU0QsZ0QiLCJmaWxlIjoiYm94bW9kZWwtZDMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkM1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJkM1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJib3htb2RlbC1kM1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImQzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJib3htb2RlbC1kM1wiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9kM19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYm94bW9kZWwuanNcIik7XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJveG1vZGVsKCkge1xuICAvLyB2LjEuMi4wIHwgYnkgUGV0ZXIgSG9mbWFubiwgMDMvMjAxOVxuICBcbiAgbGV0IGlzQ29udGFpbmVyLFxuICAgICAgc3BhbkhlaWdodCxcbiAgICAgIGVkZ2VNYXJnaW5zLFxuICAgICAgdkFsaWduO1xuICBsZXQgcGFkZGluZyxcbiAgICAgIG1hcmdpbixcbiAgICAgIG1pbkNvbnRhaW5lclNpemUsXG4gICAgICBtYXhMaW5lV2lkdGgsXG4gICAgICBub2RlU2l6ZTtcbiAgY29uc3QgbGluZU1hcCA9IFtdO1xuICBcbiAgZnVuY3Rpb24gY29tcHV0ZShyb290KSB7ICAgIFxuICAgIHJvb3QuZWFjaEFmdGVyKHNjYWxlTm9kZSk7XG4gICAgcm9vdC5lYWNoQmVmb3JlKHNjYWxlVG9QYXJlbnQpO1xuICAgIHJvb3QuZWFjaEJlZm9yZShwb3NpdGlvbk5vZGUpO1xuICAgIFxuICAgIHJldHVybiByb290O1xuICB9XG4gIFxuICBjb21wdXRlLnZBbGlnbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh2QWxpZ24gPSB4LCBjb21wdXRlKSA6IHZBbGlnbjtcbiAgfTtcbiAgY29tcHV0ZS5lZGdlTWFyZ2lucyA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChlZGdlTWFyZ2lucyA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBlZGdlTWFyZ2lucztcbiAgfTtcbiAgY29tcHV0ZS5pc0NvbnRhaW5lciA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpc0NvbnRhaW5lciA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBpc0NvbnRhaW5lcjtcbiAgfTtcbiAgY29tcHV0ZS5zcGFuSGVpZ2h0ID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHNwYW5IZWlnaHQgPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogc3BhbkhlaWdodDtcbiAgfTtcbiAgY29tcHV0ZS5wYWRkaW5nID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHBhZGRpbmcgPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogcGFkZGluZztcbiAgfTtcbiAgY29tcHV0ZS5tYXJnaW4gPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobWFyZ2luID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IG1hcmdpbjtcbiAgfTtcbiAgY29tcHV0ZS5ub2RlU2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChub2RlU2l6ZSA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBub2RlU2l6ZTtcbiAgfTtcbiAgY29tcHV0ZS5taW5Db250YWluZXJTaXplID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG1pbkNvbnRhaW5lclNpemUgPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogbWluQ29udGFpbmVyU2l6ZTtcbiAgfTtcbiAgY29tcHV0ZS5tYXhMaW5lV2lkdGggPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobWF4TGluZVdpZHRoID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IG1heExpbmVXaWR0aDtcbiAgfTtcbiAgXG4gIC8vIC0tLS0tLS0tLS0tLS0tXG4gIC8vIE1haW4gZnVuY3Rpb25zXG4gIFxuICBmdW5jdGlvbiBzY2FsZU5vZGUobm9kZSkge1xuICAgIC8vIHNldCBzaXplIHRvIGZpeGVkIGRlZmluaXRpb24gYnkgZGVmYXVsdFxuICAgIGxldCB3ID0gbm9kZVNpemUobm9kZSkud2lkdGgsIGggPSBub2RlU2l6ZShub2RlKS5oZWlnaHQ7XG4gICAgXG4gICAgaWYgKGlzQ29udGFpbmVyKG5vZGUpKSB7XG4gICAgICB3ID0gaCA9IDA7IC8vIGNvbnRhaW5lcnMgaGF2ZSBubyBmaXhlZCBzaXplLCBzbyB3ZSBudWxsaWZ5XG4gICAgICBcbiAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIC8vIEZvciBub24tZW1wdHkgY29udGFpbmVycywgc2l6ZSBhbmQgbWFyZ2luIGJldHdlZW4gY2hpbGRyZW4gbXVzdCBiZSBzdW1tZWQgdXAuXG4gICAgICAgIC8vIFRvIGRvIHRoaXMsIHdlIG5lZWQgdG8gZGV0ZXJtaW5lIHdoZW4gYSBsaW5lIG9mIGNoaWxkcmVuIHdpZHRocy9tYXJnaW5zIHN1cnBhc3NlcyBtYXhMaW5lV2lkdGhcbiAgICAgICAgLy8gYW5kIGlmIHNvLCBhZGQgdG8gYW4gYXJyYXkgdGhhdCBzdG9yZXMgdGhpcyBsaW5lIHdpZHRoIGFzIHdlbGwgYXMgdGhlIGludGVydmFsIG9mIGNoaWxkIGluZGl6ZXNcbiAgICAgICAgY29uc3QgbGluZXMgPSBnZW5lcmF0ZUxpbmVzKG5vZGUpO1xuICAgICAgICAvLyBub3cgbG9vcCB0aHJvdWdoIGFsbCBsaW5lcyBhbmQgdGhlaXIgZWxlbWVudHMgdG8gY2FsY3VsYXRlIHRoZSBsaW5lIGhlaWdodHNcbiAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCBsaW5lcy5sZW5ndGg7IGwrKykge1xuICAgICAgICAgIGxpbmVzW2xdLmhlaWdodCA9IGNhbGNMaW5lSGVpZ2h0KG5vZGUsbGluZXMsbCk7IC8vIGFkZCBhcyBsaW5lIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIGxpbmUgYXJyYXkgdG8gYSBnbG9iYWwgbGluZSBtYXBcbiAgICAgICAgbGluZU1hcC5wdXNoKHtib3g6IG5vZGUsIGxpbmVzOiBsaW5lc30pO1xuICAgICAgICAvLyBhZGQgdGhlIGxhcmdlc3Qgb2YgYWxsIGxpbmUgd2lkdGhzIHRvIHRoZSB3aWR0aFxuICAgICAgICB3ICs9IGQzLm1heChsaW5lcywgbCA9PiBsLndpZHRoKTtcbiAgICAgICAgLy8gYWRkIHRoZSBzdW0gb2YgYWxsIGxpbmUgaGVpZ2h0cyB0byB0aGUgaGVpZ2h0XG4gICAgICAgIGggKz0gZDMuc3VtKGxpbmVzLCBsID0+IGwuaGVpZ2h0KTsgICAgICAgIFxuICAgICAgfVxuICAgICAgLy8gbm8gc3BlY2lmaWVkIHNpemUgPT4gY29tYmluZWQgcGFkZGluZyBPUiBtaW5TaXplIChpZiBwYWRkaW5ncyBzbWFsbGVyKVxuICAgICAgdyArPSBwYWRkaW5nKG5vZGUpLmxlZnQgKyBwYWRkaW5nKG5vZGUpLnJpZ2h0O1xuICAgICAgaCArPSBwYWRkaW5nKG5vZGUpLnRvcCArIHBhZGRpbmcobm9kZSkuYm90dG9tO1xuICAgICAgdyA9IE1hdGgubWF4KHcsIG1pbkNvbnRhaW5lclNpemUobm9kZSkud2lkdGgpO1xuICAgICAgaCA9IE1hdGgubWF4KGgsIG1pbkNvbnRhaW5lclNpemUobm9kZSkuaGVpZ2h0KTtcbiAgICB9XG4gICAgXG4gICAgLy8gZmluYWxseSwgYXNzaWduIHcvaCB0byBub2RlIGNvb3JkaW5hdGVzXG4gICAgbm9kZS54MCA9IG5vZGUueTAgPSAwO1xuICAgIG5vZGUueDEgPSB3LCBub2RlLnkxID0gaDtcbiAgICBcbiAgfSAvLyAtLS0tLS0gZW5kIHNjYWxlTm9kZSgpIC0tLS0tLS1cbiAgXG4gIGZ1bmN0aW9uIHNjYWxlVG9QYXJlbnQobm9kZSkge1xuICAgIC8vIHNwYW5IZWlnaHQgYW5kIG90aGVyIHNjYWxpbmcgb3BlcmF0aW9ucyB0aGF0IHJlZmVyIHRvIGNvbnRhaW5lci9saW5lIHNpemVcbiAgICAvLyBjYW4gb25seSBiZSByZWFsaXplZCBhZnRlciBhbGwgY29udGFpbmVyIHNjYWxpbmcgaGFzIGJlZW4gZG9uZVxuICAgIGxldCBoID0gbm9kZS55MTtcbiAgICBcbiAgICAvLyBpZiBlbGVtZW50IHNwYW5zIGhlaWdodCBvZiBpdHMgY29udGFpbmVyL2xpbmUsIGNhbGN1bGF0ZSBuZXcgaGVpZ2h0XG4gICAgaWYgKG5vZGUucGFyZW50ICYmIHNwYW5IZWlnaHQobm9kZSkpIHtcbiAgICAgIGggPSBnZXRPd25MaW5lKG5vZGUpLmhlaWdodDtcbiAgICAgIFxuICAgICAgY29uc3QgcGFyZW50TGluZXMgPSBnZXRMaW5lcyhub2RlLnBhcmVudCk7XG4gICAgICBjb25zdCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgcGFyZW50TGluZXMpO1xuXG4gICAgICBoIC09ICFlZGdlTWFyZ2lucyhub2RlLnBhcmVudCkgJiYgbGluZUluZGV4ID09PSAwID8gMCA6IG1hcmdpbihub2RlKS50b3A7XG4gICAgICBoIC09ICFlZGdlTWFyZ2lucyhub2RlLnBhcmVudCkgJiYgbGluZUluZGV4ID09PSAocGFyZW50TGluZXMubGVuZ3RoLTEpID8gMCA6IG1hcmdpbihub2RlKS5ib3R0b207XG4gICAgICBcbiAgICAgIC8vIG5vdyBhZGp1c3QgdGhlIGxpbmUgaGVpZ2h0cyBhY2NvcmRpbmdseSBieSBkaXN0cmlidXRpbmcgdGhlIGV4Y2VzcyBoZWlnaHRcbiAgICAgIGNvbnN0IGhlaWdodERpZmYgPSBoIC0gbm9kZS55MTtcbiAgICAgIGNvbnNvbGUubG9nKCd5MTonK25vZGUueTEgKyAnIGg6JytoKycgZGlmZjonK2hlaWdodERpZmYpO1xuICAgICAgaWYgKGlzQ29udGFpbmVyKG5vZGUpICYmIG5vZGUuY2hpbGRyZW4gJiYgaGVpZ2h0RGlmZiA+IDApIHtcbiAgICAgICAgY29uc3QgbGluZXMgPSBnZXRMaW5lcyhub2RlKTtcbiAgICAgICAgY29uc29sZS5sb2cobGluZXMpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZXhjZXNzID0gaGVpZ2h0RGlmZiAvIGxpbmVzLmxlbmd0aDtcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICAgICAgbGluZS5oZWlnaHQgKz0gZXhjZXNzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5vZGUueTEgPSBoO1xuICB9XG4gIFxuICBmdW5jdGlvbiBwb3NpdGlvbk5vZGUobm9kZSkgeyAgICBcbiAgICBjb25zdCB3ID0gbm9kZS54MSAtIG5vZGUueDA7XG4gICAgY29uc3QgaCA9IG5vZGUueTEgLSBub2RlLnkwO1xuICAgIFxuICAgIGlmIChub2RlLnBhcmVudCkgeyAgICAgIFxuICAgICAgLy8geS1wb3NpdGlvbiBjaGlsZHJlbiByZWxhdGl2ZSB0byBwYXJlbnQgY29udGFpbmVyIHkgKyBwYWRkaW5nXG4gICAgICBub2RlLnkwID0gbm9kZS5wYXJlbnQueTAgKyBwYWRkaW5nKG5vZGUucGFyZW50KS50b3A7XG4gICAgICBcbiAgICAgIGNvbnN0IG9yZGVyID0gbm9kZS5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihub2RlKTtcbiAgICAgIGlmIChvcmRlciA9PT0gMCB8fCBsaW5lQnJlYWsobm9kZSkpIHtcbiAgICAgICAgLy8geC1wb3NpdGlvbiAxLiBjaGlsZHJlbiAob2YgbGluZSkgcmVsYXRpdmUgdG8gcGFyZW50IGNvbnRhaW5lciB4ICsgcGFkZGluZ1xuICAgICAgICBub2RlLngwICs9IG5vZGUucGFyZW50LngwICsgcGFkZGluZyhub2RlLnBhcmVudCkubGVmdDtcbiAgICAgICAgaWYgKGVkZ2VNYXJnaW5zKG5vZGUucGFyZW50KSkgbm9kZS54MCArPSBtYXJnaW4obm9kZSkubGVmdDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBhbGwgc3Vic2VxdWVudCBjaGlsZHJlbiBjYW4gYmUgeC1wb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHRoZWlyIGxlZnQgbmVpZ2hib3VyXG4gICAgICAgIGNvbnN0IG5laWdoYm91ckxlZnQgPSBub2RlLnBhcmVudC5jaGlsZHJlbltvcmRlci0xXTtcbiAgICAgICAgbm9kZS54MCA9IG5laWdoYm91ckxlZnQueDE7XG4gICAgICAgIC8vIG1hcmdpbnMgb2YgYm90aCBjaGlsZHJlbiBhcmUgY29sbGFwc2VkIHRvIHRoZSBtYXggdmFsdWVcbiAgICAgICAgbm9kZS54MCArPSBNYXRoLm1heCggbWFyZ2luKG5laWdoYm91ckxlZnQpLnJpZ2h0LCBtYXJnaW4obm9kZSkubGVmdCApO1xuICAgICAgfVxuICAgIH0gLy8gaWYgbm8gcGFyZW50LCBwb3NpdGlvbiBpcyBkZXBlbmRlbnQgb25seSBvbiB2ZXJ0aWNhbCBhbGlnbm1lbnRcbiAgICBlbHNlIHtcbiAgICAgIHN3aXRjaCAodkFsaWduKSB7XG4gICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgbm9kZS55MCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgbm9kZS55MCA9IGgvMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICBub2RlLnkwID0gaDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gc2hpZnQgaGVpZ2h0IGluIG1pZGRsZSBhbmQgYm90dG9tIGFsaWdubWVudHNcbiAgICAvLyBmb3IgY2hpbGRyZW4sIGFkZCB2ZXJ0aWNhbCBtYXJnaW5zIGFuZCBhbHNvIHNoaWZ0IHRvIHRoZSB5LXBvc2l0aW9uIG9mIHRoZWlyIGxpbmVcbiAgICBzd2l0Y2ggKHZBbGlnbikge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgY29uc3QgbGluZUluZGV4ID0gZ2V0TGluZUluZGV4KG5vZGUpO1xuICAgICAgICAgIG5vZGUueTAgKz0gIWVkZ2VNYXJnaW5zKG5vZGUucGFyZW50KSAmJiBsaW5lSW5kZXggPT09IDAgPyAwIDogbWFyZ2luKG5vZGUpLnRvcDtcbiAgICAgICAgICBub2RlLnkwICs9IGNhbGNMaW5lU2hpZnQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICBpZiAobm9kZS5wYXJlbnQpIG5vZGUueTAgKz0gY2FsY0xpbmVTaGlmdChub2RlKSArIGdldE93bkxpbmUobm9kZSkuaGVpZ2h0LzI7XG4gICAgICAgIG5vZGUueTAgLT0gaC8yO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZS5wYXJlbnQpLCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgICAgICAgIG5vZGUueTAgLT0gIWVkZ2VNYXJnaW5zKG5vZGUucGFyZW50KSAmJiBsaW5lSW5kZXggPT09IChsaW5lcy5sZW5ndGgtMSkgPyAwIDogbWFyZ2luKG5vZGUpLmJvdHRvbTtcbiAgICAgICAgICBub2RlLnkwICs9IGNhbGNMaW5lU2hpZnQobm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS55MCAtPSBoO1xuICAgICAgICBicmVhaztcbiAgICB9IFxuICAgIFxuICAgIC8vIGxhc3QsIGFzc2lnbiB3L2ggc2hpZnQgdG8gY29vcmRpbmF0ZXNcbiAgICBub2RlLngxID0gbm9kZS54MCArIHc7IFxuICAgIG5vZGUueTEgPSBub2RlLnkwICsgaDtcbiAgICBcbiAgfSAvLyAtLS0tLS0gZW5kIHBvc2l0aW9uTm9kZSgpIC0tLS0tLS1cbiAgXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXNzZW50aWFsIGZ1bmN0aW9uc1xuICBcbiAgZnVuY3Rpb24gZ2VuZXJhdGVMaW5lcyhub2RlKSB7XG4gICAgY29uc3QgbGluZXMgPSBbXTtcbiAgICBsZXQgbGluZVdpZHRoID0gMCwgZmxleEhlaWdodCA9IGZhbHNlLCBzdGFydEluZGV4ID0gMCwgbmV3TGluZSA9IHRydWU7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQsaSkgPT4ge1xuICAgICAgLy8gZGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBvZiB0aGUgY2hpbGRyZW4gaW4gYSBsaW5lIGhhcyBhIHByb3BlcnR5IHRvIHNwYW4gY29udGFpbmVyIGhlaWdodFxuICAgICAgaWYgKHNwYW5IZWlnaHQoY2hpbGQpICYmICFmbGV4SGVpZ2h0KSBmbGV4SGVpZ2h0ID0gdHJ1ZTtcbiAgICAgIFxuICAgICAgLy8gYWRkIHdpZHRoIG9mIGVhY2ggY2hpbGRcbiAgICAgIGxpbmVXaWR0aCArPSAoY2hpbGQueDEgLSBjaGlsZC54MCk7XG5cbiAgICAgIC8vIGFkZCBsYXJnZXN0IG9mIHRoZSB0d28gbWFyZ2lucyBiZXR3ZWVuIGNoaWxkcmVuIGFuZCBsZWZ0IG91dGVyIG1hcmdpbiAoaWYgZWRnZU1hcmdpbnMgdHJ1ZSlcbiAgICAgIGxpbmVXaWR0aCArPSBuZXdMaW5lID8gKGVkZ2VNYXJnaW5zKG5vZGUpID8gbWFyZ2luKGNoaWxkKS5sZWZ0IDogMCkgOiBcbiAgICAgIE1hdGgubWF4KG1hcmdpbihjaGlsZCkubGVmdCwgbWFyZ2luKG5vZGUuY2hpbGRyZW5baS0xXSkucmlnaHQpO1xuICAgICAgLy8gcmlnaHQgbWFyZ2luIGlzIG9ubHkgYWRkZWQgYXQgdGhlIGVuZCBvZiBhIGxpbmUgKGlmIGVkZ2VNYXJnaW5zIHRydWUpXG4gICAgICBjb25zdCBtYXJnaW5SaWdodCA9IGVkZ2VNYXJnaW5zKG5vZGUpID8gbWFyZ2luKGNoaWxkKS5yaWdodCA6IDA7XG4gICAgICBpZiAobGluZVdpZHRoICsgbWFyZ2luUmlnaHQgPiBtYXhMaW5lV2lkdGgobm9kZSkgfHzCoGkgPT09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTEpIFxuICAgICAgICBsaW5lV2lkdGggKz0gbWFyZ2luUmlnaHQ7XG5cbiAgICAgIC8vIGxpbmUgYnJlYWtzIGlmIG1heExpbmVXaWR0aCBpcyBzdXJwYXNzZWQgb3IgaXQncyB0aGUgbGFzdCBvbmVcbiAgICAgIGlmIChsaW5lV2lkdGggPiBtYXhMaW5lV2lkdGgobm9kZSkgfHzCoGkgPT09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTEpIHtcbiAgICAgICAgLy8gaWYgdHJ1ZSwgYWRkIGNoaWxkIGludGVydmFsIHRvIGxpbmVzIGFycmF5IGFuZCBzYXZlIGxpbmUgd2lkdGhcbiAgICAgICAgbGluZXMucHVzaCh7ZnJvbTogc3RhcnRJbmRleCwgdG86IGksIHdpZHRoOiBsaW5lV2lkdGgsIGZsZXhIZWlnaHQ6IGZsZXhIZWlnaHR9KTtcbiAgICAgICAgLy8gaWYgbm90IGxhc3QgbGluZSwgcmVzZXQgdmFyaWFibGVzXG4gICAgICAgIGlmIChpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGgtMSkgc3RhcnRJbmRleCA9IGkrMSwgbGluZVdpZHRoID0gMCwgZmxleEhlaWdodCA9IGZhbHNlLCBuZXdMaW5lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgbmV3TGluZSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHJldHVybiBsaW5lcztcbiAgfVxuICBcbiAgZnVuY3Rpb24gY2FsY0xpbmVIZWlnaHQobm9kZSwgbGluZXMsIGxpbmVJbmRleCkge1xuICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lSW5kZXhdO1xuICAgIGxldCBsaW5lSGVpZ2h0ID0gMDtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gbGluZS5mcm9tOyBpIDw9IGxpbmUudG87IGkrKykge1xuICAgICAgY29uc3QgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgLy8gY2FsY3VsYXRlIHRoZSByYXcgY2hpbGRyZW4gaGVpZ2h0XG4gICAgICBjb25zdCBjaGlsZEggPSBjaGlsZC55MSAtIGNoaWxkLnkwO1xuICAgICAgLy8gYWRkIHZlcnRpY2FsIG1hcmdpbnMgYmV0d2VlbiBjaGlsZHJlbiBhbmQgKGlmIGVkZ2VNYXJnaW5zIHRydWUpIG91dGVyIHZlcnRpY2FsIG1hcmdpbnNcbiAgICAgIC8vIG5vdGU6IGNvbGxhcHNpbmcgaW5kaXZpZHVhbCB2ZXJ0aWNhbCBtYXJnaW5zIGlzIHRvbyBtZXNzeSBhbmQgY29tcGxpY2F0ZWQsIHNvIEkgbGVmdCB0aGlzIG91dFxuICAgICAgY29uc3QgbWFyZ2luc1ZlcnQgPSAoIWVkZ2VNYXJnaW5zKG5vZGUpICYmIGxpbmVJbmRleD09PTAgPyAwIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4oY2hpbGQpLnRvcCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAoIWVkZ2VNYXJnaW5zKG5vZGUpICYmIGxpbmVJbmRleD09PShsaW5lcy5sZW5ndGgtMSkgPyAwIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4oY2hpbGQpLmJvdHRvbSk7XG4gICAgICAvLyBzZXQgbGluZSBoZWlnaHQgaWYgaXQgc3VycGFzc2VzIGxpbmUgaGVpZ2h0IG9mIHByZXZpb3VzIGNoaWxkc1xuICAgICAgaWYgKGNoaWxkSCArIG1hcmdpbnNWZXJ0ID4gbGluZUhlaWdodCkgbGluZUhlaWdodCA9IGNoaWxkSCArIG1hcmdpbnNWZXJ0O1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5tYXgobGluZUhlaWdodCwgbWluQ29udGFpbmVyU2l6ZShub2RlKS5oZWlnaHQpO1xuICB9XG4gIFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgICBcbiAgZnVuY3Rpb24gZ2V0TGluZXMobm9kZSkge1xuICAgIHJldHVybiBsaW5lTWFwW2xpbmVNYXAuZmluZEluZGV4KG0gPT4gbS5ib3ggPT09IG5vZGUpXS5saW5lcztcbiAgfVxuICBcbiAgZnVuY3Rpb24gZ2V0TGluZUluZGV4KG5vZGUsIHBhcmVudExpbmVzKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICBjb25zdCBsaW5lcyA9IChhcmd1bWVudHMubGVuZ3RoID4gMSkgPyBwYXJlbnRMaW5lcyA6IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgIGNvbnN0IGluZGV4ID0gbm9kZS5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihub2RlKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGxpbmVzLmZpbmRJbmRleChsID0+IHsgcmV0dXJuIChpbmRleCA+PSBsLmZyb20pICYmIChpbmRleCA8PSBsLnRvKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIFxuICBmdW5jdGlvbiBnZXRPd25MaW5lKG5vZGUpIHtcbiAgICBjb25zdCBsaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICBjb25zdCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgIHJldHVybiBsaW5lc1tsaW5lSW5kZXhdO1xuICB9XG4gIFxuICBmdW5jdGlvbiBjYWxjTGluZVNoaWZ0KG5vZGUsIGluY2x1ZGUgPSBmYWxzZSkge1xuICAgIGlmIChub2RlLnBhcmVudCkgeyAgICAgIFxuICAgICAgY29uc3QgbGluZXMgPSBnZXRMaW5lcyhub2RlLnBhcmVudCk7XG4gICAgICBjb25zdCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgICAgY29uc3QgbGluZVRvID0gaW5jbHVkZSA/IGxpbmVJbmRleCA6IGxpbmVJbmRleC0xO1xuICAgICAgXG4gICAgICByZXR1cm4gZDMuc3VtKGxpbmVzLmZpbHRlciggKGwsaSkgPT4gKGkgPD0gbGluZVRvKSApLCBsID0+IGwuaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGxpbmVCcmVhayhub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7IFxuICAgICAgY29uc3QgaW5kZXggPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgY29uc3QgbGluZXMgPSBnZXRMaW5lcyhub2RlLnBhcmVudCk7XG4gICAgICBjb25zdCBsaW5lID0gbGluZXNbZ2V0TGluZUluZGV4KG5vZGUsIGxpbmVzKV07XG4gICAgICByZXR1cm4gbGluZS5mcm9tID09PSBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdGFudCh4KSB7IC8vIGZyb20gRDMgc291cmNlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICAgICAgICAgICAgICAgICAgIFxuICByZXR1cm4gY29tcHV0ZTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZDNfXzsiXSwic291cmNlUm9vdCI6IiJ9