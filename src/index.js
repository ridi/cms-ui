import { render } from './App';

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}
