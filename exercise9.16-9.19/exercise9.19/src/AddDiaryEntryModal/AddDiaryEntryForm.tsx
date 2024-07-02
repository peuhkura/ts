import { DiaryEntry, Weather, Visibility } from "../types";
import { RadioGroup, FormControlLabel, Radio, InputLabel, TextField, SelectChangeEvent } from '@mui/material';
import { useState } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryEntry) => void;
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

const AddDiaryEntryForm = ({ onSubmit }: Props) => {
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
    const numericId = Number(0); // TODO id

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
      <TextField
        style={{ marginTop: 10 }}
        label="Date"
        fullWidth
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <InputLabel style={{ marginTop: 10 }}>Weather</InputLabel>
      <RadioGroup
        value={weather}
        onChange={onWeatherChange}
      >
        {weatherOptions.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <InputLabel style={{ marginTop: 10 }}>Visibility</InputLabel>
      <RadioGroup
        value={visibility}
        onChange={onVisibilityChange}
      >
        {visibilityOptions.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
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
