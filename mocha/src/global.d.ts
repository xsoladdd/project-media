import React, { JSXElementConstructor } from "react";
import { IconType } from "react-icons/lib";

export type sizeTypes = "xs" | "sm" | "md" | "lg" | "xl";

export type variantTypes =
  | "primary"
  | "secondary"
  | "danger"
  | "info"
  | "success"
  | "warning";

export interface technologiesInterface {
  title: string;
  id: string;
  Icon: IconType;
  description: React.ReactNode;
  link?: string;
}

export interface socialMediaLinksInterface {
  Icon: IconType;
  link: string;
  title: string;
}
