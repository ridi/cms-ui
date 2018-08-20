/* eslint
import/prefer-default-export: 0
*/

import _ from 'lodash';

export function filterItems(items, match) {
  const mappedItems = _.map(items, (item, key, collection) => {
    if (_.isEmpty(item.children)) {
      if (match(item, key, collection)) {
        return item;
      }
      return undefined;
    }

    const filteredChildren = filterItems(item.children, match);

    if (_.isEmpty(filteredChildren)) {
      return undefined;
    }

    return {
      ...item,
      children: filteredChildren,
    };
  });

  return _.filter(mappedItems, _.identity);
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
