import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, ButtonGroup, Card, Input } from 'reactstrap';
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { getRestProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import FA from '../../FontAwesome';
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

  static flattenItems(items) {
    return _.flatten(_.map(items, item => [
      item,
      ...Menu.flattenItems(item.children),
    ]));
  }

  static filterItems(items, keywords) {
    const match = item => _.every(keywords, keyword => (
      _.includes(_.toLower(item.content), _.toLower(keyword))
    ));

    const mappedItems = _.map(items, (item) => {
      if (_.isEmpty(item.children)) {
        if (match(item)) {
          return item;
        }
        return undefined;
      }

      const filteredChildren = Menu.filterItems(item.children, keywords);

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
    this.state = {
      filterString: '',
    };
  }

  renderMenu() {
    const { items } = this.props;
    const { filterString } = this.state;
    const keywords = _.filter(_.split(filterString, ' '), _.identity);

    if (_.isEmpty(keywords)) {
      return (
        <TreeMenu items={items} />
      );
    }

    const filteredItems = Menu.filterItems(items, keywords);
    return (
      <TreeMenu items={filteredItems} forceExpand />
    );
  }

  render() {
    const { className } = this.props;
    const { filterString } = this.state;

    return (
      <Card className={cm(className, 'composite_menu')} {...getRestProps(this)}>
        <ButtonGroup className={cm('button_group')} size="sm">
          <Button tag="a" href="/me" color="link"><FA icon={faUserCircle} /> 개인정보 수정</Button>
          <Button tag="a" href="/logout" color="link"><FA icon={faSignOutAlt} /> 로그아웃</Button>
        </ButtonGroup>

        <Input
          bsSize="sm"
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
