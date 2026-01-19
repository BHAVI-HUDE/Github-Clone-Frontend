import { useEffect, useState } from "react";
import { fetchUserRepositories } from "../services/repo.service";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useRepositories = (userId, searchQuery = "") => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId && !searchQuery) return;

    const fetchRepos = async () => {
      setLoading(true);
      try {
        // 🔹 SEARCH MODE
        if (searchQuery) {
          const res = await fetch(
            `${API_URL}/repo/search/${searchQuery}`
          );
          const data = await res.json();
          setRepos(data.repos || []);
        }
        // 🔹 NORMAL MODE
        else {
          const data = await fetchUserRepositories(userId);
          setRepos(data.repositories || []);
        }

        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [userId, searchQuery]);

  return { repos, loading, error };
};

