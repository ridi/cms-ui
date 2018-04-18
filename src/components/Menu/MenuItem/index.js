import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import { getRestProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';

const itemShape = {
  id: PropTypes.number,
  content: PropTypes.node,
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
    onClickItem: PropTypes.func,
  };

  static defaultProps = {
    className: undefined,
    item: undefined,
    children: undefined,
    onClickItem: () => {},
  };

  render() {
    const {
      className,
      item,
      children,
      onClickItem,
    } = this.props;

    return (
      <NavItem className={cm(className, 'item')} {...getRestProps(this)}>
        <NavLink
          className={cm('title')}
          href={item.href}
          target={item.target}
          onClick={() => onClickItem(item)}
        >
          {item.content}
        </NavLink>
        {children}
      </NavItem>
    );
  }
}
