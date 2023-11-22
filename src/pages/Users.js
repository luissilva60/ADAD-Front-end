import React, {useState, useEffect} from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';

import UserCard from "../components/UserCard";


export default function App() {
  let [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch('https://api-adad-e27e767b86bc.herokuapp.com/users', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
      });
      
      const data = await response.json();
      setUsers(data);

    } catch (error) {
      console.error('Error:', error);
    }
  }


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container pt-5 pb-5">
      <h2>Users</h2>
        <CardGroup>
            <Row xs={1} md={2} className="d-flex justify-content-around">
            {users && users.map((user) => {
                return (
                    <UserCard 
                        key={user._id} 
                        {...user}
                    />
                );
            })}
            </Row>
        </CardGroup>
    </div>
  )
}