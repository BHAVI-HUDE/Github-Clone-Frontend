import TopNav from "../components/layout/TopNav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* Top Navbar */}
      <TopNav/>

      {/* Page Content */}
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
