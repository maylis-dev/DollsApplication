import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DollsPage.css";

import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default: show all
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [selectedCategory]); //

  const getData = async () => {
    try {
      setLoading(true);
      const query =
        selectedCategory !== "All" ? `?category=${selectedCategory}` : "";
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products${query}`,
      );
      //console.log("All products fetched:", response.data); // 🔍 debug
      setAllProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrage côté frontend (optionnel, si backend ne filtre pas)
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <span className="loader"></span>;

    //!skelleton ou spinner
  }

  return (
    <>
      <Navbar />

      <div className="containerDolls">
        <div className="blockDolls">
          {/* Titre et filtres */}
          <div className="titre">
            <h1>
              All <span>Dolls</span>
            </h1>
            <p>Discover our amazing collection of dolls!</p>

            <div className="filter-buttons">
              {["All", "Barbie", "Bratz"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    selectedCategory === cat
                      ? "active filter-btn"
                      : "filter-btn"
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Liste des produits */}
          <div className="listeDolls">
            {filteredProducts.length === 0 ? (
              <p className="no-products">
                No products found for this category.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  className="purchaseDolls doll-card"
                  key={product._id}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="dollImage"
                    />
                  )}

                  <div className="secondBlock">
                    {/* Titre */}
                    <h3 className="doll-name">{product.name}</h3>
                    {/* Bouton demander */}
                    <Link to={`/products/${product._id}`}>
                      <button className="request-btn">See Doll</button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
