import * as React from "react";
import { Card, Table } from "react-bootstrap";
import { ForecastItem } from "../types";
import { getDayAndDate, getFormattedTime, getTemperatureInCelsius, mpsToKph } from "../../utils";
import { GiHeavyRain } from "react-icons/gi";
import { FiWind } from "react-icons/fi";

type Item = {
    unformattedDt: number;
    time: string;
    tempC: string;
    icon: string;
    description: string;
    speed: number;
    humidity: number;
};

const getBodyData = (item: { [key: string]: Item[] }) => {
    let content: React.ReactNode = [];
    for (const dayAndDate in item) {
        const entries = item[dayAndDate];
        const dayAndDateTr = <tr key={dayAndDate}><th colSpan={5}>{dayAndDate}</th></tr>;
        const entryItems = entries.map(({ unformattedDt, time, tempC, icon, speed, description, humidity }) => (
            <tr key={unformattedDt}>
                <td>{time}</td>
                <td>{tempC}</td>
                <td><img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />{` `}{description}</td>
                <td title="Rain"><GiHeavyRain />{` `}{`${humidity}%`}</td>
                <td title="Wind"><FiWind />{` `}{`${speed ? mpsToKph(speed) : 0} km/hr`}</td>
            </tr>
        ));
        content = [...content, dayAndDateTr, ...entryItems]
    }

    return content;
}

export const ForecastCard: React.FC<{ forecastList: ForecastItem[] }> = ({ forecastList }) => {
    let item: { [key: string]: Item[] } = {};
    forecastList.forEach(({ dt, main: { temp, humidity }, weather: [{ icon, description }], wind: { speed } }) => {
        const dayAndDate = getDayAndDate(dt);
        if (!item[dayAndDate]) {
            item[dayAndDate] = [];
        }
        item[dayAndDate].push({
            unformattedDt: dt,
            time: getFormattedTime(dt),
            tempC: getTemperatureInCelsius(temp),
            icon,
            description,
            speed,
            humidity
        });
    });

    return (
        <Card>
            <Card.Header>3 Hour Forecast</Card.Header>
            <Card.Body>
                <Table>
                    <tbody>
                        {getBodyData(item)}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}