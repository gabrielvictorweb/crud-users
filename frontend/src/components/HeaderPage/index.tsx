import { useAtom } from "jotai";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { menuIsOpenAtom } from "@/atoms/menu";
import useAuth from "@/hooks/useAuth";

export const HeaderPage = () => {
  const [menuIsOpen, setMenuIsOpen] = useAtom(menuIsOpenAtom);

  const { user, logout } = useAuth();

  const toogleMenu = React.useCallback(() => {
    setMenuIsOpen((prev) => !prev);
  }, [setMenuIsOpen]);

  const renderHabumguer = React.useMemo(() => {
    if (!menuIsOpen) {
      return (
        <button
          onClick={toogleMenu}
          type="button"
          className="w-[55px] h-[55px] bg-[#F7F7F7] rounded-full flex items-center justify-center"
        >
          <AiOutlineMenu size={23} />
        </button>
      );
    }
  }, [menuIsOpen, toogleMenu]);

  const userName = user?.name.match(/\b(\w)/g)?.slice(0, 2);

  return (
    <header className="bg-white border-b-[1px] sticky top-0 p-8 flex items-center justify-between">
      <div className="flex items-center gap-4">{renderHabumguer}</div>

      <div className="flex items-center gap-[30px]">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
              {user?.name}
            </h1>
            <Link
              to="#logout"
              onClick={logout}
              className="text-blue-500 cursor-pointer hover:text-blue-900"
            >
              Sair
            </Link>
          </div>
          <div className="w-[55px] h-[55px] text-gray-300 text-lg font-semibold rounded-full  flex items-center justify-center bg-blue-900">
            {userName}
          </div>
        </div>
      </div>
    </header>
  );
};
