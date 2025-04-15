import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) navigate("/");
    else setError("Invalid credentials");
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-light" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default Login;
