import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
    const{id}=useParams();
    const [Product, setProduct] = useState(null)
    async function GetProduct() {
         const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products${id}`)
         console.log(data.data);
    }
    useEffect(() => {
      GetProduct();
    
     
    }, [])
    
  return (
    <div>ProductDetails</div>
  )
}

