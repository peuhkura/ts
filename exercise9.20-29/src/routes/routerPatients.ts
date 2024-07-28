import express from 'express';
import jsonData from '../../data/patients';
import { HealthCheckEntry, HospitalEntry, HospitalEntryRaw, OccupationalHealthcareEntry, Entry, PatientEntry, NewPatientEntry, Gender, parseGender } from '../types';
import { v4 as uuidv4 } from 'uuid';

const routerPatients = express.Router();

function mapPatientEntryToNew(patientEntries: PatientEntry[]): NewPatientEntry[] {
  console.log(`DEBUG: patient entries mapping.`);
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
  console.log(`DEBUG GET:`);
  if (patientId !== null && typeof patientId === 'string') {
    //console.log(`Return only id: ${patientId}`);

    // Function to find object by ID
    const findById = (id: string) => {
        return newPatientEntries.find(item => item.id === id);
    };

    // Call findById function and send response using res.json
    const result = findById(patientId);
    console.log(`Return single patient id: ${JSON.stringify(result)}`);
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

const isValidHealthCheckEntry = (entry: unknown): entry is HealthCheckEntry => {
  return (entry as HealthCheckEntry).healthCheckRating !== undefined;
};

const isValidOccupationalHealthcareEntry = (entry: unknown): entry is OccupationalHealthcareEntry => {
  return (entry as OccupationalHealthcareEntry).employerName !== undefined;
};

const isValidHospitalEntry = (entry: unknown): entry is HospitalEntry => {
  return (entry as HospitalEntry).discharge !== undefined;
};

// Define a route for getting entries for a specific patient by ID
routerPatients.post('/:id/entries', (req, res) => {


  const entry = req.body as Entry;
  const patientId = req.params.id;
  const findById = (id: string) => {
    return newPatientEntries.find(item => item.id === id);
  };

  if (entry.description == '') { res.status(400).send({ error: 'Add description' }); }
  else if (entry.date == '') { res.status(400).send({ error: 'Add date' }); }
  else if (entry.specialist == '') { res.status(400).send({ error: 'Add specialist' }); }

  switch (entry.type) {
    case "HealthCheck": // Process HealthCheckEntry
      if (isValidHealthCheckEntry(entry)) {
        console.log('DEBUG Received HealthCheckEntry:', entry);
        const { description, date, specialist, type, healthCheckRating } = req.body as HealthCheckEntry;

        const newUuid = uuidv4();
        const result = findById(patientId);

        if (result !== undefined) {
          result.entries.push({ id: newUuid, description: description, date: date, specialist: specialist, type: type, healthCheckRating: healthCheckRating });
          console.log('DEBUG result:', result);
          const entryArray: NewPatientEntry[] = [];
          entryArray.push(result);
          res.json(transformNewPatientsResultWithSsn (entryArray));
        }
        res.status(400).send({ error: 'Backend error (HealthCheck entry)' });
      } else {
        res.status(400).send({ error: 'Invalid HealthCheckEntry' });
      }
      break;
    case "OccupationalHealthcare": // Process OccupationalHealthcareEntry
      if (isValidOccupationalHealthcareEntry(entry)) {
        console.log('DEBUG Received OccupationalHealthcareEntry:', entry);
        if (entry.employerName == '') { res.status(400).send({ error: 'Add employer name' }); }

        const newUuid = uuidv4();
        const result = findById(patientId);
        const { description, date, specialist, type, employerName } = req.body as OccupationalHealthcareEntry;

        if (result !== undefined) {

          //let tmp: Entry =  { description: description, date: date, specialist: specialist, type: type }
          result.entries.push({ id: newUuid, description: description, date: date, specialist: specialist, type: type, employerName: employerName });
          console.log('DEBUG result:', result);
          const entryArray: NewPatientEntry[] = [];
          entryArray.push(result);
          res.json(transformNewPatientsResultWithSsn (entryArray));
        }
      } else {
        res.status(400).send({ error: 'Invalid OccupationalHealthcareEntry' });
      }
      break;
    case "Hospital": // Process HospitalEntry
      if (isValidHospitalEntry(entry)) {
       
        console.log('DEBUG Received HospitalEntry:', entry);

        const newUuid = uuidv4();
        const result = findById(patientId);
        const { description, date, specialist, type, diagnosisCodes, discharge } = req.body as HospitalEntryRaw;
        
        //const input = "apple,banana,cherry";
        const tmp = diagnosisCodes.split(",");

        if (result !== undefined) {
          result.entries.push({ id: newUuid, description: description, 
            date: date, specialist: specialist, type: type, diagnosisCodes: tmp, discharge: discharge });
          console.log('DEBUG result:', result);
          const entryArray: NewPatientEntry[] = [];
          entryArray.push(result);
          res.json(transformNewPatientsResultWithSsn (entryArray));
        }
      } else {
        res.status(400).send({ error: 'Invalid HospitalEntry' });
      }
      break;
    default:
      res.status(400).send({ error: 'Invalid entry type' });
  }
});

routerPatients.post('/', (req, res) => {
  try {
    console.log('DEBUG POST, body:', req.body);
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
