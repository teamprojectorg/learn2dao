import clsx from "clsx";
import fuzzysort from "fuzzysort";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleImage from "../components/CircleImage";
import DAOInfo from "../components/DAOInfo";
import GentleImage from "../components/GentleImage";
import LoadingPage from "../components/LoadingPage";
import { Search } from "../components/Search";
import Text from "../components/Text";
import { GridUnlessMobile, MaxWidth } from "../components/Width";
import { hardcoded } from "../hardcoded";
import { wait } from "../utils";

const autoCompleteFromHardCoded = (query: string) => {
  const results = fuzzysort.go(query, hardcoded, {
    keys: ["name", "governanceContractAddress"],
  });
  return Promise.resolve(
    results.map((r) => ({
      id: r.obj.governanceContractAddress,
      label: r.obj.name,
      data: { logoUrl: r.obj.logoUrl },
    }))
  );
};

const Home = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {!imageLoaded && <LoadingPage />}
      <div className={clsx("pa5", !imageLoaded && "dn")}>
        <div className="mb4 flex flex-column items-center gap-2">
          <GentleImage
            onLoad={async () => {
              await wait(100 * 3);
              setImageLoaded(true);
            }}
            width={350}
            height="auto"
            src="/assets/banner.png"
          />
          <Text.bodyBig>Learn, understand and join DAOs</Text.bodyBig>
        </div>
        <MaxWidth $maxWidth="50rem" className="mb5 center">
          <Search<string, { logoUrl: string }>
            placeholder="Seach by ENS or Governance Contract (ERC721/ERC20/ERC1155)"
            dataFetcher={autoCompleteFromHardCoded}
            renderOption={({ option }) => {
              return (
                <div className="flex flex-row items-center gap-3">
                  <CircleImage
                    src={option.data.logoUrl}
                    width={30}
                    height="auto"
                  />
                  <Text.bodyLight>{option.label}</Text.bodyLight>
                </div>
              );
            }}
            onSearch={(v) => navigate(`/info/${v}`)}
          />
        </MaxWidth>
        <Text.h1 className="mb4">Popular DAOs</Text.h1>
        <GridUnlessMobile rowGap="5rem" gridTemplateColumns="1fr 1fr 1fr">
          {hardcoded.map((h, i) => (
            <DAOInfo
              key={`${i}-${h.name}`}
              logoUrl={h.logoUrl}
              name={h.name}
              tags={h.tags as any}
              governanceContractAddress={h.governanceContractAddress}
            />
          ))}
        </GridUnlessMobile>
      </div>
    </>
  );
};

export default Home;
