import Dexie from "dexie";
import City from "../models/city";

export default class CityDatabase extends Dexie {
    public cities: Dexie.Table<City, number>;

    constructor() {
        super("CityDatabase");
        this.version(1).stores({
            cities: "++id,name,lat,lng,description",
        });
    }
}
