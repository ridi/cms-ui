import { Util } from 'reactstrap';
import cn from 'classnames';

let globalCssModule;

export const getGlobalCssModule = () => globalCssModule;

export const setGlobalCssModule = (cssModule, rootModuleName) => {
  Util.setGlobalCssModule(globalCssModule = {
    ...cssModule,
    root: cssModule[rootModuleName],
  });
};

export const modularizeClassNames = (...args) => Util.mapToCssModules(cn(...args));

export const modularizeRootNode = (rootNode) => {
  rootNode.classList.add(globalCssModule.root);
};
