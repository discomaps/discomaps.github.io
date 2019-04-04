/*
    HERE maps are included globally in HTML
    Existing typing work poorly or I don't know how to use then right.
 */

declare const H: any;

export function initializeMap(): void {
    const M: any = {};

    M.Platform = new H.service.Platform({
        app_code: "ZNuVUBYxOp8F--j8TkTaqQ",
        app_id: "BfLbvejjCW00d5s5kxyW",
        useHTTPS: true,
    });
    M.Layers = M.Platform.createDefaultLayers();
    M.Map = new H.Map(document.getElementById("mapContainer"), M.Layers.normal.map);
    M.Map.setCenter({ lat: 38.89037, lng: -100 });
    M.Map.setZoom(4);
}
