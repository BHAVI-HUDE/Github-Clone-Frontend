import { Link } from "react-router-dom";

function RepoCard({ repo }) {
   if (!repo) return null;
  return (
    <div className="card repo-card">
      <Link to={`/repo/${repo._id}`}>
        <h3>{repo.name}</h3>
      </Link>

      <p>{repo.description || "No description provided"}</p>

      <small>
        Visibility: {repo.isPrivate ? "Private" : "Public"}
      </small>
    </div>
  );
}

export default RepoCard;
