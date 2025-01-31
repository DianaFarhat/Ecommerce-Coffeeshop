import logo from './logo.svg';
import './App.css';
import Signup from './components/signup'
import Login from './components/login'
// import Navigation from './pages/Auth/Navigation.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
   
   <Signup></Signup>
   <Login/></>
  );
}

export default App;
