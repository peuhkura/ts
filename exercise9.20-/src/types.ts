export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
  }

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

//
// Backend patient entry
//

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}


//
// Frontend facing patient entry
//
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface NewPatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<NewPatientEntry, 'ssn' | 'entries'>;

export function isValidSSN(value: string): boolean {
  return typeof value === 'string';
}

export function isValidDate(value: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(value)) {
    return false;
  }

  const date = new Date(value);
  const timestamp = date.getTime();

  if (isNaN(timestamp)) {
    return false;
  }

  return value === date.toISOString().split('T')[0];
}
