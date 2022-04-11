
import {Link, Navigate} from 'react-router-dom';

export default function Sidebar() {
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
    <div>
      {(() => {
        if (getCookie("id") === ""){
            return (
              <div>
                  <Navigate to="/"/>
              </div>
            )
        }
        
        return null;
      })()}
        
        <div className="border-end bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light">BBMS</div>
            <div className="list-group list-group-flush">
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard">Dashboard</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/inventory">Check Inventory </Link>
                
                
                

              {(() => {
                if (getCookie("role").toLowerCase() === "admin"){
                    return (
                      <div>
                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/contributors">Contributors</Link>
                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/users">Users</Link>
                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/Donors">Donors</Link>
                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/requests">Request List</Link>
                      </div>
                    )
                }
                
                return null;
              })()}
              <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/requests/add">Request for Blood</Link>

            </div>
        </div>

    </div>
  )
}
