import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/object';
import { setGlobalCssModule } from './utils/css';
import cssModule from './styles/index.module.scss';

setGlobalCssModule(cssModule, 'cms_ui');

export { version } from '../package.json';

export * from './utils/render';

export { default as Menu } from './components/Menu';
