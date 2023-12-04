import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);
  if (!totalQuantity) return null;
  return (
    <div className="md:  bottom-0 left-0 right-0 flex justify-between bg-stone-800 p-4 text-sm uppercase text-stone-300 sm:fixed   sm:py-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-400 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
