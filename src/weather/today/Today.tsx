import * as React from "react";
import { useFetch } from "../../hooks/useFetch";
import { LocationContext, LocationContextProps } from "../../context/LocationContext";
import { TodayCard } from "./TodayCard";

export const Today = () => {
    const { coords } = React.useContext(LocationContext) as LocationContextProps;
    const { loading, error, data } = useFetch("weather", coords.latitude, coords.longitude);

    let content;
    if (loading) {
        content = <>loading...</>
    } else if (error) {
        content = <>{error}</>
    } else if (data === null) {
        content = <>loading...</>
    } else {
        content = <TodayCard data={data} />
    }

    return (
        <>
            {content}
        </>
    );
}