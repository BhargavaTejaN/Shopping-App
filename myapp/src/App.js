import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/index";
import Products from "./components/Products/index";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart/index";
import Login from "./components/Login";
import NotFound from "./components/NotFound/index";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductItemDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
