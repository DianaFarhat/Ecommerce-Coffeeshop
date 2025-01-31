import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom"; 
import { Provider } from "react-redux";
import { store } from "./redux/store"; 

// Define the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} />
  )
);

// ✅ Wrap the entire application inside <Provider>
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
    <RouterProvider router={router} />
  </Provider>
);
