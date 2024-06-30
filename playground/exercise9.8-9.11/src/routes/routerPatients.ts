import express from 'express';
import data from '../../data/patients';
import { PatientEntry } from '../types';

const routerPatients = express.Router();

function getPatientsWithoutSSN(patients: PatientEntry[]): Omit<PatientEntry, 'ssn'>[] {
  return patients.map(({ ssn, ...rest }) => rest);
}

const patientEntries: PatientEntry[] = data;

routerPatients.get('/', (_req, res) => {
  res.json(getPatientsWithoutSSN (patientEntries));
});

export default routerPatients;
