import "./online.css";

export default function Online({ user, isOnline }) {
  return (
    <li className="onlineUser">
      <div className="onlineProfileImgContainer">
        <img
          className="onlineProfileImg"
          src={user.profilePicture || "default-avatar.png"}
          alt=""
        />
        {isOnline && <span className="onlineDot"></span>}
      </div>
      <span className="onlineUsername">{user.username}</span>
    </li>
  );
}
