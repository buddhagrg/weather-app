import { vi } from "vitest";
import { render } from "../../utils/rtl-custom";
import { Today } from "./Today";
import { useFetch } from "../../hooks/useFetch";
import { CURRENT_WEATHER } from "../../mocks/data";
import { WeatherData } from "../types";
import { ERROR, LOADING, NO_RECORD } from "../const";

type UseFetchType = {
    error: string;
    loading: boolean;
    data: null | WeatherData;
};

vi.mock("../../hooks/useFetch");
const mockedUseFetch = vi.mocked<(endpoint: string, latitude: number, longitude: number) => UseFetchType>(useFetch);

describe("<Today />", () => {
    beforeEach(() => {
        mockedUseFetch.mockReset();
    });

    it("should render loading at first", () => {
        mockedUseFetch.mockReturnValueOnce({ data: null, error: '', loading: true });
        const { getByText } = render(<Today />);
        expect(getByText(LOADING)).toBeInTheDocument();
    });

    it("should render error on error", () => {
        mockedUseFetch.mockReturnValueOnce({ data: null, error: ERROR, loading: false });
        const { getByText } = render(<Today />);
        expect(getByText(ERROR)).toBeInTheDocument();
    });

    it("should render loading when data is null", () => {
        mockedUseFetch.mockReturnValueOnce({ data: null, error: '', loading: false });
        const { getByText } = render(<Today />);
        expect(getByText(NO_RECORD)).toBeInTheDocument();
    });

    it("should render TodayCard component", () => {
        mockedUseFetch.mockReturnValueOnce({ data: CURRENT_WEATHER, error: '', loading: false });
        const { getByTestId } = render(<Today />);
        expect(getByTestId("today-card")).toBeInTheDocument();
    });
});