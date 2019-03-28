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

    return lineHeight;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3htb2RlbC1kMy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvLi9zcmMvYm94bW9kZWwuanMiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvZXh0ZXJuYWwgXCJkM1wiIl0sIm5hbWVzIjpbImJveG1vZGVsIiwiaXNDb250YWluZXIiLCJzcGFuSGVpZ2h0IiwiZWRnZU1hcmdpbnMiLCJ2QWxpZ24iLCJwYWRkaW5nIiwibWFyZ2luIiwibWluQ29udGFpbmVyU2l6ZSIsIm1heExpbmVXaWR0aCIsIm5vZGVTaXplIiwibGluZU1hcCIsImNvbXB1dGUiLCJyb290IiwiZWFjaEFmdGVyIiwic2NhbGVOb2RlIiwiZWFjaEJlZm9yZSIsInNjYWxlVG9QYXJlbnQiLCJwb3NpdGlvbk5vZGUiLCJ4IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY29uc3RhbnQiLCJub2RlIiwidyIsIndpZHRoIiwiaCIsImhlaWdodCIsImNoaWxkcmVuIiwibGluZXMiLCJnZW5lcmF0ZUxpbmVzIiwibCIsImNhbGNMaW5lSGVpZ2h0IiwicHVzaCIsImJveCIsImQzIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiTWF0aCIsIm1heCIsIngwIiwieTAiLCJ4MSIsInkxIiwicGFyZW50IiwiZ2V0T3duTGluZSIsInBhcmVudExpbmVzIiwiZ2V0TGluZXMiLCJsaW5lSW5kZXgiLCJnZXRMaW5lSW5kZXgiLCJoZWlnaHREaWZmIiwiY29uc29sZSIsImxvZyIsImV4Y2VzcyIsImxpbmUiLCJvcmRlciIsImluZGV4T2YiLCJsaW5lQnJlYWsiLCJuZWlnaGJvdXJMZWZ0IiwiY2FsY0xpbmVTaGlmdCIsImxpbmVXaWR0aCIsImZsZXhIZWlnaHQiLCJzdGFydEluZGV4IiwibmV3TGluZSIsImZvckVhY2giLCJjaGlsZCIsImkiLCJtYXJnaW5SaWdodCIsImZyb20iLCJ0byIsImxpbmVIZWlnaHQiLCJjaGlsZEgiLCJtYXJnaW5zVmVydCIsImZpbmRJbmRleCIsIm0iLCJpbmRleCIsImluY2x1ZGUiLCJsaW5lVG8iLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZSxTQUFTQSxRQUFULEdBQW9CO0FBQy9CO0FBRUEsTUFBSUMsV0FBSjtBQUFBLE1BQ0lDLFVBREo7QUFBQSxNQUVJQyxXQUFXLEdBQUcsS0FGbEI7QUFBQSxNQUdJQyxNQUhKO0FBSUEsTUFBSUMsT0FBSixFQUNJQyxNQURKLEVBRUlDLGdCQUZKLEVBR0lDLFlBSEosRUFJSUMsUUFKSjtBQUtBLE1BQU1DLE9BQU8sR0FBRyxFQUFoQjs7QUFFQSxXQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNyQkEsUUFBSSxDQUFDQyxTQUFMLENBQWVDLFNBQWY7QUFDQUYsUUFBSSxDQUFDRyxVQUFMLENBQWdCQyxhQUFoQjtBQUNBSixRQUFJLENBQUNHLFVBQUwsQ0FBZ0JFLFlBQWhCO0FBRUEsV0FBT0wsSUFBUDtBQUNEOztBQUVERCxTQUFPLENBQUNQLE1BQVIsR0FBaUIsVUFBU2MsQ0FBVCxFQUFZO0FBQzNCLFdBQU9DLFNBQVMsQ0FBQ0MsTUFBVixJQUFvQmhCLE1BQU0sR0FBR2MsQ0FBVCxFQUFZUCxPQUFoQyxJQUEyQ1AsTUFBbEQ7QUFDRCxHQUZEOztBQUdBTyxTQUFPLENBQUNSLFdBQVIsR0FBc0IsVUFBU2UsQ0FBVCxFQUFZO0FBQ2hDLFdBQU9DLFNBQVMsQ0FBQ0MsTUFBVixJQUFvQmpCLFdBQVcsR0FBR2UsQ0FBZCxFQUFpQlAsT0FBckMsSUFBZ0RSLFdBQXZEO0FBQ0QsR0FGRDs7QUFHQVEsU0FBTyxDQUFDVixXQUFSLEdBQXNCLFVBQVNpQixDQUFULEVBQVk7QUFDaEMsV0FBT0MsU0FBUyxDQUFDQyxNQUFWLElBQW9CbkIsV0FBVyxHQUFHLE9BQU9pQixDQUFQLEtBQWEsVUFBYixHQUEwQkEsQ0FBMUIsR0FBOEJHLFFBQVEsQ0FBQyxDQUFDSCxDQUFGLENBQXBELEVBQTBEUCxPQUE5RSxJQUF5RlYsV0FBaEc7QUFDRCxHQUZEOztBQUdBVSxTQUFPLENBQUNULFVBQVIsR0FBcUIsVUFBU2dCLENBQVQsRUFBWTtBQUMvQixXQUFPQyxTQUFTLENBQUNDLE1BQVYsSUFBb0JsQixVQUFVLEdBQUcsT0FBT2dCLENBQVAsS0FBYSxVQUFiLEdBQTBCQSxDQUExQixHQUE4QkcsUUFBUSxDQUFDLENBQUNILENBQUYsQ0FBbkQsRUFBeURQLE9BQTdFLElBQXdGVCxVQUEvRjtBQUNELEdBRkQ7O0FBR0FTLFNBQU8sQ0FBQ04sT0FBUixHQUFrQixVQUFTYSxDQUFULEVBQVk7QUFDNUIsV0FBT0MsU0FBUyxDQUFDQyxNQUFWLElBQW9CZixPQUFPLEdBQUcsT0FBT2EsQ0FBUCxLQUFhLFVBQWIsR0FBMEJBLENBQTFCLEdBQThCRyxRQUFRLENBQUMsQ0FBQ0gsQ0FBRixDQUFoRCxFQUFzRFAsT0FBMUUsSUFBcUZOLE9BQTVGO0FBQ0QsR0FGRDs7QUFHQU0sU0FBTyxDQUFDTCxNQUFSLEdBQWlCLFVBQVNZLENBQVQsRUFBWTtBQUMzQixXQUFPQyxTQUFTLENBQUNDLE1BQVYsSUFBb0JkLE1BQU0sR0FBRyxPQUFPWSxDQUFQLEtBQWEsVUFBYixHQUEwQkEsQ0FBMUIsR0FBOEJHLFFBQVEsQ0FBQyxDQUFDSCxDQUFGLENBQS9DLEVBQXFEUCxPQUF6RSxJQUFvRkwsTUFBM0Y7QUFDRCxHQUZEOztBQUdBSyxTQUFPLENBQUNGLFFBQVIsR0FBbUIsVUFBU1MsQ0FBVCxFQUFZO0FBQzdCLFdBQU9DLFNBQVMsQ0FBQ0MsTUFBVixJQUFvQlgsUUFBUSxHQUFHLE9BQU9TLENBQVAsS0FBYSxVQUFiLEdBQTBCQSxDQUExQixHQUE4QkcsUUFBUSxDQUFDLENBQUNILENBQUYsQ0FBakQsRUFBdURQLE9BQTNFLElBQXNGRixRQUE3RjtBQUNELEdBRkQ7O0FBR0FFLFNBQU8sQ0FBQ0osZ0JBQVIsR0FBMkIsVUFBU1csQ0FBVCxFQUFZO0FBQ3JDLFdBQU9DLFNBQVMsQ0FBQ0MsTUFBVixJQUFvQmIsZ0JBQWdCLEdBQUcsT0FBT1csQ0FBUCxLQUFhLFVBQWIsR0FBMEJBLENBQTFCLEdBQThCRyxRQUFRLENBQUMsQ0FBQ0gsQ0FBRixDQUF6RCxFQUErRFAsT0FBbkYsSUFBOEZKLGdCQUFyRztBQUNELEdBRkQ7O0FBR0FJLFNBQU8sQ0FBQ0gsWUFBUixHQUF1QixVQUFTVSxDQUFULEVBQVk7QUFDakMsV0FBT0MsU0FBUyxDQUFDQyxNQUFWLElBQW9CWixZQUFZLEdBQUcsT0FBT1UsQ0FBUCxLQUFhLFVBQWIsR0FBMEJBLENBQTFCLEdBQThCRyxRQUFRLENBQUMsQ0FBQ0gsQ0FBRixDQUFyRCxFQUEyRFAsT0FBL0UsSUFBMEZILFlBQWpHO0FBQ0QsR0FGRCxDQTlDK0IsQ0FrRC9CO0FBQ0E7OztBQUVBLFdBQVNNLFNBQVQsQ0FBbUJRLElBQW5CLEVBQXlCO0FBQ3ZCO0FBQ0EsUUFBSUMsQ0FBQyxHQUFHZCxRQUFRLENBQUNhLElBQUQsQ0FBUixDQUFlRSxLQUF2QjtBQUFBLFFBQThCQyxDQUFDLEdBQUdoQixRQUFRLENBQUNhLElBQUQsQ0FBUixDQUFlSSxNQUFqRDs7QUFFQSxRQUFJekIsV0FBVyxDQUFDcUIsSUFBRCxDQUFmLEVBQXVCO0FBQ3JCQyxPQUFDLEdBQUdFLENBQUMsR0FBRyxDQUFSLENBRHFCLENBQ1Y7O0FBRVgsVUFBSUgsSUFBSSxDQUFDSyxRQUFULEVBQW1CO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFlBQU1DLEtBQUssR0FBR0MsYUFBYSxDQUFDUCxJQUFELENBQTNCLENBSmlCLENBS2pCOztBQUNBLGFBQUssSUFBSVEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsS0FBSyxDQUFDUixNQUExQixFQUFrQ1UsQ0FBQyxFQUFuQyxFQUF1QztBQUNyQ0YsZUFBSyxDQUFDRSxDQUFELENBQUwsQ0FBU0osTUFBVCxHQUFrQkssY0FBYyxDQUFDVCxJQUFELEVBQU1NLEtBQU4sRUFBWUUsQ0FBWixDQUFoQyxDQURxQyxDQUNXO0FBQ2pELFNBUmdCLENBU2pCOzs7QUFDQXBCLGVBQU8sQ0FBQ3NCLElBQVIsQ0FBYTtBQUFDQyxhQUFHLEVBQUVYLElBQU47QUFBWU0sZUFBSyxFQUFFQTtBQUFuQixTQUFiLEVBVmlCLENBV2pCOztBQUNBTCxTQUFDLElBQUlXLHNDQUFBLENBQU9OLEtBQVAsRUFBYyxVQUFBRSxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQ04sS0FBTjtBQUFBLFNBQWYsQ0FBTCxDQVppQixDQWFqQjs7QUFDQUMsU0FBQyxJQUFJUyxzQ0FBQSxDQUFPTixLQUFQLEVBQWMsVUFBQUUsQ0FBQztBQUFBLGlCQUFJQSxDQUFDLENBQUNKLE1BQU47QUFBQSxTQUFmLENBQUw7QUFDRCxPQWxCb0IsQ0FtQnJCOzs7QUFDQUgsT0FBQyxJQUFJbEIsT0FBTyxDQUFDaUIsSUFBRCxDQUFQLENBQWNhLElBQWQsR0FBcUI5QixPQUFPLENBQUNpQixJQUFELENBQVAsQ0FBY2MsS0FBeEM7QUFDQVgsT0FBQyxJQUFJcEIsT0FBTyxDQUFDaUIsSUFBRCxDQUFQLENBQWNlLEdBQWQsR0FBb0JoQyxPQUFPLENBQUNpQixJQUFELENBQVAsQ0FBY2dCLE1BQXZDO0FBQ0FmLE9BQUMsR0FBR2dCLElBQUksQ0FBQ0MsR0FBTCxDQUFTakIsQ0FBVCxFQUFZaEIsZ0JBQWdCLENBQUNlLElBQUQsQ0FBaEIsQ0FBdUJFLEtBQW5DLENBQUo7QUFDQUMsT0FBQyxHQUFHYyxJQUFJLENBQUNDLEdBQUwsQ0FBU2YsQ0FBVCxFQUFZbEIsZ0JBQWdCLENBQUNlLElBQUQsQ0FBaEIsQ0FBdUJJLE1BQW5DLENBQUo7QUFDRCxLQTVCc0IsQ0E4QnZCOzs7QUFDQUosUUFBSSxDQUFDbUIsRUFBTCxHQUFVbkIsSUFBSSxDQUFDb0IsRUFBTCxHQUFVLENBQXBCO0FBQ0FwQixRQUFJLENBQUNxQixFQUFMLEdBQVVwQixDQUFWLEVBQWFELElBQUksQ0FBQ3NCLEVBQUwsR0FBVW5CLENBQXZCO0FBRUQsR0F2RjhCLENBdUY3Qjs7O0FBRUYsV0FBU1QsYUFBVCxDQUF1Qk0sSUFBdkIsRUFBNkI7QUFDM0I7QUFDQTtBQUNBLFFBQUlHLENBQUMsR0FBR0gsSUFBSSxDQUFDc0IsRUFBYixDQUgyQixDQUszQjs7QUFDQSxRQUFJdEIsSUFBSSxDQUFDdUIsTUFBTCxJQUFlM0MsVUFBVSxDQUFDb0IsSUFBRCxDQUE3QixFQUFxQztBQUNuQ0csT0FBQyxHQUFHcUIsVUFBVSxDQUFDeEIsSUFBRCxDQUFWLENBQWlCSSxNQUFyQjtBQUVBLFVBQU1xQixXQUFXLEdBQUdDLFFBQVEsQ0FBQzFCLElBQUksQ0FBQ3VCLE1BQU4sQ0FBNUI7QUFDQSxVQUFNSSxTQUFTLEdBQUdDLFlBQVksQ0FBQzVCLElBQUQsRUFBT3lCLFdBQVAsQ0FBOUI7QUFFQXRCLE9BQUMsSUFBSSxDQUFDdEIsV0FBRCxJQUFnQjhDLFNBQVMsS0FBSyxDQUE5QixHQUFrQyxDQUFsQyxHQUFzQzNDLE1BQU0sQ0FBQ2dCLElBQUQsQ0FBTixDQUFhZSxHQUF4RDtBQUNBWixPQUFDLElBQUksQ0FBQ3RCLFdBQUQsSUFBZ0I4QyxTQUFTLEtBQU1GLFdBQVcsQ0FBQzNCLE1BQVosR0FBbUIsQ0FBbEQsR0FBdUQsQ0FBdkQsR0FBMkRkLE1BQU0sQ0FBQ2dCLElBQUQsQ0FBTixDQUFhZ0IsTUFBN0UsQ0FQbUMsQ0FTbkM7O0FBQ0EsVUFBTWEsVUFBVSxHQUFHMUIsQ0FBQyxHQUFHSCxJQUFJLENBQUNzQixFQUE1QjtBQUNBUSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFNL0IsSUFBSSxDQUFDc0IsRUFBWCxHQUFnQixLQUFoQixHQUFzQm5CLENBQXRCLEdBQXdCLFFBQXhCLEdBQWlDMEIsVUFBN0M7O0FBQ0EsVUFBSWxELFdBQVcsQ0FBQ3FCLElBQUQsQ0FBWCxJQUFxQkEsSUFBSSxDQUFDSyxRQUExQixJQUFzQ3dCLFVBQVUsR0FBRyxDQUF2RCxFQUEwRDtBQUN4RCxZQUFNdkIsS0FBSyxHQUFHb0IsUUFBUSxDQUFDMUIsSUFBRCxDQUF0QjtBQUNBOEIsZUFBTyxDQUFDQyxHQUFSLENBQVl6QixLQUFaO0FBRUEsWUFBTTBCLE1BQU0sR0FBR0gsVUFBVSxHQUFHdkIsS0FBSyxDQUFDUixNQUFsQztBQUp3RDtBQUFBO0FBQUE7O0FBQUE7QUFLeEQsK0JBQW1CUSxLQUFuQiw4SEFBMEI7QUFBQSxnQkFBZjJCLElBQWU7QUFDeEJBLGdCQUFJLENBQUM3QixNQUFMLElBQWU0QixNQUFmO0FBQ0Q7QUFQdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVF6RDtBQUNGOztBQUVEaEMsUUFBSSxDQUFDc0IsRUFBTCxHQUFVbkIsQ0FBVjtBQUNEOztBQUVELFdBQVNSLFlBQVQsQ0FBc0JLLElBQXRCLEVBQTRCO0FBQzFCLFFBQU1DLENBQUMsR0FBR0QsSUFBSSxDQUFDcUIsRUFBTCxHQUFVckIsSUFBSSxDQUFDbUIsRUFBekI7QUFDQSxRQUFNaEIsQ0FBQyxHQUFHSCxJQUFJLENBQUNzQixFQUFMLEdBQVV0QixJQUFJLENBQUNvQixFQUF6Qjs7QUFFQSxRQUFJcEIsSUFBSSxDQUFDdUIsTUFBVCxFQUFpQjtBQUNmO0FBQ0F2QixVQUFJLENBQUNvQixFQUFMLEdBQVVwQixJQUFJLENBQUN1QixNQUFMLENBQVlILEVBQVosR0FBaUJyQyxPQUFPLENBQUNpQixJQUFJLENBQUN1QixNQUFOLENBQVAsQ0FBcUJSLEdBQWhEO0FBRUEsVUFBTW1CLEtBQUssR0FBR2xDLElBQUksQ0FBQ3VCLE1BQUwsQ0FBWWxCLFFBQVosQ0FBcUI4QixPQUFyQixDQUE2Qm5DLElBQTdCLENBQWQ7O0FBQ0EsVUFBSWtDLEtBQUssS0FBSyxDQUFWLElBQWVFLFNBQVMsQ0FBQ3BDLElBQUQsQ0FBNUIsRUFBb0M7QUFDbEM7QUFDQUEsWUFBSSxDQUFDbUIsRUFBTCxJQUFXbkIsSUFBSSxDQUFDdUIsTUFBTCxDQUFZSixFQUFaLEdBQWlCcEMsT0FBTyxDQUFDaUIsSUFBSSxDQUFDdUIsTUFBTixDQUFQLENBQXFCVixJQUFqRDtBQUNBLFlBQUloQyxXQUFKLEVBQWlCbUIsSUFBSSxDQUFDbUIsRUFBTCxJQUFXbkMsTUFBTSxDQUFDZ0IsSUFBRCxDQUFOLENBQWFhLElBQXhCO0FBQ2xCLE9BSkQsTUFLSztBQUNIO0FBQ0EsWUFBTXdCLGFBQWEsR0FBR3JDLElBQUksQ0FBQ3VCLE1BQUwsQ0FBWWxCLFFBQVosQ0FBcUI2QixLQUFLLEdBQUMsQ0FBM0IsQ0FBdEI7QUFDQWxDLFlBQUksQ0FBQ21CLEVBQUwsR0FBVWtCLGFBQWEsQ0FBQ2hCLEVBQXhCLENBSEcsQ0FJSDs7QUFDQXJCLFlBQUksQ0FBQ21CLEVBQUwsSUFBV0YsSUFBSSxDQUFDQyxHQUFMLENBQVVsQyxNQUFNLENBQUNxRCxhQUFELENBQU4sQ0FBc0J2QixLQUFoQyxFQUF1QzlCLE1BQU0sQ0FBQ2dCLElBQUQsQ0FBTixDQUFhYSxJQUFwRCxDQUFYO0FBQ0Q7QUFDRixLQWpCRCxDQWlCRTtBQWpCRixTQWtCSztBQUNILGdCQUFRL0IsTUFBUjtBQUNFLGVBQUssS0FBTDtBQUNFa0IsZ0JBQUksQ0FBQ29CLEVBQUwsR0FBVSxDQUFWO0FBQ0E7O0FBQ0YsZUFBSyxRQUFMO0FBQ0VwQixnQkFBSSxDQUFDb0IsRUFBTCxHQUFVakIsQ0FBQyxHQUFDLENBQVo7QUFDQTs7QUFDRixlQUFLLFFBQUw7QUFDRUgsZ0JBQUksQ0FBQ29CLEVBQUwsR0FBVWpCLENBQVY7QUFDQTtBQVRKO0FBV0QsT0FsQ3lCLENBb0MxQjtBQUNBOzs7QUFDQSxZQUFRckIsTUFBUjtBQUNFLFdBQUssS0FBTDtBQUNFLFlBQUlrQixJQUFJLENBQUN1QixNQUFULEVBQWlCO0FBQ2YsY0FBTUksU0FBUyxHQUFHQyxZQUFZLENBQUM1QixJQUFELENBQTlCO0FBQ0FBLGNBQUksQ0FBQ29CLEVBQUwsSUFBVyxDQUFDdkMsV0FBRCxJQUFnQjhDLFNBQVMsS0FBSyxDQUE5QixHQUFrQyxDQUFsQyxHQUFzQzNDLE1BQU0sQ0FBQ2dCLElBQUQsQ0FBTixDQUFhZSxHQUE5RDtBQUNBZixjQUFJLENBQUNvQixFQUFMLElBQVdrQixhQUFhLENBQUN0QyxJQUFELENBQXhCO0FBQ0Q7O0FBQ0Q7O0FBQ0YsV0FBSyxRQUFMO0FBQ0UsWUFBSUEsSUFBSSxDQUFDdUIsTUFBVCxFQUFpQnZCLElBQUksQ0FBQ29CLEVBQUwsSUFBV2tCLGFBQWEsQ0FBQ3RDLElBQUQsQ0FBYixHQUFzQndCLFVBQVUsQ0FBQ3hCLElBQUQsQ0FBVixDQUFpQkksTUFBakIsR0FBd0IsQ0FBekQ7QUFDakJKLFlBQUksQ0FBQ29CLEVBQUwsSUFBV2pCLENBQUMsR0FBQyxDQUFiO0FBQ0E7O0FBQ0YsV0FBSyxRQUFMO0FBQ0UsWUFBSUgsSUFBSSxDQUFDdUIsTUFBVCxFQUFpQjtBQUNmLGNBQU1qQixLQUFLLEdBQUdvQixRQUFRLENBQUMxQixJQUFJLENBQUN1QixNQUFOLENBQXRCO0FBQUEsY0FBcUNJLFVBQVMsR0FBR0MsWUFBWSxDQUFDNUIsSUFBRCxFQUFPTSxLQUFQLENBQTdEOztBQUNBTixjQUFJLENBQUNvQixFQUFMLElBQVcsQ0FBQ3ZDLFdBQUQsSUFBZ0I4QyxVQUFTLEtBQU1yQixLQUFLLENBQUNSLE1BQU4sR0FBYSxDQUE1QyxHQUFpRCxDQUFqRCxHQUFxRGQsTUFBTSxDQUFDZ0IsSUFBRCxDQUFOLENBQWFnQixNQUE3RTtBQUNBaEIsY0FBSSxDQUFDb0IsRUFBTCxJQUFXa0IsYUFBYSxDQUFDdEMsSUFBRCxFQUFPLElBQVAsQ0FBeEI7QUFDRDs7QUFDREEsWUFBSSxDQUFDb0IsRUFBTCxJQUFXakIsQ0FBWDtBQUNBO0FBbkJKLEtBdEMwQixDQTREMUI7OztBQUNBSCxRQUFJLENBQUNxQixFQUFMLEdBQVVyQixJQUFJLENBQUNtQixFQUFMLEdBQVVsQixDQUFwQjtBQUNBRCxRQUFJLENBQUNzQixFQUFMLEdBQVV0QixJQUFJLENBQUNvQixFQUFMLEdBQVVqQixDQUFwQjtBQUVELEdBekw4QixDQXlMN0I7QUFFRjtBQUNBOzs7QUFFQSxXQUFTSSxhQUFULENBQXVCUCxJQUF2QixFQUE2QjtBQUMzQixRQUFNTSxLQUFLLEdBQUcsRUFBZDtBQUNBLFFBQUlpQyxTQUFTLEdBQUcsQ0FBaEI7QUFBQSxRQUFtQkMsVUFBVSxHQUFHLEtBQWhDO0FBQUEsUUFBdUNDLFVBQVUsR0FBRyxDQUFwRDtBQUFBLFFBQXVEQyxPQUFPLEdBQUcsSUFBakU7QUFDQTFDLFFBQUksQ0FBQ0ssUUFBTCxDQUFjc0MsT0FBZCxDQUF1QixVQUFDQyxLQUFELEVBQU9DLENBQVAsRUFBYTtBQUNsQztBQUNBLFVBQUlqRSxVQUFVLENBQUNnRSxLQUFELENBQVYsSUFBcUIsQ0FBQ0osVUFBMUIsRUFBc0NBLFVBQVUsR0FBRyxJQUFiLENBRkosQ0FJbEM7O0FBQ0FELGVBQVMsSUFBS0ssS0FBSyxDQUFDdkIsRUFBTixHQUFXdUIsS0FBSyxDQUFDekIsRUFBL0IsQ0FMa0MsQ0FPbEM7O0FBQ0FvQixlQUFTLElBQUlHLE9BQU8sR0FBSTdELFdBQVcsR0FBR0csTUFBTSxDQUFDNEQsS0FBRCxDQUFOLENBQWMvQixJQUFqQixHQUF3QixDQUF2QyxHQUNwQkksSUFBSSxDQUFDQyxHQUFMLENBQVNsQyxNQUFNLENBQUM0RCxLQUFELENBQU4sQ0FBYy9CLElBQXZCLEVBQTZCN0IsTUFBTSxDQUFDZ0IsSUFBSSxDQUFDSyxRQUFMLENBQWN3QyxDQUFDLEdBQUMsQ0FBaEIsQ0FBRCxDQUFOLENBQTJCL0IsS0FBeEQsQ0FEQSxDQVJrQyxDQVVsQzs7QUFDQSxVQUFNZ0MsV0FBVyxHQUFHakUsV0FBVyxHQUFHRyxNQUFNLENBQUM0RCxLQUFELENBQU4sQ0FBYzlCLEtBQWpCLEdBQXlCLENBQXhEO0FBQ0EsVUFBSXlCLFNBQVMsR0FBR08sV0FBWixHQUEwQjVELFlBQVksQ0FBQ2MsSUFBRCxDQUF0QyxJQUFnRDZDLENBQUMsS0FBSzdDLElBQUksQ0FBQ0ssUUFBTCxDQUFjUCxNQUFkLEdBQXFCLENBQS9FLEVBQ0V5QyxTQUFTLElBQUlPLFdBQWIsQ0FiZ0MsQ0FlbEM7O0FBQ0EsVUFBSVAsU0FBUyxHQUFHckQsWUFBWSxDQUFDYyxJQUFELENBQXhCLElBQWtDNkMsQ0FBQyxLQUFLN0MsSUFBSSxDQUFDSyxRQUFMLENBQWNQLE1BQWQsR0FBcUIsQ0FBakUsRUFBb0U7QUFDbEU7QUFDQVEsYUFBSyxDQUFDSSxJQUFOLENBQVc7QUFBQ3FDLGNBQUksRUFBRU4sVUFBUDtBQUFtQk8sWUFBRSxFQUFFSCxDQUF2QjtBQUEwQjNDLGVBQUssRUFBRXFDLFNBQWpDO0FBQTRDQyxvQkFBVSxFQUFFQTtBQUF4RCxTQUFYLEVBRmtFLENBR2xFOztBQUNBLFlBQUlLLENBQUMsR0FBRzdDLElBQUksQ0FBQ0ssUUFBTCxDQUFjUCxNQUFkLEdBQXFCLENBQTdCLEVBQWdDMkMsVUFBVSxHQUFHSSxDQUFDLEdBQUMsQ0FBZixFQUFrQk4sU0FBUyxHQUFHLENBQTlCLEVBQWlDQyxVQUFVLEdBQUcsS0FBOUMsRUFBcURFLE9BQU8sR0FBRyxJQUEvRDtBQUNqQyxPQUxELE1BTUtBLE9BQU8sR0FBRyxLQUFWO0FBQ04sS0F2QkQ7QUF3QkEsV0FBT3BDLEtBQVA7QUFDRDs7QUFFRCxXQUFTRyxjQUFULENBQXdCVCxJQUF4QixFQUE4Qk0sS0FBOUIsRUFBcUNxQixTQUFyQyxFQUFnRDtBQUM5QyxRQUFNTSxJQUFJLEdBQUczQixLQUFLLENBQUNxQixTQUFELENBQWxCO0FBQ0EsUUFBSXNCLFVBQVUsR0FBRyxDQUFqQjs7QUFFQSxTQUFLLElBQUlKLENBQUMsR0FBR1osSUFBSSxDQUFDYyxJQUFsQixFQUF3QkYsQ0FBQyxJQUFJWixJQUFJLENBQUNlLEVBQWxDLEVBQXNDSCxDQUFDLEVBQXZDLEVBQTJDO0FBQ3pDLFVBQU1ELEtBQUssR0FBRzVDLElBQUksQ0FBQ0ssUUFBTCxDQUFjd0MsQ0FBZCxDQUFkLENBRHlDLENBRXpDOztBQUNBLFVBQU1LLE1BQU0sR0FBR04sS0FBSyxDQUFDdEIsRUFBTixHQUFXc0IsS0FBSyxDQUFDeEIsRUFBaEMsQ0FIeUMsQ0FJekM7QUFDQTs7QUFDQSxVQUFNK0IsV0FBVyxHQUFHLENBQUMsQ0FBQ3RFLFdBQUQsSUFBZ0I4QyxTQUFTLEtBQUcsQ0FBNUIsR0FBZ0MsQ0FBaEMsR0FDQTNDLE1BQU0sQ0FBQzRELEtBQUQsQ0FBTixDQUFjN0IsR0FEZixLQUViLENBQUNsQyxXQUFELElBQWdCOEMsU0FBUyxLQUFJckIsS0FBSyxDQUFDUixNQUFOLEdBQWEsQ0FBMUMsR0FBK0MsQ0FBL0MsR0FDQWQsTUFBTSxDQUFDNEQsS0FBRCxDQUFOLENBQWM1QixNQUhELENBQXBCLENBTnlDLENBVXpDOztBQUNBLFVBQUlrQyxNQUFNLEdBQUdDLFdBQVQsR0FBdUJGLFVBQTNCLEVBQXVDQSxVQUFVLEdBQUdDLE1BQU0sR0FBR0MsV0FBdEI7QUFDeEM7O0FBQ0QsV0FBT0YsVUFBUDtBQUNELEdBOU84QixDQWdQL0I7QUFDQTs7O0FBRUEsV0FBU3ZCLFFBQVQsQ0FBa0IxQixJQUFsQixFQUF3QjtBQUN0QixXQUFPWixPQUFPLENBQUNBLE9BQU8sQ0FBQ2dFLFNBQVIsQ0FBa0IsVUFBQUMsQ0FBQztBQUFBLGFBQUlBLENBQUMsQ0FBQzFDLEdBQUYsS0FBVVgsSUFBZDtBQUFBLEtBQW5CLENBQUQsQ0FBUCxDQUFnRE0sS0FBdkQ7QUFDRDs7QUFFRCxXQUFTc0IsWUFBVCxDQUFzQjVCLElBQXRCLEVBQTRCeUIsV0FBNUIsRUFBeUM7QUFDdkMsUUFBSXpCLElBQUksQ0FBQ3VCLE1BQVQsRUFBaUI7QUFDZixVQUFNakIsS0FBSyxHQUFJVCxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBcEIsR0FBeUIyQixXQUF6QixHQUF1Q0MsUUFBUSxDQUFDMUIsSUFBSSxDQUFDdUIsTUFBTixDQUE3RDtBQUNBLFVBQU0rQixLQUFLLEdBQUd0RCxJQUFJLENBQUN1QixNQUFMLENBQVlsQixRQUFaLENBQXFCOEIsT0FBckIsQ0FBNkJuQyxJQUE3QixDQUFkO0FBRUEsYUFBT00sS0FBSyxDQUFDOEMsU0FBTixDQUFnQixVQUFBNUMsQ0FBQyxFQUFJO0FBQUUsZUFBUThDLEtBQUssSUFBSTlDLENBQUMsQ0FBQ3VDLElBQVosSUFBc0JPLEtBQUssSUFBSTlDLENBQUMsQ0FBQ3dDLEVBQXhDO0FBQThDLE9BQXJFLENBQVA7QUFDRDs7QUFDRCxXQUFPLElBQVA7QUFDRDs7QUFFRCxXQUFTeEIsVUFBVCxDQUFvQnhCLElBQXBCLEVBQTBCO0FBQ3hCLFFBQU1NLEtBQUssR0FBR29CLFFBQVEsQ0FBQzFCLElBQUksQ0FBQ3VCLE1BQU4sQ0FBdEI7QUFDQSxRQUFNSSxTQUFTLEdBQUdDLFlBQVksQ0FBQzVCLElBQUQsRUFBT00sS0FBUCxDQUE5QjtBQUNBLFdBQU9BLEtBQUssQ0FBQ3FCLFNBQUQsQ0FBWjtBQUNEOztBQUVELFdBQVNXLGFBQVQsQ0FBdUJ0QyxJQUF2QixFQUE4QztBQUFBLFFBQWpCdUQsT0FBaUIsdUVBQVAsS0FBTzs7QUFDNUMsUUFBSXZELElBQUksQ0FBQ3VCLE1BQVQsRUFBaUI7QUFDZixVQUFNakIsS0FBSyxHQUFHb0IsUUFBUSxDQUFDMUIsSUFBSSxDQUFDdUIsTUFBTixDQUF0QjtBQUNBLFVBQU1JLFNBQVMsR0FBR0MsWUFBWSxDQUFDNUIsSUFBRCxFQUFPTSxLQUFQLENBQTlCO0FBQ0EsVUFBTWtELE1BQU0sR0FBR0QsT0FBTyxHQUFHNUIsU0FBSCxHQUFlQSxTQUFTLEdBQUMsQ0FBL0M7QUFFQSxhQUFPZixzQ0FBQSxDQUFPTixLQUFLLENBQUNtRCxNQUFOLENBQWMsVUFBQ2pELENBQUQsRUFBR3FDLENBQUg7QUFBQSxlQUFVQSxDQUFDLElBQUlXLE1BQWY7QUFBQSxPQUFkLENBQVAsRUFBK0MsVUFBQWhELENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNKLE1BQU47QUFBQSxPQUFoRCxDQUFQO0FBQ0Q7O0FBQ0QsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsV0FBU2dDLFNBQVQsQ0FBbUJwQyxJQUFuQixFQUF5QjtBQUN2QixRQUFJQSxJQUFJLENBQUN1QixNQUFULEVBQWlCO0FBQ2YsVUFBTStCLEtBQUssR0FBR3RELElBQUksQ0FBQ3VCLE1BQUwsQ0FBWWxCLFFBQVosQ0FBcUI4QixPQUFyQixDQUE2Qm5DLElBQTdCLENBQWQ7QUFDQSxVQUFNTSxLQUFLLEdBQUdvQixRQUFRLENBQUMxQixJQUFJLENBQUN1QixNQUFOLENBQXRCO0FBQ0EsVUFBTVUsSUFBSSxHQUFHM0IsS0FBSyxDQUFDc0IsWUFBWSxDQUFDNUIsSUFBRCxFQUFPTSxLQUFQLENBQWIsQ0FBbEI7QUFDQSxhQUFPMkIsSUFBSSxDQUFDYyxJQUFMLEtBQWNPLEtBQXJCO0FBQ0Q7O0FBQ0QsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsV0FBU3ZELFFBQVQsQ0FBa0JILENBQWxCLEVBQXFCO0FBQUU7QUFDckIsV0FBTyxZQUFXO0FBQ2hCLGFBQU9BLENBQVA7QUFDRCxLQUZEO0FBR0Q7O0FBRUQsU0FBT1AsT0FBUDtBQUNELEM7Ozs7Ozs7Ozs7O0FDclNILGdEIiwiZmlsZSI6ImJveG1vZGVsLWQzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiZDNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYm94bW9kZWwtZDNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkM1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYm94bW9kZWwtZDNcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZDNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JveG1vZGVsLmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBib3htb2RlbCgpIHtcbiAgICAvLyB2LjEuMS4wIHwgYnkgUGV0ZXIgSG9mbWFubiwgMDMvMjAxOVxuICAgIFxuICAgIGxldCBpc0NvbnRhaW5lcixcbiAgICAgICAgc3BhbkhlaWdodCxcbiAgICAgICAgZWRnZU1hcmdpbnMgPSBmYWxzZSxcbiAgICAgICAgdkFsaWduO1xuICAgIGxldCBwYWRkaW5nLFxuICAgICAgICBtYXJnaW4sXG4gICAgICAgIG1pbkNvbnRhaW5lclNpemUsXG4gICAgICAgIG1heExpbmVXaWR0aCxcbiAgICAgICAgbm9kZVNpemU7XG4gICAgY29uc3QgbGluZU1hcCA9IFtdO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNvbXB1dGUocm9vdCkgeyAgICBcbiAgICAgIHJvb3QuZWFjaEFmdGVyKHNjYWxlTm9kZSk7XG4gICAgICByb290LmVhY2hCZWZvcmUoc2NhbGVUb1BhcmVudCk7XG4gICAgICByb290LmVhY2hCZWZvcmUocG9zaXRpb25Ob2RlKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgIFxuICAgIGNvbXB1dGUudkFsaWduID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodkFsaWduID0geCwgY29tcHV0ZSkgOiB2QWxpZ247XG4gICAgfTtcbiAgICBjb21wdXRlLmVkZ2VNYXJnaW5zID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZWRnZU1hcmdpbnMgPSB4LCBjb21wdXRlKSA6IGVkZ2VNYXJnaW5zO1xuICAgIH07XG4gICAgY29tcHV0ZS5pc0NvbnRhaW5lciA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGlzQ29udGFpbmVyID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IGlzQ29udGFpbmVyO1xuICAgIH07XG4gICAgY29tcHV0ZS5zcGFuSGVpZ2h0ID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoc3BhbkhlaWdodCA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBzcGFuSGVpZ2h0O1xuICAgIH07XG4gICAgY29tcHV0ZS5wYWRkaW5nID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZyA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBwYWRkaW5nO1xuICAgIH07XG4gICAgY29tcHV0ZS5tYXJnaW4gPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChtYXJnaW4gPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogbWFyZ2luO1xuICAgIH07XG4gICAgY29tcHV0ZS5ub2RlU2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG5vZGVTaXplID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IG5vZGVTaXplO1xuICAgIH07XG4gICAgY29tcHV0ZS5taW5Db250YWluZXJTaXplID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobWluQ29udGFpbmVyU2l6ZSA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBtaW5Db250YWluZXJTaXplO1xuICAgIH07XG4gICAgY29tcHV0ZS5tYXhMaW5lV2lkdGggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChtYXhMaW5lV2lkdGggPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogbWF4TGluZVdpZHRoO1xuICAgIH07XG4gICAgXG4gICAgLy8gLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBNYWluIGZ1bmN0aW9uc1xuICAgIFxuICAgIGZ1bmN0aW9uIHNjYWxlTm9kZShub2RlKSB7XG4gICAgICAvLyBzZXQgc2l6ZSB0byBmaXhlZCBkZWZpbml0aW9uIGJ5IGRlZmF1bHRcbiAgICAgIGxldCB3ID0gbm9kZVNpemUobm9kZSkud2lkdGgsIGggPSBub2RlU2l6ZShub2RlKS5oZWlnaHQ7XG4gICAgICBcbiAgICAgIGlmIChpc0NvbnRhaW5lcihub2RlKSkge1xuICAgICAgICB3ID0gaCA9IDA7IC8vIGNvbnRhaW5lcnMgaGF2ZSBubyBmaXhlZCBzaXplLCBzbyB3ZSBudWxsaWZ5XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgIC8vIEZvciBub24tZW1wdHkgY29udGFpbmVycywgc2l6ZSBhbmQgbWFyZ2luIGJldHdlZW4gY2hpbGRyZW4gbXVzdCBiZSBzdW1tZWQgdXAuXG4gICAgICAgICAgLy8gVG8gZG8gdGhpcywgd2UgbmVlZCB0byBkZXRlcm1pbmUgd2hlbiBhIGxpbmUgb2YgY2hpbGRyZW4gd2lkdGhzL21hcmdpbnMgc3VycGFzc2VzIG1heExpbmVXaWR0aFxuICAgICAgICAgIC8vIGFuZCBpZiBzbywgYWRkIHRvIGFuIGFycmF5IHRoYXQgc3RvcmVzIHRoaXMgbGluZSB3aWR0aCBhcyB3ZWxsIGFzIHRoZSBpbnRlcnZhbCBvZiBjaGlsZCBpbmRpemVzXG4gICAgICAgICAgY29uc3QgbGluZXMgPSBnZW5lcmF0ZUxpbmVzKG5vZGUpO1xuICAgICAgICAgIC8vIG5vdyBsb29wIHRocm91Z2ggYWxsIGxpbmVzIGFuZCB0aGVpciBlbGVtZW50cyB0byBjYWxjdWxhdGUgdGhlIGxpbmUgaGVpZ2h0c1xuICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgbGluZXMubGVuZ3RoOyBsKyspIHtcbiAgICAgICAgICAgIGxpbmVzW2xdLmhlaWdodCA9IGNhbGNMaW5lSGVpZ2h0KG5vZGUsbGluZXMsbCk7IC8vIGFkZCBhcyBsaW5lIHByb3BlcnR5XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGFkZCBsaW5lIGFycmF5IHRvIGEgZ2xvYmFsIGxpbmUgbWFwXG4gICAgICAgICAgbGluZU1hcC5wdXNoKHtib3g6IG5vZGUsIGxpbmVzOiBsaW5lc30pO1xuICAgICAgICAgIC8vIGFkZCB0aGUgbGFyZ2VzdCBvZiBhbGwgbGluZSB3aWR0aHMgdG8gdGhlIHdpZHRoXG4gICAgICAgICAgdyArPSBkMy5tYXgobGluZXMsIGwgPT4gbC53aWR0aCk7XG4gICAgICAgICAgLy8gYWRkIHRoZSBzdW0gb2YgYWxsIGxpbmUgaGVpZ2h0cyB0byB0aGUgaGVpZ2h0XG4gICAgICAgICAgaCArPSBkMy5zdW0obGluZXMsIGwgPT4gbC5oZWlnaHQpOyAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gbm8gc3BlY2lmaWVkIHNpemUgPT4gY29tYmluZWQgcGFkZGluZyBPUiBtaW5TaXplIChpZiBwYWRkaW5ncyBzbWFsbGVyKVxuICAgICAgICB3ICs9IHBhZGRpbmcobm9kZSkubGVmdCArIHBhZGRpbmcobm9kZSkucmlnaHQ7XG4gICAgICAgIGggKz0gcGFkZGluZyhub2RlKS50b3AgKyBwYWRkaW5nKG5vZGUpLmJvdHRvbTtcbiAgICAgICAgdyA9IE1hdGgubWF4KHcsIG1pbkNvbnRhaW5lclNpemUobm9kZSkud2lkdGgpO1xuICAgICAgICBoID0gTWF0aC5tYXgoaCwgbWluQ29udGFpbmVyU2l6ZShub2RlKS5oZWlnaHQpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBmaW5hbGx5LCBhc3NpZ24gdy9oIHRvIG5vZGUgY29vcmRpbmF0ZXNcbiAgICAgIG5vZGUueDAgPSBub2RlLnkwID0gMDtcbiAgICAgIG5vZGUueDEgPSB3LCBub2RlLnkxID0gaDtcbiAgICAgIFxuICAgIH0gLy8gLS0tLS0tIGVuZCBzY2FsZU5vZGUoKSAtLS0tLS0tXG4gICAgXG4gICAgZnVuY3Rpb24gc2NhbGVUb1BhcmVudChub2RlKSB7XG4gICAgICAvLyBzcGFuSGVpZ2h0IGFuZCBvdGhlciBzY2FsaW5nIG9wZXJhdGlvbnMgdGhhdCByZWZlciB0byBjb250YWluZXIvbGluZSBzaXplXG4gICAgICAvLyBjYW4gb25seSBiZSByZWFsaXplZCBhZnRlciBhbGwgY29udGFpbmVyIHNjYWxpbmcgaGFzIGJlZW4gZG9uZVxuICAgICAgbGV0IGggPSBub2RlLnkxO1xuICAgICAgXG4gICAgICAvLyBpZiBlbGVtZW50IHNwYW5zIGhlaWdodCBvZiBpdHMgY29udGFpbmVyL2xpbmUsIGNhbGN1bGF0ZSBuZXcgaGVpZ2h0XG4gICAgICBpZiAobm9kZS5wYXJlbnQgJiYgc3BhbkhlaWdodChub2RlKSkge1xuICAgICAgICBoID0gZ2V0T3duTGluZShub2RlKS5oZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwYXJlbnRMaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgICAgY29uc3QgbGluZUluZGV4ID0gZ2V0TGluZUluZGV4KG5vZGUsIHBhcmVudExpbmVzKTtcbiAgXG4gICAgICAgIGggLT0gIWVkZ2VNYXJnaW5zICYmIGxpbmVJbmRleCA9PT0gMCA/IDAgOiBtYXJnaW4obm9kZSkudG9wO1xuICAgICAgICBoIC09ICFlZGdlTWFyZ2lucyAmJiBsaW5lSW5kZXggPT09IChwYXJlbnRMaW5lcy5sZW5ndGgtMSkgPyAwIDogbWFyZ2luKG5vZGUpLmJvdHRvbTtcbiAgICAgICAgXG4gICAgICAgIC8vIG5vdyBhZGp1c3QgdGhlIGxpbmUgaGVpZ2h0cyBhY2NvcmRpbmdseSBieSBkaXN0cmlidXRpbmcgdGhlIGV4Y2VzcyBoZWlnaHRcbiAgICAgICAgY29uc3QgaGVpZ2h0RGlmZiA9IGggLSBub2RlLnkxO1xuICAgICAgICBjb25zb2xlLmxvZygneTE6Jytub2RlLnkxICsgJyBoOicraCsnIGRpZmY6JytoZWlnaHREaWZmKTtcbiAgICAgICAgaWYgKGlzQ29udGFpbmVyKG5vZGUpICYmIG5vZGUuY2hpbGRyZW4gJiYgaGVpZ2h0RGlmZiA+IDApIHtcbiAgICAgICAgICBjb25zdCBsaW5lcyA9IGdldExpbmVzKG5vZGUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmVzKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBleGNlc3MgPSBoZWlnaHREaWZmIC8gbGluZXMubGVuZ3RoO1xuICAgICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgICAgbGluZS5oZWlnaHQgKz0gZXhjZXNzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBub2RlLnkxID0gaDtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcG9zaXRpb25Ob2RlKG5vZGUpIHsgICAgXG4gICAgICBjb25zdCB3ID0gbm9kZS54MSAtIG5vZGUueDA7XG4gICAgICBjb25zdCBoID0gbm9kZS55MSAtIG5vZGUueTA7XG4gICAgICBcbiAgICAgIGlmIChub2RlLnBhcmVudCkgeyAgICAgIFxuICAgICAgICAvLyB5LXBvc2l0aW9uIGNoaWxkcmVuIHJlbGF0aXZlIHRvIHBhcmVudCBjb250YWluZXIgeSArIHBhZGRpbmdcbiAgICAgICAgbm9kZS55MCA9IG5vZGUucGFyZW50LnkwICsgcGFkZGluZyhub2RlLnBhcmVudCkudG9wO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgb3JkZXIgPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgICBpZiAob3JkZXIgPT09IDAgfHwgbGluZUJyZWFrKG5vZGUpKSB7XG4gICAgICAgICAgLy8geC1wb3NpdGlvbiAxLiBjaGlsZHJlbiAob2YgbGluZSkgcmVsYXRpdmUgdG8gcGFyZW50IGNvbnRhaW5lciB4ICsgcGFkZGluZ1xuICAgICAgICAgIG5vZGUueDAgKz0gbm9kZS5wYXJlbnQueDAgKyBwYWRkaW5nKG5vZGUucGFyZW50KS5sZWZ0O1xuICAgICAgICAgIGlmIChlZGdlTWFyZ2lucykgbm9kZS54MCArPSBtYXJnaW4obm9kZSkubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBhbGwgc3Vic2VxdWVudCBjaGlsZHJlbiBjYW4gYmUgeC1wb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHRoZWlyIGxlZnQgbmVpZ2hib3VyXG4gICAgICAgICAgY29uc3QgbmVpZ2hib3VyTGVmdCA9IG5vZGUucGFyZW50LmNoaWxkcmVuW29yZGVyLTFdO1xuICAgICAgICAgIG5vZGUueDAgPSBuZWlnaGJvdXJMZWZ0LngxO1xuICAgICAgICAgIC8vIG1hcmdpbnMgb2YgYm90aCBjaGlsZHJlbiBhcmUgY29sbGFwc2VkIHRvIHRoZSBtYXggdmFsdWVcbiAgICAgICAgICBub2RlLngwICs9IE1hdGgubWF4KCBtYXJnaW4obmVpZ2hib3VyTGVmdCkucmlnaHQsIG1hcmdpbihub2RlKS5sZWZ0ICk7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gaWYgbm8gcGFyZW50LCBwb3NpdGlvbiBpcyBkZXBlbmRlbnQgb25seSBvbiB2ZXJ0aWNhbCBhbGlnbm1lbnRcbiAgICAgIGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKHZBbGlnbikge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICBub2RlLnkwID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgICBub2RlLnkwID0gaC8yO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIG5vZGUueTAgPSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gc2hpZnQgaGVpZ2h0IGluIG1pZGRsZSBhbmQgYm90dG9tIGFsaWdubWVudHNcbiAgICAgIC8vIGZvciBjaGlsZHJlbiwgYWRkIHZlcnRpY2FsIG1hcmdpbnMgYW5kIGFsc28gc2hpZnQgdG8gdGhlIHktcG9zaXRpb24gb2YgdGhlaXIgbGluZVxuICAgICAgc3dpdGNoICh2QWxpZ24pIHtcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJbmRleCA9IGdldExpbmVJbmRleChub2RlKTtcbiAgICAgICAgICAgIG5vZGUueTAgKz0gIWVkZ2VNYXJnaW5zICYmIGxpbmVJbmRleCA9PT0gMCA/IDAgOiBtYXJnaW4obm9kZSkudG9wO1xuICAgICAgICAgICAgbm9kZS55MCArPSBjYWxjTGluZVNoaWZ0KG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWlkZGxlJzpcbiAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIG5vZGUueTAgKz0gY2FsY0xpbmVTaGlmdChub2RlKSArIGdldE93bkxpbmUobm9kZSkuaGVpZ2h0LzI7XG4gICAgICAgICAgbm9kZS55MCAtPSBoLzI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBsaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KSwgbGluZUluZGV4ID0gZ2V0TGluZUluZGV4KG5vZGUsIGxpbmVzKTtcbiAgICAgICAgICAgIG5vZGUueTAgLT0gIWVkZ2VNYXJnaW5zICYmIGxpbmVJbmRleCA9PT0gKGxpbmVzLmxlbmd0aC0xKSA/IDAgOiBtYXJnaW4obm9kZSkuYm90dG9tO1xuICAgICAgICAgICAgbm9kZS55MCArPSBjYWxjTGluZVNoaWZ0KG5vZGUsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBub2RlLnkwIC09IGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9IFxuICAgICAgXG4gICAgICAvLyBsYXN0LCBhc3NpZ24gdy9oIHNoaWZ0IHRvIGNvb3JkaW5hdGVzXG4gICAgICBub2RlLngxID0gbm9kZS54MCArIHc7IFxuICAgICAgbm9kZS55MSA9IG5vZGUueTAgKyBoO1xuICAgICAgXG4gICAgfSAvLyAtLS0tLS0gZW5kIHBvc2l0aW9uTm9kZSgpIC0tLS0tLS1cbiAgICBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRXNzZW50aWFsIGZ1bmN0aW9uc1xuICAgIFxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlTGluZXMobm9kZSkge1xuICAgICAgY29uc3QgbGluZXMgPSBbXTtcbiAgICAgIGxldCBsaW5lV2lkdGggPSAwLCBmbGV4SGVpZ2h0ID0gZmFsc2UsIHN0YXJ0SW5kZXggPSAwLCBuZXdMaW5lID0gdHJ1ZTtcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCggKGNoaWxkLGkpID0+IHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBvZiB0aGUgY2hpbGRyZW4gaW4gYSBsaW5lIGhhcyBhIHByb3BlcnR5IHRvIHNwYW4gY29udGFpbmVyIGhlaWdodFxuICAgICAgICBpZiAoc3BhbkhlaWdodChjaGlsZCkgJiYgIWZsZXhIZWlnaHQpIGZsZXhIZWlnaHQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgLy8gYWRkIHdpZHRoIG9mIGVhY2ggY2hpbGRcbiAgICAgICAgbGluZVdpZHRoICs9IChjaGlsZC54MSAtIGNoaWxkLngwKTtcbiAgXG4gICAgICAgIC8vIGFkZCBsYXJnZXN0IG9mIHRoZSB0d28gbWFyZ2lucyBiZXR3ZWVuIGNoaWxkcmVuIGFuZCBsZWZ0IG91dGVyIG1hcmdpbiAoaWYgZWRnZU1hcmdpbnMgdHJ1ZSlcbiAgICAgICAgbGluZVdpZHRoICs9IG5ld0xpbmUgPyAoZWRnZU1hcmdpbnMgPyBtYXJnaW4oY2hpbGQpLmxlZnQgOiAwKSA6IFxuICAgICAgICBNYXRoLm1heChtYXJnaW4oY2hpbGQpLmxlZnQsIG1hcmdpbihub2RlLmNoaWxkcmVuW2ktMV0pLnJpZ2h0KTtcbiAgICAgICAgLy8gcmlnaHQgbWFyZ2luIGlzIG9ubHkgYWRkZWQgYXQgdGhlIGVuZCBvZiBhIGxpbmUgKGlmIGVkZ2VNYXJnaW5zIHRydWUpXG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gZWRnZU1hcmdpbnMgPyBtYXJnaW4oY2hpbGQpLnJpZ2h0IDogMDtcbiAgICAgICAgaWYgKGxpbmVXaWR0aCArIG1hcmdpblJpZ2h0ID4gbWF4TGluZVdpZHRoKG5vZGUpIHx8wqBpID09PSBub2RlLmNoaWxkcmVuLmxlbmd0aC0xKSBcbiAgICAgICAgICBsaW5lV2lkdGggKz0gbWFyZ2luUmlnaHQ7XG4gIFxuICAgICAgICAvLyBsaW5lIGJyZWFrcyBpZiBtYXhMaW5lV2lkdGggaXMgc3VycGFzc2VkIG9yIGl0J3MgdGhlIGxhc3Qgb25lXG4gICAgICAgIGlmIChsaW5lV2lkdGggPiBtYXhMaW5lV2lkdGgobm9kZSkgfHzCoGkgPT09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTEpIHtcbiAgICAgICAgICAvLyBpZiB0cnVlLCBhZGQgY2hpbGQgaW50ZXJ2YWwgdG8gbGluZXMgYXJyYXkgYW5kIHNhdmUgbGluZSB3aWR0aFxuICAgICAgICAgIGxpbmVzLnB1c2goe2Zyb206IHN0YXJ0SW5kZXgsIHRvOiBpLCB3aWR0aDogbGluZVdpZHRoLCBmbGV4SGVpZ2h0OiBmbGV4SGVpZ2h0fSk7XG4gICAgICAgICAgLy8gaWYgbm90IGxhc3QgbGluZSwgcmVzZXQgdmFyaWFibGVzXG4gICAgICAgICAgaWYgKGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aC0xKSBzdGFydEluZGV4ID0gaSsxLCBsaW5lV2lkdGggPSAwLCBmbGV4SGVpZ2h0ID0gZmFsc2UsIG5ld0xpbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgbmV3TGluZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGluZXM7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGNMaW5lSGVpZ2h0KG5vZGUsIGxpbmVzLCBsaW5lSW5kZXgpIHtcbiAgICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lSW5kZXhdO1xuICAgICAgbGV0IGxpbmVIZWlnaHQgPSAwO1xuICAgICAgXG4gICAgICBmb3IgKGxldCBpID0gbGluZS5mcm9tOyBpIDw9IGxpbmUudG87IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IG5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcmF3IGNoaWxkcmVuIGhlaWdodFxuICAgICAgICBjb25zdCBjaGlsZEggPSBjaGlsZC55MSAtIGNoaWxkLnkwO1xuICAgICAgICAvLyBhZGQgdmVydGljYWwgbWFyZ2lucyBiZXR3ZWVuIGNoaWxkcmVuIGFuZCAoaWYgZWRnZU1hcmdpbnMgdHJ1ZSkgb3V0ZXIgdmVydGljYWwgbWFyZ2luc1xuICAgICAgICAvLyBub3RlOiBjb2xsYXBzaW5nIGluZGl2aWR1YWwgdmVydGljYWwgbWFyZ2lucyBpcyB0b28gbWVzc3kgYW5kIGNvbXBsaWNhdGVkLCBzbyBJIGxlZnQgdGhpcyBvdXRcbiAgICAgICAgY29uc3QgbWFyZ2luc1ZlcnQgPSAoIWVkZ2VNYXJnaW5zICYmIGxpbmVJbmRleD09PTAgPyAwIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbihjaGlsZCkudG9wKSArXG4gICAgICAgICAgICAgICghZWRnZU1hcmdpbnMgJiYgbGluZUluZGV4PT09KGxpbmVzLmxlbmd0aC0xKSA/IDAgOiBcbiAgICAgICAgICAgICAgIG1hcmdpbihjaGlsZCkuYm90dG9tKTtcbiAgICAgICAgLy8gc2V0IGxpbmUgaGVpZ2h0IGlmIGl0IHN1cnBhc3NlcyBsaW5lIGhlaWdodCBvZiBwcmV2aW91cyBjaGlsZHNcbiAgICAgICAgaWYgKGNoaWxkSCArIG1hcmdpbnNWZXJ0ID4gbGluZUhlaWdodCkgbGluZUhlaWdodCA9IGNoaWxkSCArIG1hcmdpbnNWZXJ0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxpbmVIZWlnaHQ7XG4gICAgfVxuICAgIFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIZWxwZXIgZnVuY3Rpb25zXG4gICAgICBcbiAgICBmdW5jdGlvbiBnZXRMaW5lcyhub2RlKSB7XG4gICAgICByZXR1cm4gbGluZU1hcFtsaW5lTWFwLmZpbmRJbmRleChtID0+IG0uYm94ID09PSBub2RlKV0ubGluZXM7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldExpbmVJbmRleChub2RlLCBwYXJlbnRMaW5lcykge1xuICAgICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gKGFyZ3VtZW50cy5sZW5ndGggPiAxKSA/IHBhcmVudExpbmVzIDogZ2V0TGluZXMobm9kZS5wYXJlbnQpO1xuICAgICAgICBjb25zdCBpbmRleCA9IG5vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2Yobm9kZSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbGluZXMuZmluZEluZGV4KGwgPT4geyByZXR1cm4gKGluZGV4ID49IGwuZnJvbSkgJiYgKGluZGV4IDw9IGwudG8pOyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBnZXRPd25MaW5lKG5vZGUpIHtcbiAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZS5wYXJlbnQpO1xuICAgICAgY29uc3QgbGluZUluZGV4ID0gZ2V0TGluZUluZGV4KG5vZGUsIGxpbmVzKTtcbiAgICAgIHJldHVybiBsaW5lc1tsaW5lSW5kZXhdO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBjYWxjTGluZVNoaWZ0KG5vZGUsIGluY2x1ZGUgPSBmYWxzZSkge1xuICAgICAgaWYgKG5vZGUucGFyZW50KSB7ICAgICAgXG4gICAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZS5wYXJlbnQpO1xuICAgICAgICBjb25zdCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgICAgICBjb25zdCBsaW5lVG8gPSBpbmNsdWRlID8gbGluZUluZGV4IDogbGluZUluZGV4LTE7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZDMuc3VtKGxpbmVzLmZpbHRlciggKGwsaSkgPT4gKGkgPD0gbGluZVRvKSApLCBsID0+IGwuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBsaW5lQnJlYWsobm9kZSkge1xuICAgICAgaWYgKG5vZGUucGFyZW50KSB7IFxuICAgICAgICBjb25zdCBpbmRleCA9IG5vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2Yobm9kZSk7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZS5wYXJlbnQpO1xuICAgICAgICBjb25zdCBsaW5lID0gbGluZXNbZ2V0TGluZUluZGV4KG5vZGUsIGxpbmVzKV07XG4gICAgICAgIHJldHVybiBsaW5lLmZyb20gPT09IGluZGV4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBjb25zdGFudCh4KSB7IC8vIGZyb20gRDMgc291cmNlXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgICAgfTtcbiAgICB9XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICByZXR1cm4gY29tcHV0ZTtcbiAgfSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9kM19fOyJdLCJzb3VyY2VSb290IjoiIn0=