import React from "react";
import { FaHome } from "react-icons/fa";

type IconProps = {
  name: string;
};

export default function Icon({ name }: IconProps) {
  let icon;

  switch (name) {
    case "home":
      icon = <FaHome />;
      break;
    default:
      icon = null;
  }
  return <span>{icon}</span>;
}
