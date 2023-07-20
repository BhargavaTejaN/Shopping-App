import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { CartContext } from "../../context/index";

import "./index.css";

const NavBar = () => {
  const { cartList } = useContext(CartContext);

  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  const renderCartItemsCount = () => {
    const cartItemsCount = cartList.length;
    return (
      <>
        {cartItemsCount > 0 ? (
          <span className="cart-count-badge">{cartList.length}</span>
        ) : null}
      </>
    );
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
