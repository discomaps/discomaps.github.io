import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { initializeMap } from "./map/map";
import { seed } from "./map/seed";
import CityRepository from "./services/citiesRepository";

const root = document.getElementById("root");

if (root) {
    render(<App />, root);
    seed();
    initializeMap();
    const cityRepository = new CityRepository();
    cityRepository.initialSeed();
}
