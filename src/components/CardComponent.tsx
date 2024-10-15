import { employeeProfileType } from "../type/AppTypes";
import profile from "../assets/noProfile.png"

const CardComponent = ({ employee }: { employee: employeeProfileType }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="bg-white rounded-lg ml-6 h-96 w-72">
        <div className="relative right-24 py-2 text-gray-500">
          {employee.employeeCompanyId}
        </div>
        <div className="photo-wrapper">
          {employee.imgUrl ? 
          <img
            className="w-32 h-32 object-fit rounded-full mx-auto"
            src={employee.imgUrl}
          /> : 
          <img
            className="w-32 h-32 object-fit rounded-full mx-auto"
            src={profile}
          />
           }
        </div>
        <div className="p-2">
          <h3 className="text-center font-medium leading-8">
            {employee.fullName}
          </h3>
          <div className="text-center text-gray-500 text-sm">
            <p>{employee.email}</p>
          </div>
          <div className="text-center text-gray-500 text-small">
            <p>{employee.designation.name}</p>
          </div>
          <div className="flex justify-evenly space-between border-y-2 mt-4 ">
            <div className="m-2">
              <p className="flex text-center text-xs text-gray-400">
                Overall Experience
              </p>
              <p className="text-sm text-gray-500">
                {employee.totalExperience}
              </p>
            </div>
            <div className="m-2">
              <p className="flex text-center text-xs text-gray-400">
                Ideas2it Experience
              </p>
              <p className="text-sm text-gray-500">
                {employee.ideas2itExperience}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
