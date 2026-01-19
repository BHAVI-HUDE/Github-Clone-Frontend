const RepoPath = ({ currentPath, onGoBack }) => {
  return (
    <div className="repo-path">
      {currentPath && (
        <button onClick={onGoBack}>← Back</button>
      )}
      <span>{currentPath || "root"}</span>
    </div>
  );
};

export default RepoPath;
