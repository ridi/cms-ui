import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import _ from 'lodash';
import { NavItem, NavLink } from 'reactstrap';
import styles from './styles.module.css';

export default class MenuItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
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
    const props = _.omit(this.props, _.keys(MenuItem.propTypes));

    return (
      <NavItem className={cn(className, styles.item)} {...props}>
        <NavLink
          href={_.isEmpty(item.items) ? item.menu_url : undefined}
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
