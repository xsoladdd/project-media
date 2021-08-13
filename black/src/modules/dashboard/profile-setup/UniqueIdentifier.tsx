import React, { SetStateAction, useState } from "react";
import { useCheckUniqueLazyQuery } from "../../../generated/graphql";
import TextInput from "../../../ui/TextInput/TextInput";
import { UniqueDataFormProps } from "../../../global";
import { useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { emailRegex } from "../../../lib/constants";
import { ProfileSetupFormError } from "./ProfileSetup";

interface UniqueIdentifierProps {
  setUniqueData: React.Dispatch<SetStateAction<UniqueDataFormProps>>;
  uniqueData: UniqueDataFormProps;
  setFormError: React.Dispatch<SetStateAction<ProfileSetupFormError>>;
  formError: ProfileSetupFormError;
}

const UniqueIdentifier: React.FC<UniqueIdentifierProps> = ({
  setUniqueData,
  uniqueData,
  formError,
  setFormError,
}) => {
  const debounceUsername = useDebounce(uniqueData.username, 500);
  const debounceMobileNumber = useDebounce(uniqueData.mobileNumber, 500);

  const [checkUsernameUnique, { loading: loadingUsername }] =
    useCheckUniqueLazyQuery({
      onCompleted: (data) => {
        const { message, status } = data.checkUnique;
        if (status === 0) {
          return setFormError({ ...formError, username: message });
        }
        setFormError({ ...formError, username: "" });
        console.log(message);
      },
      onError: (error) => {
        console.log(error);
      },
      fetchPolicy: "network-only",
    });

  const [checkMobileNumberUnique, { loading: loadingMobileNumber }] =
    useCheckUniqueLazyQuery({
      onCompleted: (data) => {
        const { message, status } = data.checkUnique;
        if (status === 0) {
          return setFormError({ ...formError, mobileNumber: message });
        }
        setFormError({ ...formError, mobileNumber: "" });
        console.log(message);
      },
      onError: (error) => {
        console.log(error);
      },
      fetchPolicy: "network-only",
    });

  useEffect(() => {
    let fetch = true;
    if (fetch) {
      if (uniqueData.username === "") {
        return setFormError({
          ...formError,
          username: "",
        });
      } else if (uniqueData.username.length <= 6) {
        return setFormError({
          ...formError,
          username: "User name must have morethan 6 characters",
        });
      }
      checkUsernameUnique({
        variables: {
          checkUniqueInput: {
            username: uniqueData.username,
          },
        },
      });
    }
    return () => {
      fetch = false;
    };
  }, [debounceUsername]);

  useEffect(() => {
    let fetch = true;
    if (fetch) {
      if (uniqueData.mobileNumber.length >= 11) {
        console.log(uniqueData.mobileNumber.length);
        checkMobileNumberUnique({
          variables: {
            checkUniqueInput: {
              mobile_number: uniqueData.mobileNumber,
            },
          },
        });
      }
    }
    return () => {
      fetch = false;
    };
  }, [debounceMobileNumber]);

  return (
    <>
      <div className="">
        <TextInput
          placeholder="johndoe009"
          label="Username"
          required
          id="username"
          loading={loadingUsername}
          onChange={(e) => {
            setUniqueData({
              ...uniqueData,
              username: e.target.value,
            });
          }}
          value={uniqueData.username}
          error={formError.username}
        />{" "}
        <TextInput
          placeholder="ie: +09#######"
          id="mobile"
          required
          label="Mobile number"
          loading={loadingMobileNumber}
          onChange={(e) => {
            setUniqueData({
              ...uniqueData,
              mobileNumber: e.target.value,
            });
          }}
          value={uniqueData.mobileNumber}
          error={formError.mobileNumber}
        />
      </div>
    </>
  );
};
export default UniqueIdentifier;
