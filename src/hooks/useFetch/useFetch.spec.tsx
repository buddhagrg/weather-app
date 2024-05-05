import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";
import { CURRENT_WEATHER } from "../../mocks/data";
import { server } from "../../mocks/server";
import { HttpResponse, http } from "msw";
import { API_BASE_URL } from "../../const/config";

const ENDPOINT = "weather";
const LATITUDE = 23;
const LONGITUDE = 45;

describe("useFetch", () => {
    it("should exist", () => {
        const { result } = renderHook(() => useFetch(ENDPOINT, LATITUDE, LONGITUDE));
        expect(result.current).toBeDefined();
    });

    it("should show loading 'true' on mount with data 'null' and 'false' after api call complete with data", async () => {
        const { result } = renderHook(() => useFetch(ENDPOINT, LATITUDE, LONGITUDE));
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe("");
        expect(result.current.data).toBe(null);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe("");
            expect(result.current.data).toEqual(CURRENT_WEATHER)
        });
    });

    it("should handle network error", async () => {
        server.use(
            http.get(`${API_BASE_URL}/weather`, () => {
                return new HttpResponse(null, { status: 404, statusText: '' });
            }));

        const { result } = renderHook(() => useFetch(ENDPOINT, LATITUDE, LONGITUDE));

        await waitFor(() => {
            expect(result.current.loading).toEqual(false);
            expect(result.current.data).toBe(null);
            expect(result.current.error).toBe("Not Found");
        });
    });
});