import express from 'express';
import jsonData from '../../data/patients';
import { PatientEntry, NewPatientEntry, Gender, parseGender } from '../types';
import { v4 as uuidv4 } from 'uuid';

const routerPatients = express.Router();

function mapPatientEntryToNew(patientEntries: PatientEntry[]): NewPatientEntry[] {
  return patientEntries.map(entry => ({
    ...entry,
    gender: parseGender(entry.gender), // Convert string to Gender enum
  }));
}

const newPatientEntries: NewPatientEntry[] = mapPatientEntryToNew(jsonData);

//
// GET
//

function transformNewPatientsResult(newPatients: NewPatientEntry[]): Omit<PatientEntry, 'ssn'>[] {
  const tmp = newPatients.map(({ ssn: _ssn, ...rest }) => ({
    ...rest,
  }));

  return tmp.map(({ gender, ...rest }) => ({
    ...rest,
    gender: gender.toString(), // Convert Gender enum to string
  }));
}

function transformNewPatientsResultWithSsn(newPatients: NewPatientEntry[]): Omit<PatientEntry, 'ssn'>[] {
  return newPatients.map(({ gender, ...rest }) => ({
    ...rest,
    gender: gender.toString(), // Convert Gender enum to string
  }));
}

routerPatients.get('/', (req, res) => {
  const patientId = req.query.patientId;
  console.log(`Received: ${patientId}`);
  if (patientId !== null && typeof patientId === 'string') {
    console.log(`Return only id: ${patientId}`);

    // Function to find object by ID
    const findById = (id: string) => {
        return newPatientEntries.find(item => item.id === id);
    };

    // Call findById function and send response using res.json
    const result = findById(patientId);
    console.log(`Return only id: ${JSON.stringify(result)}`);
    const entryArray: NewPatientEntry[] = [];
    if (result !== undefined) {
        entryArray.push(result);
    }
    res.json(transformNewPatientsResultWithSsn (entryArray));
  } else {
    console.log(`Return all ids.`);
    res.json(transformNewPatientsResult (newPatientEntries));
  }
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
  const ssnRegex = /^(\d{2})(\d{2})(\d{2})[A+-](\d{3})(\w{1})$/;

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

  const newUuid = uuidv4();

  const newEntry: NewPatientEntry = {
    id: newUuid,
    name: isNameValid(name),
    dateOfBirth: isDateValid(dateOfBirth),
    ssn: isSSNValid(ssn),
    gender: parseGender(gender),
    occupation: isOccupationValid(occupation),
    entries: []
  };

  newPatientEntries.push(newEntry);
  return newEntry;
};

routerPatients.post('/', (req, res) => {
  try {
    console.log('DEBUG body:', req.body);
    const { name, dateOfBirth, ssn, gender, occupation } = req.body as PatientEntry;

    // Ensure type safety for each field
    if (
      typeof name === 'string' &&
      typeof dateOfBirth === 'string' &&
      typeof ssn === 'string' &&
      Object.values(Gender).includes(gender as Gender) && // Type assertion here
      typeof occupation === 'string'
    ) {
      const addedEntry = setNewPatient(name, dateOfBirth, ssn, gender, occupation);
      res.json(addedEntry);
    } else {
      res.status(400).send('Invalid data');
    }
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
