
import Sidebar from "./Sidebar";

function AppShell({ children }) {
  return (

      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f6f8fa",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    
  );
}

export default AppShell;
