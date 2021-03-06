/*
    HERE maps are included globally in HTML
    Existing typing work poorly or I don't know how to use then right.
 */

declare const H: any;

import CityRepository from "../services/citiesRepository";

const map: any = {};
const cityRepository = new CityRepository();

function addMarker(coordinates: { lat: number; lng: number }) {
    map.Map.addObject(new H.map.Marker(coordinates));
}

function displayMarkers(): void {
    cityRepository
    .getAll()
    .then((cities) => {
        cities.forEach((element) => {
            addMarker(element);
        });
    })
    .catch((e) => {
        // tslint:disable-next-line:no-console
        console.log("displayMarkers failed");
        // tslint:disable-next-line:no-console
        console.dir(e);
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
    map.Behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map.Map));
    map.Map.setZoom(4);
}

export function initializeMap(): void {
    initializeMapOnly();
    displayMarkers();
}
