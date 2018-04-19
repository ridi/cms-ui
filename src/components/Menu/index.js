import _ from 'lodash';
import CompositeMenu from './CompositeMenu';
import { mapProps, modularize } from '../../utils/component';

function buildItemTree(items) {
  const root = { id: 0, depth: -1, children: [] };
  const parents = [root];

  _.forEach(items, (item, index) => {
    const parent = (() => {
      while (_.last(parents).depth >= item.depth) {
        parents.pop();
      }
      return _.last(parents);
    })();

    const itemWithChildren = { ...item, children: [] };
    parent.children.push(itemWithChildren);

    if (item === _.last(items)) {
      return;
    }

    if (items[index + 1].depth > item.depth) {
      delete itemWithChildren.href;
      parents.push(itemWithChildren);
    }
  });

  return root;
}

export default _.flowRight([
  modularize,
  mapProps(props => ({
    ...props,
    items: (() => {
      const mappedItems = _.map(props.items, item => ({
        id: item.id,
        title: item.menu_title,
        href: item.menu_url,
        target: item.is_newtab ? '_blank' : undefined,
        depth: item.menu_deep,
      }));

      return buildItemTree(mappedItems).children;
    })(),
  })),
])(CompositeMenu);
