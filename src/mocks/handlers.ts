import { HttpResponse, http } from "msw";
import { API_BASE_URL } from "../const/config";
import { CURRENT_WEATHER, FORECAST } from "./data";

export const handlers = [
    http.get(`${API_BASE_URL}/weather`, () => {
        return HttpResponse.json(CURRENT_WEATHER);
    }),
    http.get(`${API_BASE_URL}/forecast`, () => {
        return HttpResponse.json(FORECAST);
    }),
];
