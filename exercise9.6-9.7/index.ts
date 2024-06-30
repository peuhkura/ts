import express from 'express';

import { calculateExercises, Exercise } from './exercisecalculator';
const app = express();
const port = 3003;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function areAllNumbers(arr: Array<number>) {
  for (const element of arr) {
      if (typeof element !== 'number' || isNaN(element)) {
          return false;
      }
  }
  return true;
}

interface ExerciseRequestBody {
  daily_exercises: Array<number>;
  target: number;
}

app.post('/exercises', (req, res) => {
  try {
    const body = req.body as ExerciseRequestBody;
    console.log('DEBUG body:', body);

    // Check parameters
    if (body.daily_exercises == undefined
      || body.daily_exercises.length < 2
      || body.target == undefined) {
      throw String("parameters missing");
    }
    if (!areAllNumbers(body.daily_exercises)
      ||
      (typeof body.target !== 'number' || isNaN(body.target))) {

      throw String("malformatted parameters");
    }

    const tmp: Exercise = calculateExercises(body.daily_exercises, body.target);
    res.send(tmp);
  } catch (error) {
    let tmp: string = 'unknown exception';
    if (isString(error)) {
      tmp = error;
    }

    const responseData = {
        error: tmp
    };
    res.send(responseData);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});