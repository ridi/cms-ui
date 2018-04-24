import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import * as recompose from 'recompose';
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { modularizeClassNames as cm } from '../../utils/css';
import Menu from '../Menu';
import FilterableMenu from '../Menu/FilterableMenu';
import { wrapWithCssModule } from '../../higherOrderComponents';
import propsMapper from './propsMapper';

class NavigationBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    menuItems: FilterableMenu.propTypes.items,
    expand: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  static defaultProps = {
    className: undefined,
    menuItems: FilterableMenu.defaultProps.items,
    expand: 'md',
  };

  constructor(props) {
    super(props);

    es6ClassBindAll(this);

    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { className, menuItems, expand } = this.props;
    const { isOpen } = this.state;

    return (
      <Navbar className={cm(className, 'navigation_bar')} fixed="top" expand={expand} color="primary" dark>
        <div className={cm('content_container')}>
          <NavbarBrand className={cm('title')} tag="h1">
            <a href="/">Ridibooks CMS</a>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </div>

        <Collapse className={cm('menu_container', `d-${expand}-none`)} isOpen={isOpen}>
          <FilterableMenu className={cm('navbar-collapse')} items={menuItems} />
        </Collapse>
      </Navbar>
    );
  }
}

const propTypes = {
  menuItems: Menu.propTypes.items,
};

export default recompose.compose(
  wrapWithCssModule(),
  recompose.setPropTypes(propTypes),
  recompose.mapProps(propsMapper),
)(NavigationBar);
