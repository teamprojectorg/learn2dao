import { C as Ce$1, g as getShade, c as color, s as styled$1, j as jsx$1, B as ButtonBase } from "./index.6ce930ce.js";
const coloredShades = Ce$1`
    :after {
        background-color: ${getShade("light", 90)};
    }

    :hover {
        :after {
            background-color: ${getShade("light", 70)};
        }
    }

    :active {
        :after {
            background-color: ${getShade("light", 50)};
        }
    }
`;
const coloredRed = Ce$1`
    background-color: ${color.red40};
    border-color: ${color.red40};
    color: ${color.red40};

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy30};
    }

    svg {
        fill: ${color.red40};
    }

    ${coloredShades}
`;
const coloredGreen = Ce$1`
    background-color: ${color.mint40};
    border-color: ${color.mint40};
    color: ${color.mint40};

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy30};
    }

    svg {
        fill: ${color.mint40};
    }

    ${coloredShades}
`;
const coloredBlue = Ce$1`
    background-color: ${color.navy40};
    border-color: ${color.navy40};
    color: ${color.navy40};

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy30};
    }

    svg {
        fill: ${color.navy40};
    }

    ${coloredShades}
`;
const coloredYellow = Ce$1`
    background-color: ${color.yellow50};
    border-color: ${color.yellow50};
    color: ${color.yellow50};

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy30};
    }

    svg {
        fill: ${color.yellow50};
    }

    ${coloredShades}
`;
const getColored = (color2) => {
  switch (color2) {
    case "red":
      return coloredRed;
    case "green":
      return coloredGreen;
    case "blue":
      return coloredBlue;
    case "yellow":
      return coloredYellow;
    default:
      return;
  }
};
const ButtonColoredStyled$1 = styled$1(ButtonBase)`
    :after {
        background-color: ${getShade("dark", 0)};
        content: '';
        display: block;
        height: 100%;
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        transition: all 0.3s ease;
        width: 100%;
        z-index: 0;
        border-radius: 10px;
    }

    ${({
  color: color2
}) => color2 && getColored(color2)}
`;
var styles = {
  ButtonColoredStyled: ButtonColoredStyled$1
};
const {
  ButtonColoredStyled
} = styles;
const ButtonColored = ({
  color: color2,
  ...props
}) => /* @__PURE__ */ jsx$1(ButtonColoredStyled, {
  color: color2,
  ...props
});
export {
  ButtonColored as default
};
