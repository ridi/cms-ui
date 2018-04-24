import PropTypes from 'prop-types';
import * as recompose from 'recompose';
import { wrapWithCssModule } from '../../higherOrderComponents';
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
  recompose.setPropTypes(propTypes),
  recompose.mapProps(propsMapper),
)(CompositeMenu);
