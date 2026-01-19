import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/api";
import { Navigate } from "react-router-dom";




function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiRequest("/user/signup", {
        method: "POST",
        body: {
          name,
          email,
          password,
        },
      });

      // Signup successful → go to login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (localStorage.getItem("token")) {
  return <Navigate to="/dashboard" />;
}

  return (
    <div className="signup">
      <div className="signup-header">
      <img src="/github_733609.png" id = "git-icon"/>

      <br></br><br></br>
      <h2>Signup</h2>
      </div>
      <div className="signup-card card">
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSignup}>
          <p id="form-labels"><b>Username</b></p>
          <input
            type="text"
           
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <br />
          <p id="form-labels"><b>Email Address</b></p>
          <input
            type="email"
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />
          <p id="form-labels"><b>Password</b></p>
          <input
            type="password"
           
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br />

          <button id="submit-btn" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
    </div>

        <div className="below-signup card">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        </div>
    </div>
    
  );
}

export default Signup;
