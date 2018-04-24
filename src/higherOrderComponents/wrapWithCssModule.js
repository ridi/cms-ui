/* eslint
react/no-find-dom-node: 0
*/

import ReactDOM from 'react-dom';
import { lifeCycle, setDisplayName, wrapDisplayName } from 'recompose';
import { getGlobalCssModule } from '../utils/css';

export default function wrapWithCssModule() {
  return (Component) => {
    const enhance = lifeCycle({
      componentDidMount() {
        const { parentNode } = ReactDOM.findDOMNode(this);
        const rootClassName = getGlobalCssModule().root;
        parentNode.classList.add(rootClassName);
      },
    });

    const WrappedComponent = enhance(Component);

    if (process.env.NODE_ENV !== 'production') {
      const wrappedName = wrapDisplayName(Component, 'wrapWithCssModule');
      return setDisplayName(wrappedName)(WrappedComponent);
    }

    return WrappedComponent;
  };
}
