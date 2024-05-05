import { vi } from "vitest";

type GeoLocationOptions = {
    error?: {
        code: string;
    } | null;
};

export const setupGeoLocation = ({ error }: GeoLocationOptions) => {
    const LATITUDE = 5;
    const LONGITUDE = 10;
    const mockGeoLocation = {
        getCurrentPosition: vi.fn().mockImplementation((success, fail) => {
            if (error) {
                fail(error);
            } else {
                success({ coords: { latitude: LATITUDE, longitude: LONGITUDE } });
            }
        })
    };

    Object.defineProperty(global.navigator, 'geolocation', {
        writable: true,
        value: mockGeoLocation
    });
}