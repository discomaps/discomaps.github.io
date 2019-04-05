import * as React from "react";
import City from "../../models/city";

export interface ICityListProps {
    city: City;
    onCancel: () => any;
    onAdd: (city: City) => any;
}

export default class CityForm extends React.Component<ICityListProps, {}> {
    private lngRef = React.createRef<HTMLInputElement>();
    private latRef = React.createRef<HTMLInputElement>();
    private nameRef = React.createRef<HTMLInputElement>();

    constructor(props: ICityListProps) {
        super(props);
    }

    public render() {
        const { city, onCancel } = this.props;

        if (city === null) {
            return null;
        }

        return (
            <form className="border border-secondary mb-5">
                <div className="form-group">
                    <label htmlFor="name">City name</label>
                    <input
                        defaultValue={city.name}
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        ref={this.nameRef}
                    />
                    <small className="form-text text-muted">Put name of city</small>
                </div>
                <div className="form-group">
                    <label htmlFor="lat">Lat</label>
                    <input
                        defaultValue={city.lat.toString()}
                        type="number"
                        className="form-control"
                        id="lat"
                        placeholder="lat coordinate"
                        ref={this.latRef}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lng">Lng</label>
                    <input
                        defaultValue={city.lng.toString()}
                        type="number"
                        className="form-control"
                        id="lng"
                        placeholder="lng coordinate"
                        ref={this.lngRef}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleAdd}>
                    Add
                </button>
                <button type="button" className="btn btn-danger ml-4" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        );
    }

    private handleAdd = () => {
        const { onAdd } = this.props;

        try {
            const lat = !this.latRef.current.value ? 0 : parseFloat(this.latRef.current.value);
            const lng = !this.lngRef.current.value ? 0 : parseFloat(this.lngRef.current.value);

            onAdd({
                lat,
                lng,
                name: this.nameRef.current.value,
            });
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
    }
}
