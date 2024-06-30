 
export function calculateBmi (cm: number, kg: number): string {
    let result: string = '';
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
