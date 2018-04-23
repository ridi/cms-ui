import _ from 'lodash';
import { compose, mapProps } from 'recompose';
import CompositeMenu from './CompositeMenu';
import { modularizeParentCss } from '../../higherOrderComponents';

function buildItemTree(items) {
  const root = { id: 0, depth: -1, children: [] };
  const parents = [root];

  _.forEach(items, (item, index) => {
    const parent = (() => {
      while (_.last(parents).depth >= item.depth) {
        parents.pop();
      }
      return _.last(parents);
    })();

    const itemWithChildren = { ...item, children: [] };
    parent.children.push(itemWithChildren);

    if (item === _.last(items)) {
      return;
    }

    if (items[index + 1].depth > item.depth) {
      delete itemWithChildren.href;
      parents.push(itemWithChildren);
    }
  });

  return root;
}

export default compose(
  modularizeParentCss(),
  mapProps(props => ({
    ...props,
    items: (() => {
      const mappedItems = _.map(props.items, item => ({
        id: item.id,
        title: item.menu_title,
        href: item.menu_url,
        target: item.is_newtab ? '_blank' : undefined,
        depth: item.menu_deep,
      }));

      return buildItemTree(mappedItems).children;
    })(),
  })),
)(CompositeMenu);
