import RepoCard from "../../components/RepoCard";

const RepoList = ({ repos = [] }) => {
  if (!repos.length) {
    return <p>No repositories found.</p>;
  }

  return (
    <div>
      {repos.map((repo) => (
        <RepoCard
          key={repo._id || repo.id}
          repo={repo}
        />
      ))}
    </div>
  );
};

export default RepoList;
