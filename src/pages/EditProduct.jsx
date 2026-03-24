import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import service from "../services/config.services";
import axios from "axios";
import "./EditProduct.css";

function EditProductsPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await service.get(`/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setName(res.data.name || "");
          setCategory(res.data.category || "");
          setPrice(res.data.salePrice || "");
          setStock(res.data.stock || "");
          
          setImageUrl(res.data.imageUrl || null);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données du produit.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      // éviter le cas où l'utilisateur ouvre le sélecteur sans choisir de fichier
      return;
    }

    setIsUploading(true); // démarre l'animation de chargement

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    // le mot "image" doit être le même que dans le backend :
    // uploader.single("image")

    try {
      const response = await axios.post(
        "http://localhost:5003/api/upload",
        uploadData,
      );

      setImageUrl(response.data.imageUrl);
      // le backend envoie : res.json({ imageUrl: req.file.path });

      setIsUploading(false);
    } catch (error) {
      navigate("/error");
      console.error("Erreur upload image:", error);
  setIsUploading(false);
  setError("Problème lors de l'upload de l'image");
  // navigate("/error"); // désactive temporairement pour debugger
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      setError("Please select a category.");
      return;
    }

    const productData = {
      name,
      salePrice: Number(price),
      stock: Number(stock),
    
      category,
    };

    try {
      const token = localStorage.getItem("authToken");
      await service.put(`/products/${productId}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/about");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      setError("Une erreur est survenue. Vérifiez vos champs et réessayez.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await service.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/about");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Impossible de supprimer le produit. Réessayez.");
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <>
      <Navbar />
      <div className="Editcontainer">
      <div className="edit-product-page">
        <h2>Edit Product</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="edit-product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Barbie">Barbie</option>
            <option value="Bratz">Bratz</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

     

          <button type="submit">Update Product</button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </form>
      </div>
      </div>
    </>
  );
}

export default EditProductsPage;
