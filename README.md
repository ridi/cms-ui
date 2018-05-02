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
    <div id="menu_container"></div>

    <script>
      const { createElement, render, Menu } = CmsUi;

      const menuItems = ... // get menu data from cms-sdk via server-side rendering or custom API.

      const menuElement = createElement(Menu, { items: menuItems });
      const menuContainer = document.getElementById('menu_container');

      render(menuElement, menuContainer); // Make sure to container DOM element is loaded before call render function.
    </script>
  </body>
</html>
```

> **Note:**
> After *cms-ui* is loaded, following CSS is injected automatically for the layout.
> This is **not configurable for now**.
> If this causes any problem, please notify us.
> ```css
> body {
>   margin: 3.5rem 0 0 0;
> }
>
> @media (min-width: 1200px) {
>   body {
>     margin: 0 0 0 17rem;
>   }
> }
> ```

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
The output file will be generated in `dist` directory.

