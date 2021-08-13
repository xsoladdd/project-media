import React, {
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FiCamera } from "react-icons/fi";
import Webcam from "react-webcam";
import { Tab } from "@headlessui/react";
import { joinClass } from "../../../lib/joinClass";
import Button from "../../../ui/Button";
import { getBase64 } from "../../../lib/imageToDataURI";
import NextImage from "next/image";
import defaultProfilePicture from "../../../assets/images/defaultProfilePicture.png";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ProfilePictureProps {
  imageData: string; //image_base_64
  setImageData: React.Dispatch<SetStateAction<string>>;
}

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user",
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageData,
  setImageData,
}) => {
  // const [partialImage, setPartialImage] = useState("");
  const webcamRef = React.useRef<null | Webcam>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (typeof imageSrc === "string") {
      // setPartialImage(imageSrc);
      setImageData(imageSrc);
    }
    // console.log(imageSrc);
  }, [webcamRef]);

  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

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
              {imageData ? (
                <>
                  <div className=" py-24 md:py-40 w-full  relative ">
                    <Button
                      className="hidden md:block absolute z-20 right-5 top-5 "
                      variant="yellow"
                      onClick={() => {
                        setImageData("");
                      }}
                    >
                      <AiOutlineCloseCircle size="20" />
                    </Button>
                    <NextImage
                      src={imageData}
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
                        setImageData("");
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
                      onChange={(e) => {
                        // console.log(e.target.files);
                        const files = e.target.files;
                        if (files !== null) {
                          let file = files[0];
                          getBase64(file)
                            .then((result) => {
                              console.log(typeof result);
                              console.log(result);
                              setImageData(result);
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
                        src={imageData}
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
                  {imageData ? (
                    <Button
                      className=""
                      variant="yellow"
                      onClick={() => {
                        setImageData("");
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
