import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Collapse, Nav } from 'reactstrap';
import FA from './FontAwesome';
import MenuItem from './MenuItem';

export default class TreeMenu extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
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

    this.onClickItem = this.onClickItem.bind(this);
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
    if (_.isEmpty(item.items)) {
      return (
        <MenuItem key={key} item={item} />
      );
    }

    const isOpen = this.state.expanded[item.id];
    return (
      <MenuItem
        key={key}
        item={{
          ...item,
          menu_title: (
            <React.Fragment>
              <FA icon={isOpen ? 'caret-down' : 'caret-right'} />
              {item.menu_title}
            </React.Fragment>
          ),
        }}
        onClickItem={this.onClickItem}
      >
        <Collapse isOpen={isOpen}>
          <Nav className="ml-3" vertical>
            {_.map(item.items, this.renderItemTree)}
          </Nav>
        </Collapse>
      </MenuItem>
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
