import { createContext, useState } from "react";

export const CounterContext=createContext();

export default function CounterContextProvider(props){
   const [Counter, setCounter] = useState(0)
   
    function ChangeCounter(){
        setCounter(Math.random);
    }
  return <CounterContext.Provider value={{Counter,ChangeCounter}}>
        {props.children}
  </CounterContext.Provider>
}