import React from "react";
import "./CommentCard.css";

function CommentCard({ comment, currentUserId, onDelete }) {
  const isAuthor = String(comment.username?._id) === String(currentUserId);

  return (
    <div className="comment-item">
      <div>
      <b>{comment.username?.username || "User"}:</b> {comment.content}
      </div>
      {isAuthor && (
        <button onClick={() => onDelete(comment._id)}>Delete</button>
      )}
    </div>
  );
}

export default CommentCard;