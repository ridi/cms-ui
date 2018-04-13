import { setGlobalCssModule } from './utils/css';
import cssModule from './styles/index.module.scss';

setGlobalCssModule(cssModule, 'cms_ui');

export * from './utils/render';

export { default as Menu } from './components/Menu';
