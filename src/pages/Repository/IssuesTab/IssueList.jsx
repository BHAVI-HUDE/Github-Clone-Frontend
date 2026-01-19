const IssueList = ({
  issues,
  onToggleIssueStatus,
  onDeleteIssue,
}) => {
  if (!issues.length) {
    return <p>No issues found.</p>;
  }

  return (
    <>
      {issues.map((issue) => (
        <div key={issue._id} className="issue-row">
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.description}</p>
          </div>

          <span>{issue.status}</span>

          <div className="issue-actions">
            <button onClick={() => onToggleIssueStatus(issue)}>
              {issue.status === "open" ? "Close" : "Reopen"}
            </button>

            <button
              className="danger"
              onClick={() => onDeleteIssue(issue._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default IssueList;
