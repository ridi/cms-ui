import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FA from './FontAwesome';

export default class TreeMenu extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      menu_title: PropTypes.string,
      menu_url: PropTypes.string,
      menu_deep: PropTypes.number,
      is_newtab: PropTypes.bool,
    })),
  };

  static defaultProps = {
    items: undefined,
  };

  static buildItemTree(items) {
    const root = { id: 0, menu_deep: -1, items: [] };
    const parents = [root];

    _.forEach(items, (item, index) => {
      const parent = (() => {
        while (_.last(parents).menu_deep >= item.menu_deep) {
          parents.pop();
        }
        return _.last(parents);
      })();

      const itemWithChildren = { ...item, items: [] };
      parent.items.push(itemWithChildren);

      if (item === _.last(items)) {
        return;
      }

      if (items[index + 1].menu_deep > item.menu_deep) {
        parents.push(itemWithChildren);
      }
    });

    return root;
  }

  constructor(props) {
    super(props);
    this.renderItemTree = this.renderItemTree.bind(this);
    this.state = {
      expanded: {},
    };
  }

  onClickItem(item) {
    const { expanded } = this.state;
    this.setState({
      expanded: {
        ...expanded,
        [item.id]: !expanded[item.id],
      },
    });
  }

  renderItemTree(item, key) {
    const isOpen = this.state.expanded[item.id];
    return (
      <NavItem key={key}>
        <NavLink
          href={item.menu_url}
          target={item.is_newtab ? '_blank' : undefined}
          onClick={() => this.onClickItem(item)}
        >
          {!_.isEmpty(item.items) && (
            <FA icon={isOpen ? 'caret-down' : 'caret-right'} />
          )}
          {item.menu_title}
        </NavLink>
        <Collapse isOpen={isOpen}>
          <Nav className="ml-3" vertical>
            {_.map(item.items, this.renderItemTree)}
          </Nav>
        </Collapse>
      </NavItem>
    );
  }

  render() {
    const { items } = this.props;
    const rootItem = TreeMenu.buildItemTree(items);
    return (
      <Nav vertical>
        {_.map(rootItem.items, this.renderItemTree)}
      </Nav>
    );
  }
}
