import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { modularizeClassNames as cm } from '../../utils/css';

export default function NavigationBar() {
  return (
    <Navbar className={cm('navigation_bar')} fixed="top" color="primary" dark>
      <NavbarBrand className={cm('title')} tag="h1">
        <a href="/">Ridibooks CMS</a>
      </NavbarBrand>
    </Navbar>
  );
}
