import express from 'express';
import data from '../../data/patients';
import { PatientEntry, NewPatientEntry, Gender, isValidDate, isString, isValidSSN, isValidSex } from '../types';
import { v4 as uuidv4 } from 'uuid';

const routerPatients = express.Router();

function getPatientsWithoutSSN(patients: PatientEntry[]): Omit<PatientEntry, 'ssn'>[] {
  return patients.map(({ ssn, ...rest }) => rest);
}

const patientEntries: PatientEntry[] = data;

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
      throw new Error('Incorrect or missing gender: ' + value);
  }
  return value;
};

function mapPatientEntryToNew(patientEntries: PatientEntry[]): NewPatientEntry[] {
  return patientEntries.map(entry => ({
    ...entry,
    gender: parseGender(entry.gender), // Convert string to Gender enum
  }));
}

const newPatientEntries: NewPatientEntry[] = mapPatientEntryToNew(patientEntries);

const toNewPatientEntry = (object: PatientEntry): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('id' in object 
    && 'name' in object 
    && 'dateOfBirth' in object
    && 'ssn' in object
    && 'gender' in object
    && 'occupation' in object) {

    const newEntry: NewPatientEntry = {
      id: (object.id),
      name: (object.name),
      dateOfBirth: (object.dateOfBirth),
      ssn: (object.ssn),
      gender: parseGender(object.gender),
      occupation: (object.occupation)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

routerPatients.get('/', (_req, res) => {
  res.json(getPatientsWithoutSSN (patientEntries));
});

const setNewPatient = 
  (name: string,
    dateOfBirth: string, 
    ssn: string,
    gender: string,
    occupation: string): 
  PatientEntry => {

  const newUuid = uuidv4()

  const newPatientEntry = {
    id: newUuid,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patientEntries.push(newPatientEntry);
  newPatientEntries.push(toNewPatientEntry(newPatientEntry));
  return newPatientEntry;
};


routerPatients.post('/', (req, res) => {
  try {
    console.log('DEBUG body:', req.body);
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    if (isString(name) && isValidDate(dateOfBirth) && isValidSSN(ssn) && isValidSex(gender) && isString(occupation)) {
      const addedEntry = setNewPatient(name, dateOfBirth, ssn, gender, occupation);
      res.json(addedEntry);
    }

  } catch (error) {
    let tmp: string = 'unknown exception';
    if (isString(error)) {
      let stringValue: string = error as string;
      tmp = stringValue;
    }

    const responseData = {
        error: tmp
    };
    res.send(responseData);
  }
});

export default routerPatients;
