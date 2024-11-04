import React from "react";
import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  text: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
}

export const MenuItem = React.memo<Props>(
  ({ text, href, icon: Icon, onClick }) => (
    <NavLink
      title={text}
      to={`/area-do-usuario${href}`}
      className={({ isActive, isPending }) =>
        `gap-2 p-[14px] rounded-md h-[48px] flex items-center ${
          isPending
            ? "pending"
            : isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`
      }
      onClick={onClick}
    >
      <Icon />
      <li className="">{text}</li>
    </NavLink>
  )
);
