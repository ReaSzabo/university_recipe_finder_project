import { Component } from "react";
import Search from "./Search.jsx";
import Add from "./Add.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search></Search>
        <Add></Add>
      </div>
    );
  }
}

export default App;
