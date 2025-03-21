import "./share.css";
import { PermMedia, Cancel, LabelOutlined } from "@mui/icons-material";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [taggedUsers, setTaggedUsers] = useState([]); 
  const [inputText, setInputText] = useState(""); 
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users/all"); 
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    const lastWord = value.split(" ").pop();
    if (lastWord.startsWith("@")) {
      const search = lastWord.slice(1).toLowerCase();
      const filtered = users.filter((u) =>
        u.username.toLowerCase().includes(search)
      );
      setFilteredUsers(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectUser = (selectedUser) => {
    if (!taggedUsers.some((u) => u._id === selectedUser._id)) {
      setTaggedUsers([...taggedUsers, selectedUser]);
    }

    const words = inputText.split(" ");
    words[words.length - 1] = `@${selectedUser.username}`;
    setInputText(words.join(" ") + " ");

    setShowSuggestions(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: inputText,
      taggedUsers: taggedUsers.map((u) => u._id), 
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };
  console.log("User Object:", user);
  console.log("User Profile Picture:", user.profilePicture);


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
        <img
  className="shareProfileImg"
  src={user.profilePicture && user.profilePicture !== "" ? PF + user.profilePicture : PF + "person/noAvater.png"}
  alt="profile"
/>

          <input
            placeholder={"Want To Make A Post " + user.username + "?"}
            className="shareInput"
            value={inputText}
            onChange={handleInputChange}
          />
          {showSuggestions && (
            <ul className="suggestionsList">
              {filteredUsers.map((u) => (
                <li key={u._id} onClick={() => selectUser(u)}>
                  {u.username}
                </li>
              ))}
            </ul>
          )}
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="mediaOptionText">Media</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelOutlined htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
          </div>
          <button className="postButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
