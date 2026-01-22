import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";



const API_URL = import.meta.env.VITE_API_BASE_URL;

function TopNav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState("");


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  const handleSearch = (e) => {
  e?.preventDefault();

  if (!searchQuery.trim()) return;

  navigate({
    pathname: "/dashboard",
    search: `?search=${encodeURIComponent(searchQuery)}`,
  });

  setSearchQuery("");
};

  useEffect(() => {
  if (!userId) return;

  async function fetchUserProfile() {
    try {
      const res = await fetch(
        `${API_URL}/user/${userId}/profile`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load user");
      }

      setUser(data.user);
    } catch (error) {
      console.error("Navbar profile fetch error:", error);
    }
  }
  fetchUserProfile();
}, [userId]);




  return (
    <header
      style={{
        height: "56px",
        borderBottom: "1px solid #d0d7de",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        justifyContent: "space-between",
      }}
    >
      {/* Left */}
      <div 
      className="top-nav-left" 
      onClick={() => navigate("/")}
       style={{cursor:"pointer"}}
      >
        <img
          src="/assets/github_733609.png"
          style={{ width: "40px" }}
          alt="GitHub logo"
          />


        <p>
          GitHub
        </p>
      </div>

      {/* Center */}
      <div className="nav-search">
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>


      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

          {/* New Repository */}
          <div 
          style={{
            cursor: "pointer",
            padding:2
          }} 
          title="Create New Repository"
          >
          <FontAwesomeIcon icon={faSquarePlus} 
          style={{
            
            color: "#ffffffff", 
            backgroundColor:"black",
            fontSize: "20px", 
            borderRadius:4,
          }} 
          onClick={() => navigate("/create")}
          
          />
          </div>
            
          
            
          

          {/* User placeholder (will become avatar later) */}
            {user && (
          <div
            className="nav-profile"
            onClick={() => navigate(`/user/${user._id}/profile`)}
            style={{cursor:"pointer"}}
            title="Profile"
          >
            <img 
              src={user.avatar || "/default-avatar.png"}
              alt="profile"
              className="nav-avatar"

            />
            
          </div>
        )}



          {/* Logout */}
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>

    </header>
  );
}

export default TopNav;

