import City from "../models/city";
import CityDatabase from "./cityDatabase";

const citiesList: City[] = [
    { name: "Istanbul", lat: 41.013611, lng: 28.955, description: "" },
    { name: "Moscow", lat: 55.75, lng: 37.616667, description: "" },
    { name: "London", lat: 51.507222, lng: -0.1275, description: "" },
    { name: "Saint-Petersburg", lat: 59.95, lng: 30.3, description: "" },
    { name: "Berlin", lat: 52.516667, lng: 13.383333, description: "" },
    { name: "Madrid", lat: 40.383333, lng: -3.716667, description: "" },
    { name: "Kiev", lat: 50.45, lng: 30.523333, description: "" },
    { name: "Rome", lat: 41.9, lng: 12.5, description: "" },
    { name: "Paris", lat: 48.8567, lng: 2.3508, description: "" },
    { name: "Bucharest", lat: 44.4325, lng: 26.103889, description: "" },
];

/*
    TODO:
        - add
        - update
        - delete
 */
export default class CityRepository {
    public db = new CityDatabase();

    public initialSeed = () => {
        this.db.cities
            .bulkAdd(citiesList)
            // tslint:disable-next-line:no-console
            .then(() => console.log("added initial cities for indexdb"))
            // tslint:disable-next-line:no-console
            .catch((e) => console.dir(e));
    }
}
