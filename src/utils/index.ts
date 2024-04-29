import { addSeconds, format } from "date-fns";

export const getTemperatureInCelsius = (tempK: number): string => {
    const tempC = (tempK - 273.15).toFixed(2);
    return `${tempC}°C`;
}

export const getFormattedTime = (dateInSeconds: number) => {
    const refactoredSeconds = addSeconds(new Date(0), dateInSeconds);
    const pattern = "hh:mm a";
    const formattedTime = format(refactoredSeconds, pattern);
    return formattedTime;
}

export const getFormattedTimeWithUTCtz = (dateInSeconds: number): string => {
    const refactoredSeconds = addSeconds(new Date(0), dateInSeconds);
    const pattern = "hh:mm a, OOOO";
    const formattedDt = format(refactoredSeconds, pattern);
    return formattedDt;
}

export const getDayAndDate = (dateInSeconds: number) => {
    const refactoredSeconds = addSeconds(new Date(0), dateInSeconds);
    const pattern = "EEEE, MMMM d";
    const formattedDt = format(refactoredSeconds, pattern);
    return formattedDt;
}

export const mpsToKph = (speedMps: number) => {
    return (speedMps * 3.6).toFixed(2);
}