import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    address,
    position,
    status,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isGEOloading = status === "loading";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart) return <EmptyCart />;
  return (
    <div className="px-3 py-4">
      <h2 className="mb-6 text-lg font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-y-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow "
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-y-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
        </div>
        {formErrors?.phone && (
          <div className="mb-5 flex flex-col  sm:flex-row sm:items-center">
            <div className="sm:basis-40"></div>
            <div className="grow">
              <p className=" rounded-md bg-red-100 p-3 text-xs text-red-500">
                {formErrors.phone}
              </p>
            </div>
          </div>
        )}

        <div className="relative mb-5 flex flex-col gap-y-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isGEOloading}
              type="text"
              name="address"
              defaultValue={address}
              required
              className="input w-full disabled:cursor-not-allowed"
            />
          </div>
          {!position.latitude && !position.longitude ? (
            <span className="absolute right-1 top-[36.5px] sm:right-[5px] sm:top-[5px]">
              <Button
                disabled={isGEOloading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          ) : (
            ""
          )}
        </div>
        {status === "error" && (
          <div className="mb-5 flex flex-col  sm:flex-row sm:items-center">
            <div className="sm:basis-40"></div>
            <div className="grow">
              <p className=" rounded-md bg-red-100 p-3 text-xs text-red-500">
                {errorAddress}
              </p>
            </div>
          </div>
        )}
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-300 focus:outline-none  focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <Button type="primary" disabled={isSubmitting || isGEOloading}>
            {isSubmitting
              ? "Placing order..."
              : `Order now From ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;

  // if everything is correct create new order and redirect

  const newOrder = await createOrder(order);

  // Do NOT OVERUSE
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
