import React, { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import axios from 'axios';
export default function Home() {
  const{Counter,ChangeCounter}=useContext(CounterContext);
  async function GetProducts(){
    const {data}=await axios.get('https://ecommerce.routemisr.com//api/v1/products');
    console.log(data);
  }
  return (

    <div >
      <p className='bg-red-700 w-6 text-3xl'>{Counter}</p>
      <button onClick={ChangeCounter}>ok</button>
    </div>
    
  )
}
