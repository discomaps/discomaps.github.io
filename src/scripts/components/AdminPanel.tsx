import * as React from "react";
import City from "../models/city";
import CityForm from "./AdminPanel/CityForm";
import CityList from "./AdminPanel/CityList";

interface IState {
    cities: City[];
    currentCity: City;
}

let idCounter = 1;

export default class AdminPanel extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            cities: [
                {
                    id: idCounter++,
                    lat: 1,
                    lng: 2,
                    name: "Paris",
                    description: "Good city",
                },
                {
                    id: idCounter++,
                    lat: 3,
                    lng: 4,
                    name: "Berlin",
                    description: "Big city",
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
                    <CityForm
                        city={this.state.currentCity}
                        onCancel={this.handleCancel}
                        onAddOrSave={this.handleAddOrSave}
                    />
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

    private handleAddOrSave = (city: City) => {
        if (city.id) {
            const found = this.state.cities.find((x) => x.id === city.id);
            if (!found) {
                this.setState({
                    currentCity: null,
                });
                return;
            }

            Object.assign(found, city);
            this.setState({
                cities: this.state.cities.slice(),
                currentCity: null,
            });
            return;
        }

        city.id = idCounter++;

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
        const city = new City();
        city.id = 0;

        this.setState({
            currentCity: city,
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
