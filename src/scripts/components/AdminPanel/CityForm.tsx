import * as React from "react";
import City from "../../models/city";

export interface ICityListProps {
    city: City;
    onCancel: () => any;
}

export default class CityForm extends React.Component<ICityListProps, {}> {
    public render() {
        const { city, onCancel } = this.props;

        if (city === null) {
            return null;
        }

        return (
            <form className="border border-secondary mb-5">
                <div className="form-group">
                    <label htmlFor="name">City name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name" />
                    <small className="form-text text-muted">
                        Put name of city
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="lat">Lat</label>
                    <input type="number" className="form-control" id="lat" placeholder="lat coordinate" />
                </div>
                <div className="form-group">
                    <label htmlFor="lng">Lng</label>
                    <input type="number" className="form-control" id="lng" placeholder="lng coordinate" />
                </div>
                <button type="button" className="btn btn-primary">
                    Add
                </button>
                <button type="button" className="btn btn-danger ml-4" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        );
    }
}
