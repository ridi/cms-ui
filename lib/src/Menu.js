import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Input } from 'reactstrap';
import MenuItem from './MenuItem';
import TreeMenu from './TreeMenu';
import ListMenu from './ListMenu';

export default class Menu extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
  };

  static defaultProps = {
    items: undefined,
  };

  static filterItems(items, filterString) {
    const keywords = _.filter(_.split(_.toLower(filterString), ' '), _.identity);

    if (!_.size(keywords)) {
      return items;
    }

    return _.filter(items, item => (
      _.every(keywords, keyword => _.includes(item.menu_title, keyword))
    ));
  }

  constructor(props) {
    super(props);
    this.state = {
      filterString: '',
    };
  }

  renderMenu() {
    const { items } = this.props;
    const { filterString } = this.state;

    if (!filterString) {
      return (
        <TreeMenu items={items} />
      );
    }

    const filteredItems = Menu.filterItems(items, filterString);
    return (
      <ListMenu items={filteredItems} />
    );
  }

  render() {
    const { filterString } = this.state;
    const props = _.omit(this.props, _.keys(Menu.propTypes));
    return (
      <div {...props}>
        <Input
          type="search"
          placeholder="메뉴검색..."
          value={filterString}
          onChange={e => this.setState({ filterString: e.target.value })}
        />
        {this.renderMenu()}
      </div>
    );
  }
}
