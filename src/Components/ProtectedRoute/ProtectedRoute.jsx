import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'

export default function ProtectedRoute(props) {
    const{token}=useContext(UserContext);
    if(token){
        return props.children
    }
    else{
        return <Navigate to={'/login'}></Navigate>
    }
  return (
    <h1></h1>
  )
}
