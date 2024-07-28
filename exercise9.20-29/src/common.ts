
export function isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!regex.test(dateString)) {
      return false;
    }
  
    const date = new Date(dateString);
    const timestamp = date.getTime();
  
    if (isNaN(timestamp)) {
      return false;
    }
  
    return dateString === date.toISOString().split('T')[0];
  }
  