import * as React from "react";
import City from "../models/city";
import CityForm from "./AdminPanel/CityForm";
import CityList from "./AdminPanel/CityList";

export default class AdminPanel extends React.Component<{}, {}> {
    private cities: City[];

    constructor(props: {}) {
        super(props);

        this.cities = [
            {
                lat: 1,
                lng: 2,
                name: "Paris",
            },
            {
                lat: 1,
                lng: 2,
                name: "Paris",
            },
        ];
    }

    public render() {
        return (
            <main>
                <CityForm />
                <CityList cities={this.cities} onDelete={this.handleDelete} />
            </main>
        );
    }

    private handleDelete(city: City): void {
        // tslint:disable-next-line:no-console
        console.log(city.name + " deleted");
    }
}
