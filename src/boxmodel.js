import * as d3 from 'd3';

export default function boxmodel() {
  // v.1.2.0 | by Peter Hofmann, 03/2019
  
  let isContainer,
      spanHeight,
      edgeMargins,
      vAlign;
  let padding,
      margin,
      minContainerSize,
      maxLineWidth,
      nodeSize;
  const lineMap = [];
  
  function compute(root) {    
    root.eachAfter(scaleNode);
    root.eachBefore(scaleToParent);
    root.eachBefore(positionNode);
    
    return root;
  }
  
  compute.vAlign = function(x) {
    return arguments.length ? (vAlign = x, compute) : vAlign;
  };
  compute.edgeMargins = function(x) {
    return arguments.length ? (edgeMargins = typeof x === 'function' ? x : constant(+x), compute) : edgeMargins;
  };
  compute.isContainer = function(x) {
    return arguments.length ? (isContainer = typeof x === 'function' ? x : constant(+x), compute) : isContainer;
  };
  compute.spanHeight = function(x) {
    return arguments.length ? (spanHeight = typeof x === 'function' ? x : constant(+x), compute) : spanHeight;
  };
  compute.padding = function(x) {
    return arguments.length ? (padding = typeof x === 'function' ? x : constant(+x), compute) : padding;
  };
  compute.margin = function(x) {
    return arguments.length ? (margin = typeof x === 'function' ? x : constant(+x), compute) : margin;
  };
  compute.nodeSize = function(x) {
    return arguments.length ? (nodeSize = typeof x === 'function' ? x : constant(+x), compute) : nodeSize;
  };
  compute.minContainerSize = function(x) {
    return arguments.length ? (minContainerSize = typeof x === 'function' ? x : constant(+x), compute) : minContainerSize;
  };
  compute.maxLineWidth = function(x) {
    return arguments.length ? (maxLineWidth = typeof x === 'function' ? x : constant(+x), compute) : maxLineWidth;
  };
  
  // --------------
  // Main functions
  
  function scaleNode(node) {
    // set size to fixed definition by default
    let w = nodeSize(node).width, h = nodeSize(node).height;
    
    if (isContainer(node)) {
      w = h = 0; // containers have no fixed size, so we nullify
      
      if (node.children) {
        // For non-empty containers, size and margin between children must be summed up.
        // To do this, we need to determine when a line of children widths/margins surpasses maxLineWidth
        // and if so, add to an array that stores this line width as well as the interval of child indizes
        const lines = generateLines(node);
        // now loop through all lines and their elements to calculate the line heights
        for (let l = 0; l < lines.length; l++) {
          lines[l].height = calcLineHeight(node,lines,l); // add as line property
        }
        // add line array to a global line map
        lineMap.push({box: node, lines: lines});
        // add the largest of all line widths to the width
        w += d3.max(lines, l => l.width);
        // add the sum of all line heights to the height
        h += d3.sum(lines, l => l.height);        
      }
      // no specified size => combined padding OR minSize (if paddings smaller)
      w += padding(node).left + padding(node).right;
      h += padding(node).top + padding(node).bottom;
      w = Math.max(w, minContainerSize(node).width);
      h = Math.max(h, minContainerSize(node).height);
    }
    
    // finally, assign w/h to node coordinates
    node.x0 = node.y0 = 0;
    node.x1 = w, node.y1 = h;
    
  } // ------ end scaleNode() -------
  
  function scaleToParent(node) {
    // spanHeight and other scaling operations that refer to container/line size
    // can only be realized after all container scaling has been done
    let h = node.y1;
    
    // if element spans height of its container/line, calculate new height
    if (node.parent && spanHeight(node)) {
      h = getOwnLine(node).height;
      
      const parentLines = getLines(node.parent);
      const lineIndex = getLineIndex(node, parentLines);

      h -= !edgeMargins(node.parent) && lineIndex === 0 ? 0 : margin(node).top;
      h -= !edgeMargins(node.parent) && lineIndex === (parentLines.length-1) ? 0 : margin(node).bottom;
      
      // now adjust the line heights accordingly by distributing the excess height
      const heightDiff = h - node.y1;
      console.log('y1:'+node.y1 + ' h:'+h+' diff:'+heightDiff);
      if (isContainer(node) && node.children && heightDiff > 0) {
        const lines = getLines(node);
        console.log(lines);
        
        const excess = heightDiff / lines.length;
        for (const line of lines) {
          line.height += excess;
        }
      }
    }
    
    node.y1 = h;
  }
  
  function positionNode(node) {    
    const w = node.x1 - node.x0;
    const h = node.y1 - node.y0;
    
    if (node.parent) {      
      // y-position children relative to parent container y + padding
      node.y0 = node.parent.y0 + padding(node.parent).top;
      
      const order = node.parent.children.indexOf(node);
      if (order === 0 || lineBreak(node)) {
        // x-position 1. children (of line) relative to parent container x + padding
        node.x0 += node.parent.x0 + padding(node.parent).left;
        if (edgeMargins(node.parent)) node.x0 += margin(node).left;
      }
      else {
        // all subsequent children can be x-positioned relative to their left neighbour
        const neighbourLeft = node.parent.children[order-1];
        node.x0 = neighbourLeft.x1;
        // margins of both children are collapsed to the max value
        node.x0 += Math.max( margin(neighbourLeft).right, margin(node).left );
      }
    } // if no parent, position is dependent only on vertical alignment
    else {
      switch (vAlign) {
        case 'top':
          node.y0 = 0;
          break;
        case 'middle':
          node.y0 = h/2;
          break;
        case 'bottom':
          node.y0 = h;
          break;
      }
    }
    
    // shift height in middle and bottom alignments
    // for children, add vertical margins and also shift to the y-position of their line
    switch (vAlign) {
      case 'top':
        if (node.parent) {
          const lineIndex = getLineIndex(node);
          node.y0 += !edgeMargins(node.parent) && lineIndex === 0 ? 0 : margin(node).top;
          node.y0 += calcLineShift(node);
        }
        break;
      case 'middle':
        if (node.parent) node.y0 += calcLineShift(node) + getOwnLine(node).height/2;
        node.y0 -= h/2;
        break;
      case 'bottom':
        if (node.parent) {
          const lines = getLines(node.parent), lineIndex = getLineIndex(node, lines);
          node.y0 -= !edgeMargins(node.parent) && lineIndex === (lines.length-1) ? 0 : margin(node).bottom;
          node.y0 += calcLineShift(node, true);
        }
        node.y0 -= h;
        break;
    } 
    
    // last, assign w/h shift to coordinates
    node.x1 = node.x0 + w; 
    node.y1 = node.y0 + h;
    
  } // ------ end positionNode() -------
  
  // -------------------
  // Essential functions
  
  function generateLines(node) {
    const lines = [];
    let lineWidth = 0, flexHeight = false, startIndex = 0, newLine = true;
    node.children.forEach( (child,i) => {
      // determine if at least one of the children in a line has a property to span container height
      if (spanHeight(child) && !flexHeight) flexHeight = true;
      
      // add width of each child
      lineWidth += (child.x1 - child.x0);

      // add largest of the two margins between children and left outer margin (if edgeMargins true)
      lineWidth += newLine ? (edgeMargins(node) ? margin(child).left : 0) : 
      Math.max(margin(child).left, margin(node.children[i-1]).right);
      // right margin is only added at the end of a line (if edgeMargins true)
      const marginRight = edgeMargins(node) ? margin(child).right : 0;
      if (lineWidth + marginRight > maxLineWidth(node) || i === node.children.length-1) 
        lineWidth += marginRight;

      // line breaks if maxLineWidth is surpassed or it's the last one
      if (lineWidth > maxLineWidth(node) || i === node.children.length-1) {
        // if true, add child interval to lines array and save line width
        lines.push({from: startIndex, to: i, width: lineWidth, flexHeight: flexHeight});
        // if not last line, reset variables
        if (i < node.children.length-1) startIndex = i+1, lineWidth = 0, flexHeight = false, newLine = true;
      }
      else newLine = false;
    });
    return lines;
  }
  
  function calcLineHeight(node, lines, lineIndex) {
    const line = lines[lineIndex];
    let lineHeight = 0;
    
    for (let i = line.from; i <= line.to; i++) {
      const child = node.children[i];
      // calculate the raw children height
      const childH = child.y1 - child.y0;
      // add vertical margins between children and (if edgeMargins true) outer vertical margins
      // note: collapsing individual vertical margins is too messy and complicated, so I left this out
      const marginsVert = (!edgeMargins(node) && lineIndex===0 ? 0 : 
                           margin(child).top) +
                          (!edgeMargins(node) && lineIndex===(lines.length-1) ? 0 : 
                           margin(child).bottom);
      // set line height if it surpasses line height of previous childs
      if (childH + marginsVert > lineHeight) lineHeight = childH + marginsVert;
    }
    return Math.max(lineHeight, minContainerSize(node).height);
  }
  
  // ----------------
  // Helper functions
    
  function getLines(node) {
    return lineMap[lineMap.findIndex(m => m.box === node)].lines;
  }
  
  function getLineIndex(node, parentLines) {
    if (node.parent) {
      const lines = (arguments.length > 1) ? parentLines : getLines(node.parent);
      const index = node.parent.children.indexOf(node);
      
      return lines.findIndex(l => { return (index >= l.from) && (index <= l.to); });
    }
    return null;
  }
  
  function getOwnLine(node) {
    const lines = getLines(node.parent);
    const lineIndex = getLineIndex(node, lines);
    return lines[lineIndex];
  }
  
  function calcLineShift(node, include = false) {
    if (node.parent) {      
      const lines = getLines(node.parent);
      const lineIndex = getLineIndex(node, lines);
      const lineTo = include ? lineIndex : lineIndex-1;
      
      return d3.sum(lines.filter( (l,i) => (i <= lineTo) ), l => l.height);
    }
    return null;
  }
  
  function lineBreak(node) {
    if (node.parent) { 
      const index = node.parent.children.indexOf(node);
      const lines = getLines(node.parent);
      const line = lines[getLineIndex(node, lines)];
      return line.from === index;
    }
    return null;
  }

  function constant(x) { // from D3 source
    return function() {
      return x;
    };
  }
                   
  return compute;
}