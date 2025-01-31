import ReactDOM from "react-dom/client";
import react from 'react'
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />}> 
    </Route>
)

)

ReactDOM.createRoot(document.getElementById("root")).render(
<RouterProvider router= {router} />)

