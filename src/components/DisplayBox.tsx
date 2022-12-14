import styled from "styled-components";
import { MaxWidth } from "./Width";

const DisplayBox = styled(MaxWidth)`
  box-shadow: rgb(0 0 0 / 16%) 0px 2px 8px;
  border-radius: 0.25rem;
  // width: fit-content;
  background: white;
  padding: 0.875rem 1.125rem;
`;

export default DisplayBox;
