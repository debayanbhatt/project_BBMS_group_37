import { Link } from "react-router-dom";
import Sidebar from "./inc/Sidebar";
import Top from "./inc/Top";


function FormToJSON(ourForm) {


    const data = new FormData(ourForm);

    const formJSON = Object.fromEntries(data.entries());

    // for multi-selects, we need special handling

    return formJSON;

}

export default function Edit()
{

    

      function updateModalForm(e) {
        e.preventDefault()
        var id = document.querySelector('#updateModalForm  input[name=editid]').value;
        var rePassword = document.querySelector('#updateModalForm  input[name="re-password"]').value;
        var password = document.querySelector('#updateModalForm  input[name="password"]').value;

        if(rePassword === password){
            
        

        

        fetch('http://localhost:8075/api/users/' + id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password
            })
        }).then(res => res.json())
            .then((res) => {
                
                document.getElementById("updated").style.color ="#0f0";
                document.getElementById("updated").innerHTML = "Passowrd has been updated";
                setTimeout(function () {
                    
                    document.getElementById("updated").innerHTML = "";
                    
                   
                }, 1000)
            });

        } else{
            document.getElementById("updated").style.color ="#f00";
            document.getElementById("updated").innerHTML = "Password does not match! Please try again.";
        }
    }

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

                <div className="container-fluid">
                    <Top name="Edit Profile" />
                    <div className="container-xl">
                        <div className="table-responsive">
                            <div className="table-wrapper">
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h2><b>Change Password</b></h2>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <form id="updateModalForm" onSubmit={updateModalForm} method="put">
                                        
                                            
                                            
                                            
                                            <div className="form-group">
                                                <label>Enter New Password</label>
                                                <input type="password" className="form-control" name="password" required />
                                            </div>

                                            <div className="form-group">
                                                <label>Re-enter New Password</label>
                                                <input type="password" className="form-control" name="re-password" required />
                                            </div>
                                            
                                            
                                            


                                            <div className="form-group">
                                                <p id="updated"></p>
                                                <input type="hidden" name="editid" value={getCookie("id")} />
                                            </div>

                                            <input type="submit" className="btn btn-info" value="Save" />

                                        
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


