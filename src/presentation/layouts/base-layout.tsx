import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { UserProfileMenu } from "../components/user-profile-menu";
import { ClipboardList, LayoutDashboard, Settings } from "lucide-react";

type MenuItemProps = {
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  to: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, collapsed, to }) => {
  return (
    <Link
      to={to}
      className="py-3 w-full text-center text-gray-300 hover:bg-indigo-900 transition-colors "
    >
      <div className="flex flex-row justify-center  gap-4">
        <span>{icon}</span>
        {!collapsed && <span className="whitespace-nowrap">{label}</span>}
      </div>
    </Link>
  );
};

const BaseLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`bg-indigo-950 text-white flex flex-col items-center transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-52"
        }`}
      >
        <div className="mt-6 mb-12 cursor-pointer" onClick={toggleSidebar} title="Toggle Sidebar">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        <nav className="flex flex-col items-center w-full gap-2">
          <MenuItem label="Dashboard" icon={<LayoutDashboard />} collapsed={isCollapsed} to="/" />
          <MenuItem
            label="Business Cases"
            icon={<ClipboardList />}
            collapsed={isCollapsed}
            to="/business-cases"
          />
          <MenuItem
            label="Settings"
            icon={<Settings />}
            collapsed={isCollapsed}
            to="/app-settings"
          />
            <MenuItem
            label="Complexity"
            icon={<ClipboardList />}
            collapsed={isCollapsed}
            to="/complexity"
          />
          <MenuItem
            label="New Complexity"
            icon={<ClipboardList />}
            collapsed={isCollapsed}
            to="/new-complexity"/>
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="bg-gray-100 text-gray-900 pt-8 pl-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Business Case</h1>
            <span className="mr-10">
              <UserProfileMenu />
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
