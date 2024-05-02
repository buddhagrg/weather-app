import { render } from "@testing-library/react";
import { Footer } from "./Footer";

test('<Footer />', () => {
    const text = `Powered by`;
    const { getByText } = render(<Footer />);
    expect(getByText(text)).toBeInTheDocument();
});