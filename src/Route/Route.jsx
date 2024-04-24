import {
    createBrowserRouter,    
  } from "react-router-dom";
import MainLayOut from "../components/MainLayOut/MainLayOut";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/Home/Home";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);