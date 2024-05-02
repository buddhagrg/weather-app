import * as React from "react";
import { LocationContext, LocationContextProps } from "../context/LocationContext";
import { RenderOptions, render } from "@testing-library/react";

interface IExtendedRenderOptions extends RenderOptions {
    coords?: { latitude: number; longitude: number };
    updateCoords?: (latitude: number, longitude: number) => void;
    error?: string;
    setError?: (msg: string) => void;
};

const customRender = (
    ui: React.ReactElement,
    options?: Omit<IExtendedRenderOptions, "wrapper">
) => {
    const defaultValues: LocationContextProps = {
        coords: { latitude: 1, longitude: 1 },
        updateCoords: () => { },
        error: "",
        setError: () => { }
    };

    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <LocationContext.Provider value={{ ...defaultValues, ...options }}>{children}</ LocationContext.Provider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { customRender as render };