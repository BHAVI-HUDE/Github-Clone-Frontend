const RepoFileList = ({
  items,
  onItemClick,
  onDeleteItem,
}) => {
  if (!items.length) {
    return (
      <p className="empty-text">
        This folder is empty.
      </p>
    );
  }

  return (
    <div className="repo-files">
      {items.map((item) => (
        <div key={item.name} className="repo-file-row">
          <span
            onClick={() => onItemClick(item)}
            style={{ cursor: "pointer" }}
          >
            {item.type === "folder" ? "📁" : "📄"}{" "}
            {item.name}
          </span>

          <span>{item.lastCommit || "-"}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteItem(item);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default RepoFileList;
