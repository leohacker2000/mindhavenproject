import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setProfileUser] = useState({});
  const [file, setFile] = useState(null);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setProfileUser(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, [username]);

  // Function to handle file upload for profile or cover picture
  const uploadImage = async (file, type) => {
    if (!file) return;

    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);

    try {
      // Upload Image
      await axios.post("/upload", data);

      // Update User Profile
      await axios.put(`/users/${user._id}`, {
        userId: user._id,
        [type]: fileName, // type = "profilePicture" or "coverPicture"
      });

      window.location.reload();
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* Cover Photo */}
              <label htmlFor="coverInput">
                <img
                  className="profileCoverImg"
                  src={profileUser.coverPicture ? PF + profileUser.coverPicture : PF + "person/noCoverpic.png"}
                  alt=""
                />
                {user.username === profileUser.username && (
                  <button className="uploadButton">Change Cover</button>
                )}
              </label>
              <input
                type="file"
                id="coverInput"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => uploadImage(e.target.files[0], "coverPicture")}
              />

              {/* Profile Picture */}
              <label htmlFor="profileInput">
                <img
                  className="profileUserImg"
                  src={profileUser.profilePicture ? PF + profileUser.profilePicture : PF + "person/noAvatar.png"}
                  alt=""
                />
                {user.username === profileUser.username && (
                  <button className="uploadButton">Change Profile</button>
                )}
              </label>
              <input
                type="file"
                id="profileInput"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => uploadImage(e.target.files[0], "profilePicture")}
              />
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUser.username}</h4>
              <span className="profileInfoDesc">{profileUser.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={profileUser} />
          </div>
        </div>
      </div>
    </>
  );
}
