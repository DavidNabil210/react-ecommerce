import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
    const{id}=useParams();
    const [Product, setProduct] = useState(null)
    async function GetProduct() {
         const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        //  console.log(data.data);
         setProduct(data.data);
    }
    useEffect(() => {
      GetProduct();
    
     
    }, [])
    
  return (
  <>
    <h1 className="text-2xl font-bold mb-4 text-center">Product Details</h1>

    {Product ? (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 items-start">
      
        <div className="md:col-span-4">
          <img
            src={Product.imageCover}
            alt={Product.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

       
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xl font-semibold">{Product.title}</h2>
          <p className="text-gray-700">{Product.description}</p>
          <p className="text-lg font-bold text-green-600">Price: {Product.price} EGP</p>
          <button class="bg-blue-500 grid lg:grid-cols-12  text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
  Add to cart
</button>

        </div>
      </div>
    ) : (
      <p className="text-center text-gray-500">Loading...</p>
    )}
  </>
);

}

