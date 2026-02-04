import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../services/api";

function Sidebar({ isOpen, onClose }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const userId = localStorage.getItem("userId");
        const data = await apiRequest(`/repo/user/${userId}`);
        setRepos(data.repositories || []);
      } catch (err) {
        console.error("Failed to load sidebar repos");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <aside
     className={`sidebar ${isOpen ? "" : "sidebar--closed"}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close sidebar"
        className="sidebar__close"
      >
        ✕
      </button>
      <strong>Your Repositories</strong>

      {loading && <p style={{ marginTop: "12px" }}>Loading...</p>}

      {!loading && repos.length === 0 && (
        <p style={{ marginTop: "12px", color: "#57606a" }}>
          No repositories yet
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "12px" }}>
        {repos.map((repo) => (
          <li key={repo._id} style={{ marginBottom: "8px" }}>
            <Link to={`/repo/${repo._id}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
