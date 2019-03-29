# Custom CSS-like boxmodel layout for D3.js

This custom layout for hierarchical data is inspired by the CSS box-model and adds *margin* and *padding* on all four sides of nested elements. 

- Boxes are arranged horizontally in lines; if a *maximum line width* is exceeded, they flow into a new line.
- Padding is added *inside*, margins *outside* the boundary of boxes. 
- *Width* and *height* of the boxes is defined by their combined child sizes (width/height plus margins) as well as the padding of the box itself.
- Empty boxes collapse to their padding, but you can also specify a *minimal* width and height for containers.
- Elements that are not intended as boxes must set the boolean `isContainer` to `false` and can have a fixed width and height.

## See it in action

- [Introduction and playground (Observable)](https://observablehq.com/@formsandlines/custom-d3-layout-for-css-like-box-model)
- [More complex demo with flare dataset (Observable)](https://observablehq.com/@formsandlines/custom-boxmodel-layout-demo-with-flare)`


## Usage

```bash
npm install boxmodel-layout-for-d3 --save
```

```js
// ES6:
import boxmodel from 'boxmodel-layout-for-d3';

// CommonJS:
var boxmodel = require('boxmodel-layout-for-d3');
```

Or you can just embed the library via script-tag, but make sure you also include [d3.js](https://github.com/d3/d3) as a dependency:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js"></script>

<script src="<yourpath>/boxmodel-d3.min.js"></script>
// or just use the unpkg link:
<script src="https://unpkg.com/boxmodel-layout-for-d3@latest/dist/boxmodel-d3.min.js"></script>
```