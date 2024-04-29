import * as React from "react";
import { Card } from "react-bootstrap";
import { WiHumidity, WiSunrise, WiSunset, WiThermometer } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { getFormattedTime, getFormattedTimeWithUTCtz, getTemperatureInCelsius } from "../../utils";
import { AiFillEye } from "react-icons/ai";
import { CgCompressV } from "react-icons/cg";
import { Clouds, Main, Sys, Weather, Wind } from "../types";
import "../../assets/style.css";

type WeatherData = {
    weather: Weather[],
    main: Main,
    visibility: number,
    wind: Wind,
    clouds: Clouds,
    dt: number,
    sys: Sys,
    timezone: number,
    id: number,
    name: string,
    cod: number
};

export const TodayCard: React.FC<{ data: WeatherData }> = ({ data }) => {
    const {
        dt: dateInSeconds,
        main: { temp, humidity, pressure },
        wind: { speed },
        weather: [{ icon }],
        sys: { sunrise, sunset },
        visibility
    } = data;

    const iconSize = { fontSize: "35px" };

    return (
        <Card>
            <Card.Header>Pokhara As of {getFormattedTimeWithUTCtz(dateInSeconds)}</Card.Header>
            <Card.Body>
                <div className="d-flex">
                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
                    <div className="param">
                        <WiThermometer style={iconSize} />
                        <span>{getTemperatureInCelsius(temp)}</span>
                    </div>
                    <div className="param">
                        <FiWind style={iconSize} />
                        <span>{`${speed} m/s`}</span>
                    </div>
                    <div className="param">
                        <WiSunrise style={iconSize} />
                        <span>{getFormattedTime(sunrise)}</span>
                    </div>
                    <div className="param">
                        <WiSunset style={iconSize} />
                        <span>{getFormattedTime(sunset)}</span>
                    </div>
                    <div className="param">
                        <WiHumidity style={iconSize} />
                        <span>{`${humidity}%`}</span>
                    </div>
                    <div className="param">
                        <AiFillEye style={iconSize} />
                        <span>{`${visibility} m`}</span>
                    </div>
                    <div className="param">
                        <CgCompressV style={iconSize} />
                        <span>{`${pressure} hPa`}</span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}