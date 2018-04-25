import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, NavigationBar } from '@ridi/cms-ui';
import { getMenuItems } from './mock';
import './styles.css';

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
    return (
      <div id="container">
        <NavigationBar id="navigation_bar" menuItems={menuItems} />
        <Menu id="menu" items={menuItems} />

        <div id="content">Ridibooks CMS UI Example.</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
