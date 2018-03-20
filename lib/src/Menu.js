import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FA from './FontAwesome';

export default class Menu extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      menu_title: PropTypes.string,
      menu_url: PropTypes.string,
      menu_deep: PropTypes.number,
      is_newtab: PropTypes.bool,
    })),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    items: undefined,
    isLoading: false,
  };

  static buildItemHierarchy(items) {
    const root = { menu_deep: -1, items: [] };
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

    return root.items;
  }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
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

  renderItem(item, key) {
    const isOpen = this.state.expanded[item.id];
    return (
      <NavItem key={key}>
        <NavLink
          href={item.menu_url}
          target={item.is_newtab ? '_blank' : undefined}
          onClick={() => this.onClickItem(item)}
        >
          {!_.isEmpty(item.items) && (isOpen ? (
            <FA icon="caret-down" />
          ) : (
            <FA icon="caret-right" />
          ))}
          {item.menu_title}
        </NavLink>
        <Collapse isOpen={isOpen}>
          <Nav className="ml-3" vertical>
            {_.map(item.items, this.renderItem)}
          </Nav>
        </Collapse>
      </NavItem>
    );
  }

  render() {
    const { items: flatItems, isLoading } = this.props;
    const items = Menu.buildItemHierarchy(flatItems);
    return (
      <div>
        <h1>Ridibooks CMS Menu</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Nav vertical>
            {_.map(items, this.renderItem)}
          </Nav>
        )}
      </div>
    );
  }
}
