import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import home from "../../assets/home.svg";
import projects from "../../assets/projects.svg";

const BaseLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-800 text-white p-4 transition-all duration-300`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4 p-2 rounded bg-gray-700 hover:bg-gray-600 w-full flex items-center justify-center"
        >
          <Menu size={20} />
        </button>

        <nav>
          <ul>
            <li className="py-2 hover:bg-gray-700 rounded px-2 flex items-center">
              <img src={home} alt="Logo" className="h-5 w-auto" />
              {!isCollapsed && (
                <Link to="/" className="ml-2">
                  Home
                </Link>
              )}
            </li>
            <li className="py-2 hover:bg-gray-700 rounded px-2 flex items-center">
              <img src={projects} alt="Logo" className="h-5 w-auto" />
              {!isCollapsed && (
                <Link to="/projects" className="ml-2">
                  Projects
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="bg-gray-900 text-white p-4">
          <h1 className="text-lg">Portifolio Management</h1>
        </header>

        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
