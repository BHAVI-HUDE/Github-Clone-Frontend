import { useSearchParams } from "react-router-dom";
import RepoList from "./RepoList";
import { useRepositories } from "../../hooks/useRepositories";
import ActivityHeatmap from "../../components/HeatMap";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const userId = localStorage.getItem("userId");
  const { repos, loading, error } = useRepositories(userId, searchQuery);
  

 if(loading) return <p>Loading repositories...</p>;
 if(error) return <p style ={{color:"red"}}>{error}</p>;

 return (
    <div className="dashboard">
     <div className="dashboard-content">
        <RepoList repos={repos} />
        <ActivityHeatmap />
      </div>
    </div>
  );
  } 

export default Dashboard;
