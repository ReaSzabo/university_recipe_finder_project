import { Component } from "react";
import Search from "./Search.jsx";
import Add from "./Add.jsx";
import Menu from "./Menu.jsx";

import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Menu></Menu>,
  },
  {
    path: "/Search",
    element: <Search></Search>,
  },
  {
    path: "/Add",
    element: <Add></Add>,
  }
]);

class App extends Component {
  render() {
    return (
      <div className="App">
        <>
          <RouterProvider router={router} />
        </>
      </div>
    );
  }
}

export default App;
