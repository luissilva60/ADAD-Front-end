import React, { useState, useEffect } from "react";
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

export default function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api-adad-e27e767b86bc.herokuapp.com/movies/${id}`);
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
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
      <h2>MOVIE</h2>
      <p></p>

      <MDBCard>
        <MDBCardBody>
          {movieData && (
            <>
              <MDBCardTitle><h3>Título: {movieData.title}</h3></MDBCardTitle>
              <p></p><p></p>
              <MDBCardSubTitle><h5>Genre: {movieData.genres}</h5></MDBCardSubTitle>
              <MDBCardSubTitle><h5>Year: {movieData.year || movieData.ano}</h5></MDBCardSubTitle>
              <MDBCardSubTitle><h5>Average Score: {movieData.avgScore}</h5></MDBCardSubTitle> <p></p>
              <h3><p>Comments:</p></h3>
              {movieData.comments.map(c => {
                return (<MDBCardSubTitle><h5>-  {c.comment}</h5></MDBCardSubTitle>)
              })}
            </>
          )}
        </MDBCardBody>
      </MDBCard>

      {userSession.isUserSignedIn() ? <a href="#" onClick={submitMessage}>Blockchain transaction</a> : null}
    </div>
  );
}