import React, {useState, useEffect} from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
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


  const deleteUser = async() => {
    try {
      // Make a DELETE request to the server
      const response = await fetch(`https://api-adad-e27e767b86bc.herokuapp.com/users/${userData._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uS2V5IjoxMSwiaWF0IjoxNzAxMTczMDk0LCJleHAiOjE3MDExNzY2OTR9.WtBwVNHAz-yknSy7Wi6gi3IBuKrks7KnoyQdEF4tg_I'
          // Add any additional headers if needed (e.g., authorization token)
        },
      });

      if (response.ok) {
        // Handle successful deletion, update UI or perform additional actions
        console.log('User deleted successfully');    
      } else {
        // Handle errors, maybe show an error message to the user
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
 };

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
    
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
        {userData && (
        <>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
              {userData.gender === 'F' ? (
                        <MDBCardImage 
                        src="https://cdn-icons-png.flaticon.com/512/6214/6214743.png"
                        alt="Female Avatar"
                        className="my-5"
                        style={{ width: '150px' }}
                        fluid
                        />
                    ) : (
                        <MDBCardImage 
                        src="https://cdn-icons-png.flaticon.com/512/3001/3001764.png"
                        alt="Male Avatar"
                        className="my-5"
                        style={{ width: '150px' }}
                        fluid
                        />
                    )}
                <p className="text-muted mb-1">Occupation: {userData.occupation}</p>
                <p className="text-muted mb-4">Gender: {userData.gender}</p>
                <div className="d-flex justify-content-center mb-2">
                    <button onClick={deleteUser} className='button-75' tag="h10">Apagar Utilizador</button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.age}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>                  
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

        </MDBCol>
        </>
        )}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}