import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, ButtonGroup, Card, Input } from 'reactstrap';
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { getRestProps } from '../../utils/component';
import { modularizeClassNames as cm, modularizeRootNode } from '../../utils/css';
import FA from '../FontAwesome';
import TreeMenu from './TreeMenu';
import ListMenu from './ListMenu';

const mapData = data => ({
  id: data.id,
  content: data.menu_title,
  href: data.menu_url,
  target: data.is_newtab ? '_blank' : undefined,
  depth: data.menu_deep,
});

export default class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      menu_title: PropTypes.node,
      menu_url: PropTypes.string,
      menu_deep: PropTypes.number,
      is_newtab: PropTypes.bool,
    })),
  };

  static defaultProps = {
    className: undefined,
    items: undefined,
  };

  static filterItems(items, filterString) {
    const keywords = _.filter(_.split(filterString, ' '), _.identity);

    if (_.isEmpty(keywords)) {
      return items;
    }

    return _.filter(items, item => (
      _.every(keywords, (value) => {
        const content = _.toLower(item.content);
        const keyword = _.toLower(value);
        return _.includes(content, keyword);
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
    const items = _.map(this.props.items, mapData);
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
    const { filterString } = this.state;

    return (
      <Card className={cm(className, 'menu')} {...getRestProps(this)}>
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
