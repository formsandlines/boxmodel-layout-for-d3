# Boxmodel Layout for D3

This custom layout for hierarchical data is inspired by the CSS box-model and adds *margin* and *padding* on all four sides of nested elements. 

- Boxes are arranged horizontally in lines; if a *maximum line width* is exceeded, they flow into a new line.
- Padding is added *inside*, margins *outside* the boundary of boxes. 
- *Width* and *height* of the boxes is defined by their combined child sizes (width/height plus margins) as well as the padding of the box itself.
- Empty boxes collapse to their padding, but you can also specify a *minimal* width and height for containers.
- Elements that are not intended as boxes must set the boolean \`isContainer\` to \`false\` and can have a fixed width and height.

See it in action: [https://observablehq.com/@formsandlines/custom-d3-layout-for-css-like-box-model](https://observablehq.com/@formsandlines/custom-d3-layout-for-css-like-box-model)

#### Updates:

- Added \`spanHeight\` as optional parameter for nodes to span their whole parent container.
- Vertical align is now per line (fixes element reordering with \`vAlign:'bottom'\`)

#### ToDo:

- Initialize some parameters with default values so you don't have to specify every single parameter for each visualization.