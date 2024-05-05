import { fireEvent, render } from "../utils/rtl-custom-render";
import { Weather } from "./index";

describe("Weather component", () => {
    it("renders Today component at first", () => {
        const { getByRole } = render(<Weather />);
        const activeLink = getByRole('tab', { selected: true });
        expect(activeLink).toBeInTheDocument();
        expect(activeLink).toHaveTextContent('Today');
        expect(activeLink).not.toHaveTextContent('3 Hourly');
    });

    it("renders 3 Hourly forecast component in active state on click", () => {
        const { getByRole } = render(<Weather />);
        const forecastTab = getByRole('tab', { name: "3 Hourly" });
        fireEvent.click(forecastTab);
        const activeLink = getByRole('tab', { selected: true });
        expect(activeLink).toBeInTheDocument();
        expect(activeLink).toHaveTextContent('3 Hourly');
    });
});
