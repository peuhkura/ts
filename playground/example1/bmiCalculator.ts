interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

// Optimal weight: 18.5 to 24.9 (Ref: https://en.wikipedia.org/wiki/Body_mass_index)
const calculateBmi = (valueCm: number, valueKg: number) => {
  let bmi = valueKg * 100 * 100 / valueCm / valueCm;
  if (bmi >= 18.5 && bmi <= 24.9) {
     console.log('Normal (healthy weight)'); 
  } else {
     console.log('Not normal'); 
  }
}

try {
  // const { value1, value2 } = parseArguments(process.argv);
  let valueCm = 187;
  let valueKg = 80;
  calculateBmi(valueCm, valueKg);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
