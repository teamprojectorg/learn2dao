import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

type Color =
  | `#${string}`
  | `rgb(${number},${number},${number})`
  | "black"
  | "white";

export const FONT_FAMILY = {
  light: "LabGrotesque-Light",
  regular: "LabGrotesque-Regular",
  italic: "LabGrotesque-Italic",
  bold: "LabGrotesque-Bold",
} as const;

export type TextProps = {
  $color?: Color;
};

export type LinkButtonProps = TextProps;

const textStyle = css<TextProps>`
  font-family: ${FONT_FAMILY.regular};
  font-size: 1em;
  line-height: 1.5em;
  color: ${({ $color = "#000" }) => $color};
  &.light {
    font-family: ${FONT_FAMILY.light};
  }
  & > strong {
    font-family: ${FONT_FAMILY.bold};
  }
  & > i {
    font-family: ${FONT_FAMILY.italic};
  }
`;

const linkStyle = css<TextProps>`
  border: none;
  background: none;
  font-family: ${FONT_FAMILY.regular};
  font-size: 1em;
  line-height: 1.25em;
  padding: 0px;
  text-decoration: none;
  color: ${({ $color = "rgb(11,114,196)" }) => $color};

  :hover:not(:disabled) {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const linkButtonStyle = css<LinkButtonProps>`
  &.no-underline {
    text-decoration: none;
    &:hover,
    &:visited,
    &:link,
    &:active {
      border: 0;
      text-decoration: none;
    }
  }
`;

const headerStyle = css<TextProps>`
  ${textStyle}
  // is there a bol for cera?
  font-family: ${FONT_FAMILY.regular};
  & > i {
    font-family: ${FONT_FAMILY.italic};
  }
  font-weight: bold;
`;

const h1 = styled.h1<TextProps>`
  ${headerStyle}
  font-size: 2em;
`;

const h2 = styled.h2<TextProps>`
  ${headerStyle}
  font-size: 1.5em;
`;

const h3 = styled.h3<TextProps>`
  ${headerStyle}
  font-size: 1.17em;
`;

const h4 = styled.h4<TextProps>`
  ${headerStyle}
  font-size: 1em;
`;

const h5 = styled.h5<TextProps>`
  ${headerStyle}
  font-size: 0.83em;
`;

const h6 = styled.h6<TextProps>`
  ${headerStyle}
  font-size: 0.67em;
`;

const body = styled.p<TextProps>`
  ${textStyle}
  font-weight: normal;
`;

const bodyLight = styled(body)`
  font-family: ${FONT_FAMILY.light};
`;

const bodyItalic = styled(body)`
  font-family: ${FONT_FAMILY.italic};
`;

const bodyBold = styled(body)`
  font-family: ${FONT_FAMILY.bold};
  font-weight: bold;
`;

const bodySmall = styled(body)`
  font-size: 0.875em;
`;

const bodySmallBold = styled(bodySmall)`
  font-family: ${FONT_FAMILY.bold};
  font-weight: bold;
`;

const title = styled(body)`
  font-family: ${FONT_FAMILY.bold};
  font-size: 3.5em;
`;

const titleSmall = styled(body)`
  font-family: ${FONT_FAMILY.bold};
  font-size: 2.5em;
`;

const bodyBig = styled(body)`
  font-size: 1.25em;
`;

const bodyBigger = styled(body)`
  font-size: 2em;
`;

const caption = styled(body)`
  font-size: 0.75em;
  line-height: 0.9375em;
`;

const captionBold = styled(caption)`
  font-family: ${FONT_FAMILY.bold};
  font-weight: bold;
`;

const labelBase = css<TextProps>`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.0625em;
  line-height: 0.9375em;
  color: ${({ $color = "#000" }) => $color};
`;

const label = styled(body)`
  ${labelBase}
  font-family: ${FONT_FAMILY.bold};
  font-size: 0.75em;
`;

const labelLite = styled(body)`
  ${labelBase}
  font-family: ${FONT_FAMILY.regular};
  font-weight: normal;
  font-size: 0.83em;
`;

const externalLink = styled.a<TextProps>`
  ${linkStyle};
`;

const link = styled(Link)<TextProps>`
  ${linkStyle}
`;

const linkButton = styled<"button">(link as any).attrs({
  as: "button",
})<LinkButtonProps>`
  ${linkButtonStyle}
`;

const linkButtonBig = styled<"button">(link as any).attrs({
  as: "button",
})<LinkButtonProps>`
  ${linkButtonStyle}
  font-size: 1.5em;
`;

const linkButtonSmall = styled<"button">(link as any).attrs({
  as: "button",
})<LinkButtonProps>`
  ${linkButtonStyle}
  font-size: 0.875em;
`;

const linkButtonCaption = styled<"button">(link as any).attrs({
  as: "button",
})<LinkButtonProps>`
  ${linkButtonStyle}
  font-size: 0.75em;
  line-height: 0.9375em;
`;

const linkSmall = styled(Link)<TextProps>`
  ${linkStyle}
  font-size: 0.875em;
`;

export const hideBrowserOutline = css`
  outline: none;

  :active,
  :focus {
    outline: none;
  }
`;

const Text = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  body,
  bodyLight,
  bodyItalic,
  bodyBold,
  bodyBig,
  bodyBigger,
  bodySmall,
  bodySmallBold,
  label,
  labelLite,
  caption,
  captionBold,
  externalLink,
  title,
  titleSmall,
  link,
  linkSmall,
  linkButton,
  linkButtonBig,
  linkButtonSmall,
  linkButtonCaption,
};

export default Text;
