import { Tag } from "@web3uikit/core";
import styled from "styled-components";
import Text from "./Text";

type Color =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "grey"
  | "blueLight"
  | "purple"
  | "pink";

type DAOInfoProps = {
  logoUrl: string;
  name: string;
  governanceContract: string;
  tags?: { text: string; color: Color }[];
};

const DAOInfo = ({ logoUrl, name, governanceContract, tags }: DAOInfoProps) => {
  return (
    <div className="flex flex-column items-center">
      <ImageCard src={logoUrl} />
      <Text.bodyBigger className="mt3 tc">{name}</Text.bodyBigger>
      {tags && (
        <div className="mt3 flex flex-row flex-wrap gap-3">
          {tags.map((t) => (
            <Tag text={t.text} color={t.color} tone="dark" />
          ))}
        </div>
      )}
    </div>
  );
};

const ImageCard = styled.img`
  cursor: pointer;
  border: 1px solid #cecece;
  box-shadow: rgb(0 0 0 / 16%) 0px 2px 8px;
  border-radius: 0.25rem;
  background: white;
  padding: 1rem;
`;

export default DAOInfo;
