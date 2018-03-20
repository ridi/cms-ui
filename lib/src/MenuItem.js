import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';

export default class MenuItem extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      menu_title: PropTypes.node,
      menu_url: PropTypes.string,
      menu_deep: PropTypes.number,
      is_newtab: PropTypes.bool,
    }),
    children: PropTypes.node,
    onClickItem: PropTypes.func,
  };

  static defaultProps = {
    item: undefined,
    children: undefined,
    onClickItem: () => {},
  };

  render() {
    const {
      item,
      children,
      onClickItem,
      ...props
    } = this.props;
    return (
      <NavItem {...props}>
        <NavLink
          href={item.menu_url}
          target={item.is_newtab ? '_blank' : undefined}
          onClick={() => onClickItem(item)}
        >
          {item.menu_title}
        </NavLink>
        {children}
      </NavItem>
    );
  }
}
