import { s as styled$1, c as color, j as jsx$1, B as ButtonBase } from "./index.6ce930ce.js";
const ButtonPrimaryStyled$1 = styled$1(ButtonBase)`
    background-color: ${color.mint40};
    border-color: ${color.mint20};
    color: ${color.white};

    :hover {
        background: radial-gradient(
                71.63% 130.21% at 50% 0%,
                #aadcd6 0%,
                rgba(33, 191, 150, 0) 100%
            ),
            #21bf96;
    }

    :active {
        border-color: ${color.mint20};
        background: linear-gradient(
                83.64deg,
                #aadcd6 -9.46%,
                rgba(33, 191, 150, 0) 45.97%,
                #aadcd6 103.7%
            ),
            #21bf96;
        outline: 0;
        box-shadow: none;
    }

    :focus {
        box-shadow: 0px 0px 0px 2px ${color.navy40};
    }

    svg {
        fill: ${color.white};
    }
`;
var styles = {
  ButtonPrimaryStyled: ButtonPrimaryStyled$1
};
const {
  ButtonPrimaryStyled
} = styles;
const ButtonPrimary = ({
  ...props
}) => /* @__PURE__ */ jsx$1(ButtonPrimaryStyled, {
  ...props
});
export {
  ButtonPrimary as default
};
