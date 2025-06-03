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

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient();
const router = createBrowserRouter(
  [
    {
      path: '',element:<Layout/>,children:[
        {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:'login',element:<Login/>},
        {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:'Signup',element:<Signup/>},
        {path:'*',element:<NotFound/>}

      ]
    }
  ]
)
  return (
    <>
    <QueryClientProvider client={queryClient}>
       <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CounterContextProvider>
       </UserContextProvider>
    </QueryClientProvider>
   
   
   
  {/* <Signup/> */}
  {/* <Login/> */}
 
    </>
  )
}

export default App
