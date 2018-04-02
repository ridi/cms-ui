import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Nav } from 'reactstrap';
import MenuItem from './MenuItem';

export default class ListMenu extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
  };

  static defaultProps = {
    items: undefined,
  };

  render() {
    const { items } = this.props;
    return (
      <Nav vertical>
        {_.map(items, (item, key) => (
          <MenuItem key={key} item={item} />
        ))}
      </Nav>
    );
  }
}
