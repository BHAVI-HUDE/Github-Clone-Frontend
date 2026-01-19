const FileViewer = ({ file }) => {
  if (!file) return null;

  return (
    <div className="file-viewer">
      <h3>{file.name}</h3>
      <pre>{file.content}</pre>
    </div>
  );
};

export default FileViewer;
