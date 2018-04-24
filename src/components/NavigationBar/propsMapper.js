import { mapItems } from '../Menu/propsMapper';

export default function propsMapper(props) {
  return {
    ...props,
    menuItems: mapItems(props.menuItems),
  };
}
