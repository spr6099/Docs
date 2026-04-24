import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const UserLayout = () => {
  const links = [
    { name: "Dashboard", path: "/user" },
    { name: "Profile", path: "/user/profile" },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />

      <div className="flex-1">
        <Navbar title="User Panel" />

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;