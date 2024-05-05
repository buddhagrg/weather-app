import * as React from "react"
import { LocationContext, LocationContextProps, LocationProvider } from "./LocationContext";
import { fireEvent, render, waitFor } from "@testing-library/react";

const LAT = 9;
const LON = 4;
const ERROR = "User denied location access";

const CustomTest = () => {
    const { coords, updateCoords, error, setError } = React.useContext(LocationContext) as LocationContextProps;
    return (
        <>
            {
                error
                    ? (
                        `Error : ${error}`
                    ) : (
                        <>
                            <span data-testid="latitude">{coords?.latitude}</span>
                            <span data-testid="longitude">{coords?.longitude}</span>
                        </>
                    )
            }

            <button onClick={() => updateCoords(LAT, LON)}>Update Coords</button>
            <button onClick={() => setError(ERROR)}>Set Error</button>
        </>
    );
}

test("LocationProvider", async () => {
    const DEFAULT_VALUES = {
        coords: { latitude: 0, longitude: 0 },
        updateCoords: () => { },
        error: "",
        setError: () => { }
    };

    const { getByText, getByTestId } = render(
        <LocationProvider>
            <CustomTest />
        </LocationProvider>
    );

    expect(getByTestId("latitude")).toHaveTextContent(DEFAULT_VALUES?.coords?.latitude.toString());
    expect(getByTestId("longitude")).toHaveTextContent(DEFAULT_VALUES?.coords?.longitude.toString());

    const updateCoordsBtn = getByText('Update Coords');
    fireEvent.click(updateCoordsBtn);

    await waitFor(() => {
        expect(getByTestId("latitude")).toHaveTextContent(LAT.toString());
        expect(getByTestId("longitude")).toHaveTextContent(LON.toString());
    });

});