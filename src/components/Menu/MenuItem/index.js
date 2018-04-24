import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import { NavItem, NavLink } from 'reactstrap';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';

const itemShape = {
  id: PropTypes.number,
  title: PropTypes.node,
  href: PropTypes.string,
  target: PropTypes.string,
  depth: PropTypes.number,
};
itemShape.children = PropTypes.arrayOf(PropTypes.shape(itemShape));

export default class MenuItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.shape(itemShape),
    children: PropTypes.node,
    onItemClick: PropTypes.func,
  };

  static defaultProps = {
    className: undefined,
    item: undefined,
    children: undefined,
    onItemClick: () => {},
  };

  constructor(props) {
    super(props);
    es6ClassBindAll(this);
  }

  render() {
    const {
      className,
      item,
      children,
      onItemClick,
    } = this.props;

    return (
      <NavItem
        className={cm(className, 'item')}
        {...getPassThroughProps(this)}
      >
        <NavLink
          className={cm('title')}
          href={item.href}
          target={item.target}
          onClick={() => onItemClick(item)}
        >
          {item.title}
        </NavLink>
        {children}
      </NavItem>
    );
  }
}
