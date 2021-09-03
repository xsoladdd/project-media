import React, { useEffect, useState } from "react";
import ProfileThumbnail from "../../components/ProfileThumbnail/ProfileThumbnail";
import ProfileThumbnailSkeletonLoading from "../../components/ProfileThumbnail/ProfileThumbnailSkeletonLoading";
import { useSearchLazyQuery } from "../../generated/graphql";
import useDebounce from "../../hooks/useDebounce";
import Layout from "../../layout/Layout";
import TextInput from "../../ui/Form/TextInput";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  const [searchParameter, setSearchParameter] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const [search, { data, loading }] = useSearchLazyQuery({});

  const debouncedSearchParameter = useDebounce(searchParameter, 500);

  useEffect(() => {
    if (searchParameter === "") return setIsEmpty(true);
    setIsEmpty(false);
    // console.log(`search`, searchParameter);
    search({
      variables: {
        keyword: searchParameter,
      },
    });
    return () => {};
  }, [debouncedSearchParameter]);

  return (
    <Layout>
      <div className="px-2 ">
        {/* Search Bar */}
        <section className="relative w-full max-w-md px-5 py-4 mx-auto rounded-md">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Search"
              value={searchParameter}
              onChange={(e) => setSearchParameter(e.target.value)}
            />
          </div>
        </section>
        {/* <p>Search: </p>
        <TextInput
          value={searchParameter}
          onChange={(e) => setSearchParameter(e.target.value)}
          placeholder="Ex. John Doe"
        /> */}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {isEmpty && (
          <h1 className="mx-auto text-gray-500">
            Please type on the search bar to proceed
          </h1>
        )}
        {data?.search?.users?.length === 0 && !isEmpty && (
          <h1 className="mx-auto">No result found</h1>
        )}
        {loading ? (
          <>
            <ProfileThumbnailSkeletonLoading />
            <ProfileThumbnailSkeletonLoading />
            <ProfileThumbnailSkeletonLoading />
          </>
        ) : (
          !isEmpty &&
          data?.search?.users?.map((user, idx) => (
            <ProfileThumbnail user={user} key={idx} />
          ))
        )}
      </div>
    </Layout>
  );
};
export default Search;
