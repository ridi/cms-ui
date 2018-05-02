import PropTypes from 'prop-types';
import * as recompose from 'recompose';
import { addClassName, wrapWithCssModule } from '../../higherOrderComponents';
import { modularizeClassNames as cm } from '../../utils/css';
import propsMapper from './propsMapper';
import CompositeMenu from './CompositeMenu';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    menu_title: PropTypes.string,
    menu_url: PropTypes.string,
    is_newtab: PropTypes.bool,
    menu_deep: PropTypes.number,
  })),
};

export default recompose.compose(
  wrapWithCssModule(),
  addClassName(cm('menu')),
  recompose.setPropTypes(propTypes),
  recompose.mapProps(propsMapper),
)(CompositeMenu);
