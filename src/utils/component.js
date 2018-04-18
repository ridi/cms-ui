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
    class extends React.PureComponent {
      static displayName = `mapProps(${Component.name})`;

      render() {
        return <Component {...mapper(this.props)} />;
      }
    }
  )
);
