
export const calculateRate = (rates: number[] | undefined): number => {
    if(rates === undefined || rates.length == 0) return 0;
    const sum = rates.reduce((acc, cur) => acc + cur, 0);
    return Math.min(5, Math.max(0, sum / rates.length));
};