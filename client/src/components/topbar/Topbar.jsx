import "./topbar.css";
import { Search, Person, Notifications, ExitToApp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { searchUsers } from "../../services/searchService";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 3) {
        setIsLoading(true);
        try {
          const results = await searchUsers(searchTerm);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    sessionStorage.removeItem("user"); 
    navigate("/login", { replace: true }); 
    window.location.reload(); 
  };
  

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MindHaven</span>
        </Link>
        <span className="topbarRecord"></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {showResults && (
            <div className="searchResults" ref={searchResultsRef}>
              {isLoading ? (
                <div className="searchLoading">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <Link
                    to={`/profile/${result.username}`}
                    key={result._id}
                    className="searchResultItem"
                    onClick={() => {
                      setShowResults(false);
                      setSearchTerm("");
                    }}
                  >
                    <img
                      src={
                        result.profilePicture
                          ? PF + result.profilePicture
                          : PF + "person/noAvater.png"
                      }
                      alt=""
                      className="searchResultImg"
                    />
                    <span className="searchResultName">{result.username}</span>
                  </Link>
                ))
              ) : (
                <div className="noResults">No users found</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">HOME</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">4</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">6</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvater.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <button className="logoutButton" onClick={handleLogout}>
          <ExitToApp />
        </button>
      </div>
    </div>
  );
}
