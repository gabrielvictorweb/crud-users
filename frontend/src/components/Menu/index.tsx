import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { VscRequestChanges } from "react-icons/vsc";
import Logo from "@/assets/logo.svg";
import { menuIsOpenAtom } from "@/atoms/menu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MenuItem } from "../MenuItem";

const variants = {
  open: { x: 0, width: "100%", transitionEnd: { display: "block" } },
  closed: { x: -289, width: 0, transition: { display: "none" } },
};

export const Menu = () => {
  const [menuIsOpen, setMenuIsOpen] = useAtom(menuIsOpenAtom);

  const useIsMedium = useMediaQuery("(min-width: 768px)");

  const toogleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  React.useEffect(() => {
    setMenuIsOpen(useIsMedium);
  }, [useIsMedium, setMenuIsOpen]);

  return (
    <>
      <motion.div
        animate={menuIsOpen ? variants.open : variants.closed}
        className="md:max-w-[289px] sticky left-0 z-50"
      >
        <nav className="fixed top-0 z-50 w-[100%] bg-white md:border-r-[1px] md:block flex-1 md:max-w-[289px] md:w-[289px] p-[32px] md:sticky left-0 h-[100vh]">
          <div className="flex justify-between items-center">
            <img className="w-[60px]" src={Logo} alt="Logo" title="Logo" />

            <button
              onClick={toogleMenu}
              type="button"
              className="w-[55px] h-[55px] bg-[#F7F7F7] rounded-full flex items-center justify-center"
            >
              <AiOutlineMenu size={23} />
            </button>
          </div>

          <h1 className="h-[48px] flex items-center text-[#B9BBC1]">MENU</h1>
          <ul className="flex flex-col gap-2">
            <MenuItem
              text="Home"
              href="/inicio"
              icon={GoHome}
              onClick={() => {
                if (!useIsMedium) {
                  toogleMenu();
                }
              }}
            />
            <MenuItem
              text="Usuários"
              href="/users"
              icon={VscRequestChanges}
              onClick={() => {
                if (!useIsMedium) {
                  toogleMenu();
                }
              }}
            />
          </ul>
        </nav>
      </motion.div>
    </>
  );
};
