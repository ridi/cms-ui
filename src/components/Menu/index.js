import { compose, mapProps } from 'recompose';
import { modularizeParentCss } from '../../higherOrderComponents';
import propsMapper from './propsMapper';
import CompositeMenu from './CompositeMenu';

export default compose(
  modularizeParentCss(),
  mapProps(propsMapper),
)(CompositeMenu);
