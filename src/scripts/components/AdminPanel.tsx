import * as React from "react";
import City from "../models/city";
import CityForm from "./AdminPanel/CityForm";
import CityList from "./AdminPanel/CityList";

interface IState {
    cities: City[];
}

export default class AdminPanel extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            cities: [
                {
                    lat: 1,
                    lng: 2,
                    name: "Paris",
                },
                {
                    lat: 3,
                    lng: 4,
                    name: "Berlin",
                },
            ],
        };
    }

    public render() {
        return (
            <main>
                <CityForm />
                <CityList cities={this.state.cities} onDelete={this.handleDelete} />
            </main>
        );
    }

    private handleDelete = (city: City) => {
        const index = this.state.cities.indexOf(city);
        this.state.cities.splice(index, 1);
        this.setState({
            cities: this.state.cities.slice(),
        });
    }
}
