import React from 'react';
import PropTypes from 'prop-types';
import es6ClassBindAll from 'es6-class-bind-all';
import _ from 'lodash';
import { Collapse, Nav } from 'reactstrap';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import FA from '../../FontAwesome';
import MenuItem from '../MenuItem';

const isActiveUrl = (url) => {
  const a = document.createElement('a');
  a.href = url;
  return a.href === window.location.href;
};

export default class TreeMenu extends React.Component {
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

    es6ClassBindAll(this);

    this.state = {
      ...TreeMenu.defaultState,
      ...TreeMenu.restoreState(),
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange, false);
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
    const { expanded } = this.state;

    const isOpen = forceExpand || expanded[item.id];
    return (
      <MenuItem
        key={key}
        className={cm(`depth_${item.depth}`)}
        item={{
          ...item,
          title: (
            <React.Fragment>
              <FA className={cm('collapse_indicator')} icon={isOpen ? faCaretDown : faCaretRight} />
              {item.title}
            </React.Fragment>
          ),
        }}
        onItemClick={this.onItemClick}
      >
        <Collapse isOpen={isOpen}>
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
