import { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Login.css";

function LoginPage() {
  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } =
    useContext(AuthContext); // to update the context state when the user logs in,
  // AuthContext est utilisé pour accéder aux fonctions de mise à jour du contexte d'authentification, telles que setIsLoggedIn, setLoggedUserId et setLoggedUserRole. Ces fonctions sont utilisées pour mettre à jour l'état d'authentification de l'utilisateur dans le contexte global de l'application.
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contact backend to validate user credentials
    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        body,
      );
      console.log(response); // HOULD MATCH THE ROUTE IF ITS A POST IN THE BACK YOU POST POST

      // storing the  token sadely in local storage to be use when the user refresh or comeback later
      localStorage.setItem("authToken", response.data.authToken);

      //upadete the context state

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setLoggedUserRole(response.data.payload.role);

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        //navigate to error page
      }
    }
  };

  return (
    <div className="login-container">
      <Navbar />

      <form onSubmit={handleLogin} className="login-form">
        <div className="textLogin">
          <h1>DollApp✦</h1>
          <p>Welcome back ! 🎀</p>
          <h1 className="login-title">Login</h1>
        </div>

        <div className="loginInfo">
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="your@mail.com"
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="********"
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </div>

        <div className="clas">
          
          <span>OR</span>
         
          </div>
          <div className="signup-link">
          <p>No account? <a href="/signup">Sign up</a></p>
        </div>

        {errorMessage && <p className="login-error">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
