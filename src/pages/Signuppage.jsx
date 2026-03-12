import { useEffect, useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import "./signup.css"
function Signuppage() {
// navige passe d une page aune autre avec use navgate met le le dans le try
    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  //recupere l erreur

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    //conact backend finally


    // manuel validation wuhout backendn(optionl ca rle backend le fait )

    if (!username || !email || !password){
        setErrorMessage("all field are required")
        return
        
    }
    const body = {
      email,
      username,
      password,
    };

    console.log(body);

    try {
      const response = await service.post(  `/auth/signup`, body,);
      console.log("user register", response); // HOULD MATCH THE ROUTE IF ITS A POST IN THE BACK YOU POST POST

      navigate("/login")

    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

 return (
  <div className="signup-container">
    
    <Navbar/>

    <form onSubmit={handleSignup} className="signup-form">
      <h1 className="signup-title">Signup</h1>
      <label className="signup-label">Email:</label>
      <input
        className="signup-input"
        type="email"
        name="email"
        value={email}
        required
        onChange={handleEmailChange}
      />

      <label className="signup-label">Username:</label>
      <input
        className="signup-input"
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />

      <label className="signup-label">Password:</label>
      <input
        className="signup-input"
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <button type="submit" className="signup-button">Signup</button>

      {errorMessage && <p className="signup-error">{errorMessage}</p>}

      <Link to="/login" className="login-link">
        <button className="login-button">Already signed up? Login</button>
      </Link>
    </form>
  </div>
);
}

export default Signuppage;
