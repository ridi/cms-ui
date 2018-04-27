import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import { ButtonGroup, Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { getPassThroughProps } from '../../../utils/component';
import { lockRootScroll, modularizeClassNames as cm } from '../../../utils/css';
import MeButton from '../../buttons/MeButton';
import LogoutButton from '../../buttons/LogoutButton';
import FilterableMenu from '../FilterableMenu';

const mediaQueryList = window.matchMedia('(min-width: 1200px)');

function unlockRootScroll(e) {
  if (!e.matches) {
    return;
  }

  lockRootScroll(false);
}

export default class CompositeMenu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: FilterableMenu.propTypes.items,
  };

  static defaultProps = {
    className: undefined,
    items: FilterableMenu.defaultProps.items,
  };

  constructor(props) {
    super(props);

    es6ClassBindAll(this);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    mediaQueryList.addListener(unlockRootScroll);
  }

  componentWillUnmount() {
    mediaQueryList.removeListener(unlockRootScroll);
  }

  toggle() {
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen,
    });
    lockRootScroll(isOpen);
  }

  render() {
    const { className, items } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={cm('composite_menu', className)} {...getPassThroughProps(this)}>
        <Navbar className={cm('navigation_bar')} expand="xl" color="primary" dark>
          <NavbarBrand className={cm('title')} tag="h1">
            <a href="/">Ridibooks CMS</a>
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
        </Navbar>

        <Collapse className={cm('content', 'd-xl-flex')} isOpen={isOpen}>
          <ButtonGroup className={cm('button_container')} size="sm">
            <MeButton tag="a" color="link" />
            <LogoutButton tag="a" color="link" />
          </ButtonGroup>

          <FilterableMenu items={items} />
        </Collapse>
      </div>
    );
  }
}
