import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherProvider } from './context/LocationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>,
)
