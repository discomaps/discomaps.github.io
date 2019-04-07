import * as React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import Game from "./Game";

export default class App extends React.Component<{}, {}> {
    public render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/game/">Game</Link>
                            </li>
                            <li>
                                <Link to="/admin/">Admin Panel</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact={true} component={AdminPanel} />
                    <Route path="/game/" component={Game} />
                    <Route path="/admin/" component={AdminPanel} />
                </div>
            </Router>
        );
    }
}
