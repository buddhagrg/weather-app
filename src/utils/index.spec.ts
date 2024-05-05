import * as util from "./index";

describe("index", () => {
    it("validate getTemperatureInCelsius()", () => {
        const tempK = 303;
        const expectedTempC = `29.85°C`;
        expect(util.getTemperatureInCelsius(tempK)).toEqual(expectedTempC);
    });

    it("validate getFormattedTime()", () => {
        const dtInSec = 1714299719;
        const expectedTimeFormat = `04:06 PM`;
        expect(util.getFormattedTime(dtInSec)).toEqual(expectedTimeFormat);
    });

    it("validate getFormattedTimeWithUTCtz()", () => {
        const dtInSec = 1714299719;
        const expectedDateTimeFormat = `04:06 PM, GMT+05:45`;
        expect(util.getFormattedTimeWithUTCtz(dtInSec)).toEqual(expectedDateTimeFormat);
    });

    it("validate getDayAndDate()", () => {
        const dtInSec = 1714299719;
        const expectedDayAndDateFormat = `Sunday, April 28`;
        expect(util.getDayAndDate(dtInSec)).toEqual(expectedDayAndDateFormat);
    });

    it("validate mpsToKph()", () => {
        const speedMps = 3;
        const expectedKphFormat = `10.80`;
        expect(util.mpsToKph(speedMps)).toEqual(expectedKphFormat);
    });
});