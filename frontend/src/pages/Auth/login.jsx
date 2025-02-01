import { useState, useEffect } from "react";
import axios from "axios";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/login";

    // Check login status when the component mounts
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
      }, [navigate, redirect, userInfo]);
    
    // Login handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/users/auth/login",
                { email, password },
                { withCredentials: true }
            );

          
        const { token, user } = response.data;

        // Store token and user info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user)); // Store user info as JSON

        // Dispatch the user info to the Redux store
        dispatch(setCredentials(response.data)); // Dispatch full response data
        console.log(response.data); // This will show the exact structure of the response from the server

            setIsLoggedIn(true);
            

            alert("Login successful!");
            window.location.href = "/shop";
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

  
   

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
           
        
        </div>
    );
};

export default Login;
