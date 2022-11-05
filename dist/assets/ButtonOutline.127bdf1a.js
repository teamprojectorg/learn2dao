import { s as styled$1, c as color, a as gradientColors, j as jsx$1, B as ButtonBase } from "./index.6ce930ce.js";
const ButtonOutlineStyled$1 = styled$1(ButtonBase)`
    background-color: ${color.white};
    border-color: ${color.navy20};
    color: ${color.navy40};

    :hover {
        background-color: ${gradientColors.beauBlue};
        border-color: transparent;
        color: ${color.navy40};

        svg {
            color: ${color.navy40};
        }
    }

    :active {
        box-shadow: 0px 0px 0px 2px ${color.blue70};
    }

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy30};
    }

    svg {
        color: ${color.navy40};
    }
`;
var styles = {
  ButtonOutlineStyled: ButtonOutlineStyled$1
};
const {
  ButtonOutlineStyled
} = styles;
const ButtonOutline = ({
  ...props
}) => /* @__PURE__ */ jsx$1(ButtonOutlineStyled, {
  ...props
});
export {
  ButtonOutline as default
};
