import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[redirect, setRedirect] = useState(false);

  const {setUser} = useContext(UserContext);

  async function handleLoginUser(ev) {
    ev.preventDefault();
    try {
        const response = await axios.post('/login', {email, password});
        setUser(response.data);
        alert('Login Successfull');
        setRedirect(true);
    } catch (error) {
        alert('Login Failsed');
    }
  }

  if(redirect) {
    return (
        <Navigate to={'/'}/>
    )
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-45">
        <h1 className="text-3xl font-medium text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginUser}>
            <input type="email" placeholder="your@email.com" 
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />
            <input type="password" placeholder="password" 
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="primary">Login</button>
            <div className="text-center text-gray-500 py-2">
                Don't have an account? <Link to={'/register'} className="text-black underline">Register Now</Link>
            </div>
        </form>
      </div>
    </div>
  );
}
