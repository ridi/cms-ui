import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Lorem from 'react-lorem-component';
import './styles.css';

const App = () => (
  <div>
    <h1>Ridibooks CMS UI Example</h1>
    <hr />
    <Lorem count={20} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
