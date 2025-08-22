import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
    const{id}=useParams();
    // const [Product, setProduct] = useState(null)
    // async function GetProduct() {
    //      const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    //     //  console.log(data.data);
    //      setProduct(data.data);
    // }
    // useEffect(() => {
    //   GetProduct();
    
     
    // }, [])
   let {AddToCart}= useContext(CartContext);
    async  function AddProduct(productId){
      let x=await AddToCart(productId);
      toast.success('added');
      // console.log(x);
    }
    function GetProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const {
    data,
    isError,
    error,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['recentProduct',id],
    queryFn: GetProduct,
  });

  if (isLoading ) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const Product = data?.data?.data || [];
    
  return (
<>
  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product Details</h1>

  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 py-4 items-start bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
    
    {/* Product Image */}
    <div className="md:col-span-5">
      <img
        src={Product.imageCover}
        alt={Product.title}
        className="w-full h-auto rounded-xl shadow-sm object-cover"
      />
    </div>

    {/* Product Info */}
    <div className="md:col-span-7 space-y-5">
      <h2 className="text-2xl font-semibold text-gray-900">{Product.title}</h2>
      <p className="text-gray-700 text-base leading-relaxed">{Product.description}</p>
      <p className="text-xl font-bold text-green-600">Price: {Product.price} EGP</p>

      <button
        className="bg-blue-600 text-white text-base px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => AddProduct(Product._id)}

      >
        Add to Cart
      </button>
    </div>
  </div>
</>


);

}

