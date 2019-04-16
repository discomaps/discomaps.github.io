import Dexie from "dexie";
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

export default class CityRepository {
    public db = new CityDatabase();

    public add = (city: City) => {
        return this.db.cities.add(city) as Promise<number>;
    }

    public update = (city: City) => {
        this.db.cities
            .put(city)
            // tslint:disable-next-line:no-console
            .then(() => console.log("city updated: " + JSON.stringify(city)))
            // tslint:disable-next-line:no-console
            .catch((e) => console.dir(e));
    }

    public delete = (city: City) => {
        this.db.cities
            .delete(city.id)
            // tslint:disable-next-line:no-console
            .then(() => console.log("city deleted: " + JSON.stringify(city)))
            // tslint:disable-next-line:no-console
            .catch((e) => console.dir(e));
    }

    public getAll = () => {
        return this.db.cities.toArray() as Promise<City[]>;
    }

    public initialSeed = () => {
        this.db.cities
            .count()
            .then((count) => {
                if (count === 0) {
                    // it will return last index, so it is definetely > 0
                    return this.db.cities.bulkAdd(citiesList);
                }

                return new Dexie.Promise<number>(function resolver(r, e) {
                    r(0);
                });
            })
            .then((count) => {
                if (count === 0) {
                    // tslint:disable-next-line:no-console
                    console.log("no intial data added, db is not empty");
                } else {
                    // tslint:disable-next-line:no-console
                    console.log("db was empty, initial data added");
                }
            })
            .catch((e) => {
                // tslint:disable-next-line:no-console
                console.dir(e);
            });
    }
}
