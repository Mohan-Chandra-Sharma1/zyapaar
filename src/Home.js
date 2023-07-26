import { useEffect, useState } from "react";
import Form from "./register";
import "./Home.css";


const Home = () => {
 
const [users, setUsers] = useState();
    
useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then( res  => res.json())
    .then(data => setUsers(data))
},[])
   
console.log(users);

  const handleDelete = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        setUsers(values => {
          return values.filter(item => item.id !== id)
        })})
    }

    const handleUpdate = id => {
        const user = users.find(user => user.id === id)
    
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then(response => response.json())
          
      }

    return(
        <div className="home">
            <div className="form">
            <Form/>
            </div>
            
            <div className="users">
            {users?.map((user) => (
               <>
               <div className="card">
                
               <input
                type="text"
                value={user.name}
                />

               <input
                type="text"
                value={user.email}
                />

               <input
                type="text"
                value={user.username}
                />

               <button type="button" 
               onClick={handleDelete(users.id)}
               >
               Delete</button>

              <button type="button" 
               onClick={handleUpdate(users.id)}
               >
               Update</button>  

               </div>
               </>
               ))}
            </div>
    

        </div>
    )
}

export default Home;