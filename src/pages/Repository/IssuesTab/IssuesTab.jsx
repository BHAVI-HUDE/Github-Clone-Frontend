import IssueList from "./IssueList";
import NewIssueForm from "./NewIssueForm";

const IssuesTab = ({
  issues,
  showNewIssueForm,
  setShowNewIssueForm,
  issueTitle,
  setIssueTitle,
  issueDescription,
  setIssueDescription,
  onCreateIssue,
  onToggleIssueStatus,
  onDeleteIssue,
}) => {
  return (
    <div className="issues-section">
      <div className="issues-header">
        <h3>Issues</h3>
        <button onClick={() => setShowNewIssueForm(true)}>
          New Issue
        </button>
      </div>

      {showNewIssueForm && (
        <NewIssueForm
          issueTitle={issueTitle}
          issueDescription={issueDescription}
          setIssueTitle={setIssueTitle}
          setIssueDescription={setIssueDescription}
          onCreateIssue={onCreateIssue}
          onCancel={() => setShowNewIssueForm(false)}
        />
      )}

      <IssueList
        issues={issues}
        onToggleIssueStatus={onToggleIssueStatus}
        onDeleteIssue={onDeleteIssue}
      />
    </div>
  );
};

export default IssuesTab;
