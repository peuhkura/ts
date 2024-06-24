export interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises (hours: Array<number>, target: number): Exercise {
  const result: Exercise = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: 'tbd',
    target: target,
    average: 0
  };

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
  result.ratingDescription = 'bad';
  if (result.target == result.trainingDays) {
    result.success = true;
    result.rating = 3;
    result.ratingDescription = 'good';
  }
  else if (result.target != 0) {
    result.rating = 2;
    result.ratingDescription = 'not too bad but could be better';
  }
  
  return result;
}
