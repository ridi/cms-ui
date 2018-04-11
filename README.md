# Ridibooks CMS UI

[![Greenkeeper badge](https://badges.greenkeeper.io/ridi/cms-ui.svg)](https://greenkeeper.io/)

This project provides UI components to be used with [*Ridibooks CMS SDK*](https://github.com/ridi/cms-sdk).

## Getting Started

### Install
```bash
npm install --save @ridi/cms-ui
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
    <script src="path/to/cms-ui/dist/cms-ui.var.js"></script>
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

