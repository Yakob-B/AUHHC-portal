import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (path, index) => {
    const pathMap = {
      schools: "Schools",
      departments: "Departments",
    };

    // If it's a school ID, try to get the school name
    if (index === 1 && pathnames.length > 1) {
      // You can import schoolsData here to get actual school names
      return "School Details";
    }

    // If it's a department ID, try to get the department name
    if (index === 3 && pathnames.length > 3) {
      return "Department Details";
    }

    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const displayName = getBreadcrumbName(name, index);

            return (
              <li key={name} className="flex items-center">
                <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
                {isLast ? (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb; 