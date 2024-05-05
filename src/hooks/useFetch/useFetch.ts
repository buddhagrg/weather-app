import * as React from "react";
import { API_KEY } from "../../const/config";

const FETCH_INIT = "FETCH_INIT";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

type State = {
    loading: boolean;
    data: any;
    error: string;
};

type Action = {
    type: string;
    payload?: any;
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case FETCH_INIT:
            return { ...state };
        case FETCH_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return { ...state };
    }
};

export const useFetch = (endpoint: string, latitude: number, longitude: number) => {
    const initialState = {
        loading: true,
        data: null,
        error: ""
    };
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        getWeatherData();
    }, [endpoint, latitude, longitude]);

    const getWeatherData = async () => {
        try {
            if (!latitude && !longitude) return;

            dispatch({ type: FETCH_INIT });
            const BASE_API_URL = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            const response = await fetch(BASE_API_URL);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText || "Network Error");
            }

            const result = await response.json();
            dispatch({ type: FETCH_SUCCESS, payload: result });
        } catch (error: any) {
            dispatch({ type: FETCH_ERROR, payload: error?.message });
        }
    }

    return state;
}