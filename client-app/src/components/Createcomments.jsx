import { useEffect, useState } from "react";
import axios from "axios";

function CommentsSection({ productId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId"); // Stocké lors du login

  // Fetch comments for this product
  const getComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/comments`, {
        params: { productId },
      });
      setComments(res.data);
    } catch (e) {
      console.log("Error fetching comments:", e);
    }
  };

  useEffect(() => {
    if (productId) getComments();
  }, [productId]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/comments`,
        { content: commentText, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add the newly created comment to state (username is populated)
      setComments((prev) => [...prev, res.data]);
      setCommentText("");
      setIsModalOpen(false);
    } catch (e) {
      console.log("Error adding comment:", e);
    }
  };

  // Delete a comment
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (e) {
      console.log("Error deleting comment:", e);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>

      {comments.map((c) => (
        <div key={c._id} className="comment-item">
          <b>{c.username?.username || "User"}:</b> {c.content}

          {/* Delete button only for the author */}
          {c.username?._id === userId && (
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          )}
        </div>
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

export default CommentsSection;