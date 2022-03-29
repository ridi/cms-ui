/* eslint
react/no-find-dom-node: 0
*/

import React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { getGlobalCssModule } from '../utils/css';

export default function wrapWithCssModule() {
  return (Component) => {
    const WrappedComponent = (props) => (
      <div className={getGlobalCssModule().root}>
        <Component {...props} />
      </div>
    );

    WrappedComponent.propTypes = Component.propTypes;

    if (process.env.NODE_ENV !== 'production') {
      const wrappedName = wrapDisplayName(Component, 'wrapWithCssModule');
      return setDisplayName(wrappedName)(WrappedComponent);
    }

    return WrappedComponent;
  };
}
