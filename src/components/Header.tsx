import * as React from "react";
import { LocationContextProps, LocationContext } from "../context/LocationContext";

export const Header: React.FC = () => {
    const { error, coords } = React.useContext(LocationContext) as LocationContextProps;
    const { latitude, longitude } = coords;

    return (
        <header className="my-5">
            <h5>Your current location co-ordinates</h5>
            {
                error
                    ? <span className="text-danger">{error}</span>
                    : (
                        <span>
                            Latitude: {latitude},
                            Longitude: {longitude}
                        </span>
                    )
            }
        </header>
    );
}