import { FORECAST } from "../../mocks/data";
import { render } from "../../utils/rtl-custom";
import { ForecastCard } from "./ForecastCard";

describe("<ForecastCard />", () => {
    it("render the component with data", () => {
        const { getByTestId } = render(<ForecastCard forecastList={FORECAST.list} />);
        expect(getByTestId("forecast-card")).toBeInTheDocument();
    });
});