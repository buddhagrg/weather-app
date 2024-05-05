import { CURRENT_WEATHER } from "../../mocks/data";
import { render } from "../../utils/rtl-custom-render";
import { TodayCard } from "./TodayCard";

describe("<TodayCard />", () => {
    it("render the component with data", () => {
        const { getByTestId } = render(<TodayCard data={CURRENT_WEATHER} />);
        expect(getByTestId("today-card")).toBeInTheDocument();
        expect(getByTestId("city")).toHaveTextContent("Deurali");
    });
});