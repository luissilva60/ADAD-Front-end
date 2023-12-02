import React, { useEffect, useState } from 'react';
import { verifyToken } from '../auth';
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
import {useCookies} from "react-cookie"; // Assuming the path is correct

const App = () => {
    const [userData, setUserData] = useState(null);
    const [cookies, removeCookie] = useCookies(['auth']);
    useEffect(() => {
        const fetchData = async () => {
            // Retrieve authentication token from the cookie
            const authToken = cookies.auth;

            // Check if the token exists
            if (authToken) {
                try {
                    // Use verifyToken function to validate the token and get user data
                    const { isValid, user } = await verifyToken(authToken);
                    console.log(isValid);
                    console.log(user);
                    if (isValid) {
                        setUserData(user[0]);
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAASADSASDSASADASD", user);
                    } else {
                        // Handle invalid token (optional)
                        console.error('Invalid token');
                    }
                } catch (error) {
                    // Handle errors from the verifyToken function
                    console.error('Error verifying token:', error);
                }
            } else {
                // Handle the case where the token doesn't exist (optional)
                console.error('Token not found');
            }
        };

        fetchData(); // Invoke the function immediately

        // Empty dependency array to run the effect only once
    }, [cookies.auth]);
    // Empty dependency array to run the effect only once

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
                <p className="text-muted mb-1">UserID: {userData._id}</p>
                <p className="text-muted mb-1">Occupation: {userData.occupation}</p>
                <p className="text-muted mb-4">Gender: {userData.gender}</p>
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
              {userData.movies && userData.movies.length > 0 && (
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <h5 className="d-flex justify-content-center mb-4">Movies Rated by {userData.name}</h5>
                    {userData.movies.map((movie, index) => (
                      <MDBCard key={index} className="mb-3">
                        <MDBCardBody>
                          <h6 className="card-title">
                            <p>Movie: {movie.movieDetails[0].title}</p>
                            <p>Movie ID: {movie.movieid} &ensp; &ensp; &ensp; Rating: {movie.rating}
                            <img
                            src="https://mario.wiki.gallery/images/4/41/Artwork_-_SUPER_STAR.svg"
                            style={{ width: 'auto', height: '2em', marginLeft: '5px', marginBottom:"10px"}}
                          /></p>
                            <p>Year: {movie.movieDetails[0].ano}</p>
                            <p>Genres : {movie.movieDetails[0].genres}</p>
                          </h6>  
                        </MDBCardBody>
                      </MDBCard>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              )}
            </MDBCol>
          </MDBRow>
          </MDBCol>
        </>
        )}
        </MDBRow>
      </MDBContainer>
    </section>
    );
};

export default App;
