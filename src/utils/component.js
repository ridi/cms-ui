/* eslint
import/prefer-default-export: 0
*/

import _ from 'lodash';

export const getRestProps = (componentInstance) => {
  const {
    props,
    constructor: {
      propTypes,
    },
  } = componentInstance;
  return _.omit(props, _.keys(propTypes));
};
