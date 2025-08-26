import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const token = localStorage.getItem("token");
  const headers = { token };

  // هنخزن إجمالي الكمية فقط (تقدر كمان تخزن الـproducts لو حابب)
  const [totalQty, setTotalQty] = useState(0);

  // helper لحساب إجمالي الكميات من الـAPI
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
        const total = calcTotalQty(response.data.data);
        setTotalQty(total);
      } else {
        setTotalQty(0);
      }
      return response;
    } catch (e) {
      console.error("❌ GetCart failed:", e);
      setTotalQty(0);
      return null;
    }
  }

  // مهم: بعد أي إضافة/تحديث، اعمل Refresh للكارت كامل وما تعتمدش على numOfCartItems
  async function AddToCart(productId) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      // بغض النظر عن اللي راجع… اعمل Fetch للكارت كامل عشان الإجمالي يبقى مظبوط
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

  // أول ما الـtoken يبقى موجود/يتغير → هات الكارت
  useEffect(() => {
    if (token) GetCart();
  }, [token]); // مهم تبقى متتبّعة للـtoken

  return (
    <CartContext.Provider
      value={{
        GetUserCart,
        AddToCart,
        UpdateCountQty,
        GetCart,
        totalQty,        // استخدم ده في الـNavbar
        setTotalQty,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
