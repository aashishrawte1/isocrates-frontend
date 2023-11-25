function convertTimestampToDdmmyy(timestamp: number): number {
    const date = new Date(timestamp);
  
    // Extract day, month, and year components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  
    // Concatenate the components in ddmmyy format
    const ddmmyy = `${day}${month}${year}`;
  
    return Number(ddmmyy);
}
  
export default convertTimestampToDdmmyy;