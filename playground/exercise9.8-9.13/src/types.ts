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

// Old patient entry

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

// New patient entry

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export function isValidSex(value: string): boolean {
  return typeof value === 'string';
}

export interface NewPatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

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
