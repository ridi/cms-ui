import { faTimes } from '@fortawesome/free-solid-svg-icons';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Input } from 'reactstrap';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import FA from '../../FontAwesome';
import MenuItem from '../MenuItem';
import { filterItemsPostOrder } from '../utils/item';

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

    const match = (item, filteredChildren) => {
      if (!_.isEmpty(filteredChildren)) {
        return true;
      }

      return _.every(keywords, keyword => (
        _.includes(_.toLower(item.title), _.toLower(keyword))
      ));
    };

    const filteredItems = filterItemsPostOrder(items, match);

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
      <div className={cm(className, 'menu_filter')} {...getPassThroughProps(this)}>
        <Input
          className={cm('input')}
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
