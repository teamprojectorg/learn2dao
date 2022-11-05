import { s as styled$1, c as color, j as jsx$1, B as ButtonBase } from "./index.6ce930ce.js";
const ButtonSecondaryStyled$1 = styled$1(ButtonBase)`
    background-color: ${color.aero10};
    border-color: ${color.aero10};
    color: ${color.navy40};

    :active {
        border-color: ${color.navy40};
    }

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy30};
    }

    svg {
        fill: ${color.navy40};
    }
`;
var styles = {
  ButtonSecondaryStyled: ButtonSecondaryStyled$1
};
const {
  ButtonSecondaryStyled
} = styles;
const ButtonSecondary = ({
  ...props
}) => /* @__PURE__ */ jsx$1(ButtonSecondaryStyled, {
  ...props
});
export {
  ButtonSecondary as default
};
