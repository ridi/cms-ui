import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import { Button, Input } from 'reactstrap';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import { getRestProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import FA from '../../FontAwesome';
import MenuItem from '../MenuItem';

export default class MenuFilter extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
    onFilter: PropTypes.func,
  };

  static defaultProps = {
    className: undefined,
    items: undefined,
    onFilter: () => {},
  };

  static filterItems(items, keywords) {
    const match = item => _.every(keywords, keyword => (
      _.includes(_.toLower(item.title), _.toLower(keyword))
    ));

    const mappedItems = _.map(items, (item) => {
      if (_.isEmpty(item.children)) {
        if (match(item)) {
          return item;
        }
        return undefined;
      }

      const filteredChildren = MenuFilter.filterItems(item.children, keywords);

      if (_.isEmpty(filteredChildren)) {
        return undefined;
      }

      return {
        ...item,
        children: filteredChildren,
      };
    });

    return _.filter(mappedItems, _.identity);
  }

  constructor(props) {
    super(props);

    es6ClassBindAll(this);

    this.state = {
      filterString: '',
    };
  }

  onFilterStringChange(e) {
    const filterString = e.target.value;
    this.setState({ filterString });

    const { items, onFilter } = this.props;
    const keywords = _.filter(_.split(filterString, ' '), _.identity);

    if (_.isEmpty(keywords)) {
      onFilter();
      return;
    }

    const filteredItems = MenuFilter.filterItems(items, keywords);
    onFilter(filteredItems);
  }

  clearFilterString() {
    this.setState({ filterString: '' });
    const { onFilter } = this.props;
    onFilter();
  }

  render() {
    const { className } = this.props;
    const { filterString } = this.state;

    return (
      <div className={cm(className, 'menu_filter')} {...getRestProps(this)}>
        <Input
          bsSize="sm"
          type="search"
          placeholder="메뉴검색..."
          value={filterString}
          onChange={this.onFilterStringChange}
        />

        {filterString && (
          <Button className={cm('clear_button')} onClick={this.clearFilterString}>
            <FA icon={faTimes} />
          </Button>
        )}
      </div>
    );
  }
}
