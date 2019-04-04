/*
    HERE maps are included globally in HTML
    Existing typing work poorly or I don't know how to use then right.
 */

declare const H: any;

import City from "../models/city";
import { citiesListKey } from "./seed";

const map: any = {};

function addMarker(coordinates: { lat: number; lng: number }) {
    map.Map.addObject(new H.map.Marker(coordinates));
}

function displayMarkers(): void {
    const cities = JSON.parse(window.localStorage.getItem(citiesListKey)) as City[];

    cities.forEach((element) => {
        addMarker(element);
    });
}

function initializeMapOnly(): void {
    map.Platform = new H.service.Platform({
        app_code: "ZNuVUBYxOp8F--j8TkTaqQ",
        app_id: "BfLbvejjCW00d5s5kxyW",
        useHTTPS: true,
    });
    map.Layers = map.Platform.createDefaultLayers();
    map.Map = new H.Map(document.getElementById("mapContainer"), map.Layers.normal.map);
    // Prague
    map.Map.setCenter({ lat: 50.083333, lng: 14.416667 });
    map.Map.setZoom(4);
}

export function initializeMap(): void {
    initializeMapOnly();
    displayMarkers();
}
