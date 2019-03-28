import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { seed } from "./map/seed";

const root = document.getElementById("root");

if (root) {
    render(<App />, root);
    seed();
}
