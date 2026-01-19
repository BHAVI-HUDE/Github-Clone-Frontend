import {useState} from "react";
import { apiRequest } from "../../services/api";
import {useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await apiRequest("/user/login", {
                method: "POST",
                body: {email, password},
                auth: false,
            });

            //Store JWT and userId
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            navigate("/dashboard");
        } catch(err){
            setError(err.message);
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
      <h2>Log In</h2>
      </div>
        <div className="signup-card card">
            {error && <p style = {{color: "red"}}>{error}</p>}

            <form onSubmit = {handleSubmit}>
                
                    <p id="form-labels"><b>Email Address</b></p>
                    <input
                        type="email"
                        
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                

                    <p id="form-labels"><b>Password</b></p>
                    <input
                        type="password"
                        
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                

                <button id="submit-btn" type="submit">Login</button>
            </form>
        </div>
         <div className="below-signup card">
        <p>
         Do not have an account? <a href="/signup">Signup</a>
        </p>
        </div>
        </div>
    );
}

export default Login;