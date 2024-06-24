import express from 'express';
import { calculateBmi } from './bmicalculator';
import { calculator, Operation } from './calculator';

const app = express();
const port = 3003;

/*
curl -X POST \
  http://localhost:3003/exercises \
  -H 'Content-Type: application/json' \
  -d '{
    "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
  }'
*/

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1)) ) {
    return res.status(400).send({ error: '...'});
  }

  // more validations here...

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //let operation: Operation = op;
  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

app.get('/bmi', (req, res) => {

  try {
    const tmpCm = req.query.height as string;
    const tmpKg = req.query.weight as string;
    const cm = parseFloat(tmpCm);
    const kg = parseFloat(tmpKg);
    if (isNaN(cm) || isNaN(kg)) {
      throw new String("malformatted parameters");
    }

    let result: string = '';
    result = calculateBmi(cm, kg);

    const responseData = {
        weight: kg,
        height: cm,
        bmi: result
    };
    res.send(responseData);
  } catch (error) {
    let tmp: string = 'Unknown exception.';
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