import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const token = localStorage.getItem("token");
  const headers = { token };

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, settotalPrice] = useState(0)
  // calculating total quantity 
  function calcTotalQty(cartData) {
    const products = cartData?.products || [];
    return products.reduce((sum, item) => sum + (item?.count || 0), 0);
  }

  function GetUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => {
        console.error("❌ Error fetching cart:", err);
        return null;
      });
  }

  async function GetCart() {
    try {
      const response = await GetUserCart();
      if (response?.data?.status === "success") {
       const cartData =response.data.data;
        setTotalQty(calcTotalQty(cartData));
      settotalPrice(calcTotalPrice(cartData));
      } else {
        setTotalQty(0);
        settotalPrice(0);
      }
      return response;
    } catch (e) {
      console.error("❌ GetCart failed:", e);
      setTotalQty(0);
      return null;
    }
  }

  
  async function AddToCart(productId) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      await GetCart();
      return res;
    } catch (e) {
      console.error("❌ Error adding to cart:", e);
      return null;
    }
  }

  async function UpdateCountQty(id, count) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      );
      await GetCart();
      return res;
    } catch (e) {
      console.error("❌ Error updating qty:", e);
      return null;
    }
  }

  function calcTotalPrice(cartData){
    const products=cartData?.products || [];
    return products.reduce((sum, item) => sum + (item?.count || 0) * (item?.price || 0), 0);
  }
  function CheckOutSession(CartID,shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=http://localhost:5173`,
      {"shippingAddress":shippingAddress},
      {
        headers:headers
      }
    )
  }
  useEffect(() => {
    if (token) GetCart();
  }, [token]); 

  return (
    <CartContext.Provider
      value={{
        GetUserCart,
        AddToCart,
        UpdateCountQty,
        GetCart,
        totalQty,    
        totalPrice,    
        setTotalQty,
        CheckOutSession,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
