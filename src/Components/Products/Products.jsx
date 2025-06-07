import axios from 'axios';
import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Loadingspinner/LoadingSpinner';

export default function Products() {
  function GetProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const {
    data,
    isError,
    error,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: GetProducts,
  });

  if (isLoading || isFetching) return <LoadingSpinner/>;
  if (isError) return <p>Error: {error.message}</p>;

  const products = data?.data?.data || []; // ← Important: Safely access products list

  return (
    <>
      
      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 p-4'>
        {
          products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))
        }
      </div>
    </>
  );
}
