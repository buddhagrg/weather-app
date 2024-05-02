import * as React from "react";

export const useUserLocation = () => {
    const [error, setError] = React.useState("");
    const [coords, setCoords] = React.useState({
        latitude: 0,
        longitude: 0
    });

    React.useEffect(() => {
        updateLocation();
    }, []);

    const updateLocation = () => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
                if (permissionStatus.state === 'denied') {
                    setError("Location access is blocked. Please enable it in your browser settings.");
                } else {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                }
            });
        } else {
            setError("Geolocation permissions API is not supported by your browser.");
        }
    }

    const showPosition = (position: any) => {
        const { latitude, longitude } = position?.coords;
        setCoords({
            latitude,
            longitude
        });
    }

    const showError = (error: any) => {
        setError(error?.message ?? "Unable to locate location");
    }

    return { error, position: coords };
}