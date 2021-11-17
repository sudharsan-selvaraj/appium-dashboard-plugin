import React from "react";
import { FaHome } from "react-icons/fa";
import { FcAndroidOs } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { DiSafari } from "react-icons/di";

type IconProps = {
  name: string;
};

export default function Icon({ name }: IconProps) {
  let icon;

  switch (name) {
    case "home":
      icon = <FaHome />;
      break;
    case "android":
      icon = <FcAndroidOs />;
      break;
    case "ios":
      icon = <FaApple />;
      break;
    case "safari":
      icon = <DiSafari />
      break;
    default:
      icon = null;
  }
  return <span>{icon}</span>;
}
