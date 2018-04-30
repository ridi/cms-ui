import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import { Button, ButtonGroup, Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faEllipsisV from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import { getPassThroughProps } from '../../../utils/component';
import { lockRootScroll, modularizeClassNames as cm } from '../../../utils/css';
import FilterableMenu from '../FilterableMenu';
import FA from '../../FontAwesome';

const mediaQueryList = window.matchMedia('(min-width: 1200px)');

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
    mediaQueryList.addListener(this.unlockRootScroll);
  }

  componentWillUnmount() {
    mediaQueryList.removeListener(this.unlockRootScroll);
  }

  unlockRootScroll(e) {
    const { isOpen } = this.state;
    lockRootScroll(isOpen && !e.matches);
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
        <Navbar className={cm('navigation_bar')} expand="xl" dark>
          <NavbarBrand className={cm('title')} href="/">
            <span className={cm('ridibooks')}>RIDIBOOKS</span> CMS
          </NavbarBrand>

          <NavbarToggler className={cm('toggle_button')} onClick={this.toggle}>
            <FA icon={faEllipsisV} />
          </NavbarToggler>
        </Navbar>

        <Collapse className={cm('content', 'd-xl-flex')} isOpen={isOpen}>
          <ButtonGroup className={cm('button_container')} size="sm">
            <Button className={cm('button')} href="/me" tag="a" color="link">
              <FA icon={faUserCircle} /> 개인정보 수정
            </Button>
            <Button className={cm('button')} href="/logout" tag="a" color="link">
              <FA icon={faSignOutAlt} /> 로그아웃
            </Button>
          </ButtonGroup>

          <FilterableMenu items={items} />
        </Collapse>
      </div>
    );
  }
}
