import { DiaryEntry, Weather, Visibility } from "../types";
import { TextField, InputLabel, Select, SelectChangeEvent, MenuItem, Typography } from '@mui/material';
import { useState, SyntheticEvent } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryEntry) => void;
  error: string | undefined;
}

interface WeatherOption{
  value: Weather;
  label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
  value: v, label: v.toString()
}));

interface VisibilityOption{
  value: Visibility;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
  value: v, label: v.toString()
}));

const AddDiaryEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [id, setId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [visibility, setVisibility] = useState(Visibility.Poor);
  const [comment, setComment] = useState<string>('');

  const onWeatherChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const tmp = Object.values(Weather).find(g => g.toString() === value);
      if (tmp) {
        setWeather(tmp);
      }
    }
  };

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
    const w = Number(id);

    onSubmit({
      id: numericId,
      date,
      weather,
      visibility,
      comment
    });
  };

  return (
    {error && <Typography color="error">{error}</Typography>}
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <TextField style={{ marginTop: 10 }}
        label="Id"
        fullWidth
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <TextField style={{ marginTop: 10 }}
        label="Date"
        fullWidth
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <InputLabel style={{ marginTop: 10 }}>Weather</InputLabel>
        <Select
          label="Weather"
          fullWidth
          value={weather}
          onChange={onWeatherChange}
        >
        {weatherOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
      <InputLabel style={{ marginTop: 10 }}>Visibility</InputLabel>
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
      <TextField style={{ marginTop: 10 }}
        label="Comment"
        fullWidth
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button  style={{ marginTop: 20 }} type="submit">Submit</button>
    </form>
  );
};

export default AddDiaryEntryForm;
