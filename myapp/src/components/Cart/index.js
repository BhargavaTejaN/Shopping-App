import { useContext } from "react";
import {CartContext} from '../../context/index'

import NavBar from "../NavBar/index";
import EmptyCartView from "../EmptyCartView/index";
import CartListView from "../CartListView/index";
import CartSummary from "../CartSummary/index";

import "./index.css";

const Cart = () => {

  const {cartList,removeAllCartItems} = useContext(CartContext);

  const showEmptyView = cartList.length === 0;

  const onClickRemoveAllBtn = () => {
    removeAllCartItems();
  };

  return (
    <>
      <NavBar />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={onClickRemoveAllBtn}
            >
              Remove All
            </button>
            <CartListView />
            <CartSummary />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
