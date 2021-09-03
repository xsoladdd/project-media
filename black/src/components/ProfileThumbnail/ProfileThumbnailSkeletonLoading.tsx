import React from "react";
const ProfileThumbnailSkeletonLoading: React.FC<{}> = ({}) => {
  return (
    <>
      <div className="mx-auto px-8 py-4 bg-white shadow rounded-lg min-w-full cursor-pointer dark:bg-gray-700">
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <a
              href="#"
              className="flex flex-row items-center focus:outline-none focus:shadow-outline "
            >
              <div className={"h-12 w-12 rounded-full overflow-hidden"}>
                <div className=" relative w-full h-full animate-pulse bg-gray-200 dark:bg-gray-600"></div>
              </div>

              <div className="ml-2 mt-0.5">
                <div className="overflow-hidden">
                  <p className="block h-3 animate-pulse bg-gray-200 w-52 mb-3 dark:bg-gray-600"></p>
                  <p className="block h-3 animate-pulse bg-gray-200 w-24 dark:bg-gray-600"></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileThumbnailSkeletonLoading;
