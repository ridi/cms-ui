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
  const items = [];

  for (let i = 1; i <= 3; i += 1) {
    items.push({
      id: nextId,
      menu_title: `Top Level Menu ${i}`,
      menu_url: `#menu_${i}`,
      menu_deep: 0,
      menu_order: nextOrder,
      is_use: true,
      is_show: true,
      is_newtab: false,
      reg_date: moment().format('YYYY-MM-DD hh:mm:ss'),
    });
    nextId += 1;
    nextOrder += 1;

    for (let j = 1; j <= 5; j += 1) {
      items.push({
        id: nextId,
        menu_title: `Sub Menu ${j}`,
        menu_url: `#menu_${i}_${j}`,
        menu_deep: 1,
        menu_order: nextOrder,
        is_use: true,
        is_show: true,
        is_newtab: false,
        reg_date: moment().format('YYYY-MM-DD hh:mm:ss'),
      });
      nextId += 1;
      nextOrder += 1;
    }
  }

  return items;
};

export default mock;
