import City from "../models/city";
import citiesList from "./citiesList";

const citiesListKey = "citiesList";

const myStorage = window.localStorage;

export function seed(): City[] {
    const json = myStorage.getItem(citiesListKey);
    if (json) { return; }

    myStorage.setItem(citiesListKey, JSON.stringify(citiesList));
}
