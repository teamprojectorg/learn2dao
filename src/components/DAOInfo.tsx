import { Tag } from "@web3uikit/core";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  governanceContractAddress: string;
  tags?: { text: string; color: Color }[];
};

const DAOInfo = ({
  logoUrl,
  name,
  governanceContractAddress,
  tags,
}: DAOInfoProps) => {
  const navigate = useNavigate();
  const goToPage = useCallback(() => {
    navigate(`/info/${governanceContractAddress}`);
  }, [navigate]);
  return (
    <div className="flex flex-column items-center">
      <ImageCard onClick={goToPage} src={logoUrl} />
      <Text.bodyBigger onClick={goToPage} className="pointer mt3 tc">
        {name}
      </Text.bodyBigger>
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
