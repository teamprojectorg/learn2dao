import fuzzysort from "fuzzysort";
import CircleImage from "../components/CircleImage";
import DAOInfo from "../components/DAOInfo";
import GentleImage from "../components/GentleImage";
import { Search } from "../components/Search";
import Text from "../components/Text";
import { GridUnlessMobile, MaxWidth } from "../components/Width";
import { hardcoded } from "../hardcoded";
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return <div className="pa2">
    <div className="fit center">
      <Flex className="gap-2">
        <Text.title>Learn</Text.title>
        <Text.bodyBigger className="mt4">{"2 -> 3"}</Text.bodyBigger>
        <Text.title>DAO</Text.title>
      </Flex>
      <Text.bodyBig className="tc mt2">
        Learn, understand and join DAOs
      </Text.bodyBig>
    </div>
    <MaxWidth $maxWidth="50rem" className="center">
      <Search
        placeholder="Seach by ENS or Governance Contract (ERC721/ERC20/ERC1155)"
        className="mv4"
        dataFetcher={async (val) => {
          if (val.toLowerCase() === 'ape') {
            return [{id: '0x4d224452801ACEd8B2F0aebE155379bb5D594381', label: 'ApeCoin'}]
          }
          return []
        }}
        onSearch={val => navigate(`/info/${val}`)}
      />
    </MaxWidth>
    <Text.h1 className="mb4">Popular DAOs</Text.h1>
    <GridUnlessMobile gridTemplateColumns="1fr 1fr 1fr">
      {hardcoded.map((h) => (
        <DAOInfo
          key={h.governanceContractAddress}
          logoUrl={h.logoUrl}
          name={h.name}
          tags={h.tags as any}
          governanceContractAddress={h.governanceContractAddress}
        />
      ))}
    </GridUnlessMobile>
  </div>
};

/*

  const spacedTicks = spacedTimestamps(
    randomData[0].time,
    randomData[randomData.length - 1].time,
    { every: 1, period: "day" }
=======
import { useNavigate } from "react-router-dom";

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
>>>>>>> 649ff8ab75054334884c6ef1bbb8319d5da5fb1f
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="pa2">
      <div className="fit center">
        <GentleImage
          className="mb2"
          width={350}
          height="auto"
          src="/assets/banner.png"
        />
        <Text.bodyBig className="tc">
          Learn, understand and join DAOs
        </Text.bodyBig>
      </div>
      <MaxWidth $maxWidth="50rem" className="center">
        <Search<string, { logoUrl: string }>
          placeholder="Seach by ENS or Governance Contract (ERC721/ERC20/ERC1155)"
          className="mv4"
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
      <GridUnlessMobile gridTemplateColumns="1fr 1fr 1fr">
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
  );
};

export default Home;
