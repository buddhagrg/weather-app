import * as React from "react";
import { useFetch } from "../../hooks/useFetch";
import { LocationContext, LocationContextProps } from "../../context/LocationContext";
import { TodayCard } from "./TodayCard";
import { LOADING, NO_RECORD } from "../const";

export const Today = () => {
    const { coords } = React.useContext(LocationContext) as LocationContextProps;
    const { loading, error, data } = useFetch("weather", coords.latitude, coords.longitude);

    let content;
    if (loading) {
        content = <>{LOADING}</>
    } else if (error) {
        content = <>{error}</>
    } else if (data === null) {
        content = <>{NO_RECORD}</>
    } else {
        content = <TodayCard data={data} />
    }

    return (
        <div data-testid="today">
            {content}
        </div>
    );
}