import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const token = localStorage.getItem("token");
  const headers = {
    token,
  };
  function AddToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
          productId:productId

    },
  {
    headers
  })
  }
function GetUserCart() {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    })
    .then(response => response)
    .catch(error => {
      console.error("❌ Error fetching cart:", error);
      return null; 
    });
}
function UpdateCountQty(id,count){
  return axios
  .put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {count:count,},
    {headers:headers,}
  )
  .then((data)=>data)
  .catch((err)=>err);
}


  return (
    <CartContext.Provider value={{ GetUserCart, AddToCart,UpdateCountQty }}>

      {props.children}
    </CartContext.Provider>
  );
}
