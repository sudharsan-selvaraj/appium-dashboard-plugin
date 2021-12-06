import React from "react";
import { FaHome, FaAngleDown, FaAngleUp, FaCheckCircle } from "react-icons/fa";
import { FcAndroidOs } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { DiSafari } from "react-icons/di";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsClockFill, BsFilterRight, BsTrash } from "react-icons/bs";
import styled from "styled-components";

export enum Sizes {
  S = "12",
  M = "14",
  L = "16",
  XL = "18",
  XXL = "20",
  XXXL = "25",
}

const Container = styled.span<{ size?: string }>`
  font-size: ${(props) => props.size || 14}px;
  vertical-align: middle;
`;

type IconProps = {
  name: string;
  onClick?: () => void;
  size?: string;
};

export default function Icon(props: IconProps) {
  const { name, onClick, size } = props;
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
      icon = <DiSafari />;
      break;
    case "arrow-up":
      icon = <FaAngleUp />;
      break;
    case "arrow-down":
      icon = <FaAngleDown />;
      break;
    case "success":
      icon = <FaCheckCircle />;
      break;
    case "error":
      icon = <AiFillCloseCircle />;
      break;
    case "time":
      icon = <BsClockFill />;
      break;
    case "filter":
      icon = <BsFilterRight />;
      break;
    case "delete":
      icon = <BsTrash />;
      break;
    default:
      icon = null;
  }
  return (
    <Container onClick={onClick} size={size}>
      {icon}
    </Container>
  );
}
