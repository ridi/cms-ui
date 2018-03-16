import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '@ridi/cms-ui';
import { getMenuItems } from './mock';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadMenuItems();
  }

  async loadMenuItems() {
    this.setState({ menuItems: await getMenuItems() });
  }

  render() {
    const { menuItems } = this.state;
    return <Menu items={menuItems} isLoading={!menuItems} />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
