// import { useForm, SubmitHandler } from "react-hook-form";
import { Tab } from "@headlessui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCardText } from "react-icons/bs";
import { FiImage } from "react-icons/fi";
import {
  FetchPostsDocument,
  useMeQuery,
  useNewPostMutation,
} from "../../generated/graphql";
import { getBase64 } from "../../lib/files";
import Avatar from "../../ui/Avatar/Avatar";
import Button from "../../ui/Button";
import TextArea from "../../ui/TexteArea";
import TabIconWrapper from "./TabIconWrapper";

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = ({}) => {
  const [content, setContent] = useState("");

  const [imageData, setImageData] = useState<null | Blob>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [createNewPost, { loading }] = useNewPostMutation({
    refetchQueries: [FetchPostsDocument],
    onCompleted: () => {
      setContent("");
      setImagePreview("");
      setImageData(null);
    },
  });

  const { data: meData, loading: meLoading } = useMeQuery();

  if (!meData?.me) {
    return <h1>User not found</h1>;
  }

  if (meLoading) {
    return <></>;
  }

  const { user } = meData?.me;
  return (
    <>
      <div className="mx-auto px-8 py-4 bg-white shadow rounded-lg min-w-full ">
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <a
              href="#"
              className="flex flex-row items-center focus:outline-none focus:shadow-outline "
            >
              <Avatar src={user?.profile?.display_image} />

              <div className="ml-2 mt-0.5">
                <NextLink href={`/u/${user?.username}`}>
                  <div>
                    <p className="block font-medium text-base leading-snug text-black dark:text-gray-100">
                      {user?.profile?.first_name} {user?.profile?.middle_name}{" "}
                      {user?.profile?.last_name}{" "}
                    </p>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                      @{user?.username}
                    </span>
                  </div>
                </NextLink>
              </div>
            </a>
          </div>
        </div>
        <Tab.Group
          manual
          onChange={() => {
            setImagePreview("");
            setImageData(null);
          }}
        >
          <Tab.Panels>
            <Tab.Panel>
              <TextArea
                placeholder="Hey. What's up?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Tab.Panel>
            <Tab.Panel>
              <div className="py-3">
                {imagePreview ? (
                  <>
                    <div className=" py-24 md:py-20 w-full  relative rounded-lg overflow-hidden mt-3">
                      <Button
                        className="hidden md:block absolute z-20 right-3 top-3 "
                        variant="yellow"
                        onClick={() => {
                          setImagePreview("");
                          setImageData(null);
                        }}
                      >
                        <AiOutlineCloseCircle size="20" />
                      </Button>
                      <NextImage
                        src={imagePreview}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>

                    <div className="md:hidden flex place-content-center py-1">
                      <Button
                        className="mx-auto"
                        variant="yellow"
                        size="xs"
                        onClick={() => {
                          setImagePreview("");
                          setImageData(null);
                        }}
                      >
                        <AiOutlineCloseCircle size="20" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <label
                    htmlFor="file-upload"
                    className="flex text-sm text-gray-600 place-content-center py-24 md:py-20"
                  >
                    <div className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                      <span>Click here to upload file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files !== null) {
                            let file = files[0];
                            setImageData(file);
                            getBase64(file)
                              .then((result) => {
                                setImagePreview(result);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        }}
                      />
                    </div>
                  </label>
                )}
              </div>
              <TextArea
                placeholder="Hey. What's up?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Tab.Panel>
          </Tab.Panels>
          <div className="py-2 "></div>
          <div className="pb-2 flex justify-between py-2">
            <Tab.List>
              <Tab>
                <TabIconWrapper
                  Icon={BsCardText}
                  className="border-blue-500 text-blue-500"
                />
              </Tab>
              <Tab>
                <TabIconWrapper Icon={FiImage} />
              </Tab>
            </Tab.List>
            <Button
              variant="green"
              disabled={loading}
              onClick={() => {
                createNewPost({
                  variables: {
                    input: {
                      content,
                      media: imageData,
                    },
                  },
                });
              }}
            >
              CREATE POST{" "}
            </Button>
          </div>
        </Tab.Group>
      </div>
    </>
  );
};

export default NewPost;
