import * as React from "react";
import { Container } from "react-bootstrap"
import { Header } from "./components/Header";
import { useUserLocation } from "./hooks/useUserLocation";
import { Weather } from "./weather";
import { LocationContextProps, LocationContext } from "./context/LocationContext";
import { Footer } from "./components/Footer";

const App = () => {
  const { updateCoords, setError } = React.useContext(LocationContext) as LocationContextProps;
  const { error, position } = useUserLocation();

  React.useEffect(() => {
    updateCoords(position.latitude, position.longitude);
    setError(error);
  }, [position, error]);

  return (
    <Container fluid="sm">
      <Header />
      <Weather />
      <Footer />
    </Container>
  )
}

export default App;