import { renderHook } from "@testing-library/react";
import { useUserLocation } from "./useUserLocation";
import { setupGeoLocation } from "../../utils/setup-geolocation";
import { vi } from "vitest";

const DEFAULT_POSITION = { latitude: 0, longitude: 0 };
const STATIC_POSITION = { latitude: 5, longitude: 10 };
const NO_ACCESS = "Geolocation permissions API is not supported by your browser.";
const POSITION_UNAVAILABLE = "Unable to locate location";

const mockedLocationUpdate = vi.fn();

describe("useUserLocation", () => {
    it("should exist", () => {
        const { result } = renderHook(() => useUserLocation(mockedLocationUpdate));
        expect(result.current).toBeDefined();
    });

    it("should show permission error", () => {
        const { result } = renderHook(() => useUserLocation(mockedLocationUpdate));
        expect(result.current.position).toEqual(DEFAULT_POSITION);
        expect(result.current.error).toEqual(NO_ACCESS);
    });

    it("should show 'POSITION_UNAVAILABLE' error", () => {
        setupGeoLocation({ error: { code: 'POSITION_UNAVAILABLE' } });
        const { result } = renderHook(() => useUserLocation(mockedLocationUpdate));
        expect(result.current.position).toEqual(DEFAULT_POSITION);
        expect(result.current.error).toEqual(POSITION_UNAVAILABLE);
    });

    it("should show static co-ordinates as provided", () => {
        setupGeoLocation({ error: null });
        const { result } = renderHook(() => useUserLocation(mockedLocationUpdate));
        expect(result.current.position).toEqual(STATIC_POSITION);
        expect(result.current.error).toBe('');
    });
});