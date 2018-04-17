import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Collapse, Nav } from 'reactstrap';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight';
import { getRestProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import FA from '../../FontAwesome';
import MenuItem from '../MenuItem';

export default class TreeMenu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
  };

  static defaultProps = {
    className: undefined,
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

  static defaultState = {
    expanded: {},
  };

  static stateStorage = sessionStorage;
  static STATE_STORAGE_KEY = 'CmsUi.Menu.TreeMenu.state';

  static restoreState() {
    try {
      return JSON.parse(TreeMenu.stateStorage.getItem(TreeMenu.STATE_STORAGE_KEY));
    } catch (ex) {
      return undefined;
    }
  }

  static storeState(state) {
    TreeMenu.stateStorage.setItem(TreeMenu.STATE_STORAGE_KEY, JSON.stringify(state));
  }

  constructor(props) {
    super(props);

    this.onClickItem = this.onClickItem.bind(this);
    this.renderItemTree = this.renderItemTree.bind(this);

    this.state = {
      ...TreeMenu.defaultState,
      ...TreeMenu.restoreState(),
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

  setState(state, callback = () => {}) {
    super.setState(state, () => {
      TreeMenu.storeState(this.state);
      callback();
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
              <FA icon={isOpen ? faCaretDown : faCaretRight} />
              {item.menu_title}
            </React.Fragment>
          ),
        }}
        onClickItem={this.onClickItem}
      >
        <Collapse isOpen={isOpen}>
          <Nav vertical>
            {_.map(item.items, this.renderItemTree)}
          </Nav>
        </Collapse>
      </MenuItem>
    );
  }

  render() {
    const { className, items } = this.props;
    const rootItem = TreeMenu.buildItemTree(items);
    return (
      <Nav
        className={cm(className, 'tree_menu')}
        vertical
        {...getRestProps(this)}
      >
        {_.map(rootItem.items, this.renderItemTree)}
      </Nav>
    );
  }
}
