import React, { useState } from 'react';
import { verifyToken } from '../auth';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import Rating from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom';

export default function MovieRating() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Add logic to submit the rating and comment
    if(rating && comment) {
      console.log(rating)
      console.log(comment)
      console.log(movie_id)
      const requestBody = {
        _id: "",
        movie_id: movie_id,
        user_id: _id,
        comment: comment,
        date: Date.now(),
      };
    }
    // Navigate or perform any other actions as needed
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
