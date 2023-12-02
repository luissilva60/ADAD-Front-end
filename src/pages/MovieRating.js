import React, { useState } from 'react';
import { verifyToken } from '../auth';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import Rating from 'react-rating-stars-component';
import {useNavigate, useParams} from 'react-router-dom';
import {useCookies} from "react-cookie";
export default function MovieRating() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [cookies, removeCookie] = useCookies(['auth']);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (rating && comment) {
      try {
        // Retrieve user id from the token
        const token = cookies.auth
        const decodedToken = await verifyToken(token);
        const userId = decodedToken.sessionKey;

        // Create a request body
        const requestBody = {
          userId: userId,
          movieId: id,
          rating: rating,
          comment: comment,
          date: Date.now(),
        };

        // Send a POST request to the specified endpoint
        const response = await fetch('https://api-adad-e27e767b86bc.herokuapp.com//comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          console.log('Comment submitted successfully.');
          // Navigate or perform any other actions as needed
          navigate('/'); // Change the path accordingly
        } else {
          console.error('Failed to submit comment:', response.status);
        }
      } catch (error) {
        console.error('Error submitting comment:', error.message);
      }
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCard>
          <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Rating Form</h3>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md='6'>
                  <p>Rating: </p>
                  <Rating
                    count={5}
                    onChange={handleRatingChange}
                    size={50}
                    id="form1"
                    activeColor="#ffd700"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md='6'>
                  <p>Comment: </p>
                  <MDBInput
                    wrapperClass='mb-4'
                    size='lg'
                    id='form2'
                    type='text'
                    onChange={(e) => setComment(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <button className='button-74' type='submit' size='lg'>Submit</button>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}
