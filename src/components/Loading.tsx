import React from "react";
import { LoadingIcon } from "../assets/icons/icons";

export const Loading: React.FC = () => {
  return (
   <div className="w-full flex justify-center ">
      <button
        disabled
        type="button"
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      >
       <LoadingIcon />
        transforming...
      </button>
      </div>
  );
};
