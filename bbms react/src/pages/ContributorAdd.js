import React from 'react'
import Top from './Dashboard/inc/Top'

function FormToJSON(ourForm) {


    const data = new FormData(ourForm);

    const formJSON = Object.fromEntries(data.entries());

    // for multi-selects, we need special handling

    return formJSON;

}


export default function ContributorAdd() {

    function addModalForm(e) {
        e.preventDefault()

        fetch('http://localhost:8075/api/contributors', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormToJSON(document.getElementById("addModalForm")))
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                document.getElementById("Added").innerHTML = "You are added";
                setTimeout(function(){
                    window.location.reload();
                },700)

            });
    }



    return (
        <div>
            <div className="container-fluid">
                <Top name="New Contributor" />

                <div className="container-xl">
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h2>New Blood <b>Contributor</b></h2>
                                    </div>

                                </div>
                            </div>
                            <div className='row'>
                                <form id="addModalForm" onSubmit={addModalForm}>

                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name="name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Blood Group</label>
                                        <select name="blood_group" className="form-control">
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
                                        <label>Address</label>
                                        <textarea className="form-control" name="address" required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" className="form-control" name="phone" required />
                                    </div>


                                    <div className="form-group">
                                        <p className="text-success" id="Added"></p>
                                    </div>


                                    <input type="submit" className="btn btn-success" value="Add Contributor" />


                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
