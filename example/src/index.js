import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '@ridi/cms-ui';

ReactDOM.render(<Menu />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
