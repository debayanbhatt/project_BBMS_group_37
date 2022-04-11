import React, { useEffect, useState } from "react";
import Top from "./inc/Top"
import Sidebar from "./inc/Sidebar"
import $ from "jquery"
import { Navigate } from "react-router-dom";

function FormToJSON(ourForm) {


    const data = new FormData(ourForm);

    const formJSON = Object.fromEntries(data.entries());

    // for multi-selects, we need special handling

    return formJSON;

}





export default function Doctors() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

    function ourReadyTable() {
        fetch("http://localhost:8075/api/users/allUser")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);

                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    $(document).ready(function () {

        $(".detele-modal").click(function () {


            var exampleModal = document.getElementById('deleteEmployeeModal')
            var modalTitle = exampleModal.querySelector('.modal-title')
            var modalBodyInput = exampleModal.querySelector('.modal-body input')
            modalTitle.textContent = 'Delete User  ' + $(this).attr("data-userName")
            modalBodyInput.value = $(this).attr("data-id")

        });


        $(".edit-modal").click(function () {


            var exampleModal = document.getElementById('editEmployeeModal')
            var modalTitle = exampleModal.querySelector('.modal-title')
            var editId = exampleModal.querySelector('.modal-body input[name=editid]')
            modalTitle.textContent = 'Edit User  ' + $(this).attr("data-userName")
            editId.value = $(this).attr("data-id")

            exampleModal.querySelector('.modal-body input[name=userName]').value = $(this).attr("data-userName")
            exampleModal.querySelector('.modal-body input[name=password]').value = $(this).attr("data-password")

            exampleModal.querySelector('.modal-body input[name=phone]').value = $(this).attr("data-phone")
            document.querySelector("#updateModalForm select").value = $(this).attr("data-role")
            



        });

        $("#multi-delete").click(function () {

            $('.checkboxes:checked').each(function () {
                var ourId = $(this).val();

                multideleteModalForm(ourId)
            })

        })
    })




    function addModalForm(e) {
        e.preventDefault()

        fetch('http://localhost:8075/api/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormToJSON(document.getElementById("addModalForm")))
        }).then(res => res.text())
            .then((res) => {
                
                document.getElementById("Added").innerHTML = res;
                if (res === "User already Present") {
                    document.getElementById("Added").style.color = '#f00'
                } else {
                    document.getElementById("Added").style.color = '#0f0'
                    setTimeout(function () {
                        document.querySelector("#addEmployeeModal .close").click();
                    
                        ourReadyTable()
                        document.getElementById("Added").innerHTML = "";

                        document.querySelector("#addModalForm").reset()
                    },70000)
                }
            });
    }

    function multideleteModalForm(id) {


        // var id = document.querySelector('#deleteEmployeeModal .modal-body  input[name=deleteid]').value;

        fetch('http://localhost:8075/api/users/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => {
                
                document.getElementById("deleted").innerHTML = "User has been delete";
                setTimeout(function () {
                    document.querySelector("#deleteEmployeeModal .close").click();
                    document.getElementById("deleted").innerHTML = "";
                    ourReadyTable()
                }, 700)
            })
    }

    function deleteModalForm(e) {
        e.preventDefault()

        var id = document.querySelector('#deleteEmployeeModal .modal-body  input[name=deleteid]').value;

        fetch('http://localhost:8075/api/users/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => {
                
                document.getElementById("deleted").innerHTML = "User has been delete";
                setTimeout(function () {
                    document.querySelector("#deleteEmployeeModal .close").click();
                    document.getElementById("deleted").innerHTML = "";
                    ourReadyTable()
                }, 700)
            })
    }


    function updateModalForm(e) {
        e.preventDefault()
        var id = document.querySelector('#editEmployeeModal .modal-body  input[name=editid]').value;

        fetch('http://localhost:8075/api/users/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormToJSON(document.getElementById("updateModalForm")))
        }).then(res => res.json())
            .then((res) => {
                
                document.getElementById("updated").innerHTML = "User has been updated";
                setTimeout(function () {
                    document.querySelector("#editEmployeeModal .close").click();
                    document.getElementById("updated").innerHTML = "";
                    document.querySelector("#updateModalForm").reset()
                    ourReadyTable()
                }, 700)
            });
    }








    useEffect(() => {
        ourReadyTable();








    }, [])

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
                                if (getCookie("role").toLowerCase() === "doctor"){
                                    return (
                                    <div>
                                        <Navigate to="/dashboard"/>
                                    </div>
                                    )
                                }
                                
                                return null;
                            })()}
            <div className="d-flex" id="wrapper">
                <Sidebar />

                <div className="container-fluid">
                    <Top name="Users" />

                    <div className="container-xl">
                        <div className="table-responsive">
                            <div className="table-wrapper">
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h2><b>Users</b></h2>
                                        </div>
                                        <div className="col-sm-6">
                                            <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New User</span></a>
                                            <button className="btn btn-danger" data-toggle="modal" id="multi-delete"><i className="material-icons" >&#xE15C;</i> <span>Delete</span></button>
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span className="custom-checkbox">
                                                    <input type="checkbox" id="selectAll" />
                                                    <label for="selectAll"></label>
                                                </span>
                                            </th>
                                            <th>Username</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                            
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <span className="custom-checkbox">
                                                        <input type="checkbox" id="checkbox1" className="checkboxes" name="options[]" value={item.id} />
                                                        <label for="checkbox1"></label>
                                                    </span>
                                                </td>
                                                <td>{item.userName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.role}</td>
                                                
                                                <td>
                                                    <a href="#editEmployeeModal" className="edit edit-modal" data-toggle="modal" data-id={item.id} data-userName={item.userName} data-phone={item.phone} data-password={item.password} data-role={item.role} ><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                    <a href="#deleteEmployeeModal" className="delete detele-modal" data-toggle="modal" data-id={item.id} data-userName={item.userName}><i className="material-icons" data-toggle="tooltip" title="Delete" id={item.id}  >&#xE872;</i></a>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>


                    {/* <!-- Add Modal HTML --> */}
                    <div id="addEmployeeModal" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form id="addModalForm" onSubmit={addModalForm} method="post">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Add User</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" className="form-control" name="userName" required />
                                        </div>
                                        
                                        
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" name="password" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" className="form-control" name="phone" required />
                                        </div>

                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" name="email" required />
                                        </div>

                                        <div className="form-group">
                                            <label>Role</label>
                                            <select name="role" className="form-control"> 
                                                <option value="">Select Role</option>
                                                <option value="DOCTOR">DOCTOR</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        </div> 
                                        

                                        <div className="form-group">
                                            <p className="text-success" id="Added"></p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                        <input type="submit" className="btn btn-success" value="Add User" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Edit Modal HTML --> */}
                    <div id="editEmployeeModal" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form id="updateModalForm" onSubmit={updateModalForm} method="put">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Edit User</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" className="form-control" name="userName" required />
                                        </div>
                                        
                                        
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" name="password" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" className="form-control" name="phone" required />
                                        </div>

                                        <div className="form-group">
                                            <label>Role</label>
                                            <select name="role" className="form-control"> 
                                                <option value="">Select Role</option>
                                                <option value="Doctor">Doctor</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                        


                                        <div className="form-group">
                                            <p className="text-success" id="updated"></p>
                                            <input type="hidden" name="editid" />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                        <input type="submit" className="btn btn-info" value="Save" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Delete Modal HTML --> */}
                    <div id="deleteEmployeeModal" className="modal fade" onSubmit={deleteModalForm} method="delete">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form>
                                    <div className="modal-header">
                                        <h4 className="modal-title">Delete User </h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to delete these Records?</p>

                                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                                        <input type="hidden" name="deleteid" />
                                        <div className="form-group">
                                            <p className="text-danger" id="deleted"></p>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                        <input type="submit" className="btn btn-danger" value="Delete" />


                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}
