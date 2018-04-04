import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { Card, Input } from 'reactstrap';
import MenuItem from './MenuItem';
import TreeMenu from './TreeMenu';
import ListMenu from './ListMenu';
import styles from './styles.module.css';

export default class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
  };

  static defaultProps = {
    className: undefined,
    items: undefined,
  };

  static filterItems(items, filterString) {
    const keywords = _.filter(_.split(filterString, ' '), _.identity);

    if (!_.size(keywords)) {
      return items;
    }

    return _.filter(items, item => (
      _.every(keywords, (value) => {
        const title = _.toLower(item.menu_title);
        const keyword = _.toLower(value);
        return _.includes(title, keyword);
      })
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
    const { className } = this.props;
    const props = _.omit(this.props, _.keys(Menu.propTypes));
    const { filterString } = this.state;
    return (
      <Card className={cn(className, styles.menu)} {...props}>
        <Input
          type="search"
          placeholder="메뉴검색..."
          value={filterString}
          onChange={e => this.setState({ filterString: e.target.value })}
        />
        {this.renderMenu()}
      </Card>
    );
  }
}
