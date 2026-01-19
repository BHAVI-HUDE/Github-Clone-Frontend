const NewIssueForm = ({
  issueTitle,
  issueDescription,
  setIssueTitle,
  setIssueDescription,
  onCreateIssue,
  onCancel,
}) => {
  return (
    <div className="new-issue-form">
      <input
        type="text"
        placeholder="Issue title"
        value={issueTitle}
        onChange={(e) => setIssueTitle(e.target.value)}
      />

      <textarea
        placeholder="Describe the issue"
        value={issueDescription}
        onChange={(e) =>
          setIssueDescription(e.target.value)
        }
      />

      <button onClick={onCreateIssue}>Create</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default NewIssueForm;
