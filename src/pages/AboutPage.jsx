import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutPage.css";
import Navbar from "../components/Navbar";
import service from "../services/config.services";

function AboutPage({ user1 }) {
  // État pour stocker les informations de l'utilisateur
  const [user, setUser] = useState(user1 || null);

  // État pour stocker les produits
  const [products, setProducts] = useState([]);

  //etat pour la
  const [profileImage, setProfileImage] = useState(null);

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  // États pour l'édition en ligne
  const [editingField, setEditingField] = useState(null); // "username" or "email"
  const [editValue, setEditValue] = useState("");

  // Charger les informations utilisateur et produits au montage
  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchProfileImage();
  }, []);

  // Initialiser la valeur de l'input quand on commence à éditer
  useEffect(() => {
    if (user && editingField) {
      if (editingField === "username") setEditValue(user.username);
      if (editingField === "email") setEditValue(user.email);
    }
  }, [user, editingField]);

  // Récupérer les informations de l'utilisateur
  const fetchUser = async () => {
    try {
      const response = await service.get("/user/me");
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Récupérer l'image de profil de l'utilisateur donc ne cree pas une nouvelle image a chaque fois que on refresh la page
  const fetchProfileImage = async () => {
    try {
      const response = await service.post("/user/profile-image");
      setProfileImage(response.data);
      console.log("Profile image URL:", response.data);
    } catch (err) {
      console.error(err);
      console.log("No profile image found for the user.");
    }
  };

  // Récupérer tous les produits
  const fetchProducts = async () => {
    try {
      const response = await service.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fonction pour sauvegarder une modification, mais seulement si elle a changé
  const handleSave = async (field) => {
    // Si la valeur n'a pas changé ou est vide, ne rien faire
    if (!editValue || editValue === user[field]) {
      setEditingField(null); // sortir du mode édition
      return;
    }

    try {
      const data = { [field]: editValue };
      const response = await service.put("/user", data);
      setUser(response.data); // mettre à jour l'état local
      setEditingField(null); // sortir du mode édition
    } catch (err) {
      console.error(err);
      alert("Error updating information");
    }
  };

  // Affichage si les données ne sont pas encore chargées
  if (!user) return <h3>Loading...</h3>;
  // !ajouter une condition si ca retourne pas

  return (
    <>
      {/* Barre de navigation */}
      <Navbar />

      <div className="containerAbout">
        <div className="blocksinffo">
          <div className="infoBlock">
            <div className="photo"></div>
            <div className="info">
              {/* Username */}
              <div className="usernameRow">
                {editingField === "username" ? (
                  <>
                    <input
                      className="editInput"
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <div className="editButtonsColumn">
                      <button onClick={() => handleSave("username")}>
                        Save
                      </button>
                      <button onClick={() => setEditingField(null)}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="emailrow">
                      <span className="usernameText"> {user.username} </span>
                      <div className="buttonEdit">
                        <button
                          className="editButton"
                          onClick={() => setEditingField("username")}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Email */}
              <div className="emailType">
                {editingField === "email" ? (
                  <>
                    <input
                      type="email"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <span className="emailText"> {user.email} </span>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section pour afficher les créations de l'utilisateur */}
        <div className="mydolls">
          <div className="mydollslist">
            <div className="myCreation">
              <div className="myCreationHeader">
                <p>My Creations</p>

                {/* Bouton pour créer un nouveau produit */}

                <button onClick={() => navigate("/post-products")}>
                  <span>Create Product</span>
                </button>
              </div>
              <div className="">
                <div className="myCreationList">
                  {/* Affichage des produits créés par l'utilisateur */}

                  {products.filter((product) => product.seller === user._id)
                    .length === 0 ? (
                    <p>
                      <span className="creationtextss">
                        No products created
                      </span>
                    </p>
                  ) : (
                    products.map((product) => (
                      <div key={product._id} className="productCard">
                        <div className="productInfo">
                          {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} />
                          )}
                          <div className="infosse">
                            <h4>{product.name}</h4>
                            <p>{product.category}</p>
                          </div>
                        </div>
                        {/* Bouton pour éditer le produit */}
                        <button
                          onClick={() =>
                            navigate(`/edit-product/${product._id}`)
                          }
                        >
                          Edit
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
