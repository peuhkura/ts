interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function calculateExercises (hours: Array<number>, target: number): Exercise {
  let numberOfDays: number;
  let result: Exercise = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: 'tbd',
    target: target,
    average: 0
  }

  result.periodLength = hours.length;
  for (let i = 0; i < hours.length; i++) {
    if (hours[i] !== 0) {
      result.trainingDays++;
    }
    result.average += hours[i];
  }
  result.average /= hours.length;

  // calculate rating 1-3, 1 if no training days, 2 if some training, 3 target training days
  result.rating = 1;
  result.ratingDescription = 'cheer up';
  if (result.target == result.trainingDays) {
    result.success = true;
    result.rating = 3;
    result.ratingDescription = 'solid work';
  }
  else if (result.target != 0) {
    result.rating = 2;
    result.ratingDescription = 'not too bad but could be better';
  }
  
  return result;
}

try {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Please provide at least two arguments.');
    process.exit(1);
  }

  let target: number;
  let hoursPerDay: Array<number> = [];
  
  target = parseFloat(args[0]);
  if (isNaN(target)) {
    throw new Error(`Argument "${args[0]}" is not a valid number.`);
  }

  for (let i = 1; i < args.length; i++) {
    const tmp = parseFloat(args[i]);
    if (isNaN(tmp)) {
      throw new Error(`Argument "${args[i]}" is not a valid number.`);
    }
    hoursPerDay.push(tmp);
  }

  console.log(calculateExercises(hoursPerDay, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
