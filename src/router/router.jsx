import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/home/Home";
import AddFood from "../pages/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import Loading from "../Components/Loading";
import FoodDetails from "../pages/FoodDetails";
import PrivateRoute from "../Components/PrivateRoute";
import UsersRequestedFoods from "../pages/UsersRequestedFoods";
import ManageMyFoods from "../pages/ManageMyFoods";
import EditMyFood from "../pages/EditMyFood";
import ErrorBoundary from "../pages/ErrorBoundary";
import Contact from "../pages/Contact";
import DashBoardLayout from "../layouts/DashBoardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        Component: Login,
        path: "/login",
      },
      {
        Component: Register,
        path: "/register",
      },
      {
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
        path: "/addFood",
      },
      {
        Component: AvailableFoods,
        path: "/availableFoods",
      },
      {
        path: "/availableFoods/:id",
        element: <FoodDetails></FoodDetails>,
        loader: ({ params }) =>
          fetch(`https://foo-circle.vercel.app/availableFoods/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/myFoodReq",
        element: (
          <PrivateRoute>
            <UsersRequestedFoods></UsersRequestedFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/manageMyFoods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        path: "/editFood/:id",
        element: (
          <PrivateRoute>
            <EditMyFood></EditMyFood>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://foo-circle.vercel.app/availableFoods/${params.id}`),
        errorElement: <ErrorBoundary></ErrorBoundary>,
        hydrateFallbackElement: <Loading></Loading>,
      },
    ],
  },
  {
    Component: DashBoardLayout,
    path: "/dashBoard",
  },
]);

export default router;
