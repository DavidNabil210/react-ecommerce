import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {

    function GetProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const response = useQuery({
    queryKey: ['products'],
    queryFn: GetProducts,
  });
  return response
}
