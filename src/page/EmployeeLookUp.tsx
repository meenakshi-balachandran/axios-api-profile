import { SetStateAction, useContext, useEffect } from "react";
import apiService from "../service/apiService";
import ApiContext from "../context/ApiContext";
import { ApiType } from "../type/ApiType";
import CardComponent from "../components/CardComponent";
import { Pagination, Stack } from "@mui/material";
import { employeeProfileType } from "../type/AppTypes";

const EmployeeLookUp = () => {
  const context = useContext(ApiContext);
  const { state, dispatch } = context;
  const limit = 15;
  const fetchData = async () => {
    try {
      const offset = (state.page - 1) * limit;
      const res = await apiService.get(
        `api/employee/profiles?start=${offset}&limit=${limit}&filter=`
      );
      let totalCount = Math.ceil(res.data.entity.count / limit);
      dispatch({ type: ApiType.TOTAL_PAGE, payload: totalCount });
      dispatch({
        type: ApiType.EMPLOYEE_PROFILE_SUCCESS,
        payload: res.data.entity.list,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ApiType.EMPLOYEE_PROFILE_ERROR,
          payload: error.message,
        });
      } else {
        dispatch({
          type: ApiType.EMPLOYEE_PROFILE_ERROR,
          payload: "An unknown error occurred",
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.page]);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: SetStateAction<number>
  ) => {
    dispatch({ type: ApiType.FETCH_PAGE, payload: value });
  };

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>Error: {state.error}</p>;
  }

  return (
    <>
      <div className="ml-60 mt-8">
        {state.profiles && state.profiles.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center px-5">
            {state.profiles.map((employeeProfile: employeeProfileType) => (
              <CardComponent employee={employeeProfile} />
            ))}
          </ul>
        ) : (
          <p>No profiles found.</p>
        )}
        <Stack spacing={2} alignItems="center" margin={2}>
          <Pagination
            count={state.totalPages}
            page={state.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default EmployeeLookUp;
