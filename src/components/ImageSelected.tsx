import React from "react";

interface Props {
  loading: boolean;
  img: string;
  onUpload: () => Promise<void>;
  onImageRemove: (index: number) => void;
  onImageUpdate: (index: number) => void;
  prompt: string;
  filter: string;
}

export const ImageSelected: React.FC<Props> = ({
  loading,
  img,
  onUpload,
  onImageRemove,
  onImageUpdate,
  prompt,
  filter,
}) => {
  return (
    <div className="mx-auto lg:w-2/6 max-w-sm">
      <img src={img} alt="image-selected" className="w-full" />
      <div className="mx-auto">
        {loading ? (
          <p>upload image ⏳...</p>
        ) : (
          <div className="mx-auto flex flex-col items-center justify-center mt-5">
            <div>
              
            <button
              type="button"
              disabled={ (prompt.length === 0 && filter.length === 0)}
              
              onClick={onUpload}
              className="text-white bg-blue-700 disabled:bg-gray-700 disabled:hover:bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Upload 📤
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => onImageUpdate(0)}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Update ✏️
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => onImageRemove(0)}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Cancel ❌
            </button>
            </div>
            {prompt.length === 0 && filter.length === 0 && (<p className="text-red-500">choose a filter or write a prompt </p>)}
          </div>
        )}
      </div>
    </div>
  );
};
