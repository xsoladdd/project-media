import { IconType } from "react-icons/lib";

export interface NavMenuLink {
  label?: string;
  Icon?: IconType;
  href: string;
}

export interface ProfileSetupInterface {
  firstName: string;
  middleName?: string;
  lastName: string;
  nickname: string;

  mobileNumber: string;
  username: string;
  birthday: Date;

  profileImage?: string;
}
export interface NameDataFormProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  nickname: string;
}
export interface UniqueDataFormProps {
  mobileNumber: string;
  username: string;
}
