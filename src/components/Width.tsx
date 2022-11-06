import styled, { css } from "styled-components";
import { TABLET_OR_MOBILE_MAX_WIDTH_PX } from "./constants";
import { Grid } from "./Grid";

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

export const GridUnlessMobile = styled(Grid)`
  @media only screen and (max-width: ${TABLET_OR_MOBILE_MAX_WIDTH_PX}px) {
    display: flex !important;
    flex-direction: column !important;
    gap: 4rem !important;
  }
`;
