import express from 'express';
import data from '../../data/patients';
import { PatientEntry, NewPatientEntry, Gender } from '../types';
import { v4 as uuidv4 } from 'uuid';

const routerPatients = express.Router();

const isGender = (param: unknown): param is Gender => {
  if (typeof param === 'string') {
    const stringValue: string = param;
    return Object.values(Gender).map(v => v.toString()).includes(stringValue);
  } 
  console.log('Unknown value is not a string');
  return false;
};

const parseGender = (value: unknown): Gender => {
  if (!value || !isGender(value)) {
      throw new String('Incorrect or missing gender: ' + value);
  }
  return value;
};

function mapPatientEntryToNew(patientEntries: PatientEntry[]): NewPatientEntry[] {
  return patientEntries.map(entry => ({
    ...entry,
    gender: parseGender(entry.gender), // Convert string to Gender enum
  }));
}

const newPatientEntries: NewPatientEntry[] = mapPatientEntryToNew(data);

//
// GET
//

function transformNewPatientsResult(newPatients: NewPatientEntry[]): Omit<PatientEntry, 'ssn'>[] {
  let tmp = newPatients.map(({ ssn, ...rest }) => ({
    ...rest,
  }));

  return tmp.map(({ gender, ...rest }) => ({
    ...rest,
    gender: gender.toString(), // Convert Gender enum to string
  }));
}

routerPatients.get('/', (_req, res) => {
  res.json(transformNewPatientsResult (newPatientEntries));
});

//
// POST
//

const isNameValid = (param: unknown): string => {
  if (param && typeof param === 'string') {
    const stringValue: string = param;
    return stringValue;
  } 
  console.log('Name is not a string');
  throw Error("Name fail.");
  return '';
};

function isDateValid(date: string): string {
  if (!(date && typeof date === 'string' && Date.parse(date))) {
    console.log('Date is not valid.');
    throw Error("Date fail.");
  } 
  return date;
}

function isSSNValid(ssn: string): string {
  // Regular expression to match Finnish SSN format
  const ssnRegex = /^(\d{2})(\d{2})(\d{2})[A+\-](\d{3})(\w{1})$/;

  // Check if the SSN matches the format

  const match = ssn.match(ssnRegex);
  if (!match) {
    console.log('SSN is not valid.');
    throw Error("SSN fail.");
  }
  return ssn;
}

const isOccupationValid = (param: unknown): string => {
  if (param && typeof param === 'string') {
    const stringValue: string = param;
    return stringValue;
  } 
  console.log('Occupation is not a string');
  throw Error("Occupation fail.");
  return '';
};

const setNewPatient = 
  (name: string,
    dateOfBirth: string, 
    ssn: string,
    gender: string,
    occupation: string): 
  PatientEntry => {

  const newUuid = uuidv4()

  const newEntry: NewPatientEntry = {
    id: newUuid,
    name: isNameValid(name),
    dateOfBirth: isDateValid(dateOfBirth),
    ssn: isSSNValid(ssn),
    gender: parseGender(gender),
    occupation: isOccupationValid(occupation)
  };

  //const result: NewPatientEntry = newEntry;
  newPatientEntries.push(newEntry);
  return newEntry;
};

routerPatients.post('/', (req, res) => {
  try {
    console.log('DEBUG body:', req.body);
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    const addedEntry = setNewPatient(name, dateOfBirth, ssn, gender, occupation);
    res.json(addedEntry);
  } catch (error) {
    console.log('Something went wrong.');

    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default routerPatients;
