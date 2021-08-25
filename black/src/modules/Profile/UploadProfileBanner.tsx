import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useUploadProfileBannerMutation } from "../../generated/graphql";
import { getBase64 } from "../../lib/files";
import Button from "../../ui/Button";
import NextImage from "next/image";

interface UploadProfileBannerProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const UploadProfileBanner: React.FC<UploadProfileBannerProps> = ({
  children,
  className,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [uploadProfileBanner, { loading }] = useUploadProfileBannerMutation({});

  const handleUploadButton = () => {
    uploadProfileBanner({
      variables: {
        profileBanner: imageData,
      },
    });
    setIsOpen(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setImageData(null);
    setImagePreview("");
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className={className}>
        {children}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg pb-10 font-medium leading-6 text-gray-900"
                >
                  Upload Profile Banner
                </Dialog.Title>

                {imagePreview ? (
                  <>
                    <div className=" py-24 md:py-40 w-full  relative ">
                      <Button
                        className="hidden md:block absolute z-20 right-5 top-5 "
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
                    className="flex text-sm text-gray-600 place-content-center py-24 md:py-40"
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
                <div className=" flex gap-2 py-2 justify-end">
                  <Button variant="gray" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="green"
                    loading={loading}
                    onClick={() => handleUploadButton()}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default UploadProfileBanner;
