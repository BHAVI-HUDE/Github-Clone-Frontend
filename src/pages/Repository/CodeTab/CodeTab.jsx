import RepoPath from "./RepoPath";
import RepoFileList from "./RepoFileList";
import FileViewer from "./FileViewer";

const CodeTab = ({
  items,
  currentPath,
  fileView,
  onItemClick,
  onDeleteItem,
  onGoBack,
}) => {
  return (
    <>
      <RepoPath
        currentPath={currentPath}
        onGoBack={onGoBack}
      />

      {fileView ? (
        <FileViewer file={fileView} />
      ) : (
        <RepoFileList
          items={items}
          onItemClick={onItemClick}
          onDeleteItem={onDeleteItem}
        />
      )}
    </>
  );
};

export default CodeTab;
