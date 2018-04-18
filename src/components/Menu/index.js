import _ from 'lodash';
import CompositeMenu from './CompositeMenu';
import { mapProps, modularize } from '../../utils/component';

export default _.flowRight([
  modularize,
  mapProps(props => ({
    ...props,
    items: _.map(props.items, item => ({
      id: item.id,
      content: item.menu_title,
      href: item.menu_url,
      target: item.is_newtab ? '_blank' : undefined,
      depth: item.menu_deep,
    })),
  })),
])(CompositeMenu);
