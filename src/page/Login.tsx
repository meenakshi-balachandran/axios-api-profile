import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { AuthorisationType } from "../enum/AuthorisationType";
import apiService from "../service/apiService";
import { EMPLOYEE_LOOKUP } from "../utils/constants";


const LoginForm = () => {
  const auth = useContext(AuthContext);
  const { dispatch } = auth;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiService
      .post("/api/auth/authenticate", { username, password })
      .then((response) => {
        const token = response.data.entity;
        const accessToken = token.accessToken;
        const refreshToken = token.refreshToken;
        localStorage.setItem("access-token", token.accessToken);
        localStorage.setItem("refresh-token", token.refreshToken);
        dispatch({
          type: AuthorisationType.SIGN_IN,
          payload: { accessToken, refreshToken },
        });
        navigate(`/${EMPLOYEE_LOOKUP}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="flex place-items-center mt-12">
      <form
        onSubmit={handleLogin}
        className="w-96 mx-auto mt-12 p-4 border rounded-md shadow-lg bg-blue-100"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
