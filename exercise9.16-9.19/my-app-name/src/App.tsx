// src/App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import AddDiaryEntryModal from './AddDiaryEntryModal';
import { Button } from '@mui/material';
import diariesService from './services/diaries';
import { DiaryEntry } from './types';

const App: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | undefined>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setSubmissionError(undefined);
  };

  const submitDiaryEntry = async (entry: Omit<DiaryEntry, 'id'>) => {
    try {
      await diariesService.create(entry);
      fetchEntries(); // Re-fetch entries after successful submission
      setModalOpen(false);
    } catch (error) {
      setSubmissionError('Submit error: ' + error);
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

export default App;
