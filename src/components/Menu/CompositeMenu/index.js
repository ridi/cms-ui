import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import { Alert, Button, ButtonGroup, Card } from 'reactstrap';
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { getRestProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import FA from '../../FontAwesome';
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
      <Card className={cm(className, 'composite_menu')} {...getRestProps(this)}>
        <ButtonGroup className={cm('button_group')} size="sm">
          <Button tag="a" href="/me" color="link"><FA icon={faUserCircle} /> 개인정보 수정</Button>
          <Button tag="a" href="/logout" color="link"><FA icon={faSignOutAlt} /> 로그아웃</Button>
        </ButtonGroup>

        <MenuFilter items={items} onFilter={this.onFilterItems} />

        {this.renderMenu()}
      </Card>
    );
  }
}
