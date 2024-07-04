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
// Backend patient entry (string only)
//
export interface Diagnosis {
  code: string
}
export interface BaseEntry {
  id: string;
  type: string;
  description: string;
  date: string;
  specialist: string;
  sickLeave?: string[];
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string
}

export interface Discharge {
  date: string;
  criteria: string;
}
export interface HospitalEntry extends BaseEntry {
  diagnosisCodes: string[];
  discharge?: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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

export const isGender = (param: unknown): param is Gender => {
  if (typeof param === 'string') {
    const stringValue: string = param;
    return Object.values(Gender).map(v => v.toString()).includes(stringValue);
  } 
  console.log('Unknown value is not a string');
  return false;
};

export const parseGender = (value: unknown): Gender => {
  if (!value || !isGender(value)) {
      throw new String('Incorrect or missing gender: ' + value);
  }
  return value;
};

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
