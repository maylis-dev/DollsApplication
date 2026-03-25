import React from "react";

function CommentCard({ comment, currentUserId, onDelete }) {
  const isAuthor = String(comment.username?._id) === String(currentUserId);

  return (
    <div className="comment-item">
      <b>{comment.username?.username || "User"}:</b> {comment.content}
      {isAuthor && (
        <button onClick={() => onDelete(comment._id)}>Delete</button>
      )}
    </div>
  );
}

export default CommentCard;