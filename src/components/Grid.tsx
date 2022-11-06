import React from "react";
import styled, { CSSProperties } from "styled-components";

type GridProps = {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
} & CSSProperties;

export const Grid: React.FC<GridProps> = React.forwardRef<
  HTMLDivElement,
  GridProps
>(({ children, className, ...style }, ref) => {
  return (
    <StyledGrid ref={ref} className={className} style={style}>
      {children}
    </StyledGrid>
  );
});

const StyledGrid = styled.div`
  display: grid;
`;

export const GridSpan = styled.div<{ start: number; span: number }>`
  grid-column-start: ${({ start }) => start};
  grid-column-end: span ${({ span }) => span};
`;
