import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CreateComments from "../components/CreateComments";
import "./ProductDetail.css";
import "../components/CreateComments.css";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  //verifie si user is logged
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`,
        );
        setProduct(response.data);
        // console.log("maylis")
        // console.log("Product fetched from backend:", response.data); // ✅
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [productId]);

  const getComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/comments`,
        {
          params: { productId },
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productId) getComments();
  }, [productId]);

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>Product not found.</h3>;
  //console.log(product);

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

<div>
      <div className="productsis">
        {/* IMAGE BLOCK */}
        <div className="blockImage">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <p>No image available</p>
          )}
        </div>

        {/* TEXT DETAILS */}
        <div className="textDetails">
          {/* Product Name */}
          <div className="text-block-name">
            <h1>{product.name}</h1>
          </div>

          {/* Seller, Stock, Category in ONE block */}
          <div className="text-block-productinfo">
            <p className="rowInfo">
              Seller <span>{product.seller?.username || "N/A"}</span>
            </p>
            <p className="rowInfo">
              Stock <span>{product.stock}</span>
            </p>
            <p className="rowInfo">
              Category <span>{product.category || "N/A"}</span>
            </p>
          </div>

          {/* Price */}
          <div className="text-block-price">
            <p>
              Price <span>{product.salePrice} $</span>
            </p>
          </div>

          {/* Email / Request */}
          {isLoggedIn && (
            <div className="text-block-askrequest">
              <p>
                Email: <span> {product.seller?.email || "N/A"}</span>
              </p>
            </div>
          )}

          {/* Comments Section */}
          {isLoggedIn && (
            <div className="text-block6comments-section">
              <CreateComments productId={productId} />
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
