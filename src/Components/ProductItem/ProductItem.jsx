import React from 'react';
import { Link } from 'react-router-dom'; 

export default function ProductItem({ product }) {
  return (
    
   <Link to={`/productdetails/${product._id}`}>
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center">
      <img
        src={product.imageCover}
        alt={product.title}
        className="h-40 w-full object-cover rounded mb-4"
      />
      <h2 className="text-md font-semibold mb-1">
        {product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}
      </h2>
      <p className="text-green-600 font-bold">{product.price} EGP</p>
    </div>
   </Link>
  );
}
