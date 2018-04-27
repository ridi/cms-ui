import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import { Alert } from 'reactstrap';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import MenuFilter from '../MenuFilter';
import TreeMenu from '../TreeMenu';

export default class FilterableMenu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: TreeMenu.propTypes.items,
  };

  static defaultProps = {
    className: undefined,
    items: TreeMenu.defaultProps.items,
  };

  constructor(props) {
    super(props);

    es6ClassBindAll(this);

    this.state = {
      filteredItems: undefined,
    };
  }

  onFilterItems(filteredItems) {
    this.setState({ filteredItems });
  }

  renderMenu() {
    const { items } = this.props;
    const { filteredItems } = this.state;

    if (!filteredItems) {
      return (
        <TreeMenu items={items} />
      );
    }

    if (_.isEmpty(filteredItems)) {
      return (
        <Alert className={cm('alert')}>검색 결과가 없습니다.</Alert>
      );
    }

    return (
      <TreeMenu items={filteredItems} forceExpand />
    );
  }

  render() {
    const { className, items } = this.props;

    return (
      <div className={cm(className, 'filterable_menu')} {...getPassThroughProps(this)}>
        <MenuFilter items={items} onFilter={this.onFilterItems} />
        {this.renderMenu()}
      </div>
    );
  }
}
