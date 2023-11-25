export const getCommonTimstamp = (sevenDay: any[], loginHistory: any[]) => {
    const commonTimestamps: number[] = sevenDay.filter(timestamp => loginHistory.includes(timestamp));
    return commonTimestamps;
}