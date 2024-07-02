import { DiaryEntry, Weather, Visibility } from "../types";
import { TextField, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState, SyntheticEvent } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryEntry) => void;
}

interface VisibilityOption{
  value: Visibility;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
  value: v, label: v.toString()
}));

const AddDiaryEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [id, setId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [visibility, setVisibility] = useState(Visibility.Poor);
  const [comment, setComment] = useState<string>('');

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const tmp = Object.values(Visibility).find(g => g.toString() === value);
      if (tmp) {
        setVisibility(tmp);
      }
    }
  };


  const handleSubmit = () => {
    // Convert id to a number before submitting
    const numericId = Number(id);

    onSubmit({
      id: numericId,
      date,
      weather,
      visibility,
      comment
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {/* Your form inputs for id, date, weather, visibility, and comment */}
      <p>MORO</p>
      <TextField
        label="Id"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <TextField
        label="Date"
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Weather"
        type="text"
        value={weather}
        onChange={(e) => setWeather(Weather.Cloudy)}
      />
      <InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
        <Select
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={onVisibilityChange}
        >
        {visibilityOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
      <TextField
        label="Comment"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddDiaryEntryForm;


/*

import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption{
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Name"
          fullWidth 
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          label="Social security number"
          fullWidth
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
        />
        <TextField
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
        />
        <TextField
          label="Occupation"
          fullWidth
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
        {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;

*/