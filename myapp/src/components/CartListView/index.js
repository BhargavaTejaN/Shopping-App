import { useContext } from "react";

import {CartContext} from '../../context/index'

import CartItem from "../CartItem";
import "./index.css";

const CartListView = () => {

  const {cartList} = useContext(CartContext);

  return (
    <ul className="cart-list">
      {cartList.map((eachCartItem) => (
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  );
};

export default CartListView;
