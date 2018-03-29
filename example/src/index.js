import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '../../src';

ReactDOM.render(<Menu />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
