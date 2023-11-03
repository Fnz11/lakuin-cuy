/* eslint-disable react-hooks/rules-of-hooks */
import { createBrowserRouter } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Layouts from "./pages/Layouts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:username",
    element: <Layouts />,
    children: [
      {
        path: "/:username/notes",
        element: <Notes />,
      },
      {
        path: "/:username/create",
        element: <Create />,
      },
      {
        path: "/:username/edit/:id",
        element: <Edit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error/>
  }
]);

export default router;
