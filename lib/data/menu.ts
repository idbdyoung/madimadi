import { readFileSync } from 'fs';

const getMenuList = () => {
  const menuBuffer = readFileSync('data/menu.json');
  const menuString = menuBuffer.toString();

  if (!menuString) return [];
  const menu = JSON.parse(menuString);

  return menu;
};

export default getMenuList;
