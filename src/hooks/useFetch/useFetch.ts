import * as React from "react";
import { API_KEY } from "../../const/config";

export const useFetch = (endpoint: string, latitude: number, longitude: number) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        getWeatherData();
    }, [latitude, longitude, endpoint]);

    const getWeatherData = async () => {
        try {
            setLoading(true);
            setError("");
            const BASE_API_URL = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            const response = await fetch(BASE_API_URL);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText || "Network Error");
            }

            const result = await response.json();
            setData(result);
        } catch (error: any) {
            setError(error?.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, data };
}