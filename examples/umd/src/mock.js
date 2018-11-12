export const getMenuItems = async () => {
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
      menu_url: depth > 0 ? `/menu_${id}` : '#',
      menu_deep: depth,
      menu_order: order,
      is_newtab: false,
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
