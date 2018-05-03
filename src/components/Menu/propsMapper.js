import _ from 'lodash';
import { buildItemTrees } from './utils/item';

function mapItemProperties(items) {
  return _.map(items, item => ({
    id: item.id,
    title: item.menu_title,
    href: item.menu_url,
    target: item.is_newtab ? '_blank' : undefined,
    depth: item.menu_deep,
  }));
}

export function mapItems(items) {
  return _.flow([
    mapItemProperties,
    buildItemTrees,
  ])(items);
}

export default function propsMapper(props) {
  return {
    ...props,
    items: mapItems(props.items),
  };
}
