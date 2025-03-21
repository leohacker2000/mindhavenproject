import "./post.css";
import { Comment, MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post, onDelete }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showOptions, setShowOptions] = useState(false); // State for dropdown visibility
  const [showComments, setShowComments] = useState(false); // Toggle for comments
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { userId: currentUser._id },
      });
      onDelete(post._id);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      userId: currentUser._id,
      username: currentUser.username,
      text: newComment,
    };

    try {
      await axios.put(`/posts/${post._id}/comment`, commentData);
      setComments([...comments, commentData]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const deleteComment = async (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    try {
      await axios.put(`/posts/${post._id}/delete-comment`, {
        comments: updatedComments,
      });
      setComments(updatedComments);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvater.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert
              onClick={() => setShowOptions(!showOptions)}
              style={{ cursor: "pointer" }}
            />
            {showOptions && (
              <div className="dropdown">
                {currentUser._id === post.userId && (
                  <button className="dropdownItem" onClick={deleteHandler}>
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && <img className="postImg" src={PF + post.img} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} Likes</span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => setShowComments(!showComments)}
            >
              {comments.length} Comments <Comment />
            </span>
          </div>
        </div>

        {showComments && (
          <div className="commentsSection">
            <div className="commentInputWrapper">
              <img
                className="commentProfileImg"
                src={
                  currentUser.profilePicture
                    ? PF + currentUser.profilePicture
                    : PF + "person/noAvater.png"
                }
                alt=""
              />
              <input
                type="text"
                className="commentInput"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="commentButton" onClick={addComment}>
                Post
              </button>
            </div>
            <div className="commentsList">
              {comments.map((c, index) => (
                <div key={index} className="comment">
                  <div className="commentContent">
                    <strong>{c.username}</strong> <span>{c.text}</span>
                  </div>
                  {c.userId === currentUser._id && (
                    <button
                      className="deleteComment"
                      onClick={() => deleteComment(index)}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
