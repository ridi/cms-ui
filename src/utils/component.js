import React from 'react';
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

export const mapProps = mapper => (
  Component => (
    props => (
      <Component {...mapper(props)} />
    )
  )
);
