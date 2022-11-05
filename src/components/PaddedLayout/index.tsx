import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import SlidingMenu, { SlidingMenuContext } from "./SlidingMenu";

const HEADER_BAR_HEIGHT_PX = 60;

type LayoutProps = {
  children: React.ReactNode;
};

const PaddedLayout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);
  const openMenu = useCallback(() => setIsMenuOpen(true), [setIsMenuOpen]);
  return (
    <LayoutContainerDiv>
      <SlidingMenuContext.Provider
        value={{ isOpen: isMenuOpen, closeMenu, openMenu }}
      >
        <SlidingMenu />
        <header>
          <Navigation />
        </header>
      </SlidingMenuContext.Provider>
      <main>{children}</main>
    </LayoutContainerDiv>
  );
};

const LayoutContainerDiv = styled.div`
  padding-top: ${HEADER_BAR_HEIGHT_PX}px;
  // height: calc(100vh - ${HEADER_BAR_HEIGHT_PX}px);
  display: flex;
  flex-direction: column;
  background: #f6f9fc;
  overflow: hidden;

  // Header content
  & > header {
    height: ${HEADER_BAR_HEIGHT_PX}px;
    position: fixed;
    inset: 0 0 auto 0;
    background: white;
    z-index: 999998;
  }

  // Main content
  & > main {
    padding: 1rem;
    height: 100%;
    overflow: auto;
  }
`;

export default PaddedLayout;
