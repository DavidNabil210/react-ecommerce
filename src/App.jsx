import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import NotFound from './Components/Notfound/Notfound'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Products from './Components/Products/Products'
import CartContextProvider from './Context/CartContext'
import Cart from './Components/Cart/Cart'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient();
const router = createBrowserRouter(
  [
    {
      path: '/',element:<Layout/>,children:[
        {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:'login',element:<Login/>},
        {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:'signup',element:<Signup/>},
        {path:'products',element:<ProtectedRoute> <Products/></ProtectedRoute>},
        {path:'cart',element:<ProtectedRoute> <Cart/></ProtectedRoute>},
        {path:'*',element:<NotFound/>}

      ]
    }
  ]
)
  return (
    <>
    <QueryClientProvider client={queryClient}>
       <UserContextProvider>
       <CartContextProvider>
         <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CounterContextProvider>
       </CartContextProvider>
       </UserContextProvider>
       <Toaster/>
    </QueryClientProvider>
   
   
   
  {/* <Signup/> */}
  {/* <Login/> */}
 
    </>
  )
}

export default App
