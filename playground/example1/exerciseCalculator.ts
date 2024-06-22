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
  let hoursPerDay: Array<number>;

  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
