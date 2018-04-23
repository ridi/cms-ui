/* eslint
react/no-find-dom-node: 0
*/

import ReactDOM from 'react-dom';
import { lifeCycle } from 'recompose';
import { getGlobalCssModule } from '../utils/css';

export default function modularizeParentCss() {
  return lifeCycle({
    componentDidMount() {
      const { parentNode } = ReactDOM.findDOMNode(this);
      const rootClassName = getGlobalCssModule().root;
      parentNode.classList.add(rootClassName);
    },
  });
}
