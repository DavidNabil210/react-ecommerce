import React, { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'
export default function Home() {
  const{Counter,ChangeCounter}=useContext(CounterContext);

  return (

    <div >
      <p className='bg-red-700 w-6 text-3xl'>{Counter}</p>
      <button onClick={ChangeCounter}>ok</button>
    </div>
    
  )
}
