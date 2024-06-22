function calculateBmi (cm: number, kg: number): string {
  let result: string;
  let bmi: number;
  bmi = 100 * 100 * kg / cm / cm; 
  if (bmi < 18.5) {
    result = `Underweight`;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    result = `Normal (healthy weight)`;
  } else if (bmi >= 25) {
    result = `Overweight`;
  }
  return result;
}

try {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error('Please provide at least two arguments.');
  }
  const arg1 = parseFloat(args[0]);
  const arg2 = parseFloat(args[1]);
  if (isNaN(arg1) || isNaN(arg2)) {
    throw new Error(`Both arguments should be valid numbers.`);
  }

  console.log(calculateBmi(arg1, arg2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
