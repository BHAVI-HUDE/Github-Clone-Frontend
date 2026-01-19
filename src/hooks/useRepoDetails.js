import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export function useRepoDetails(id) {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const currentPathRef = useRef("");

  /* =========================
     State
  ========================== */
  const [repo, setRepo] = useState(null);
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [fileView, setFileView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("code");

  const [issues, setIssues] = useState([]);
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  /* =========================
     Path Ref Sync
  ========================== */
  useEffect(() => {
    currentPathRef.current = "";
  }, []);

  useEffect(() => {
    currentPathRef.current = currentPath || "";
  }, [currentPath]);

  /* =========================
     Hidden File Input
  ========================== */
  useEffect(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.style.display = "none";
    input.onchange = handleUploadFiles;

    document.body.appendChild(input);
    fileInputRef.current = input;

    return () => {
      document.body.removeChild(input);
    };
  }, []);

  /* =========================
     Fetch Repository Meta
  ========================== */
  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const data = await apiRequest(`/repo/${id}`);
        setRepo(data.repo);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRepo();
  }, [id]);

  /* =========================
     Browse Files / Folders
  ========================== */
  const fetchFolderContents = async (path = "") => {
    try {
      const data = await apiRequest(
        `/repo/${id}/browse?path=${path}`
      );
      setItems(data.items);
      setCurrentPath(path);
      setFileView(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderContents("");
  }, [id]);

  /* =========================
     Repo Actions
  ========================== */
  const toggleVisibility = async () => {
    const data = await apiRequest(`/repo/toggle/${id}`, {
      method: "PATCH",
    });
    setRepo(data.repository);
  };

  const deleteRepository = async () => {
    if (!window.confirm("Delete this repository permanently?")) return;
    await apiRequest(`/repo/delete/${id}`, { method: "DELETE" });
    navigate("/");
  };

  /* =========================
     File & Folder Actions
  ========================== */
  const handleItemClick = async (item) => {
    if (item.name === repo.name && currentPath === "") return;

    const fullPath = currentPath
      ? `${currentPath}/${item.name}`
      : item.name;

    if (item.type === "folder") {
      fetchFolderContents(fullPath);
    } else {
      const data = await apiRequest(
        `/repo/${id}/file/view?path=${fullPath}`
      );
      setFileView({
        name: data.name,
        content: data.content,
      });
    }
  };

  const handleDelete = async (item) => {
    const fullPath = currentPath
      ? `${currentPath}/${item.name}`
      : item.name;

    if (
      !window.confirm(
        `Delete this ${item.type}? This action cannot be undone.`
      )
    )
      return;

    const endpoint =
      item.type === "folder"
        ? `/repo/${id}/folder/delete?path=${fullPath}`
        : `/repo/${id}/file/delete?path=${fullPath}`;

    await apiRequest(endpoint, { method: "DELETE" });
    fetchFolderContents(currentPath);
  };

  const goBack = () => {
    if (!currentPath) return;
    const parts = currentPath.split("/");
    parts.pop();
    fetchFolderContents(parts.join("/"));
  };

  const handleAddFile = async () => {
    const name = prompt("Enter file name (e.g. README.md)");
    if (!name) return;

    await apiRequest(`/repo/${id}/file`, {
      method: "POST",
      body: {
        name,
        content: "",
        path: currentPath || "",
      },
    });

    fetchFolderContents(currentPath);
  };

  const handleAddFolder = async () => {
    const name = prompt("Enter folder name");
    if (!name) return;

    await apiRequest(`/repo/${id}/folder`, {
      method: "POST",
      body: {
        name,
        path: currentPath || "",
      },
    });

    fetchFolderContents(currentPath);
  };

  const handleUploadFiles = async (e) => {
    if (activeTab !== "code") return;
    if (!e?.target?.files) return;

    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", currentPathRef.current || "");

        const response = await fetch(
          `${apiUrl}/repo/${id}/upload/file`,
          {
            method: "POST",
            body: formData,
          }
        );

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
          throw new Error(data?.message || "Upload failed");
        }
      }

      fetchFolderContents(currentPath);
    } catch (err) {
      alert(err.message || "File upload failed");
    } finally {
      e.target.value = "";
    }
  };

  /* =========================
     Issues
  ========================== */
  const fetchIssues = async () => {
    const data = await apiRequest(`/issue/repo/${id}`);
    setIssues(data.issues || []);
  };

  useEffect(() => {
    if (activeTab === "issues") {
      fetchIssues();
    }
  }, [activeTab]);

  const handleCreateIssue = async () => {
    if (!issueTitle || !issueDescription) return;

    await apiRequest("/issue/create", {
      method: "POST",
      body: {
        title: issueTitle,
        description: issueDescription,
        repository: id,
      },
    });

    setIssueTitle("");
    setIssueDescription("");
    setShowNewIssueForm(false);
    fetchIssues();
  };

  const toggleIssueStatus = async (issue) => {
    const newStatus = issue.status === "open" ? "closed" : "open";

    await apiRequest(`/issue/update/${issue._id}`, {
      method: "POST",
      body: { status: newStatus },
    });

    fetchIssues();
  };

  const handleDeleteIssue = async (issueId) => {
    if (!window.confirm("Delete this issue?")) return;

    await apiRequest(`/issue/delete/${issueId}`, {
      method: "DELETE",
    });

    fetchIssues();
  };

  return {
    repo,
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

    handlers: {
      toggleVisibility,
      deleteRepository,
      handleItemClick,
      handleDelete,
      goBack,
      handleAddFile,
      handleAddFolder,
      handleUploadFiles,
      handleCreateIssue,
      toggleIssueStatus,
      handleDeleteIssue,
    },
  };
}
