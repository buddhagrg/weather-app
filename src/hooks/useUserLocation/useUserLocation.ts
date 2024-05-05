import * as React from "react";

type LocationUpdateCallback = (latitude: number, longitude: number) => void;

export const useUserLocation = (onLocationUpdate: LocationUpdateCallback) => {
    const [error, setError] = React.useState("");
    const [coords, setCoords] = React.useState({
        latitude: 0,
        longitude: 0
    });

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setError("Geolocation permissions API is not supported by your browser.");
        }
    }, []);

    const showPosition = (position: any) => {
        const { latitude, longitude } = position?.coords;
        setCoords({
            latitude,
            longitude
        });
        onLocationUpdate(latitude, longitude);
    }

    const showError = (error: any) => {
        setError(error?.message ?? "Unable to locate location");
    }

    return { error, position: coords };
}