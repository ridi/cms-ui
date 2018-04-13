import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, ButtonGroup, Card, Input } from 'reactstrap';
import { modularizeClassNames as cm, modularizeRootNode } from '../../utils/css';
import FA from '../FontAwesome';
import MenuItem from './MenuItem';
import TreeMenu from './TreeMenu';
import ListMenu from './ListMenu';

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

  componentDidMount() {
    modularizeRootNode(ReactDOM.findDOMNode(this).parentNode);
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
      <Card className={cm(className, 'menu')} {...props}>
        <ButtonGroup className={cm('buttonGroup')} size="sm">
          <Button tag="a" href="/me" color="link"><FA icon="user-circle" /> 개인정보 수정</Button>
          <Button tag="a" href="/logout" color="link"><FA icon="sign-out-alt" /> 로그아웃</Button>
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
