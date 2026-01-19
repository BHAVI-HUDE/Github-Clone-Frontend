const RepoTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="repo-tabs">
      <button
        className={activeTab === "code" ? "active" : ""}
        onClick={() => setActiveTab("code")}
      >
        Code
      </button>

      <button
        className={activeTab === "issues" ? "active" : ""}
        onClick={() => setActiveTab("issues")}
      >
        Issues
      </button>
    </div>
  );
};

export default RepoTabs;
