const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (
  endpoint,
  { method = "GET", body, auth = true } = {}
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

if (res.status === 401) {
  localStorage.removeItem("token");
  window.location.href = "/login";
  return;
}

if (!res.ok) {
  const error = new Error(
    data.message || data.error || "API request failed"
  );
  error.status = res.status;
  throw error;
}


return data;

};
