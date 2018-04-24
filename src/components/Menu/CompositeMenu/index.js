import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import { Alert, ButtonGroup, Card } from 'reactstrap';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import MeButton from '../../buttons/MeButton';
import LogoutButton from '../../buttons/LogoutButton';
import MenuFilter from '../MenuFilter';
import MenuItem from '../MenuItem';
import TreeMenu from '../TreeMenu';

export default class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
  };

  static defaultProps = {
    className: undefined,
    items: undefined,
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
        <Alert color="secondary">검색 결과가 없습니다.</Alert>
      );
    }

    return (
      <TreeMenu items={filteredItems} forceExpand />
    );
  }

  render() {
    const { className, items } = this.props;

    return (
      <Card className={cm(className, 'composite_menu')} {...getPassThroughProps(this)}>
        <ButtonGroup className={cm('button_group')} size="sm">
          <MeButton tag="a" color="link" />
          <LogoutButton tag="a" color="link" />
        </ButtonGroup>

        <MenuFilter items={items} onFilter={this.onFilterItems} />

        {this.renderMenu()}
      </Card>
    );
  }
}
