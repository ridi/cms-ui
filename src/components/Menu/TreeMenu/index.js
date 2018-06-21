import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import { Collapse, Nav } from 'reactstrap';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import { mapKeyValues } from '../../../utils/collection';
import { filterItems, flattenItemTrees } from '../utils/item';
import FA from '../../FontAwesome';
import MenuItem from '../MenuItem';

const isActiveUrl = (url) => {
  const a = document.createElement('a');
  a.href = url;
  const trimCharacters = '/ ';
  return _.trim(a.href, trimCharacters) === _.trim(window.location.href, trimCharacters);
};

export default class TreeMenu extends React.Component {
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

  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(MenuItem.propTypes.item),
    forceExpand: PropTypes.bool,
  };

  static defaultProps = {
    className: undefined,
    items: undefined,
    forceExpand: false,
  };

  constructor(props) {
    super(props);

    es6ClassBindAll(this);

    this.state = {
      expandedItemIds: {},
      ...TreeMenu.restoreState(),
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange, false);

    const { items } = this.props;
    this.expandActiveItems(items);
  }

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps;
    this.expandActiveItems(items);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange, false);
  }

  onHashChange() {
    this.forceUpdate();
  }

  onItemClick(item) {
    const { forceExpand } = this.props;
    if (forceExpand) {
      return;
    }

    const { expandedItemIds } = this.state;
    this.setState({
      expandedItemIds: {
        ...expandedItemIds,
        [item.id]: !expandedItemIds[item.id],
      },
    });
  }

  setState(state, callback = () => {}) {
    super.setState(state, () => {
      TreeMenu.storeState(this.state);
      callback();
    });
  }

  expandActiveItems(items) {
    const activeItemTrees = filterItems(items, item => isActiveUrl(item.href));
    const activeItems = flattenItemTrees(activeItemTrees);
    const activeItemIds = mapKeyValues(activeItems, item => ([item.id, true]));

    const { expandedItemIds } = this.state;
    this.setState({
      expandedItemIds: {
        ...expandedItemIds,
        ...activeItemIds,
      },
    });
  }

  renderItemTree(item, key) {
    if (_.isEmpty(item.children)) {
      return (
        <MenuItem
          key={key}
          className={cm('leaf', `depth_${item.depth}`, { active: isActiveUrl(item.href) })}
          item={item}
        />
      );
    }

    const { forceExpand } = this.props;
    const { expandedItemIds } = this.state;

    const expanded = forceExpand || expandedItemIds[item.id];
    return (
      <MenuItem
        key={key}
        className={cm(`depth_${item.depth}`, { expanded })}
        item={{
          ...item,
          title: (
            <React.Fragment>
              <FA className={cm('collapse_indicator', { expanded })} icon={faCaretRight} />
              {item.title}
            </React.Fragment>
          ),
        }}
        onItemClick={this.onItemClick}
      >
        <Collapse isOpen={expanded}>
          <Nav vertical>
            {_.map(item.children, this.renderItemTree)}
          </Nav>
        </Collapse>
      </MenuItem>
    );
  }

  render() {
    const { className, items } = this.props;
    return (
      <Nav
        className={cm(className, 'tree_menu')}
        vertical
        {...getPassThroughProps(this)}
      >
        {_.map(items, this.renderItemTree)}
      </Nav>
    );
  }
}
