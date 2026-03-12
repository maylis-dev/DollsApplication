import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);

  const categories = ["Dolls", "Bratz", "Barbie"];

  const handleCategoryClick = (category) => {
    setShowCategories(false);

    if (category === "Dolls") navigate("/products");
    if (category === "Barbie") navigate("/barbies");
    if (category === "Bratz") navigate("/bratzs");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setLoggedUserId(null);
    navigate("/");
  };

  return (
    <div className="navigation">
      <div className="container">
        <div className="buttons">

          <div className="find">
            <button onClick={() => setShowCategories(!showCategories)}>
              Dolls
            </button>

            {showCategories && (
              <div className="dolls-menu">
                {categories.map((cat) => (
                  <div key={cat} onClick={() => handleCategoryClick(cat)}>
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

         <button> <Link to="/">home</Link></button>
          { isLoggedIn ? (
            <>
              
               <button><Link to="/about">about</Link></button>
                <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <>
           <button> <Link to="/login">login</Link></button>
          <button><Link to="/signup">signup</Link></button>
            </>
          )}
      
         

         

        </div>
      </div>
    </div>
  );
}

export default Navbar;