import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProviderContext = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const removeAllCartItems = () => setCartList([]);

  const addCartItem = (product) => {
    // check if the product is already in the cart 
    const ProductExist = cartList.find((item) => item.id === product.id);
    
    if(ProductExist){
        setCartList((prevstate) => {
            const updatedProduct = prevstate.map((each) => {
                if(product.id === each.id){
                    const updatedQuantity = each.quantity + product.quantity;
                    return {...each,quantity : updatedQuantity}
                }
                return each
            })
            return updatedProduct
        })
    } else {
        // if product not present in cart, adding a new product to cart
        setCartList((prevState) => [...prevState,product]);
    }
  }

  const removeCartItem = (id) => setCartList((prevstate) => prevstate.filter((each) => each.id !== id));

  const incrementCartItemQuantity = (id) => {
    setCartList((prevstate) => {
        const updatedQuantity = prevstate.map((each) => {
            if(id === each.id){
                const newQuantity = each.quantity + 1;
                return {...each,quantity : newQuantity}
            }
            return each
        })
        return updatedQuantity
    })
  }

  const decrementCartItemQuantity = (id) => {
    // check if the product is still in the cart
    const productExist = cartList.find((item) => item.id === id);
    if(productExist.quantity>1){
        setCartList((prevstate) => {
            const updatedQuantity = prevstate.map((each) => {
                if(id === each.id){
                    const newQuantity = each.quantity - 1;
                    return {...each,quantity :newQuantity}
                }
                return each
            })
            return updatedQuantity
        })
      }else{
        removeCartItem(id);
      }
    }


  const value={
    cartList,removeAllCartItems,addCartItem,removeCartItem,incrementCartItemQuantity,decrementCartItemQuantity
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
