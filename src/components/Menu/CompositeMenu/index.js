import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Navbar, NavbarBrand } from 'reactstrap';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import MeButton from '../../buttons/MeButton';
import LogoutButton from '../../buttons/LogoutButton';
import FilterableMenu from '../FilterableMenu';

export default class CompositeMenu extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    items: FilterableMenu.propTypes.items,
    collapse: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  static defaultProps = {
    className: undefined,
    items: FilterableMenu.defaultProps.items,
    collapse: 'xl',
  };

  render() {
    const { className, items, collapse } = this.props;

    return (
      <div
        className={cm(
          'composite_menu',
          'd-none',
          `d-${collapse}-flex`,
          className,
        )}
        {...getPassThroughProps(this)}
      >
        <Navbar className={cm('navigation_bar')} expand={collapse} color="primary" dark>
          <NavbarBrand className={cm('title')} tag="h1">
            <a href="/">Ridibooks CMS</a>
          </NavbarBrand>
        </Navbar>

        <ButtonGroup className={cm('button_container')} size="sm">
          <MeButton tag="a" color="link" />
          <LogoutButton tag="a" color="link" />
        </ButtonGroup>

        <FilterableMenu items={items} />
      </div>
    );
  }
}
