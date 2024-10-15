import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const auth = useContext(AuthContext);
  const { state } = auth;
  return state.isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRouter;
