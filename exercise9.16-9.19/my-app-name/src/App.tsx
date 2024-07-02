
import React, { useEffect, useState } from 'react';
import './App.css'
import AddDiaryEntryModal from "./AddDiaryEntryModal";
import { Button } from '@mui/material';

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

type Visibility = 'great' | 'good' | 'ok' | 'poor';

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

const FetchDiaryEntries: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3000/api/diaries')
        .then(response => {
          console.log('Response status:', response.status); // Log response status
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const contentType = response.headers.get('content-type');
          console.log('Content-Type:', contentType); // Log Content-Type
          if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Received content-type isn't JSON");
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched data:', data); // Log the fetched data
          setEntries(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  if (entries.length === 0) return <p>No entries found.</p>; // Handle empty array

  return (
    <div>
      <h1>Diary Entries</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            <p><b>Date: {entry.date}</b></p>
            <p>Weather: {entry.weather}</p>
            <p>Visibility: {entry.visibility}</p>
            <p>Comment: {entry.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitDiaryEntry = async (values: DiaryEntry) => {
    /*try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }*/
  };

  return (
    <div className="App">
      <FetchDiaryEntries />
      <AddDiaryEntryModal
        modalOpen={modalOpen}
        onSubmit={submitDiaryEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Diary Entry
      </Button>
    </div>
  );
}

export default App;
