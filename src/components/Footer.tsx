import * as React from "react";

export const Footer: React.FC = () => {
    return (
        <footer className="my-5 text-center">
            Powered by <a href="https://openweathermap.org/">https://openweathermap.org/</a>
            <br />
            View code in <a href="https://github.com/buddhagrg/weather-app">Github</a>
        </footer>
    );
}