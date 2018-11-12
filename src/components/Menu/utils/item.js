/* eslint
import/prefer-default-export: 0
*/

import _ from 'lodash';

export function filterItemsPostOrder(items, match) {
  return _.reduce(items, (filteredItems, item) => {
    const filteredChildren = filterItemsPostOrder(item.children, match);

    if (match(item, filteredChildren)) {
      return [
        ...filteredItems, {
          ...item,
          children: filteredChildren,
        },
      ];
    }

    return filteredItems;
  }, []);
}

export function flattenItemTrees(rootItems) {
  return _.flatMapDeep(rootItems, item => [
    _.omit(item, 'children'),
    flattenItemTrees(item.children),
  ]);
}

export function buildItemTrees(items) {
  const root = { id: 0, depth: -1, children: [] };
  const parents = [root];

  _.forEach(items, (item, index) => {
    const parent = (() => {
      while (_.last(parents).depth >= item.depth) {
        parents.pop();
      }
      return _.last(parents);
    })();

    const itemHasChildren = { ...item, children: [] };
    parent.children.push(itemHasChildren);

    if (item === _.last(items)) {
      return;
    }

    if (items[index + 1].depth > item.depth) {
      parents.push(itemHasChildren);
    }
  });

  return root.children;
}
