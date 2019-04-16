import * as React from "react";
import City from "../models/city";
import CityRepository from "../services/citiesRepository";
import CityForm from "./AdminPanel/CityForm";
import CityList from "./AdminPanel/CityList";

interface IState {
    cities: City[];
    currentCity: City;
}

export default class AdminPanel extends React.Component<{}, IState> {
    private cityRepository = new CityRepository();
    constructor(props: {}) {
        super(props);

        this.state = {
            cities: [],
            currentCity: null,
        };

        this.cityRepository
            .getAll()
            .then((cities) => {
                this.setState({
                    cities,
                });
            })
            .catch((e) => {
                // tslint:disable-next-line:no-console
                console.dir(e);
            });
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

            this.cityRepository.update(city);

            return;
        }

        delete city.id;

        this.cityRepository
            .add(city)
            .then((id) => {
                city.id = id;
                const cities = this.state.cities.slice();
                cities.push(city);

                this.setState({
                    cities,
                });
            })
            .catch((e) => {
                // tslint:disable-next-line:no-console
                console.log("handleAddOrSave failed");
                // tslint:disable-next-line:no-console
                console.dir(e);
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

        this.cityRepository.delete(city);
    }
}
