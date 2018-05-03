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
