import { Menu } from "@web3uikit/icons";
import styled from "styled-components";
import Flex from "../Flex";
import PhantomButton from "../PhantomButton";
import { useSlidingMenuContext } from "./SlidingMenu";
import { Button } from "@web3uikit/core";
import { WidthGeqOnly } from "../Width";

const Navigation = () => {
  const { openMenu } = useSlidingMenuContext();
  return (
    <Nav>
      <Flex alignItems="center" className="gap-3">
        <PhantomButton onClick={() => openMenu()}>
          <Menu fill="#000" width={18} height={18} />
        </PhantomButton>
        <h3 id="nav-title">ETH SF 2022 Project</h3>
      </Flex>
      <WidthGeqOnly $minWidth={750}>
        <Button
          size="large"
          type="button"
          theme="colored"
          color="blue"
          text="Connect wallet"
        />
      </WidthGeqOnly>
    </Nav>
  );
};

const Nav = styled.nav`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  // center content
  margin: 0 auto;
  height: 100%;

  background: white;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);

  & > #nav-title {
    user-select: none;
  }
`;

export default Navigation;
