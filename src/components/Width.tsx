import styled, { css } from "styled-components";

export const WidthGeqOnly = styled.div<{ $minWidth: number }>`
  @media only screen and (max-width: ${({ $minWidth }) => $minWidth}px) {
    display: none;
  }
`;

export const MaxWidth = styled.div<{ $maxWidth?: string | number }>`
  ${({ $maxWidth }) => {
    if ($maxWidth) {
      const mw = typeof $maxWidth === "number" ? `${$maxWidth}px` : $maxWidth;
      return css`
        max-width: ${mw};
      `;
    }
  }}
`;
