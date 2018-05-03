/* eslint
import/prefer-default-export: 0
*/

import _ from 'lodash';

export function mapKeyValues(collection, mapToKeyValuePair) {
  return _.reduce(collection, (result, value, key) => {
    const [k, v] = mapToKeyValuePair(value, key, collection);
    return { ...result, [k]: v };
  }, {});
}
