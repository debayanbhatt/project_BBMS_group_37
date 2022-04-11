import React, { useEffect, useState } from "react";
import Top from "./inc/Top"
import Sidebar from "./inc/Sidebar"



function FormToJSON(ourForm) {


    const data = new FormData(ourForm);

    const formJSON = Object.fromEntries(data.entries());

    // for multi-selects, we need special handling

    return formJSON;

}



export default function RequestAdd() {

    function addModalForm(e) {
        e.preventDefault()

        fetch('http://localhost:8075/api/requests', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormToJSON(document.getElementById("addModalForm")))
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                document.getElementById("Added").innerHTML = "Blood has been requested";
                setTimeout(function(){
                    window.location.reload();
                },700)

            });
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
                    <Top name="Add Requests" />
                    <div className="container-xl">
                        <div className="table-responsive">
                            <div className="table-wrapper">
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h2><b>Request Blood</b></h2>
                                        </div>

                                    </div>
                                </div>
                                {(() => {
                                if (getCookie("role").toLowerCase() === "admin"){
                                    return (
                                    <div>
                                        <h1 className="text-center">You are admin you cannot request for blood</h1>
                                    </div>
                                    )
                                } else{
                                    return (
                                        <form id="addModalForm" onSubmit={addModalForm}>



                                        <div className="form-group">
                                            <label>Blood Group</label>
    
                                            <select name="blood_group" className="form-control" >
                                                <option value="Course">Blood type</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                                
                                            </select>
                                        </div>
    
                                        <div className="form-group">
                                            <label>Units</label>
                                            <input type="number" className="form-control" name="units" required />
                                        </div>
    
                                        <div className="form-group">
    
                                            <input type="hidden" className="form-control" name="status" value="denied" required />
                                            <input type="hidden" className="form-control" name="dr_id" value={getCookie("id")} required />
                                        </div>
    
                                        <div className="form-group">
                                            <p className="text-success" id="Added"></p>
                                        </div>
    
    
    
                                        <input type="submit" className="btn btn-success" value="Send Request" />
    
                                    </form>
                                    )
                                }
                                
                                
                            })()}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
