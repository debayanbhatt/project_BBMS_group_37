import { Link } from "react-router-dom";
import Sidebar from "./inc/Sidebar";
import Top from "./inc/Top";
import Cookies from 'js-cookie';


function Dashboard()
{

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
             <div className="d-flex" id="wrapper">
                <Sidebar />
                {/* username= Cookies.get('userName'); */}
                <div className="container-fluid">
                    <Top name="Dashboard" />
                    <div className="container-xl">
                        <div className="table-responsive">
                            <div className="table-wrapper">
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h2> <b>Welcome  {Cookies.get('username')}</b></h2>
                                        </div>

                                    </div>
                                </div>
                                <div>
      <img src="/assets/images/bd1.jpg" alt="BigCo Inc. logo" class="center"
          height={500}
          width={1100} />
    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Dashboard;