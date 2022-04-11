import React from 'react'
import { Link } from 'react-router-dom'

export default function Top(props) {

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  return (
    <div >
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger border-bottom">
            <div className="container">
              <div className='col-sm-6'>
                <h3>{props.name}</h3>
              </div>
              <div className='col-sm-6 '>

                  {(() => {
                    if (getCookie("id") !== ""){
                        return (
                          <div className='d-flex flex-row-reverse'>
                            
                            <div class="p-2"><Link className='list-group-item list-group-item-action list-group-item-light' to="/dashboard/logout">Logout</Link></div>
                            <div class="p-2"><Link className='list-group-item list-group-item-action list-group-item-light' to="/dashboard/edit">Profile</Link></div>
                            <div class="p-2"><Link className='list-group-item list-group-item-action list-group-item-light' to="/dashboard">Dashboard</Link></div>
                          </div>
                        )
                    } else{
                      return (
                        <div className='d-flex flex-row-reverse'>
                          <div class="p-2"><Link className='list-group-item list-group-item-action list-group-item-light' to="/login">Login/Register</Link></div>
                          <div class="p-2"><Link className='list-group-item list-group-item-action list-group-item-light' to="/contributors">Contribute</Link></div>
                          <div class="p-2"><Link className='list-group-item list-group-item-action list-group-item-light' to="/">Home</Link></div>
                        </div>
                      );
                    }
                    
                    
                  })()}
                
                
              </div>
                        
            </div>
            
        </nav>
    </div>
  )
}
