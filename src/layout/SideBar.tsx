import { Link, NavLink, useNavigate } from "react-router-dom";
import { Icons, IconType } from "../components/Icon";
import logo from "../assets/i2i.jpeg";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AuthorisationType } from "../enum/AuthorisationType";
import { EMPLOYEE_LOOKUP, HOME, LOGIN } from "../utils/constants";
const SideBar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logggg");
    dispatch({ type: AuthorisationType.SIGN_OUT });
    navigate(`${LOGIN}`);
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-32 w-60 h-screen bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className=" flex mt-8 mb-8">
          <img src={logo} className="w-24 h-12" />
        </div>
        <div className="h-screen px-3 pb-4 bg-white dark:bg-gray-800">
          <ul className="space-y-10 font-medium">
            <li>
              <NavLink to={`${HOME}`}>
                <div className="flex items-center p-2 text-gray-900 rounded-lg active:text-indigo-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Icons type={IconType.DashboardIcon} />
                  <span className="ms-3">Dashboard</span>
                </div>
              </NavLink>
            </li>
            <li>
              <Link
                to="/ticket"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icons type={IconType.DashboardIcon}></Icons>
                <span className=" ms-3">Tickets</span>
              </Link>
            </li>
            <li>
              <Link
                to={`${EMPLOYEE_LOOKUP}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icons type={IconType.UserIcon} />
                <span className="ms-3">Employee Lookup</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Icons type={IconType.ClaimIcon} />
                <div onClick={() => handleLogout()}>
                  <span className="ms-3">Logout</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
