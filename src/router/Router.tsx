import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../page/Login";
import { AuthProvider } from "../context/AuthContext";
import EmployeeLookUp from "../page/EmployeeLookUp";
import { ApiProvider } from "../context/ApiContext";
import PageLayout from "../layout/PageLayout";
import home from "../page/home";

function Router() {
  return (
    <>
      <AuthProvider>
        <ApiProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" Component={Login} />
              <Route path="/" Component={PageLayout}>
                <Route path="/home" Component={home} />
                <Route path="/employee-lookup" Component={EmployeeLookUp} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApiProvider>
      </AuthProvider>
    </>
  );
}

export default Router;
