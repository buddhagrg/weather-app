import * as React from "react";
import { LocationContext, LocationContextProps } from "../../context/LocationContext";
import { useFetch } from "../../hooks/useFetch";
import { ForecastData } from "../types";
import { ForecastCard } from "./ForecastCard";
import { LOADING, NO_RECORD } from "../const";

export const Forecast: React.FC = () => {
    const { coords, error: locationAccessError } = React.useContext(LocationContext) as LocationContextProps;
    const { loading, error, data } = useFetch("forecast", coords.latitude, coords.longitude);

    let content;
    if (locationAccessError) {
        content = <span className="text-danger">{locationAccessError}</span>
    } else if (loading) {
        content = <>{LOADING}</>
    } else if (error) {
        content = <>{error}</>
    } else if (data === null) {
        content = <>{NO_RECORD}</>
    } else {
        const { cod, list } = data as ForecastData;
        if (cod !== '200' || !Array.isArray(list) || list.length <= 0) {
            content = <>{NO_RECORD}</>
        } else {
            content = <ForecastCard forecastList={list} />
        }
    }

    return (
        <div data-testid="forecast">
            {content}
        </div>
    );
}