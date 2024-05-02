import { render } from "../utils/test-utils";
import { Header } from "./Header";

describe("<Header />", () => {
    it("renders component with the default co-ordinates", () => {
        const DEFAULT_TEXT = `Latitude: 1, Longitude: 1`
        const { getByText } = render(<Header />);
        expect(getByText(DEFAULT_TEXT)).toBeInTheDocument();
    });

    it("renders component with error message", () => {
        const ERROR_MSG = "User denied the location";
        const { getByText } = render(<Header />, { error: ERROR_MSG });
        expect(getByText(ERROR_MSG)).toBeInTheDocument();
    });

    it("renders component with the provided co-ordinates", () => {
        const LAT = 24;
        const LONG = 30;
        const PROVIDED_TEXT = `Latitude: ${LAT}, Longitude: ${LONG}`
        const { getByText } = render(<Header />, { coords: { latitude: LAT, longitude: LONG } });
        expect(getByText(PROVIDED_TEXT)).toBeInTheDocument();
    });
});