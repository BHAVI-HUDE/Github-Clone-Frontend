
import { useState } from "react";
import Sidebar from "./Sidebar";
import "./layout.css";

function AppShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
      <div className="app-shell">
        {!isSidebarOpen && (
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="sidebar-toggle"
          >
            ☰
          </button>
        )}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="app-shell__main">
          {children}
        </main>
      </div>
  );
}

export default AppShell;
