const RepoHeader = ({
  repo,
  activeTab,
  onAddFile,
  onAddFolder,
  onUploadFiles,
  onToggleVisibility,
  onDeleteRepository,
}) => {
  if (!repo) return null;

  return (
    <div className="repo-header">
      <h2>{repo.name}</h2>
      <span>{repo.isPrivate ? "Private" : "Public"}</span>

      <div className="repo-header-actions">
        <button onClick={onAddFile}>Add file</button>
        <button onClick={onAddFolder}>Add folder</button>

        {activeTab === "code" && (
          <button type="button" onClick={onUploadFiles}>
            Upload files
          </button>
        )}

        <button onClick={onToggleVisibility}>
          Make {repo.isPrivate ? "Public" : "Private"}
        </button>

        <button className="danger" onClick={onDeleteRepository}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RepoHeader;
