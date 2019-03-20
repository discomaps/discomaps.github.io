import * as React from "react";

export interface IAppProps {}

export default class App extends React.Component<IAppProps, {}> {
    public render() {
        return (
            <div className="app">
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
            </div>
        );
    }
}
