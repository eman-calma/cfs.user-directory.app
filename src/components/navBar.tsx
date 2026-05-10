import { Link } from "react-router-dom";
import {  useIsAuthenticated, useMsal } from "@azure/msal-react";
import LoginButton from "./login";
import LogoutButton from "./logout";

const Navbar = () => {

  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="font-semibold text-base tracking-tight">User Directory</span>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            User list
          </Link>

          <Link
            to="/create"
            className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm px-4 py-1.5 rounded-lg"
          >
            Create User
          </Link>
        </div>
         <div className="flex items-center gap-4">

          {isAuthenticated && (
            <span>
              {accounts[0]?.name}
            </span>
          )}

          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <LogoutButton />
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;