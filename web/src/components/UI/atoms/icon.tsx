import React from "react";
import { FaHome, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FcAndroidOs } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { DiSafari } from "react-icons/di";

type IconProps = {
  name: string;
  onClick: () => void;
};

export default function Icon({ name, onClick }: IconProps) {
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
    case "arrow-up":
      icon = <FaAngleUp />
      break;
    case "arrow-down":
      icon = <FaAngleDown />
      break;
    default:
      icon = null;
  }
  return (
    <span onClick={onClick}>
      {icon}
    </span>
  );
}
