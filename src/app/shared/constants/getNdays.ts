export function getLastSevenDays(): number[] {
    const currentTimestamp: number = new Date().getTime();
    const lastSevenDaysTimestamps: number[] = [];
  
    for (let i = 6; i >= 0; i--) {
      const timestamp = currentTimestamp - i * 24 * 60 * 60 * 1000;
      lastSevenDaysTimestamps.push(timestamp);
    }
  
    return lastSevenDaysTimestamps;
}

export function getLastFifteenDays(): number[] {
    const currentTimestamp: number = new Date().getTime();
    const lastFifteenDaysTimestamps: number[] = [];
  
    for (let i = 14; i >= 0; i--) {
      const timestamp = currentTimestamp - i * 24 * 60 * 60 * 1000;
      lastFifteenDaysTimestamps.push(timestamp);
    }
  
    return lastFifteenDaysTimestamps;
}

export function getLastThirtyDays(): number[] {
    const currentTimestamp: number = new Date().getTime();
    const lastThirtyDaysTimestamps: number[] = [];
  
    for (let i = 29; i >= 0; i--) {
      const timestamp = currentTimestamp - i * 24 * 60 * 60 * 1000;
      lastThirtyDaysTimestamps.push(timestamp);
    }
  
    return lastThirtyDaysTimestamps;
}

export function getCurrentDate() {
    const currentDate = new Date();
  
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options as any).format(currentDate);
  
  return formattedDate;
}