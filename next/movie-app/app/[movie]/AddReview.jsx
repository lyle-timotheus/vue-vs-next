'use client';
import { useState } from 'react';

import LoaderOverlay from '../LoaderOverlay';

const AddReview = ({ movie }) => {
  const [isError, setIsError] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [data, setIsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  var reviewData = {};

  const handleChange = (e) => {
    reviewData = { value: e.target.value };

    var reviewUrl = `https://api.themoviedb.org/3/movie/${movie}/rating?api_key=${process.env.NEXT_PUBLIC_API_KEY}&guest_session_id=${process.env.NEXT_PUBLIC_GUEST_SESSION_ID}`;

    setIsLoading(true);
    fetch(reviewUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setIsReviewed(true);
        console.log('Success:', reviewData);
        setIsData(reviewData);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsReviewed(false);
        setIsError(true);
        console.error('Error:', error);
      });
  };
  console.log(data);
  return (
    <div>
      {isLoading ? <LoaderOverlay /> : null}

      <select
        className="bg-red-200 text-red-800 inline-block my-2 py-2 px-4 rounded-md text-sm"
        onChange={handleChange}
      >
        <option>--- Review movie ---</option>
        <option value="0.5">0.5</option>
        <option value="1.0">1.0</option>
        <option value="1.5">1.5</option>
        <option value="2.0">2.0</option>
        <option value="2.5">2.5</option>
        <option value="3.0">3.0</option>
        <option value="3.5">3.5</option>
        <option value="4.0">4.0</option>
        <option value="4.5">4.5</option>
        <option value="5.0">5.0</option>
        <option value="5.5">5.5</option>
        <option value="6.0">6.0</option>
        <option value="6.5">6.5</option>
        <option value="7.0">7.0</option>
        <option value="7.5">7.5</option>
        <option value="8.0">8.0</option>
        <option value="8.5">8.5</option>
        <option value="9.0">9.0</option>
        <option value="9.5">9.5</option>
        <option value="10.0">10.0</option>
      </select>
      <h2>
        Your Rating:{' '}
        <span className="text-green-400 font-bold	">{data.value}</span>
      </h2>
      <div>
        {isReviewed ? (
          <p className="text-green-400 font-extrabold">
            Success! Movie review submitted! ⭐️
          </p>
        ) : (
          ''
        )}
        {isError ? (
          <p className="text-red-400 font-extrabold">
            An error occured! Please try again. 💥
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AddReview;
