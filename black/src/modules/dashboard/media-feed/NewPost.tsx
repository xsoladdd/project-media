import React, { Fragment, useRef, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, Transition, Tab } from "@headlessui/react";
import Button from "../../../ui/Button";
import TextArea from "../../../ui/TexteArea";
import { joinClass } from "../../../lib/joinClass";
import { getBase64 } from "../../../lib/files";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextImage from "next/image";

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = ({}) => {
  const [postText, setPostText] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState<null | Blob>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  // let completeButtonRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
    setImageData(null);
    setImagePreview("");
    setPostText("");
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="">
        <Button onClick={openModal}>ADD NEW POST</Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => null}
        >
          <div className="min-h-screen px-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"> */}
              <div className="inline-block w-full h-full max-w-md p-6  overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  new post
                </Dialog.Title>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(`hey`);
                  }}
                >
                  <div className="mt-2">
                    <div className="w-full max-w-md px-2 sm:px-0">
                      <Tab.Group>
                        <Tab.List className="flex p-1 space-x-1 bg-green-900/20 rounded-xl">
                          <Tab
                            className={({ selected }) =>
                              joinClass(
                                "w-full py-2.5 text-sm leading-5 font-medium text-green-700 rounded-lg",
                                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60",
                                selected
                                  ? "bg-white shadow"
                                  : "text-green-100 hover:bg-white/[0.12] hover:text-green-900"
                              )
                            }
                          >
                            Post
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              joinClass(
                                "w-full py-2.5 text-sm leading-5 font-medium text-green-700 rounded-lg",
                                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60",
                                selected
                                  ? "bg-white shadow"
                                  : "text-green-100 hover:bg-white/[0.12] hover:text-green-900"
                              )
                            }
                          >
                            With Picture
                          </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                          <Tab.Panel
                            className={joinClass(
                              "bg-white rounded-xl p-3",
                              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60"
                            )}
                          >
                            <div>
                              <TextArea
                                onChange={(e) => setPostText(e.target.value)}
                                value={postText}
                                placeholder="What's on your mind?"
                              />
                            </div>
                          </Tab.Panel>
                          <Tab.Panel
                            className={joinClass(
                              "bg-white rounded-xl p-3",
                              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60"
                            )}
                          >
                            <div>
                              <TextArea
                                onChange={(e) => setPostText(e.target.value)}
                                value={postText}
                                placeholder="What's on your mind?"
                              />
                              {/* TODO UPLOAD */}
                              {imagePreview ? (
                                <>
                                  <div className=" py-24 md:py-20 w-full  relative rounded-lg overflow-hidden mt-3">
                                    <Button
                                      className="hidden md:block absolute z-20 right-3 top-3 "
                                      variant="yellow"
                                      onClick={() => {
                                        setImagePreview("");
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
                                        // setImageData("");
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
                                        // console.log(e.target.files);
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
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col md:place-items-start ">
                    <div className=" flex gap-2 ml-auto ">
                      <Button
                        // ref={completeButtonRef}
                        onClick={closeModal}
                        variant="red"
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        // ref={completeButtonRef}
                        // onClick={closeModal}
                        disabled={!postText}
                        type="submit"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default NewPost;
