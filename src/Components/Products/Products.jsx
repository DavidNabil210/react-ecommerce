import axios from 'axios';
import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Loadingspinner/LoadingSpinner';
import useProducts from '../../Hooks/useProducts';

export default function Products() {
  // function GetProducts() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  // }

  // const {
  //   data,
  //   isError,
  //   error,
  //   isLoading,
  //   isFetching
  // } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: GetProducts,
  // });
  const {
    data,
    isError,
    error,
    isLoading,
    isFetching
  }=useProducts();
  

  if (isLoading ) return <LoadingSpinner/>;
  if (isError) return <p>Error: {error.message}</p>;

  const products = data?.data?.data || []; // ← Important: Safely access products list

  return (
    <>
      
      <div className="p-4">
  {products.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">No Products</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  )}
</div>

    </>
  );
}
