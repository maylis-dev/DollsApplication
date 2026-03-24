// wrap the page and only logins user can se it

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";  

function Private(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default Private;
