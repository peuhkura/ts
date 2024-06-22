import express from 'express';
import { calculateBmi } from './bmicalculator';

const app = express();
const port = 3003;

app.get('/bmi', (req, res) => {

  try {
    const tmpCm = req.query.height as string;
    const tmpKg = req.query.weight as string;
    const cm = parseFloat(tmpCm);
    const kg = parseFloat(tmpKg);
    if (isNaN(cm) || isNaN(kg)) {
      throw new Error("malformatted parameters");
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
    const responseData = {
        error: error.message
    };
    res.send(responseData);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});