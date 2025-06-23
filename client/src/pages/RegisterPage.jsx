import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registeration successfull");
    } catch (error) {
      alert("Registeraion failed");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-45">
        <h1 className="text-3xl text-center mb-4">Register Now</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center text-gray-500 py-2">
            Already a member?{" "}
            <Link to={"/login"} className="text-black underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
