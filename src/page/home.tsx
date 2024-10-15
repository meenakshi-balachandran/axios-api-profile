import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

const home = () => {
  return (
    <><div className="absolute left-64 top-10">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold">WELCOME HOME !</h1>
      <div className="flex ml-96 gap-4 w-20 rounded-lg bg-orange-100 border-orange-500 h-12 items-center justify-between p-4 border-solid border-2 ">
        <FontAwesomeIcon icon={faGift} className="bg-orange"></FontAwesomeIcon>
        <span className="">0</span>
      </div>
      </div>
      <div className="flex bg-white mt-8 h-24 ">
        <p>dhfwrif;kjm</p>
      </div>
    </div>
      </>
  );
};

export default home;
