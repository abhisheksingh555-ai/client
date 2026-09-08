import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";

const PublicRoute = () => {
  const {
    isAuthenticated,
    initialized,
  } = useAuth();

  if (!initialized) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;