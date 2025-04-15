import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const success = await signup(name, email, password);
    if (success) navigate("/");
    else setError("Signup failed");
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="btn btn-light" onClick={handleSignup}>
        Signup
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default Signup;
