import { Tab } from "@headlessui/react";
import NextImage from "next/image";
import React, { SetStateAction } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiCamera } from "react-icons/fi";
import Webcam from "react-webcam";
import { getBase64, getBlobFromBase64 } from "../../lib/files";
import { joinClass } from "../../lib/joinClass";
import Button from "../../ui/Button";

interface ProfilePictureProps {
  imageData: Blob | null;
  setImageData: React.Dispatch<SetStateAction<Blob | null>>;
  imagePreview: string;
  setImagePreview: React.Dispatch<SetStateAction<string>>;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageData,
  setImageData,
  imagePreview,
  setImagePreview,
}) => {
  // const [partialImage, setPartialImage] = useState("");
  const webcamRef = React.useRef<null | Webcam>(null);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (typeof imageSrc === "string") {
      setImagePreview(imageSrc);
      setImageData(await getBlobFromBase64(imageSrc));
    }
  }, [webcamRef]);

  return (
    <>
      <div className="grid">
        <Tab.Group vertical={true}>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={joinClass(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60 mx-2"
              )}
            >
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
            </Tab.Panel>
            <Tab.Panel
              className={joinClass(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60"
              )}
            >
              <div className=" flex flex-col">
                <div className="">
                  {imageData ? (
                    <div className=" py-24 md:py-40 w-full  relative ">
                      <NextImage
                        src={imagePreview}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ) : (
                    <div className=" w-full">
                      <Webcam
                        // audio={false}
                        height={1000}
                        width={1080}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                          width: 1280,
                          height: 720,
                          facingMode: "user",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className=" py-3 mx-auto flex gap-2">
                  {imagePreview ? (
                    <Button
                      className=""
                      variant="yellow"
                      onClick={() => {
                        setImagePreview("");
                      }}
                    >
                      <AiOutlineCloseCircle size="20" />
                    </Button>
                  ) : (
                    <Button onClick={capture} className="" variant="green">
                      <FiCamera size="20" />
                    </Button>
                  )}
                </div>
              </div>
            </Tab.Panel>
            <Tab.List className="flex p-1 space-x-1 bg-green-900/20 rounded-xl">
              <Tab
                className={({ selected }) =>
                  joinClass(
                    "w-full py-2.5 text-sm leading-5 font-medium text-green-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-green-100   hover:text-green-900"
                  )
                }
              >
                Upload
              </Tab>
              <Tab
                className={({ selected }) =>
                  joinClass(
                    "w-full py-2.5 text-sm leading-5 font-medium text-green-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-green-100   hover:text-green-900"
                  )
                }
              >
                Take a picture
              </Tab>
            </Tab.List>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};
export default ProfilePicture;
