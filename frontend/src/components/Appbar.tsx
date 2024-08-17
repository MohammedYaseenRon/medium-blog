import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <Link to={'/blogs'} className="cursor-pointer text-xl font-bold">
        Medium
      </Link>
      <div className="flex items-center">
        <Link to={`/publish`} className="mr-4">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            New
          </button>
        </Link>
        <Avatar size={"big"} name="Yaseen" />
      </div>
    </div>
  );
};
    