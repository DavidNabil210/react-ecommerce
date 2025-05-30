import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';

export default function RecentProducts() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      console.log(data.data);
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Recent Products</h1>
     <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 p-4'>
         {products.length > 0 ? (
        products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))
      ) : (
        <p>Loading products...</p>
      )}
     </div>
    </>
  );
}
