import { Component } from "react";
import "./menu.css";


class Menu extends Component {
    render() {
        return (
            <div className="MenuContainer">
                <div className="Header">
                    <h1>
                        RECIPE FINDER
                    </h1>
                </div>
                <div className="Menu">
                    <a href="/#/Search">
                        <div className="Tile">
                            <p> FIND A RECIPE </p>
                        </div>
                    </a>
                    <a href="/#/Add">
                        <div className="Tile">
                            <p> ADD A RECIPE </p>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Menu;
