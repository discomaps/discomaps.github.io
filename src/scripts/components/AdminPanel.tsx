import * as React from "react";
import City from "../models/city";
import CityForm from "./AdminPanel/CityForm";
import CityList from "./AdminPanel/CityList";

interface IState {
    cities: City[];
    currentCity: City;
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
            currentCity: null,
        };
    }

    public render() {
        const addBtn =
            this.state.currentCity === null ? (
                <button type="button" className="btn btn-primary" onClick={this.handleRequestAdd}>
                    Add
                </button>
            ) : null;

        return (
            <div className="container">
                <main>
                    <CityForm city={this.state.currentCity} onCancel={this.handleCancel} onAdd={this.handleAdd} />
                    <CityList cities={this.state.cities} onDelete={this.handleDelete} onEdit={this.handleEdit} />
                    {addBtn}
                </main>
            </div>
        );
    }

    private handleEdit = (city: City) => {
        this.setState({
            currentCity: city,
        });
    }

    private handleAdd = (city: City) => {
        const cities = this.state.cities.slice();
        cities.push(city);

        this.setState({
            cities,
        });
    }

    private handleCancel = () => {
        this.setState({
            currentCity: null,
        });
    }

    private handleRequestAdd = () => {
        this.setState({
            currentCity: new City(),
        });
    }

    private handleDelete = (city: City) => {
        const index = this.state.cities.indexOf(city);
        this.state.cities.splice(index, 1);
        this.setState({
            cities: this.state.cities.slice(),
        });
    }
}
