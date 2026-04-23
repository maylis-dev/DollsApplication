import { useState, useContext } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="blocksfooter">
          <div className="block1">
            <h3>DollsApp ✦</h3>
            <h6 className="textses">
              La plateforme communautaire dédiée aux passionné·e·s de poupées.
              Achète, vends, et connecte-toi avec des milliers de collectors.
            </h6>
          </div>
          <div className="block1">
            <h2>Navigation</h2>
            <h6>Dolls</h6>
            <h6>SignUp</h6>
            <h6>Home</h6>
          </div>
          <div className="block1">
            <h2>Categories</h2>
            <h6>Dolls</h6>
            <h6>Barbie</h6>
            <h6>Bratz</h6>
          </div>
          <div className="block1">
            <h2>Follow Us</h2>
            <h6>Facebook</h6>
            <h6>Instagram</h6>
            <h6>Twitter</h6>
          </div>
        </div>
        <hr />
        <div className="footerBas">
          <h5>© 2026 DollsApp — Fait avec ❤️ pour les collectors</h5>
          <h5>✦ DollsApp</h5>
        </div>
      </div>
    </>
  );
}

export default Footer;
