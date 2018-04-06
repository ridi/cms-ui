# Ridibooks CMS UI
This project provides UI components to be used with [*Ridibooks CMS SDK*](https://github.com/ridi/cms-sdk).

## Getting Started

### Install
```bash
npm install --save @ridi/cms-ui
```

### Add Stylesheets
*cms-ui* uses *Bootstrap 4* but  CSS is not included. so it is required to add them.

Install *Bootstrap* and import CSS in `js`:
```
# bash
npm install --save bootstrap

# js
import 'bootstrap/dist/css/bootstrap.css';
```

Or just use *Bootstrap*'s CDN.
Insert `<link>` into HTML's `<head>` before all other stylesheets:
```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
```

### Usage

#### React
```js
import { Menu } from '@ridi/cms-ui';

const menuItems = ... // get menu data from cms-sdk via server-side rendering or custom API.

const Example = (props) => {
  return (
    <div>
      <Menu items={menuItems} />
    </div>
  );
};
```

#### Browser
```html
<html>
  <head>
    <!-- Load library in <head> to avoid flickering. -->
    <script type="text/javascript" src="path/to/cms-ui/dist/cms-ui.var.js"></script>
  </head>
  <body>
    <div id="menu"></div>

    <script>
      const { createElement, render, Menu } = CmsUi;

      const menuItems = ... // get menu data from cms-sdk via server-side rendering or custom API.

      const menuElement = createElement(Menu, { items: menuItems });
      const menuContainer = document.getElementById('menu');

      render(menuElement, menuContainer); // Be sure to container DOM element is loaded before call this.
    </script>
  </body>
</html>
```

## Development

### Setup
Install all dependencies:
```bash
make install
```

### Run Example App
To compile and run example app, please run:
```bash
make start
```

### Build
To build *cms-ui* module, please run:
```bash
make build
```
The output file will be generated in `lib` directory.

