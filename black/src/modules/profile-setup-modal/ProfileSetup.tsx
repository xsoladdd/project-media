import React, { useState } from "react";
import Stepper from "../../components/Stepper/Stepper";
import Button from "../../ui/Button";
import moment from "moment";
import {
  FiCalendar,
  FiLock,
  FiPaperclip,
  FiSmile,
  FiUserCheck,
} from "react-icons/fi";
import { IoPlanetOutline } from "react-icons/io5";
import NameSetup from "./NameSetup";
import UniqueIdentifier from "./UniqueIdentifier";
import Birthday from "./Birthday";
import ProfilePicture from "./ProfilePicture";
import FinalizeProfile from "./FinalizeProfile";
import { NameDataFormProps, UniqueDataFormProps } from "../../global";
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  useSetupProfileMutation,
} from "../../generated/graphql";
import apolloClient from "../../config/apollo-server/client";
import Welcome from "./Welcome";

interface ProfileSetupProps {}

export interface ProfileSetupFormError {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  username: string;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const [nameData, setNameData] = useState<NameDataFormProps>({
    firstName: "",
    lastName: "",
    nickname: "",
    middleName: "",
  });

  const [uniqueData, setUniqueData] = useState<UniqueDataFormProps>({
    mobileNumber: "",
    username: "",
  });

  const [formError, setFormError] = useState<ProfileSetupFormError>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    username: "",
  });

  const [birthday, setBirthday] = useState(moment("01-01-2000").toDate());
  const [imageData, setImageData] = useState<Blob | null>(null);

  const [imagePreview, setImagePreview] = useState("");

  // Use to stop and disable next button
  const stepsCount = 7;

  const handleBack = () => {
    if (tabIndex !== 0) {
      setTabIndex(tabIndex - 1);
    }
  };

  const nextCommand = () => {
    if (tabIndex !== stepsCount - 1) {
      setTabIndex(tabIndex + 1);
    }
  };

  const [setupProfile, { loading }] = useSetupProfileMutation({
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data.setupProfile.message);
      const { user, status } = data.setupProfile;
      if (user && status === 1) {
        apolloClient.writeQuery({
          query: MeDocument,
          data: {
            me: {
              user,
              message: "",
              status: 1,
            },
          } as MeQuery,
        });
      }
    },
  });

  const handleNextFinishButton = () => {
    let error = 0;
    if (tabIndex === 1) {
      if (!nameData.firstName) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          firstName: "First name is required",
        }));
      } else if (nameData.firstName.length < 4) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          firstName: "First name must be 4 or more character",
        }));
      }
      if (!nameData.lastName) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          lastName: "Last name is required",
        }));
      } else if (nameData.lastName.length < 4) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          lastName: "Last name must be 4 or more character",
        }));
      }

      if (error !== 0) {
        return;
      }
      setFormError({
        ...formError,
        firstName: "",
        lastName: "",
      });
      return nextCommand();
    }

    if (tabIndex === 2) {
      if (!uniqueData.username) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          username: "Username is required",
        }));
      }
      if (uniqueData.username.length < 4) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          username: "Username must be 4 or more character",
        }));
      }
      if (!uniqueData.mobileNumber) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          mobileNumber: "Mobile number is required",
        }));
      }
      if (uniqueData.mobileNumber.length < 10) {
        error++;
        setFormError((oldProps) => ({
          ...oldProps,
          mobileNumber: "Mobile must be 10 or more character",
        }));
      }
      if (error !== 0) {
        return;
      }
      setFormError({
        ...formError,
        mobileNumber: "",
        username: "",
      });
      return nextCommand();
    }

    if (tabIndex === 5) {
      return setupProfile({
        variables: {
          setupProfileInput: {
            birthday,
            firstName: nameData.firstName,
            middleName: nameData.middleName,
            lastName: nameData.lastName,
            // display_image: imageData,
            display_image: imageData,
            nickname: nameData.nickname,
            mobileNumber: uniqueData.mobileNumber,
            username: uniqueData.username,
          },
        },
      });
    }

    // Reset errors

    return nextCommand();
  };

  return (
    <div className="w-screen h-screen bg-transparent bg-gray-900 bg-opacity-50 absolute z-20 flex ">
      {/* MODAL */}
      <div className="m-auto w-11/12  bg-gray-50 shadow-lg rounded-xl flex flex-col justify-between divide-y divide-gray-200 max-w-2xl">
        {/* Content */}
        <div className="py-5">
          <div className="mx-4 ">
            <div className="flex items-center mx-auto max-w-sm">
              <Stepper.Tab
                active={tabIndex === 0}
                Icon={IoPlanetOutline}
                // onClick={() => setTabIndex(0)}
              />
              <Stepper.Tab
                active={tabIndex === 1}
                Icon={FiUserCheck}
                // onClick={() => setTabIndex(0)}
              />
              <Stepper.Tab
                active={tabIndex === 2}
                Icon={FiLock}
                // onClick={() => setTabIndex(1)}
              />
              <Stepper.Tab
                active={tabIndex === 3}
                Icon={FiCalendar}
                // onClick={() => setTabIndex(2)}
              />
              <Stepper.Tab
                active={tabIndex === 4}
                Icon={FiSmile}
                // onClick={() => setTabIndex(3)}
              />
              <Stepper.Tab
                active={tabIndex === 5}
                Icon={FiPaperclip}
                // onClick={() => setTabIndex(4)}
                last
              />
            </div>
          </div>
          <Stepper.Panel show={tabIndex === 0} title="" subText="">
            {" "}
            <Welcome />
          </Stepper.Panel>

          <Stepper.Panel
            show={tabIndex === 1}
            title="Basic Information"
            subText="What's your name and what should we call you?"
          >
            <NameSetup
              nameData={nameData}
              setNameData={setNameData}
              formError={formError}
              setFormError={setFormError}
            />
          </Stepper.Panel>
          <Stepper.Panel
            show={tabIndex === 2}
            title="Unique Identifier"
            subText="How should we recognize you?"
          >
            <UniqueIdentifier
              uniqueData={uniqueData}
              setUniqueData={setUniqueData}
              formError={formError}
              setFormError={setFormError}
            />
          </Stepper.Panel>
          <Stepper.Panel
            show={tabIndex === 3}
            title="Birthday"
            subText="So we can greet you and identify how old are you "
          >
            <Birthday birthday={birthday} setBirthday={setBirthday} />
          </Stepper.Panel>
          <Stepper.Panel
            show={tabIndex === 4}
            title="Profile Picture"
            subText="if you're not confident, you can always skip this part"
          >
            <ProfilePicture
              imageData={imageData}
              setImageData={setImageData}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </Stepper.Panel>
          <Stepper.Panel
            show={tabIndex === 5}
            title="Finalize"
            subText="Before we continue, please check all the data"
          >
            <FinalizeProfile
              imagePreview={imagePreview}
              birthday={birthday}
              displayPhoto={imageData}
              nameData={nameData}
              unique={uniqueData}
            />
          </Stepper.Panel>
        </div>
        <div className="flex py-2 px-2 mt-4 justify-between md:px-4">
          <Button variant="green" onClick={() => handleBack()}>
            Previous
          </Button>
          <div className=" flex flex-row gap-2">
            <Button
              variant="green"
              onClick={() => handleNextFinishButton()}
              disabled={loading}
            >
              {loading ? "loading" : tabIndex === 5 ? `Finish` : `Next`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSetup;
