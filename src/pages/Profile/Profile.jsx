import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";
import ActivityHeatmap from "../../components/HeatMap";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Profile() {
  const { id } = useParams();

  //  STATE 
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const avatarInputRef = useRef(null);
  

  // FETCH PROFILE 
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/user/${id}/profile`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data.user);
        setRepos(data.repos || []);
        setUsername(data.user.username);
        setBio(data.user.bio || "");
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  //  AVATAR UPLOAD 
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;



    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(
        `${API_URL}/user/${id}/avatar`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Avatar upload failed");
      }

        setUser((prev) =>
  prev
    ? { ...prev, avatar: `${data.avatar}?t=${Date.now()}` }
    : prev
);



      
    } catch (err) {
      alert(err.message);
    } finally {
      e.target.value = "";
    }
  };

  // UPDATE PROFILE 
  const handleProfileUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/user/updateProfile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          bio,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setUser(data.user);
      setEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // RENDER
  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="profile-page">

      

      {/* LEFT COLUMN */}
      <div className="profile-left">
        

       {user && (
          <img
            src={user.avatar || "/assets/defaultAvatar.png"}
            alt="profile"
            className="nav-avatar"
            style={{ borderRadius: "50%" }}
          />
        )}


        <button
          className="profile-avatar-btn"
          onClick={() => avatarInputRef.current.click()}
        >
          Change avatar
        </button>

        <input
          type="file"
          ref={avatarInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleAvatarUpload}
        />

        {editing ? (
          <>
            <input
              className="profile-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <textarea
              className="profile-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a bio..."
            />

            <div className="profile-actions">
              <button onClick={handleProfileUpdate}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2>{user.username}</h2>
            <p>{user.bio || "No bio added"}</p>

            <button onClick={() => setEditing(true)}>
              Edit profile
            </button>
          </>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="profile-right">
        <h3>Repositories ({repos.length})</h3>

        {repos.length === 0 && (
          <p style={{ color: "#57606a" }}>
            This user has no repositories yet.
          </p>
        )}

        {repos.map((repo) => (
        <div key={repo._id} className="repo-card">
          <div className="repo-info">
            <Link to={`/repo/${repo._id}`} className="repo-name">
              {repo.name}
            </Link>

            <p className="repo-desc">
              {repo.description || "No description"}
            </p>
          </div>

          <span className="repo-visibility">
            {repo.isPrivate ? "Private" : "Public"}
          </span>
        </div>
        
      ))}

      </div>

        <div className="heatmap">
        {/* ✅ Activity Heatmap */}
      <ActivityHeatmap />
      </div>
    </div>
  );
}

export default Profile;

