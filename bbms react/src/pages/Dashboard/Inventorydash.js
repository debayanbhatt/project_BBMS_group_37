import React, { useEffect, useState } from 'react'
import Sidebar from './inc/Sidebar'
import Top from './inc/Top'

export default function Inventorydash() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsrequest, setItemsrequests] = useState([]);

  function getUniquePart(obj) {

    var arr = Array.from(new Set(obj.map(item => item.blood_group)))
    var ourSum = []
    var blood_group;
    for (var i = 0; i < arr.length; i++) {
      blood_group = arr[i];

      var sum = 0;
      for (var el in obj) {

        if (obj[el].blood_group ===blood_group) {
          sum += parseFloat(obj[el].units);
        }
      }

      ourSum.push({
        blood_group: blood_group,
        units: sum
      })

    }
    return ourSum;
  }
  
  function getUniquePartreg(obj) {

    var arr = Array.from(new Set(obj.map(item => item.blood_group)))
    var ourSum = []
    var blood_group;
    for (var i = 0; i < arr.length; i++) {
      blood_group = arr[i];

      var sum = 0;
      for (var el in obj) {

        if (obj[el].blood_group ===blood_group && obj[el].status ==="approved") {
          sum -= parseFloat(obj[el].units);
        }
      }

      ourSum.push({
        blood_group: blood_group,
        units: sum
      })

    }
    return ourSum;
  }
  
  function checktheEntry(bloodgroup, obj){
    var sum = 0;
     for (var el in obj) {

        if (obj[el].blood_group ===bloodgroup) {
          sum += parseFloat(obj[el].units);
        }
      }
    return sum;
    
}


  function ourReadyTable() {
    fetch("http://localhost:8075/api/donor")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          var getUniqueResult = getUniquePart(result);
          console.log(getUniqueResult)
          setItems(getUniqueResult);
        },
       
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  function ourReadyTableRequests() {
    fetch("http://localhost:8075/api/requests")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          var getUniqueResult = getUniquePartreg(result);
          console.log(getUniqueResult)
          setItemsrequests(getUniqueResult);
        },
      
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    ourReadyTable();
    ourReadyTableRequests();

  }, [])
  return (
    <div>
      <div className="d-flex" id="wrapper">
        <Sidebar />

        <div className="container-fluid">
          <Top name="Inventory" />

          <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2><b>Blood Inventory</b></h2>
                    </div>

                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>


                      <th>Blood Group</th>

                      <th>Units Available</th>

                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>


                        <td>{item.blood_group}</td>

                        <td>{item.units - checktheEntry(item.blood_group, itemsrequest)}</td>
                        

                      </tr>
                    ))}

                  </tbody>
                </table>

              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
