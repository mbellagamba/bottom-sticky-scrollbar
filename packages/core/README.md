# Bottom Sticky Scrollbar

It is a widget that creates a horizontal scrollbar that snaps to the bottom of the page to solve the problem of horizontal scrolling for large content that does not fit in the viewport. Browsers show the scrollbar only at the bottom of the content, making horizontal scrolling inconvenient for the user. This typically happens with large tables or images.

### Installation

Install the package with npm (or your package manager):

```
npm i sticky-scrollbar
```

### Usage

Import and mount the component

```js
import { mountStickyScrollbar } from 'sticky-scrollbar';

/*
 Given this HTML
 <div class="responsive-container">
   <table id="large-data-table">
    <!-- A table with many rows and many columns -->
   </table>
 </div>
*/

const unmount = mountStickyScrollbar('.responsive-container');

// Later
unmount();
```

## Before

![A demo demonstrating the problem of using the scrollbar](../../docs/demo-original.gif)

## After

![A demo demonstrating how Bottom Sticky Scrollbar works](../../docs/demo-bottom-sticky-scrollbar.gif)
