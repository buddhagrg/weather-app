import * as React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Today } from "./today";
import { Forecast } from "./forecast";

export const Weather = () => {
    const [key, setKey] = React.useState<string>("today");

    return (
        <Tabs
            activeKey={key}
            onSelect={(k) => {
                if (typeof (k) === "string") {
                    setKey(k)
                }
            }}
        >
            <Tab eventKey="today" title="Today">
                <div className="my-3">
                    <Today />
                </div>
            </Tab>
            <Tab eventKey="hourly" title="3 Hourly">
                <div className="my-3">
                    <Forecast />
                </div>
            </Tab>
        </Tabs>
    );
}