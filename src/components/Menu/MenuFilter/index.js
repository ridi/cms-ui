import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import { Button, Input } from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import { filterItems } from '../utils/item';
import FA from '../../FontAwesome';
import MenuItem from '../MenuItem';

export default class MenuFilter extends React.Component {
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

    const match = (item) => _.every(keywords, (keyword) => (
      _.includes(_.toLower(item.title), _.toLower(keyword))
    ));

    const filteredItems = filterItems(items, match);

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

MenuFilter.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(MenuItem.propTypes.item),
  onFilter: PropTypes.func,
};

MenuFilter.defaultProps = {
  className: undefined,
  items: undefined,
  onFilter: () => {},
};
