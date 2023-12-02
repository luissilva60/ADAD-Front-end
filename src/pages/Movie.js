import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import { openContractCall } from "@stacks/connect";
import { bufferCV } from "@stacks/transactions";
import { utf8ToBytes } from "@stacks/common";
import { userSession } from "../auth";
import "../App.css";

const bytes = utf8ToBytes("foo");
const bufCV = bufferCV(bytes);

export default function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const navigateToMovieRat = () => {
    navigate('/movierating/' + movieData._id);
  };

  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api-adad-e27e767b86bc.herokuapp.com/movies/${id}`
        );
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const submitMessage = async (e, movieId) => {
    e.preventDefault();

    const functionArgs = [bufCV];

    const options = {
      contractAddress: 'STAZ0PNVXVHEM7R4XF5EZ4SS5JFM1ZMAJRPZGVK0',
      contractName: 'upper-teal-fox',
      functionName: 'test-emit-event',
      functionArgs: [],
      appDetails: {
        name: 'Movies App Rating',
        icon: window.location.origin + '/my-app-logo.svg',
      },
      onFinish: async (data) => {
        console.log('Stacks Transaction:', data.stacksTransaction);
        console.log('Transaction ID:', data.txId);
        console.log('Raw transaction:', data.txRaw);

        // Post the transaction ID to the specified endpoint
        try {
          const response = await fetch(`https://api-adad-e27e767b86bc.herokuapp.com/movies/addTransactionId/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ txId: data.txId }),
          });

          if (response.ok) {
            console.log('Transaction ID posted successfully.');
          } else {
            console.error('Failed to post Transaction ID:', response.status);
          }
        } catch (error) {
          console.error('Error posting Transaction ID:', error.message);
        }
      },
    };

    const response = await openContractCall(options);
  };

  return (
    <div className="movie-details-container dark-theme">
      {/* Movie Title */}
      <h2 className="movie-title">Movie</h2>
      <p></p>

      {/* Movie Card */}
      {movieData && (
      <>
      <MDBCard className="dark-card movie-card">
        <MDBCardBody>
              {/* Movie Header with Title and Image */}
              <div className="movie-details-header">
                <MDBCardTitle>
                  <h3 className="movie-main-title">
                    Título: {movieData.title}
                  </h3>
                </MDBCardTitle>
                <img src="../movie.jpg" className="movie-image"/>
              </div>
              <p></p>
              <p></p>

              {/* Movie Details - Genre, Year, Average Score */}
              <div className="movie-details-details">
                <MDBCardSubTitle>
                  <h5>Genre: {movieData.genres}</h5>
                </MDBCardSubTitle>
                <MDBCardSubTitle>
                  <h5>Year: {movieData.year || movieData.ano}</h5>
                </MDBCardSubTitle>
                <MDBCardSubTitle>
                  <h5>Average Score: {movieData.avgScore}</h5>
                </MDBCardSubTitle>
              </div>

              {/* Movie Comments */}
              {movieData.comments && movieData.comments.length > 0 && (
                <div className="movie-details-comments">
                  <h3>
                    <p>Comments:</p>
                  </h3>
                  {movieData.comments.map((c, index) => (
                    <MDBCardSubTitle key={index}>
                      <h5>- {c.comment}</h5>
                    </MDBCardSubTitle>
                  ))}
                </div>
              )}
            
        </MDBCardBody>
        <div className="d-flex justify-content-center mb-2">
          <button onClick={navigateToMovieRat} href={"/movierating/" + movieData._id} className='button-76' tag="h10">Rate Movie</button>
        </div>
      </MDBCard>
      </>
      )}


      {/* Blockchain Transaction Link */}
      {userSession.isUserSignedIn() && (
        <a href="#" onClick={submitMessage} className="blockchain-link">
          Blockchain transaction
        </a>
      )}
    </div>
  );
}
