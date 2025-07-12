import { Children, createContext } from "react";

export const CartContext=createContext();

export default function CartContextProvider({children}){
    return <CartContext.Provider value={}>
        {Children}
    </CartContext.Provider>
}