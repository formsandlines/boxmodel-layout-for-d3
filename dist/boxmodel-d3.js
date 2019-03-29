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
  // v.1.2.1 | by Peter Hofmann, 03/2019
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
      h -= !edgeMargins(node) && lineIndex === 0 ? 0 : margin(node).top;
      h -= !edgeMargins(node) && lineIndex === parentLines.length - 1 ? 0 : margin(node).bottom; // now adjust the line heights accordingly by distributing the excess height

      var heightDiff = h - node.y1;

      if (isContainer(node) && node.children && heightDiff > 0) {
        var lines = getLines(node);
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
        if (edgeMargins(node)) node.x0 += margin(node).left;
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
          node.y0 += !edgeMargins(node) && lineIndex === 0 ? 0 : margin(node).top;
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

          node.y0 -= !edgeMargins(node) && _lineIndex === lines.length - 1 ? 0 : margin(node).bottom;
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

      lineWidth += newLine ? edgeMargins(child) ? margin(child).left : 0 : Math.max(margin(child).left, margin(node.children[i - 1]).right); // right margin is only added at the end of a line (if edgeMargins true)

      var marginRight = edgeMargins(child) ? margin(child).right : 0;
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

      var marginsVert = (!edgeMargins(child) && lineIndex === 0 ? 0 : margin(child).top) + (!edgeMargins(child) && lineIndex === lines.length - 1 ? 0 : margin(child).bottom); // set line height if it surpasses line height of previous childs

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3htb2RlbC1kMy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvLi9zcmMvYm94bW9kZWwuanMiLCJ3ZWJwYWNrOi8vYm94bW9kZWwtZDMvZXh0ZXJuYWwgXCJkM1wiIl0sIm5hbWVzIjpbImJveG1vZGVsIiwiaXNDb250YWluZXIiLCJzcGFuSGVpZ2h0IiwiZWRnZU1hcmdpbnMiLCJ2QWxpZ24iLCJwYWRkaW5nIiwibWFyZ2luIiwibWluQ29udGFpbmVyU2l6ZSIsIm1heExpbmVXaWR0aCIsIm5vZGVTaXplIiwibGluZU1hcCIsImNvbXB1dGUiLCJyb290IiwiZWFjaEFmdGVyIiwic2NhbGVOb2RlIiwiZWFjaEJlZm9yZSIsInNjYWxlVG9QYXJlbnQiLCJwb3NpdGlvbk5vZGUiLCJ4IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY29uc3RhbnQiLCJub2RlIiwidyIsIndpZHRoIiwiaCIsImhlaWdodCIsImNoaWxkcmVuIiwibGluZXMiLCJnZW5lcmF0ZUxpbmVzIiwibCIsImNhbGNMaW5lSGVpZ2h0IiwicHVzaCIsImJveCIsImQzIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiTWF0aCIsIm1heCIsIngwIiwieTAiLCJ4MSIsInkxIiwicGFyZW50IiwiZ2V0T3duTGluZSIsInBhcmVudExpbmVzIiwiZ2V0TGluZXMiLCJsaW5lSW5kZXgiLCJnZXRMaW5lSW5kZXgiLCJoZWlnaHREaWZmIiwiZXhjZXNzIiwibGluZSIsIm9yZGVyIiwiaW5kZXhPZiIsImxpbmVCcmVhayIsIm5laWdoYm91ckxlZnQiLCJjYWxjTGluZVNoaWZ0IiwibGluZVdpZHRoIiwiZmxleEhlaWdodCIsInN0YXJ0SW5kZXgiLCJuZXdMaW5lIiwiZm9yRWFjaCIsImNoaWxkIiwiaSIsIm1hcmdpblJpZ2h0IiwiZnJvbSIsInRvIiwibGluZUhlaWdodCIsImNoaWxkSCIsIm1hcmdpbnNWZXJ0IiwiZmluZEluZGV4IiwibSIsImluZGV4IiwiaW5jbHVkZSIsImxpbmVUbyIsImZpbHRlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVlLFNBQVNBLFFBQVQsR0FBb0I7QUFDakM7QUFFQSxNQUFJQyxXQUFKLEVBQ0lDLFVBREosRUFFSUMsV0FGSixFQUdJQyxNQUhKO0FBSUEsTUFBSUMsT0FBSixFQUNJQyxNQURKLEVBRUlDLGdCQUZKLEVBR0lDLFlBSEosRUFJSUMsUUFKSjtBQUtBLE1BQU1DLE9BQU8sR0FBRyxFQUFoQjs7QUFFQSxXQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNyQkEsUUFBSSxDQUFDQyxT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bC1kMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImQzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJveG1vZGVsLWQzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJveG1vZGVsLWQzXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0pO1xufSkod2luZG93LCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2QzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9ib3htb2RlbC5qc1wiKTtcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYm94bW9kZWwoKSB7XG4gIC8vIHYuMS4yLjEgfCBieSBQZXRlciBIb2ZtYW5uLCAwMy8yMDE5XG4gIFxuICBsZXQgaXNDb250YWluZXIsXG4gICAgICBzcGFuSGVpZ2h0LFxuICAgICAgZWRnZU1hcmdpbnMsXG4gICAgICB2QWxpZ247XG4gIGxldCBwYWRkaW5nLFxuICAgICAgbWFyZ2luLFxuICAgICAgbWluQ29udGFpbmVyU2l6ZSxcbiAgICAgIG1heExpbmVXaWR0aCxcbiAgICAgIG5vZGVTaXplO1xuICBjb25zdCBsaW5lTWFwID0gW107XG4gIFxuICBmdW5jdGlvbiBjb21wdXRlKHJvb3QpIHsgICAgXG4gICAgcm9vdC5lYWNoQWZ0ZXIoc2NhbGVOb2RlKTtcbiAgICByb290LmVhY2hCZWZvcmUoc2NhbGVUb1BhcmVudCk7XG4gICAgcm9vdC5lYWNoQmVmb3JlKHBvc2l0aW9uTm9kZSk7XG4gICAgXG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cbiAgXG4gIGNvbXB1dGUudkFsaWduID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHZBbGlnbiA9IHgsIGNvbXB1dGUpIDogdkFsaWduO1xuICB9O1xuICBjb21wdXRlLmVkZ2VNYXJnaW5zID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGVkZ2VNYXJnaW5zID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IGVkZ2VNYXJnaW5zO1xuICB9O1xuICBjb21wdXRlLmlzQ29udGFpbmVyID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGlzQ29udGFpbmVyID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IGlzQ29udGFpbmVyO1xuICB9O1xuICBjb21wdXRlLnNwYW5IZWlnaHQgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoc3BhbkhlaWdodCA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBzcGFuSGVpZ2h0O1xuICB9O1xuICBjb21wdXRlLnBhZGRpbmcgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZyA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBwYWRkaW5nO1xuICB9O1xuICBjb21wdXRlLm1hcmdpbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChtYXJnaW4gPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogbWFyZ2luO1xuICB9O1xuICBjb21wdXRlLm5vZGVTaXplID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG5vZGVTaXplID0gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgPyB4IDogY29uc3RhbnQoK3gpLCBjb21wdXRlKSA6IG5vZGVTaXplO1xuICB9O1xuICBjb21wdXRlLm1pbkNvbnRhaW5lclNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobWluQ29udGFpbmVyU2l6ZSA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCA6IGNvbnN0YW50KCt4KSwgY29tcHV0ZSkgOiBtaW5Db250YWluZXJTaXplO1xuICB9O1xuICBjb21wdXRlLm1heExpbmVXaWR0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChtYXhMaW5lV2lkdGggPSB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyA/IHggOiBjb25zdGFudCgreCksIGNvbXB1dGUpIDogbWF4TGluZVdpZHRoO1xuICB9O1xuICBcbiAgLy8gLS0tLS0tLS0tLS0tLS1cbiAgLy8gTWFpbiBmdW5jdGlvbnNcbiAgXG4gIGZ1bmN0aW9uIHNjYWxlTm9kZShub2RlKSB7XG4gICAgLy8gc2V0IHNpemUgdG8gZml4ZWQgZGVmaW5pdGlvbiBieSBkZWZhdWx0XG4gICAgbGV0IHcgPSBub2RlU2l6ZShub2RlKS53aWR0aCwgaCA9IG5vZGVTaXplKG5vZGUpLmhlaWdodDtcbiAgICBcbiAgICBpZiAoaXNDb250YWluZXIobm9kZSkpIHtcbiAgICAgIHcgPSBoID0gMDsgLy8gY29udGFpbmVycyBoYXZlIG5vIGZpeGVkIHNpemUsIHNvIHdlIG51bGxpZnlcbiAgICAgIFxuICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgLy8gRm9yIG5vbi1lbXB0eSBjb250YWluZXJzLCBzaXplIGFuZCBtYXJnaW4gYmV0d2VlbiBjaGlsZHJlbiBtdXN0IGJlIHN1bW1lZCB1cC5cbiAgICAgICAgLy8gVG8gZG8gdGhpcywgd2UgbmVlZCB0byBkZXRlcm1pbmUgd2hlbiBhIGxpbmUgb2YgY2hpbGRyZW4gd2lkdGhzL21hcmdpbnMgc3VycGFzc2VzIG1heExpbmVXaWR0aFxuICAgICAgICAvLyBhbmQgaWYgc28sIGFkZCB0byBhbiBhcnJheSB0aGF0IHN0b3JlcyB0aGlzIGxpbmUgd2lkdGggYXMgd2VsbCBhcyB0aGUgaW50ZXJ2YWwgb2YgY2hpbGQgaW5kaXplc1xuICAgICAgICBjb25zdCBsaW5lcyA9IGdlbmVyYXRlTGluZXMobm9kZSk7XG4gICAgICAgIC8vIG5vdyBsb29wIHRocm91Z2ggYWxsIGxpbmVzIGFuZCB0aGVpciBlbGVtZW50cyB0byBjYWxjdWxhdGUgdGhlIGxpbmUgaGVpZ2h0c1xuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IGxpbmVzLmxlbmd0aDsgbCsrKSB7XG4gICAgICAgICAgbGluZXNbbF0uaGVpZ2h0ID0gY2FsY0xpbmVIZWlnaHQobm9kZSxsaW5lcyxsKTsgLy8gYWRkIGFzIGxpbmUgcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGQgbGluZSBhcnJheSB0byBhIGdsb2JhbCBsaW5lIG1hcFxuICAgICAgICBsaW5lTWFwLnB1c2goe2JveDogbm9kZSwgbGluZXM6IGxpbmVzfSk7XG4gICAgICAgIC8vIGFkZCB0aGUgbGFyZ2VzdCBvZiBhbGwgbGluZSB3aWR0aHMgdG8gdGhlIHdpZHRoXG4gICAgICAgIHcgKz0gZDMubWF4KGxpbmVzLCBsID0+IGwud2lkdGgpO1xuICAgICAgICAvLyBhZGQgdGhlIHN1bSBvZiBhbGwgbGluZSBoZWlnaHRzIHRvIHRoZSBoZWlnaHRcbiAgICAgICAgaCArPSBkMy5zdW0obGluZXMsIGwgPT4gbC5oZWlnaHQpOyAgICAgICAgXG4gICAgICB9XG4gICAgICAvLyBubyBzcGVjaWZpZWQgc2l6ZSA9PiBjb21iaW5lZCBwYWRkaW5nIE9SIG1pblNpemUgKGlmIHBhZGRpbmdzIHNtYWxsZXIpXG4gICAgICB3ICs9IHBhZGRpbmcobm9kZSkubGVmdCArIHBhZGRpbmcobm9kZSkucmlnaHQ7XG4gICAgICBoICs9IHBhZGRpbmcobm9kZSkudG9wICsgcGFkZGluZyhub2RlKS5ib3R0b207XG4gICAgICB3ID0gTWF0aC5tYXgodywgbWluQ29udGFpbmVyU2l6ZShub2RlKS53aWR0aCk7XG4gICAgICBoID0gTWF0aC5tYXgoaCwgbWluQ29udGFpbmVyU2l6ZShub2RlKS5oZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICAvLyBmaW5hbGx5LCBhc3NpZ24gdy9oIHRvIG5vZGUgY29vcmRpbmF0ZXNcbiAgICBub2RlLngwID0gbm9kZS55MCA9IDA7XG4gICAgbm9kZS54MSA9IHcsIG5vZGUueTEgPSBoO1xuICAgIFxuICB9IC8vIC0tLS0tLSBlbmQgc2NhbGVOb2RlKCkgLS0tLS0tLVxuICBcbiAgZnVuY3Rpb24gc2NhbGVUb1BhcmVudChub2RlKSB7XG4gICAgLy8gc3BhbkhlaWdodCBhbmQgb3RoZXIgc2NhbGluZyBvcGVyYXRpb25zIHRoYXQgcmVmZXIgdG8gY29udGFpbmVyL2xpbmUgc2l6ZVxuICAgIC8vIGNhbiBvbmx5IGJlIHJlYWxpemVkIGFmdGVyIGFsbCBjb250YWluZXIgc2NhbGluZyBoYXMgYmVlbiBkb25lXG4gICAgbGV0IGggPSBub2RlLnkxO1xuICAgIFxuICAgIC8vIGlmIGVsZW1lbnQgc3BhbnMgaGVpZ2h0IG9mIGl0cyBjb250YWluZXIvbGluZSwgY2FsY3VsYXRlIG5ldyBoZWlnaHRcbiAgICBpZiAobm9kZS5wYXJlbnQgJiYgc3BhbkhlaWdodChub2RlKSkge1xuICAgICAgaCA9IGdldE93bkxpbmUobm9kZSkuaGVpZ2h0O1xuICAgICAgXG4gICAgICBjb25zdCBwYXJlbnRMaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgIGNvbnN0IGxpbmVJbmRleCA9IGdldExpbmVJbmRleChub2RlLCBwYXJlbnRMaW5lcyk7XG5cbiAgICAgIGggLT0gIWVkZ2VNYXJnaW5zKG5vZGUpICYmIGxpbmVJbmRleCA9PT0gMCA/IDAgOiBtYXJnaW4obm9kZSkudG9wO1xuICAgICAgaCAtPSAhZWRnZU1hcmdpbnMobm9kZSkgJiYgbGluZUluZGV4ID09PSAocGFyZW50TGluZXMubGVuZ3RoLTEpID8gMCA6IG1hcmdpbihub2RlKS5ib3R0b207XG4gICAgICBcbiAgICAgIC8vIG5vdyBhZGp1c3QgdGhlIGxpbmUgaGVpZ2h0cyBhY2NvcmRpbmdseSBieSBkaXN0cmlidXRpbmcgdGhlIGV4Y2VzcyBoZWlnaHRcbiAgICAgIGNvbnN0IGhlaWdodERpZmYgPSBoIC0gbm9kZS55MTtcbiAgICAgIGlmIChpc0NvbnRhaW5lcihub2RlKSAmJiBub2RlLmNoaWxkcmVuICYmIGhlaWdodERpZmYgPiAwKSB7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBleGNlc3MgPSBoZWlnaHREaWZmIC8gbGluZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgICBsaW5lLmhlaWdodCArPSBleGNlc3M7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbm9kZS55MSA9IGg7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHBvc2l0aW9uTm9kZShub2RlKSB7ICAgIFxuICAgIGNvbnN0IHcgPSBub2RlLngxIC0gbm9kZS54MDtcbiAgICBjb25zdCBoID0gbm9kZS55MSAtIG5vZGUueTA7XG4gICAgXG4gICAgaWYgKG5vZGUucGFyZW50KSB7ICAgICAgXG4gICAgICAvLyB5LXBvc2l0aW9uIGNoaWxkcmVuIHJlbGF0aXZlIHRvIHBhcmVudCBjb250YWluZXIgeSArIHBhZGRpbmdcbiAgICAgIG5vZGUueTAgPSBub2RlLnBhcmVudC55MCArIHBhZGRpbmcobm9kZS5wYXJlbnQpLnRvcDtcbiAgICAgIFxuICAgICAgY29uc3Qgb3JkZXIgPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgaWYgKG9yZGVyID09PSAwIHx8IGxpbmVCcmVhayhub2RlKSkge1xuICAgICAgICAvLyB4LXBvc2l0aW9uIDEuIGNoaWxkcmVuIChvZiBsaW5lKSByZWxhdGl2ZSB0byBwYXJlbnQgY29udGFpbmVyIHggKyBwYWRkaW5nXG4gICAgICAgIG5vZGUueDAgKz0gbm9kZS5wYXJlbnQueDAgKyBwYWRkaW5nKG5vZGUucGFyZW50KS5sZWZ0O1xuICAgICAgICBpZiAoZWRnZU1hcmdpbnMobm9kZSkpIG5vZGUueDAgKz0gbWFyZ2luKG5vZGUpLmxlZnQ7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxsIHN1YnNlcXVlbnQgY2hpbGRyZW4gY2FuIGJlIHgtcG9zaXRpb25lZCByZWxhdGl2ZSB0byB0aGVpciBsZWZ0IG5laWdoYm91clxuICAgICAgICBjb25zdCBuZWlnaGJvdXJMZWZ0ID0gbm9kZS5wYXJlbnQuY2hpbGRyZW5bb3JkZXItMV07XG4gICAgICAgIG5vZGUueDAgPSBuZWlnaGJvdXJMZWZ0LngxO1xuICAgICAgICAvLyBtYXJnaW5zIG9mIGJvdGggY2hpbGRyZW4gYXJlIGNvbGxhcHNlZCB0byB0aGUgbWF4IHZhbHVlXG4gICAgICAgIG5vZGUueDAgKz0gTWF0aC5tYXgoIG1hcmdpbihuZWlnaGJvdXJMZWZ0KS5yaWdodCwgbWFyZ2luKG5vZGUpLmxlZnQgKTtcbiAgICAgIH1cbiAgICB9IC8vIGlmIG5vIHBhcmVudCwgcG9zaXRpb24gaXMgZGVwZW5kZW50IG9ubHkgb24gdmVydGljYWwgYWxpZ25tZW50XG4gICAgZWxzZSB7XG4gICAgICBzd2l0Y2ggKHZBbGlnbikge1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIG5vZGUueTAgPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICAgIG5vZGUueTAgPSBoLzI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgbm9kZS55MCA9IGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIHNoaWZ0IGhlaWdodCBpbiBtaWRkbGUgYW5kIGJvdHRvbSBhbGlnbm1lbnRzXG4gICAgLy8gZm9yIGNoaWxkcmVuLCBhZGQgdmVydGljYWwgbWFyZ2lucyBhbmQgYWxzbyBzaGlmdCB0byB0aGUgeS1wb3NpdGlvbiBvZiB0aGVpciBsaW5lXG4gICAgc3dpdGNoICh2QWxpZ24pIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgICAgIGNvbnN0IGxpbmVJbmRleCA9IGdldExpbmVJbmRleChub2RlKTtcbiAgICAgICAgICBub2RlLnkwICs9ICFlZGdlTWFyZ2lucyhub2RlKSAmJiBsaW5lSW5kZXggPT09IDAgPyAwIDogbWFyZ2luKG5vZGUpLnRvcDtcbiAgICAgICAgICBub2RlLnkwICs9IGNhbGNMaW5lU2hpZnQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICBpZiAobm9kZS5wYXJlbnQpIG5vZGUueTAgKz0gY2FsY0xpbmVTaGlmdChub2RlKSArIGdldE93bkxpbmUobm9kZSkuaGVpZ2h0LzI7XG4gICAgICAgIG5vZGUueTAgLT0gaC8yO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgICAgIGNvbnN0IGxpbmVzID0gZ2V0TGluZXMobm9kZS5wYXJlbnQpLCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgICAgICAgIG5vZGUueTAgLT0gIWVkZ2VNYXJnaW5zKG5vZGUpICYmIGxpbmVJbmRleCA9PT0gKGxpbmVzLmxlbmd0aC0xKSA/IDAgOiBtYXJnaW4obm9kZSkuYm90dG9tO1xuICAgICAgICAgIG5vZGUueTAgKz0gY2FsY0xpbmVTaGlmdChub2RlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnkwIC09IGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH0gXG4gICAgXG4gICAgLy8gbGFzdCwgYXNzaWduIHcvaCBzaGlmdCB0byBjb29yZGluYXRlc1xuICAgIG5vZGUueDEgPSBub2RlLngwICsgdzsgXG4gICAgbm9kZS55MSA9IG5vZGUueTAgKyBoO1xuICAgIFxuICB9IC8vIC0tLS0tLSBlbmQgcG9zaXRpb25Ob2RlKCkgLS0tLS0tLVxuICBcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFc3NlbnRpYWwgZnVuY3Rpb25zXG4gIFxuICBmdW5jdGlvbiBnZW5lcmF0ZUxpbmVzKG5vZGUpIHtcbiAgICBjb25zdCBsaW5lcyA9IFtdO1xuICAgIGxldCBsaW5lV2lkdGggPSAwLCBmbGV4SGVpZ2h0ID0gZmFsc2UsIHN0YXJ0SW5kZXggPSAwLCBuZXdMaW5lID0gdHJ1ZTtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goIChjaGlsZCxpKSA9PiB7XG4gICAgICAvLyBkZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIG9mIHRoZSBjaGlsZHJlbiBpbiBhIGxpbmUgaGFzIGEgcHJvcGVydHkgdG8gc3BhbiBjb250YWluZXIgaGVpZ2h0XG4gICAgICBpZiAoc3BhbkhlaWdodChjaGlsZCkgJiYgIWZsZXhIZWlnaHQpIGZsZXhIZWlnaHQgPSB0cnVlO1xuICAgICAgXG4gICAgICAvLyBhZGQgd2lkdGggb2YgZWFjaCBjaGlsZFxuICAgICAgbGluZVdpZHRoICs9IChjaGlsZC54MSAtIGNoaWxkLngwKTtcblxuICAgICAgLy8gYWRkIGxhcmdlc3Qgb2YgdGhlIHR3byBtYXJnaW5zIGJldHdlZW4gY2hpbGRyZW4gYW5kIGxlZnQgb3V0ZXIgbWFyZ2luIChpZiBlZGdlTWFyZ2lucyB0cnVlKVxuICAgICAgbGluZVdpZHRoICs9IG5ld0xpbmUgPyAoZWRnZU1hcmdpbnMoY2hpbGQpID8gbWFyZ2luKGNoaWxkKS5sZWZ0IDogMCkgOiBcbiAgICAgIE1hdGgubWF4KG1hcmdpbihjaGlsZCkubGVmdCwgbWFyZ2luKG5vZGUuY2hpbGRyZW5baS0xXSkucmlnaHQpO1xuICAgICAgLy8gcmlnaHQgbWFyZ2luIGlzIG9ubHkgYWRkZWQgYXQgdGhlIGVuZCBvZiBhIGxpbmUgKGlmIGVkZ2VNYXJnaW5zIHRydWUpXG4gICAgICBjb25zdCBtYXJnaW5SaWdodCA9IGVkZ2VNYXJnaW5zKGNoaWxkKSA/IG1hcmdpbihjaGlsZCkucmlnaHQgOiAwO1xuICAgICAgaWYgKGxpbmVXaWR0aCArIG1hcmdpblJpZ2h0ID4gbWF4TGluZVdpZHRoKG5vZGUpIHx8wqBpID09PSBub2RlLmNoaWxkcmVuLmxlbmd0aC0xKSBcbiAgICAgICAgbGluZVdpZHRoICs9IG1hcmdpblJpZ2h0O1xuXG4gICAgICAvLyBsaW5lIGJyZWFrcyBpZiBtYXhMaW5lV2lkdGggaXMgc3VycGFzc2VkIG9yIGl0J3MgdGhlIGxhc3Qgb25lXG4gICAgICBpZiAobGluZVdpZHRoID4gbWF4TGluZVdpZHRoKG5vZGUpIHx8wqBpID09PSBub2RlLmNoaWxkcmVuLmxlbmd0aC0xKSB7XG4gICAgICAgIC8vIGlmIHRydWUsIGFkZCBjaGlsZCBpbnRlcnZhbCB0byBsaW5lcyBhcnJheSBhbmQgc2F2ZSBsaW5lIHdpZHRoXG4gICAgICAgIGxpbmVzLnB1c2goe2Zyb206IHN0YXJ0SW5kZXgsIHRvOiBpLCB3aWR0aDogbGluZVdpZHRoLCBmbGV4SGVpZ2h0OiBmbGV4SGVpZ2h0fSk7XG4gICAgICAgIC8vIGlmIG5vdCBsYXN0IGxpbmUsIHJlc2V0IHZhcmlhYmxlc1xuICAgICAgICBpZiAoaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTEpIHN0YXJ0SW5kZXggPSBpKzEsIGxpbmVXaWR0aCA9IDAsIGZsZXhIZWlnaHQgPSBmYWxzZSwgbmV3TGluZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIG5ld0xpbmUgPSBmYWxzZTtcbiAgICB9KTtcbiAgICByZXR1cm4gbGluZXM7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGNhbGNMaW5lSGVpZ2h0KG5vZGUsIGxpbmVzLCBsaW5lSW5kZXgpIHtcbiAgICBjb25zdCBsaW5lID0gbGluZXNbbGluZUluZGV4XTtcbiAgICBsZXQgbGluZUhlaWdodCA9IDA7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IGxpbmUuZnJvbTsgaSA8PSBsaW5lLnRvOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcmF3IGNoaWxkcmVuIGhlaWdodFxuICAgICAgY29uc3QgY2hpbGRIID0gY2hpbGQueTEgLSBjaGlsZC55MDtcbiAgICAgIC8vIGFkZCB2ZXJ0aWNhbCBtYXJnaW5zIGJldHdlZW4gY2hpbGRyZW4gYW5kIChpZiBlZGdlTWFyZ2lucyB0cnVlKSBvdXRlciB2ZXJ0aWNhbCBtYXJnaW5zXG4gICAgICAvLyBub3RlOiBjb2xsYXBzaW5nIGluZGl2aWR1YWwgdmVydGljYWwgbWFyZ2lucyBpcyB0b28gbWVzc3kgYW5kIGNvbXBsaWNhdGVkLCBzbyBJIGxlZnQgdGhpcyBvdXRcbiAgICAgIGNvbnN0IG1hcmdpbnNWZXJ0ID0gKCFlZGdlTWFyZ2lucyhjaGlsZCkgJiYgbGluZUluZGV4PT09MCA/IDAgOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbihjaGlsZCkudG9wKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICghZWRnZU1hcmdpbnMoY2hpbGQpICYmIGxpbmVJbmRleD09PShsaW5lcy5sZW5ndGgtMSkgPyAwIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4oY2hpbGQpLmJvdHRvbSk7XG4gICAgICAvLyBzZXQgbGluZSBoZWlnaHQgaWYgaXQgc3VycGFzc2VzIGxpbmUgaGVpZ2h0IG9mIHByZXZpb3VzIGNoaWxkc1xuICAgICAgaWYgKGNoaWxkSCArIG1hcmdpbnNWZXJ0ID4gbGluZUhlaWdodCkgbGluZUhlaWdodCA9IGNoaWxkSCArIG1hcmdpbnNWZXJ0O1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5tYXgobGluZUhlaWdodCwgbWluQ29udGFpbmVyU2l6ZShub2RlKS5oZWlnaHQpO1xuICB9XG4gIFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgICBcbiAgZnVuY3Rpb24gZ2V0TGluZXMobm9kZSkge1xuICAgIHJldHVybiBsaW5lTWFwW2xpbmVNYXAuZmluZEluZGV4KG0gPT4gbS5ib3ggPT09IG5vZGUpXS5saW5lcztcbiAgfVxuICBcbiAgZnVuY3Rpb24gZ2V0TGluZUluZGV4KG5vZGUsIHBhcmVudExpbmVzKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICBjb25zdCBsaW5lcyA9IChhcmd1bWVudHMubGVuZ3RoID4gMSkgPyBwYXJlbnRMaW5lcyA6IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICAgIGNvbnN0IGluZGV4ID0gbm9kZS5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihub2RlKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGxpbmVzLmZpbmRJbmRleChsID0+IHsgcmV0dXJuIChpbmRleCA+PSBsLmZyb20pICYmIChpbmRleCA8PSBsLnRvKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIFxuICBmdW5jdGlvbiBnZXRPd25MaW5lKG5vZGUpIHtcbiAgICBjb25zdCBsaW5lcyA9IGdldExpbmVzKG5vZGUucGFyZW50KTtcbiAgICBjb25zdCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgIHJldHVybiBsaW5lc1tsaW5lSW5kZXhdO1xuICB9XG4gIFxuICBmdW5jdGlvbiBjYWxjTGluZVNoaWZ0KG5vZGUsIGluY2x1ZGUgPSBmYWxzZSkge1xuICAgIGlmIChub2RlLnBhcmVudCkgeyAgICAgIFxuICAgICAgY29uc3QgbGluZXMgPSBnZXRMaW5lcyhub2RlLnBhcmVudCk7XG4gICAgICBjb25zdCBsaW5lSW5kZXggPSBnZXRMaW5lSW5kZXgobm9kZSwgbGluZXMpO1xuICAgICAgY29uc3QgbGluZVRvID0gaW5jbHVkZSA/IGxpbmVJbmRleCA6IGxpbmVJbmRleC0xO1xuICAgICAgXG4gICAgICByZXR1cm4gZDMuc3VtKGxpbmVzLmZpbHRlciggKGwsaSkgPT4gKGkgPD0gbGluZVRvKSApLCBsID0+IGwuaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGxpbmVCcmVhayhub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7IFxuICAgICAgY29uc3QgaW5kZXggPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgY29uc3QgbGluZXMgPSBnZXRMaW5lcyhub2RlLnBhcmVudCk7XG4gICAgICBjb25zdCBsaW5lID0gbGluZXNbZ2V0TGluZUluZGV4KG5vZGUsIGxpbmVzKV07XG4gICAgICByZXR1cm4gbGluZS5mcm9tID09PSBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdGFudCh4KSB7IC8vIGZyb20gRDMgc291cmNlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICAgICAgICAgICAgICAgICAgIFxuICByZXR1cm4gY29tcHV0ZTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZDNfXzsiXSwic291cmNlUm9vdCI6IiJ9