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
    <div className="grid lg:grid-cols-4 sm:grid-cols-1">
      {
        Products.map((product)=>(
          <div key={product.id}>
              <img src={product.imageCover} alt="imageCover" />
              <p className='text-indigo-500 text-center '>{product.title}</p>
              <p>{product.price}</p>
          </div>
        )

        )
      }
    </div>
    
  )
}
