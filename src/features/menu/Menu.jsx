import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem";
import { useLoaderData } from "react-router-dom";
function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="flex flex-col divide-y-2 divide-stone-200 px-2 ">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
