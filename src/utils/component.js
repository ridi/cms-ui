/* eslint react/no-multi-comp: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { modularizeRootNode } from './css';

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
      static get name() {
        return `mapProps(${Component.name})`;
      }

      render() {
        return <Component {...mapper(this.props)} />;
      }
    }
  )
);

export const modularize = Component => (
  class extends React.PureComponent {
    static get name() {
      return `modularize(${Component.name})`;
    }

    componentDidMount() {
      modularizeRootNode(ReactDOM.findDOMNode(this).parentNode);
    }

    render() {
      return <Component {...this.props} />;
    }
  }
);
