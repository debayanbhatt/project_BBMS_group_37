import React from 'react'
//import { Navigate, useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
import {Navigate } from "react-router-dom"

export default function Logout() {
  
    function deleteAllCookies() {
      console.log(document.cookie);
         var cookies = document.cookie.split(";");
         //document.cookie = +"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            console.log(eqPos);
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            console.log(name);
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
            console.log(document.cookie);
        
       }
      
    }
  return (
    <div>
        {deleteAllCookies()}
        <Navigate to="/"/>
        
    </div>
  )
}
