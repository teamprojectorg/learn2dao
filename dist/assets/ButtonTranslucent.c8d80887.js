import { s as styled$1, g as getShade, c as color, j as jsx$1, B as ButtonBase } from "./index.6ce930ce.js";
const ButtonTranslucentStyled$1 = styled$1(ButtonBase)`
    background-color: ${getShade("dark", 20)};
    color: ${color.white};

    :active {
        border: 2px solid transparent;
    }

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy30};
    }

    svg {
        fill: ${color.white};
    }
`;
var styles = {
  ButtonTranslucentStyled: ButtonTranslucentStyled$1
};
const {
  ButtonTranslucentStyled
} = styles;
const ButtonTranslucent = ({
  ...props
}) => /* @__PURE__ */ jsx$1(ButtonTranslucentStyled, {
  ...props
});
export {
  ButtonTranslucent as default
};
