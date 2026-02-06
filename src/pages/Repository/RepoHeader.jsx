const RepoHeader = ({
  repo,
  ownerName,
  isOwner,
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
      <div className="repo-title">
        <div>
          <h2>{repo.name}</h2>
          <p className="repo-owner">
            Owner: {ownerName || "Unknown"}
          </p>
        </div>
        <span className="repo-visibility">
          {repo.isPrivate ? "Private" : "Public"}
        </span>
      </div>
      
      {isOwner && (
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
      )}
    </div>
  );
};

export default RepoHeader;
