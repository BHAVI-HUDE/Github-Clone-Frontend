import { useParams } from "react-router-dom";
import { useRepoDetails } from "../../hooks/useRepoDetails";
import RepoTabs from "./RepoTabs";
import RepoHeader from "./RepoHeader";
import IssuesTab from "./IssuesTab/IssuesTab";
import CodeTab from "./CodeTab/CodeTab";

import "./RepoDetails.css";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

function RepoDetailsContent() {
  const { id } = useParams();

const {
    repo,
    ownerName,
    isOwner,
    items,
    currentPath,
    fileView,
    loading,
    error,
    activeTab,
    setActiveTab,
    issues,
    showNewIssueForm,
    setShowNewIssueForm,
    issueTitle,
    setIssueTitle,
    issueDescription,
    setIssueDescription,
    fileInputRef,
    handlers,
  } = useRepoDetails(id);
  /* =========================
     Render Guards
  ========================== */
  if (loading) return <p>Loading repository...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!repo) return null;

  return (
    <div className="repo-page">
      <RepoHeader
        repo={repo}
        ownerName={ownerName}
        isOwner={isOwner}
        activeTab={activeTab}
        onAddFile={handlers.handleAddFile}
        onAddFolder={handlers.handleAddFolder}
        onUploadFiles={() => fileInputRef.current?.click()}
        onToggleVisibility={handlers.toggleVisibility}
        onDeleteRepository={handlers.deleteRepository}
      />

      <RepoTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "issues" && (
        <IssuesTab
          issues={issues}
          showNewIssueForm={showNewIssueForm}
          setShowNewIssueForm={setShowNewIssueForm}
          issueTitle={issueTitle}
          setIssueTitle={setIssueTitle}
          issueDescription={issueDescription}
          setIssueDescription={setIssueDescription}
          onCreateIssue={handlers.handleCreateIssue}
          onToggleIssueStatus={handlers.toggleIssueStatus}
          onDeleteIssue={handlers.handleDeleteIssue}
        />
      )}

      {activeTab === "code" && (
        <CodeTab
          items={items}
          currentPath={currentPath}
          fileView={fileView}
          onItemClick={handlers.handleItemClick}
          onDeleteItem={handlers.handleDelete}
          onGoBack={handlers.goBack}
           canEdit={isOwner}
        />

      )}
    </div>
  );
}

export default RepoDetailsContent;
