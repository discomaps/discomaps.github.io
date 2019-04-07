import * as React from "react";
import City from "../../models/city";

export interface ICityListProps {
    cities: City[];
    onDelete: (city: City) => any;
    onEdit: (city: City) => any;
}

export default class CityList extends React.Component<ICityListProps, {}> {
    constructor(props: ICityListProps) {
        super(props);
    }

    public render() {
        const { cities } = this.props;

        return (
            <table className="table-hover table-bordered w-100">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Lat</th>
                        <th>Lng</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>{this.renderRows(cities)}</tbody>
            </table>
        );
    }

    private renderRows = (cities: City[]) => {
        return cities.map((x, i) => this.renderRow(x, i));
    }

    private renderRow = (city: City, index: number) => {
        const { onDelete, onEdit } = this.props;
        const fireDelete = () => onDelete(city);
        const fireEdit = () => onEdit(city);
        return (
            <tr key={index}>
                <td>{city.id}</td>
                <td>{city.name}</td>
                <td>{city.lat}</td>
                <td>{city.lng}</td>
                <td>
                    <button onClick={fireEdit} id="btnEdit">
                        <i className="fas fa-edit" />
                    </button>
                </td>
                <td>
                    <button onClick={fireDelete} id="btnDelete">
                        <i className="fas fa-trash-alt" />
                    </button>
                </td>
            </tr>
        );
    }
}
