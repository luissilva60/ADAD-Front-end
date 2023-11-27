import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import UserPage from '../pages/User';
    
export default function PersonalProfile(props) {
    const navigate = useNavigate();
    const navigateToUser = () => {
        navigate('/user/' + props._id);
      };
  return (
    <section className="vh-50" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-20">
          <MDBCol lg="15" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    {props.gender === 'F' ? (
                        <MDBCardImage 
                        src="https://cdn-icons-png.flaticon.com/512/6214/6214743.png"
                        alt="Female Avatar"
                        className="my-5"
                        style={{ width: '80px' }}
                        fluid
                        />
                    ) : (
                        <MDBCardImage 
                        src="https://cdn-icons-png.flaticon.com/512/3001/3001764.png"
                        alt="Male Avatar"
                        className="my-5"
                        style={{ width: '80px' }}
                        fluid
                        />
                    )}
                  <MDBTypography tag="h5">{props.name}</MDBTypography>
                  <MDBCardText>Occupation: {props.occupation}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">User Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{props.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Age</MDBTypography>
                        <MDBCardText className="text-muted">{props.age}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Number of Ratings</MDBTypography>
                        <MDBCardText className="text-muted">{props.num_ratings}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted">{props.gender}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-0 mb-4" />
                    <MDBCol size="10" className="mb-3">
                        <button onClick={navigateToUser} href={"/user/" + props._id} className='button-74' tag="h10">VER UTILIZADOR</button>
                      </MDBCol>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}