/* eslint
react/no-find-dom-node: 0
*/

import ReactDOM from 'react-dom';
import { compose, lifeCycle, setDisplayName, setPropTypes, wrapDisplayName } from 'recompose';
import { getGlobalCssModule } from '../utils/css';

export default function wrapWithCssModule() {
  return (Component) => {
    const enhance = compose(
      setPropTypes(Component.propTypes),
      lifeCycle({
        componentDidMount() {
          const { parentNode } = ReactDOM.findDOMNode(this);
          const rootClassName = getGlobalCssModule().root;
          parentNode.classList.add(rootClassName);
        },
      }),
    );

    const WrappedComponent = enhance(Component);

    if (process.env.NODE_ENV !== 'production') {
      const wrappedName = wrapDisplayName(Component, 'wrapWithCssModule');
      return setDisplayName(wrappedName)(WrappedComponent);
    }

    return WrappedComponent;
  };
}
