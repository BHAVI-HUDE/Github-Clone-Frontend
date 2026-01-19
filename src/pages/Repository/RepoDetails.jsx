import ErrorBoundary from "../../components/common/ErrorBoundary";
import RepoDetailsContent from "./RepoDetailsContent";

const RepoDetails = () => {
  return (
    <ErrorBoundary>
      <RepoDetailsContent />
    </ErrorBoundary>
  );
};

export default RepoDetails;
