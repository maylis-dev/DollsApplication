import { useEffect, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";
import "./CreateComments.css";
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

function CreateComments({ productId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("authToken");
  const userId = token ? parseJwt(token)?._id : null;

  // Fetch comments for this product
  const getComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/comments`, {
        params: { productId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    if (productId) getComments();
  }, [productId]);

  // Add a comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/comments`,
        { content: commentText, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [...prev, res.data]); // update state
      setCommentText("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Delete a comment (called by CommentCard)
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="comments-section">
      <div className="headerComments">
        <h3>Comments</h3>
        <span className="comment-count">{comments.length}</span>
      </div>

      {comments.map((c) => (
        <CommentCard
          key={c._id}
          comment={c}
          currentUserId={userId}
          onDelete={handleDelete} // child can delete comment
        />
      ))}

      <button onClick={() => setIsModalOpen(true)}>Write a Comment</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Write a Comment</h4>
            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Type your comment here..."
            />
            <div className="modal-actions">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setCommentText("");
                }}
              >
                Cancel
              </button>
              <button onClick={handleAddComment}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateComments;