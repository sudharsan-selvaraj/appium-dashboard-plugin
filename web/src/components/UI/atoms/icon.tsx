import React from "react";
import {
  FaHome,
  FaAngleDown,
  FaAngleUp,
  FaCheckCircle,
  FaFilter,
} from "react-icons/fa";
import { FcAndroidOs } from "react-icons/fc";
import { FaApple, FaTrash, FaPlay } from "react-icons/fa";
import { SiSafari } from "react-icons/si";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { GiPauseButton } from "react-icons/gi";
import { BiArrowFromRight } from "react-icons/bi";
import { BsClockFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

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
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "right" | "left";
};

function wrapIconWithTooltip(icon: any, props: IconProps) {
  const { tooltip, tooltipPosition } = props;
  if (!tooltip) {
    return icon;
  } else {
    return (
      <Tooltip
        title={tooltip}
        placement={tooltipPosition}
        arrow
        classes={{
          tooltip: "custom-tooltip-container",
          arrow: "custom-tooltip-arrow",
        }}
      >
        {icon}
      </Tooltip>
    );
  }
}

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
      icon = <SiSafari />;
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
      icon = <FaFilter />;
      break;
    case "delete":
      icon = <FaTrash />;
      break;
    case "mobile":
      icon = <IoPhonePortraitOutline />;
      break;
    case "exclamation":
      icon = <BsFillExclamationTriangleFill />;
      break;
    case "pause":
      icon = <GiPauseButton />;
      break;
    case "play":
      icon = <FaPlay />;
      break;
    case "collapse":
      icon = <BiArrowFromRight />;
      break;
    default:
      icon = null;
  }
  const container = (
    <Container onClick={onClick} size={size} className="icon">
      {icon}
    </Container>
  );
  return wrapIconWithTooltip(container, props);
}
