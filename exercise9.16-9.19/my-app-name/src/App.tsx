
import React, { useEffect, useState } from 'react';
import './App.css'

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

type Visibility = 'great' | 'good' | 'ok' | 'poor';

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}


// Define a type for the response data
interface ResponseData {
  // Adjust according to your actual response structure
  id: number;
  name: string;
  // Add other fields as needed
}

const App = () => {
  //
  // Header
  // 
  const name = 'Half Stack application development';

  type HeaderProps = {
    name: string;
  };
  
  const Header: React.FC<HeaderProps> = ({ name }) => (
    <h1>{name}</h1>
  );


  //
  // Result
  //
  return (
    <div>
      <Header name={name} />

    </div>
  )
}

/*
const App: React.FC = () => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with your API endpoint
    const apiUrl = '/api/diaries';

    // Fetch the data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ResponseData) => {
        setData(data);
        console.log('API Response:', data); // Print response to console
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading2...</div>;
  }

  if (error) {
    return <div>Error2: {error} Data {toString(data)}</div>;
  }

  return (
    <div>
      <h1>API Response Data</h1>
      {data ? (
        <div>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
*/
export default App;
