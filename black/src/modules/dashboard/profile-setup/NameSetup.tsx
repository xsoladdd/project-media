import React, { SetStateAction } from "react";
import { NameDataFormProps } from "../../../global";
import TextInput from "../../../ui/TextInput/TextInput";
import { ProfileSetupFormError } from "./ProfileSetup";

interface NameSetupProps {
  setNameData: React.Dispatch<SetStateAction<NameDataFormProps>>;
  nameData: NameDataFormProps;
  setFormError: React.Dispatch<SetStateAction<ProfileSetupFormError>>;
  formError: ProfileSetupFormError;
}

const NameSetup: React.FC<NameSetupProps> = ({
  setNameData,
  nameData,
  setFormError,
  formError,
}) => {
  return (
    <>
      <div className=" ">
        <TextInput
          label="First name"
          required
          // placeholder="First Name"
          id="firstname"
          onChange={(e) => {
            setNameData({ ...nameData, firstName: e.target.value });
            setFormError({ ...formError, firstName: "" });
          }}
          value={nameData.firstName}
          error={formError.firstName}
        />
        <TextInput
          label="Middle name"
          // placeholder="Middle name"
          id="middlename"
          onChange={(e) =>
            setNameData({ ...nameData, middleName: e.target.value })
          }
          value={nameData.middleName}
        />
        <TextInput
          label="Last name"
          required
          // placeholder="Last Name"
          id="lastname"
          onChange={(e) => {
            setNameData({ ...nameData, lastName: e.target.value });
            setFormError({ ...formError, lastName: "" });
          }}
          value={nameData.lastName}
          error={formError.lastName}
        />
        <TextInput
          // placeholder="Nickname"
          id="nickname"
          label="Nickname (optional)"
          onChange={(e) =>
            setNameData({ ...nameData, nickname: e.target.value })
          }
          value={nameData.nickname}
        />
      </div>
    </>
  );
};
export default NameSetup;
