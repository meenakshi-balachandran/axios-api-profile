import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { AuthorisationType } from "../enum/AuthorisationType";
import apiService from "../service/apiService";
import { EMPLOYEE_LOOKUP } from "../utils/constants";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(5, "TOO SHORT")
    .max(50, "TOO LONG")
    .required("Required")
    .email("Invalid email format"),
  password: Yup.string()
    .min(8, "Too short")
    .max(12, "Too long")
    .required("Required")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter"),
});

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const { dispatch } = auth;
  const navigate = useNavigate();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await apiService.post("/api/auth/authenticate", values);
      const token = response.data.entity;
      const accessToken = token.accessToken;
      const refreshToken = token.refreshToken;
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      dispatch({
        type: AuthorisationType.SIGN_IN,
        payload: { accessToken, refreshToken },
      });
      navigate(`${EMPLOYEE_LOOKUP}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <Formik
      initialValues={{ username:" ", password:"" }}
      validationSchema={schema}
      onSubmit={handleLogin}
    >
      {({ errors, touched, isValid, dirty, isSubmitting }) => (
        <div className="flex place-items-center mt-12">
          <FormikForm className="w-96 mx-auto mt-12 p-4 border rounded-md shadow-lg bg-blue-100">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label className="block mb-1">Username</label>
              <Field
                type="text"
                name="username"
                className={`w-full border p-2 rounded-md ${
                  errors.username && touched.username ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <Field
                type="password"
                name="password"
                className={`w-full border p-2 rounded-md ${
                  errors.password && touched.password ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={isSubmitting || !dirty || !isValid}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </FormikForm>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
