import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { io } from "socket.io-client";
import Online from "../online/Online";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(user?._id) || false
  );
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8800", {
      transports: ["websocket"],
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);



  useEffect(() => {
    if (!socket || !currentUser?._id) return;
  
    console.log("Emitting addUser:", currentUser._id);
    socket.emit("addUser", currentUser._id);
  
    socket.on("getUsers", (users) => {
      console.log("Received Online Users:", users);
      console.log("Current friends:", friends);
      setOnlineUsers(users.map((user) => user.userId));
      console.log("Updated onlineUsers state:", users.map((user) => user.userId));
    });
  
    return () => {
      socket.off("getUsers");
    };
  }, [socket, currentUser]);



  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user?._id) {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="quoteContainer">
          <img className="quoteImg" src="assets/quote.png" alt="" />
          <span className="quoteText">
            <b>Never</b> give <b>up</b>
          </span>
        </div>
        <img className="rightbarquote" src="assets/logo.jpg" alt="" />
        <h4 className="rightbarTitle">Online Users</h4>
        <ul className="rightbaruserList">
          {friends.filter(friend => onlineUsers.includes(friend._id)).map((friend) => (
            <Online
              key={friend._id}
              user={friend}
              isOnline={true} 
            />
          ))}
          {friends.filter(friend => !onlineUsers.includes(friend._id)).map((friend) => (
            <Online
              key={friend._id}
              user={friend}
              isOnline={false}
            />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Remove User" : "Add User"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
                {onlineUsers.includes(friend._id) && (
                  <span className="onlineDot"></span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
