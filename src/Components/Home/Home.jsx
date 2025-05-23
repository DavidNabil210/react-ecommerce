import React, { useContext, useEffect, useState } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import axios from 'axios';
export default function Home() {
  const{Counter,ChangeCounter}=useContext(CounterContext);
  const [Products, setProducts] = useState([]);
  async function GetProducts(){
    const {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    console.log(data.data);
    setProducts(data.data);
  }
  useEffect(() => {
    GetProducts();
  
    
  }, [])
  
  return (

    // <div >
    //   <p className='bg-red-700 w-6 text-3xl'>{Counter}</p>
    //   <button onClick={ChangeCounter}>ok</button>
    // </div>
 <div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-6 p-4">
  {Products.map((product) => (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center h-full"
    >
      <div className="w-full h-48 flex items-center justify-center">
        <img
          src={product.imageCover}
          alt="imageCover"
          className="max-h-full object-contain"
        />
      </div>
      <p className="text-indigo-500 text-center mt-4">{product.title.split(" ").slice(0, 2).join(" ")}</p>
      <p className="text-center font-semibold mt-auto">{product.price} <span className='text-indigo-700'> $</span> </p>
    </div>
  ))}
</div>

    
  )
}
