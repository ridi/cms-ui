import React from 'react';
import PropTypes from 'prop-types';
import { modularizeParentCss } from '../../higherOrderComponents';
import propsMapper from './propsMapper';
import CompositeMenu from './CompositeMenu';

class Menu extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      menu_title: PropTypes.string,
      menu_url: PropTypes.string,
      is_newtab: PropTypes.bool,
      menu_deep: PropTypes.number,
    })),
  };

  static defaultProps = {
    items: undefined,
  };

  render() {
    return <CompositeMenu {...propsMapper(this.props)} />;
  }
}

export default modularizeParentCss()(Menu);
