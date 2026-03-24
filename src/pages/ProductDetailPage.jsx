import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CommentsSection from "../components/CreateComments";
import "./ProductDetail.css";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
//verifie si user is logged
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`
        );
        setProduct(response.data);
        //console.log("maylis")
     //console.log("Product fetched from backend:", response.data); // ✅
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [productId]);

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>Product not found.</h3>;
  //console.log(product);
  

return (
  <>
    <Navbar />

    <div className="productsis">
      {/* IMAGE BLOCK */}
      <div className="blockImage">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ maxWidth: "300px" }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      {/* TEXT DETAILS */}
      <div className="textDetails">
        {/* Product Name */}
        <div className="text-block name">
          <h1>{product.name}</h1>
        </div>

        {/* Seller, Stock, Category in ONE block */}
        <div className="text-block productinfo">
          <p>Seller: {product.seller?.username || "N/A"}</p>
          <p>Stock: {product.stock}</p>
          <p>Category: {product.category || "N/A"}</p>
        </div>

        {/* Price */}
        <div className="text-block price">
          <p>Price: ${product.salePrice}</p>
        </div>

        {/* Email / Request */}
        {isLoggedIn && (
           <div className="text-block askrequest">
          <p>Email: {product.seller?.email || "N/A"}</p>
          
        </div>
        )}

        {/* Comments Section */}
        {isLoggedIn && (
          <div className="text-block comments-section">
            <CommentsSection productId={productId} />
          </div>
        )}
      </div>
    </div>
  </>
);

}

export default ProductDetailPage;