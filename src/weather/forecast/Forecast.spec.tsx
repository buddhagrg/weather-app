import { vi } from "vitest";
import { render } from "../../utils/rtl-custom-render";
import { Forecast } from "./Forecast";
import { useFetch } from "../../hooks/useFetch";
import { FORECAST } from "../../mocks/data";
import { ForecastData } from "../types";
import { ERROR, LOADING, NO_RECORD } from "../const";

type UseFetchType = {
    error: string;
    loading: boolean;
    data: null | ForecastData;
};

vi.mock("../../hooks/useFetch");
const mockedUseFetch = vi.mocked<(endpoint: string, latitude: number, longitude: number) => UseFetchType>(useFetch);

describe("<Forecast />", () => {
    beforeEach(() => {
        mockedUseFetch.mockReset();
    });

    it("should render loading at first", () => {
        mockedUseFetch.mockReturnValueOnce({ data: null, error: '', loading: true });
        const { getByText } = render(<Forecast />);
        expect(getByText(LOADING)).toBeInTheDocument();
    });

    it("should render error on error", () => {
        mockedUseFetch.mockReturnValueOnce({ data: null, error: ERROR, loading: false });
        const { getByText } = render(<Forecast />);
        expect(getByText(ERROR)).toBeInTheDocument();
    });

    it.only("should render message when data is null", () => {
        const mockedData = { ...FORECAST };
        mockedData.cod = '400';
        mockedData.list = [];

        mockedUseFetch.mockReturnValue({ data: mockedData, error: '', loading: false });
        const { getByText } = render(<Forecast />);
        expect(getByText(NO_RECORD)).toBeInTheDocument();
    });

    it("should render ForecastCard component", () => {
        mockedUseFetch.mockReturnValueOnce({ data: FORECAST, error: '', loading: false });
        const { getByTestId } = render(<Forecast />);
        expect(getByTestId("forecast")).toBeInTheDocument();
    });
});