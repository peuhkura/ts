// src/App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import diariesService from './services/diaries';
import { DiaryEntry, Weather, Visibility } from './types';
import { Button } from '@mui/material';
import AddDiaryEntryModal from './AddDiaryEntryModal';
import axios from "axios";

/*
interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}
*/

const App: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | undefined>();

  const openModal = () => {
    setModalOpen(true);
    console.log('Open modal');
  };
  
  const closeModal = (): void => {
    setModalOpen(false);
    setSubmissionError(undefined);
  };

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await diariesService.getAll();
      setEntries(response);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch diary entries');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const validateEntry = (entry: DiaryEntry): string | null => {
    if (!entry.date) return "Date is required";
    if (!entry.weather || !Object.values(Weather).includes(entry.weather)) return "Valid weather is required";
    if (!entry.visibility || !Object.values(Visibility).includes(entry.visibility)) return "Valid visibility is required";
    if (!entry.comment) return "Comment is required";
    return null;
  };
  
  const submitDiaryEntry = async (entry: Omit<DiaryEntry, 'id'>) => {
    const validationError = validateEntry(entry);
    if (validationError) {
      setSubmissionError(validationError);
      return;
    }

    try {
      await diariesService.create(entry);
      fetchEntries(); // Re-fetch entries after successful submission
      setModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data && typeof error.response?.data === 'string') {
          const message = error.response.data.replace('Something went wrong. Error: ', '');
          setSubmissionError(message);
        } else {
          setSubmissionError('Unrecognized axios error');
        }
      } else {
        setSubmissionError('Unknown error');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="App">
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
      <AddDiaryEntryModal
        modalOpen={modalOpen}
        onSubmit={submitDiaryEntry}
        error={submissionError}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={openModal}>
        Add New Diary Entry
      </Button>
    </div>
  );
};


export default App
