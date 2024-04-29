import * as React from "react";
import { LocationContext, LocationContextProps } from "../../context/LocationContext";
import { useFetch } from "../../hooks/useFetch";
import { Coord, ForecastItem } from "../types";
import { ForecastCard } from "./ForecastCard";

type ForecastData = {
    cod: string;
    message: number | string;
    cnt: number;
    list: ForecastItem[],
    city: {
        id: number;
        name: string;
        coord: Coord;
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    }
};

export const Forecast: React.FC = () => {
    const { coords } = React.useContext(LocationContext) as LocationContextProps;
    const { loading, error, data } = useFetch("forecast", coords.latitude, coords.longitude);

    let content;
    if (loading) {
        content = <>loading...</>
    } else if (error) {
        content = <>{error}</>
    } else if (data === null) {
        content = <>loading...</>
    } else {
        const { cod, list } = data as ForecastData;
        if (cod !== '200' || !Array.isArray(list) || list.length <= 0) {
            content = <>Record not found</>
            return;
        }

        content = <ForecastCard forecastList={list} />
    }

    return (
        <>
            {content}
        </>
    );
}