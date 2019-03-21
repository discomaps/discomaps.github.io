import * as React from "react";
import City from "../../models/city";

export interface ICityListProps {
    cities: City[];
    onDelete: (city: City) => any;
}

export default class CityList extends React.Component<ICityListProps, {}> {
    constructor(props: ICityListProps) {
        super(props);
    }

    public render() {
        const { cities } = this.props;

        return (
            <table>
                <thead>
                    <tr>
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
        const { onDelete } = this.props;
        const fireDelete = () => onDelete(city);
        return (
            <tr key={index}>
                <td>{city.name}</td>
                <td>{city.lat}</td>
                <td>{city.lng}</td>
                <td>
                    <button>i</button>
                </td>
                <td>
                    <button onClick={fireDelete}>x</button>
                </td>
            </tr>
        );
    }
}
