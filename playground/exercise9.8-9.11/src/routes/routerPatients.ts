import express from 'express';
import data from '../../data/patients';
import { PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const routerPatients = express.Router();

function getPatientsWithoutSSN(patients: PatientEntry[]): Omit<PatientEntry, 'ssn'>[] {
  return patients.map(({ ssn, ...rest }) => rest);
}

const patientEntries: PatientEntry[] = data;

routerPatients.get('/', (_req, res) => {
  res.json(getPatientsWithoutSSN (patientEntries));
});
7
/*
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;*/

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
  return newPatientEntry;
};

routerPatients.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = setNewPatient(
    name, dateOfBirth, ssn, gender, occupation
  );
  res.json(addedEntry);
});

export default routerPatients;
