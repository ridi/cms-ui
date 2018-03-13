import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Menu } from './components';

export default function App() {
  return (
    <Menu />
  );
}

export function render() {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>
    , document.getElementById('root'),
  );
}
