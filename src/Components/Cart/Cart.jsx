import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import CartItem from '../CartItem/CartItem';
import LoadingSpinner from '../Loadingspinner/LoadingSpinner'
import { Link } from 'react-router-dom';
export default function Cart() {
  const { GetUserCart,UpdateCountQty,totalPrice } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  
  async function GetLoggedUser() {
    const response = await GetUserCart();
    if (response.data.status === 'success') {
      setCartDetails(response.data.data);
    }
  }
  async function UpdateQuantity(id, count) {
  console.log('UpdateQuantity called with:', { id, count }); // Debug log
  
  try {
    const response = await UpdateCountQty(id, count);
    console.log('API response:', response); // Debug log
    
    if (response.data.status === 'success') {
      setCartDetails(response.data.data);
      console.log('Cart updated successfully'); // Debug log
    } else {
      console.error('Failed to update cart:', response.data);
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}
  useEffect(() => {
    GetLoggedUser();
  }, []);

  // 🧪 Debugging
  console.log("CartDetails", CartDetails);
  console.log("Products", CartDetails?.products);
  console.log("Length", CartDetails?.products?.length);


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            CartDetails === null ? (
            <tr className="text-center">
  <td colSpan={4}>
    <LoadingSpinner />
  </td>
</tr>

            ) : CartDetails.products?.length > 0 ? (
              CartDetails.products.map((p) => (
                <CartItem
                  // key={p._id || p.product._id}
                   key={p.product._id}
                  UpdateQuantity={UpdateQuantity}
                  count={p.count}
                  price={p.price}
                  product={p.product}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No items in cart.</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div className="flex justify-end items-center px-6 py-4">
      
      <div className='flex justify-between items-center '>
          <h2 className="text-lg font-semibold">
    {/* Total: ${getTotalPrice().toFixed(2)} */}
    Total : ${totalPrice.toFixed(2)}
  </h2>
{CartDetails ? (
  <Link to={'/checkout/' + CartDetails?._id}>
    checkout
  </Link>
) : null}
      </div>

</div>

    </div>
  );
}
