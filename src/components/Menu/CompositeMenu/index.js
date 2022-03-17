import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import {
  Button,
  ButtonGroup,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import { faEllipsisV, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
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
      expanded: mediaQueryList.matches,
    };
  }

  componentDidMount() {
    mediaQueryList.addListener(this.onMediaQueryListChange);
  }

  componentWillUnmount() {
    mediaQueryList.removeListener(this.onMediaQueryListChange);
  }

  onMediaQueryListChange(e) {
    this.closeMenu();

    if (e.matches) {
      this.setState({ expanded: true });
    } else {
      this.setState({ expanded: false });
    }
  }

  openMenu() {
    this.setState({ isOpen: true });
  }

  closeMenu() {
    this.setState({ isOpen: false });
  }

  toggleMenu() {
    const { isOpen } = this.state;
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  render() {
    const { className, items } = this.props;
    const { isOpen, expanded } = this.state;

    return (
      <div className={cm('composite_menu', className, { expanded })} {...getPassThroughProps(this)}>
        <Navbar className={cm('navigation_bar')} expand="xl" dark>
          <NavbarBrand className={cm('title')} href="/">
            <span className={cm('ridibooks')}>
              RIDI
            </span>
            CMS
          </NavbarBrand>

          <NavbarToggler className={cm('toggle_button')} onClick={this.toggleMenu}>
            <FA icon={faEllipsisV} />
          </NavbarToggler>
        </Navbar>

        <Collapse className={cm('content', 'd-xl-flex')} isOpen={isOpen}>
          <ButtonGroup className={cm('button_container')} size="sm">
            <Button className={cm('button')} href="/me" tag="a" color="link">
              <FA icon={faUserCircle} />
              개인정보 수정
            </Button>
            <Button className={cm('button')} href="/logout" tag="a" color="link">
              <FA icon={faSignOutAlt} />
              로그아웃
            </Button>
          </ButtonGroup>

          <FilterableMenu items={items} />
        </Collapse>
      </div>
    );
  }
}
