import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateRepo from "../pages/CreateRepo/CreateRepo";
import RepoDetails from "../pages/Repository/RepoDetails";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/Auth/Signup";
import AppShell from "../components/layout/AppShell";

import Layout from "../components/Layout";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={localStorage.getItem("token")? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />
      
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateRepo />
            </ProtectedRoute>
          }
        />

        {/* THIS ROUTE MUST EXIST */}
        <Route
          path="/repo/:id"
          element={
            <ProtectedRoute>
              <RepoDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:id/profile" element={<Profile />} />
      </Route>

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;


