import styled, { CSSProperties } from "styled-components";

type Props = CSSProperties & {
  children: React.ReactNode;
  className?: string;
};

const Flex = styled.div<Props>`
  display: flex;
`;

export default Flex;
