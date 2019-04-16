import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { initializeMap } from "./map/map";
import CityRepository from "./services/citiesRepository";

const root = document.getElementById("root");

if (root) {
    render(<App />, root);
    initializeMap();
    const cityRepository = new CityRepository();
    cityRepository.initialSeed();
}
