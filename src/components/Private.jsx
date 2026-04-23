// wrap the page and only logins user can se it

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";  

function Private(props) {
  const { isLoggedIn } = useContext(AuthContext);//écupère les données du contexte AuthContext.

  if (isLoggedIn) {
    return props.children;//affiche composant s 
  } else {
    return <Navigate to="/login" />;
  }
}

export default Private;
