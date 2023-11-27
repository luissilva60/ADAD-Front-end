import React, {useState, useEffect} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink
} from 'mdb-react-ui-kit';
import { useParams, useNavigate } from "react-router-dom";
import { openContractCall } from '@stacks/connect';
import {
  bufferCV,
} from '@stacks/transactions';
import { utf8ToBytes } from '@stacks/common';
import { userSession } from '../auth';


const bytes = utf8ToBytes('foo'); 
const bufCV = bufferCV(bytes);

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://api-adad-e27e767b86bc.herokuapp.com/users/${id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const submitMessage = async (e) => {
    e.preventDefault();

    const functionArgs = [
      bufCV
    ];

    const options = {
      contractAddress: '',
      contractName: '',
      functionName: 'set-value',
      functionArgs,
      appDetails: {
        name: 'Movies App Rating',
        icon: window.location.origin + '/my-app-logo.svg',
      },
      onFinish: data => {
        console.log('Stacks Transaction:', data.stacksTransaction);
        console.log('Transaction ID:', data.txId);
        console.log('Raw transaction:', data.txRaw);

        window.location.reload();
      },
    };

    const response = await openContractCall(options);
    
  };

  return (
    <div className="container pt-5 pb-5">
      <h2>User</h2>
      <p></p>
     
      {/* <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardSubTitle>Card subtitle</MDBCardSubTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </MDBCardText>
          <MDBCardLink href='#'>Card link</MDBCardLink>
          <MDBCardLink href='#'>Another link</MDBCardLink>
        </MDBCardBody>
      </MDBCard> */}
  
      {userSession.isUserSignedIn() ? <a href="#" onClick={submitMessage}>Blockchain transaction</a> : null}

      {userData && (
        <div>
          <h3>{userData.name}</h3>
          <p>Email: {userData.email}</p>
          {/* Render other user details as needed */}
        </div>
      )}
    </div>
  );
}