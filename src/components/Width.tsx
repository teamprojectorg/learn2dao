import styled from "styled-components";

export const WidthGeqOnly = styled.div<{ $minWidth: number }>`
  @media only screen and (max-width: ${({ $minWidth }) => $minWidth}px) {
    display: none;
  }
`;
