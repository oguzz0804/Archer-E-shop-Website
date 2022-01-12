import React from "react";
import CartIcon from "../../images/logos/shopping-cart.png";
import { cartContext } from "../../context/CartContext";

export default function CartWidget() {
  const { trolley } = React.useContext(cartContext);

  const cart = trolley.map((item) => item.amount);

  let itemsTotal = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <div className="nav-cart">
      {itemsTotal !== 0 ? <span>{itemsTotal}</span> : <></>}
      <img src={CartIcon} width="25" alt="trolley" />
    </div>
  );
}
