import moment from 'moment';
import { CmsSdk } from '@ridi/cms-sdk';
import * as mock from '.';

const CMS_RPC_PATH = process.env.REACT_APP_CMS_RPC_PATH;

const sdk = CMS_RPC_PATH ? (
  new CmsSdk({ cmsRpcUrl: `${window.location.origin}${CMS_RPC_PATH}` })
) : (
  undefined
);

export const getMenuItems = async () => {
  if (sdk) {
    return sdk.getAuthService().getAdminMenu();
  }

  let nextId = 1;
  let nextOrder = 0;

  function createMenuItem(depth) {
    const id = nextId;
    nextId += 1;

    const order = nextOrder;
    nextOrder += 1;

    return {
      id,
      menu_title: `Menu ${id} (Depth: ${depth})`,
      menu_url: `#menu_${id}`,
      menu_deep: depth,
      menu_order: order,
      is_use: true,
      is_show: true,
      is_newtab: false,
      reg_date: moment().format('YYYY-MM-DD hh:mm:ss'),
    };
  }

  function createHighOrderMenuItems(depth, maxDepth) {
    if (depth > maxDepth) {
      return [];
    }

    const items = [];

    items.push(createMenuItem(depth));
    for (let i = 0; i < 2; i += 1) {
      items.push(createMenuItem(depth));
      items.push(...createHighOrderMenuItems(depth + 1, maxDepth));
    }

    return items;
  }

  return createHighOrderMenuItems(0, 3);
};

export default mock;
