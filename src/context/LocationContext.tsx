import * as React from "react";

export type LocationContextProps = {
    coords: { latitude: number; longitude: number };
    updateCoords: (latitude: number, longitude: number) => void;
    error: string;
    setError: (msg: string) => void;
};

export const LocationContext = React.createContext<LocationContextProps | null>(null);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [coords, setCoords] = React.useState({ latitude: 0, longitude: 0 });
    const [error, setError] = React.useState<string>("");

    const updateCoords = (latitude: number, longitude: number) => {
        setCoords({ latitude, longitude });
    }

    return (
        <LocationContext.Provider value={{ coords, updateCoords, error, setError }}>
            {children}
        </LocationContext.Provider>
    );
}
