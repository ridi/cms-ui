import React from 'react';
import PropTypes from 'prop-types';
import TreeMenu from './TreeMenu';

export default class Menu extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      menu_title: PropTypes.string,
      menu_url: PropTypes.string,
      menu_deep: PropTypes.number,
      is_newtab: PropTypes.bool,
    })),
  };

  static defaultProps = {
    items: undefined,
  };

  render() {
    const { items, ...props } = this.props;
    return (
      <TreeMenu items={items} {...props} />
    );
  }
}
