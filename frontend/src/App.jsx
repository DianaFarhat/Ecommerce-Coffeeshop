import './App.css';
import { Outlet } from "react-router-dom";
import Navigation from './pages/Auth/Navigation.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store"; 


function App() {
  return (
    <>
  <Provider store={store}>  
   <ToastContainer/>
   <Navigation/>
   <main className='py-3'>
    <Outlet/>
   </main>
   </Provider>
   </>
  );
}

export default App;
