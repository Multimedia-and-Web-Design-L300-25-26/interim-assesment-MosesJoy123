import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const token = localStorage.getItem("cb_auth_token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return element;
}

export default ProtectedRoute;
