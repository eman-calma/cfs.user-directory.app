import {
  Navigate,
} from "react-router-dom";

import {
  useIsAuthenticated,
} from "@azure/msal-react";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props) {

  const isAuthenticated =
    useIsAuthenticated();

  if (!isAuthenticated) {

    return <Navigate to="/" />;
  }

  return children;
}