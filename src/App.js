// Import Area 

import { useEffect, useState } from "react";



//  Function defination Area 
function App() {
  // Hooks area 
    const [userData, setUserData] = useState([])


  // Methods Area
    useEffect(()=>{
      fetch("http://localhost:1337/api/user-details")
      .then((res)=>{
        return res.json()
      }).then((data)=>{        
          return setUserData(data.data)
      }).catch((err)=>{
        console.log(`Error Occur ${err}`)
      }).finally((finalRes)=>{
        console.log(`finally fetching done`)
      })
  },[])
  

  // Delete Function here 
    let deleteFunc =(e)=>{
      let colDelete = e.target.closest('tr')
      // conformation for the delete task
      let ans = window.confirm('do you really want to delete')
      let deleteId = e.target.closest('tr').querySelector("td:first-child").innerHTML
      fetch(`http://localhost:1337/api/user-details/${deleteId}`,{method:"DELETE"})
      .then((res)=>{
        return res.json()
      }).then((data)=>{
            colDelete.remove()
            console.log(data)
      }).catch((err)=>{
        console.log(err)
      }).finally((final)=>{
        console.log(final)
      })
    }
  // return area 
  return (
    <>
        <table className="table table-striped container">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Role</th>
                <th scope="col">Emailid</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                userData.map((cv,index,arr)=>{
                    return  <tr key={index}>
                                <td>{cv.id}</td>
                                <td>{cv.attributes.firstName}</td>
                                <td>{cv.attributes.Role}</td>
                                <td>{cv.attributes.Emailid}</td>
                                <td>
                                  <button className="btn btn-success btn-sm">View</button>
                                  <button className="btn btn-primary btn-sm">Edit</button>
                                  <button className="btn btn-danger btn-sm" onClick={(e)=>{deleteFunc(e)}}>Delete</button>
                                </td>
                            </tr>
                })
              }

                  
            </tbody>
        
        </table>
    </>
  );
}
// Export Area  
export default App;
