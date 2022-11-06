import { Button } from "@web3uikit/core";
import { Cross } from "@web3uikit/icons";
import { createContext, useContext } from "react";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import { TABLET_OR_MOBILE_MAX_WIDTH_PX } from "../constants";
import PhantomButton from "../PhantomButton";
import { useNavigate } from "react-router-dom";

const MENU_WINDOW_WIDTH_PX = 350;

type MenuItem = {
  label: string;
  path: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Home",
    path: "/",
  },
];

type ISlidingMenuContext = {
  isOpen: boolean;
  closeMenu: () => void;
  openMenu: () => void;
};

export const SlidingMenuContext = createContext<ISlidingMenuContext | null>(
  null
);

export const useSlidingMenuContext = () => {
  const ctx = useContext(SlidingMenuContext);
  if (!ctx) {
    throw new Error('Calling "useSlidingMenuContext" outside of context');
  }
  return ctx;
};

const SlidingMenu = () => {
  const navigate = useNavigate();
  const { isOpen, closeMenu } = useSlidingMenuContext();
  const transition = useTransition(isOpen, {
    from: {
      transform: "translate3d(-101%,0,0)",
    },
    enter: {
      transform: "translate3d(0,0,0)",
    },
    leave: {
      immediate: true,
      transform: "translate3d(-101%,0,0)",
    },
  });

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <AnimatedMenuWindowContainerDiv style={style}>
              <PhantomButton onClick={() => closeMenu()}>
                <Cross fill="#000" width={16} height={16} />
              </PhantomButton>
              <div id="nav-menu-items">
                {menuItems.map((item) => (
                  <MenuItemLink
                    className="pointer"
                    onClick={() => {
                      navigate(item.path);
                      closeMenu();
                    }}
                    key={item.label}
                  >
                    {item.label}
                  </MenuItemLink>
                ))}
                <Button
                  size="large"
                  type="button"
                  theme="colored"
                  color="blue"
                  text="Connect wallet"
                />
              </div>
            </AnimatedMenuWindowContainerDiv>
          )
      )}
    </>
  );
};

const MenuWindowContainerDiv = styled.div`
  position: fixed;
  inset: 0 auto 0 0;
  background: white;
  padding: 1.5rem 1.5rem;
  z-index: 999999;
  width: ${MENU_WINDOW_WIDTH_PX}px;

  @media only screen and (max-width: ${TABLET_OR_MOBILE_MAX_WIDTH_PX}px) {
    width: calc(100% - 2 * 1.5rem);
    & > #nav-menu-items {
      align-items: center;
    }
  }

  & > #nav-menu-items {
    margin-top: 2.75rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const AnimatedMenuWindowContainerDiv = animated(MenuWindowContainerDiv);

const MenuItemLink = styled.a.attrs({ as: "h3" })`
  color: black;
  text-decoration: none;
`;

export default SlidingMenu;
