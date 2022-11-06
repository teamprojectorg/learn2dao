import {
  createReactClient,
  LivepeerConfig,
  Player,
  studioProvider,
  ThemeConfig,
} from "@livepeer/react";
import { Button, Tag } from "@web3uikit/core";
import { Checkmark, Copy } from "@web3uikit/icons";
import copy from "copy-to-clipboard";
import { first, last, round } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tooltip } from "recharts";
import sampleData from "../../sample_ipfs_data.json";
import { getTwitterSentitment } from "../api/off-chain-data/twitter-sentiment";
import { getSnapshot, SnapResult } from "../api/snapshot/snapshot";
import DisplayBox from "../components/DisplayBox";
import ErrorPage from "../components/ErrorPage";
import BarGraph from "../components/Graphs/BarGraph";
import LineWithBarGraph from "../components/Graphs/LineWithBarGraph";
import spacedTimestamps from "../components/Graphs/spacedTimestamps";
import { Grid } from "../components/Grid";
import LoadingPage from "../components/LoadingPage";
import PhantomButton from "../components/PhantomButton";
import Text from "../components/Text";
import { hardcodedLookup } from "../hardcoded";
import { Twitter } from "@web3uikit/icons";
import { Telegram } from "@web3uikit/icons";
import { Mail } from "@web3uikit/icons";
import { Discord } from "@web3uikit/icons";
const [sampleGini, sampleHolders] = sampleData;

const client = createReactClient({
  provider: studioProvider({ apiKey: "16a0d4dc-86e9-4af5-91f1-1e0434e713f7" }),
});

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

const playbackId = "bdbdbbt292rhqffl";
const Livepeer = () => {
  return (
    <Player playbackId={playbackId} loop autoPlay showTitle={false} muted />
  );
};

const Visuals = () => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { id: governanceContractAddress } = useParams<{ id: string }>();

  const fromHardCoded = governanceContractAddress
    ? hardcodedLookup[governanceContractAddress]
    : undefined;

  const {
    loading: twitLoading,
    data: twitData,
    error: twitError,
  } = useTwitterData({
    keyword: fromHardCoded?.name!,
    skip: !fromHardCoded,
  });

  const {
    loading: partLoading,
    data: partData,
    error: partError,
  } = useParticipationData({
    ensAddress: fromHardCoded?.ensAddress!,
    skip: !fromHardCoded,
  });

  const loading = twitLoading || partLoading;
  const error = partError; // || twitError;

  if (loading) {
    return <LoadingPage />;
  }

  if (!fromHardCoded || error) {
    return <ErrorPage code={500} message={error || "Page not found"} />;
  }

  return (
    <div className="mt3">
      <Grid
        justifyContent="space-between"
        columnGap="0.75rem"
        gridTemplateColumns="1fr 200px"
        className="mb4"
      >
        <DisplayBox className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <Text.h2>{fromHardCoded.name}</Text.h2>
            <Socials />
            <div className="flex flex-row items-center gap-2">
              <Text.caption $color="#0D71C4">
                {fromHardCoded.governanceContractAddress}
              </Text.caption>
              <PhantomButton
                className={copiedToClipboard ? undefined : "pointer"}
                onClick={() => {
                  if (copiedToClipboard) return;
                  copy(fromHardCoded.governanceContractAddress);
                  setCopiedToClipboard(true);
                  setTimeout(() => {
                    setCopiedToClipboard(false);
                  }, 1000 * 10);
                }}
              >
                <div style={{ marginTop: 2 }}>
                  {copiedToClipboard ? (
                    <Checkmark fontSize="0.875rem" color="green" />
                  ) : (
                    <Copy fontSize="0.875rem" />
                  )}
                </div>
              </PhantomButton>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            {fromHardCoded.tags.map((t) => (
              <Tag text={t.text} color={t.color} tone="dark" />
            ))}
          </div>
        </DisplayBox>
        <div className="flex flex-column justify-center">
          <div>
            <Button
              size="xl"
              type="button"
              theme="colored"
              color="green"
              text="Connect Wallet"
              // onClick={}
            />
          </div>
        </div>
      </Grid>
      <Grid
        className="mb4"
        columnGap="0.75rem"
        gridTemplateColumns="1fr 800px 1fr"
      >
        <DisplayBox
          style={{ minWidth: 200 }}
          className="flex flex-column gap-3"
        >
          <div>
            <Text.h3 className="mb2">About:</Text.h3>
            <Text.bodySmall>{fromHardCoded.about}</Text.bodySmall>
          </div>
        </DisplayBox>
        <DisplayBox className="fit center flex flex-column items-center">
          <div style={{ height: "auto", width: 750 }}>
            {/* <Text.h2>Live Peer Video</Text.h2> */}
            <LivepeerConfig client={client} theme={livepeerTheme}>
              <Livepeer />
            </LivepeerConfig>
          </div>
        </DisplayBox>
        <DisplayBox
          style={{ minWidth: 200 }}
          className="flex flex-column items-center justify-center gap-2"
        >
          <Text.titleSmall className="tc">DAO Participation</Text.titleSmall>
          <Text.h1 className="tc">
            {((partData?.avgTurnoutRatePercent || 0) * 100).toFixed(1)}%
          </Text.h1>
        </DisplayBox>
      </Grid>
      <DisplayBox className="mb4">
        <Text.h2>Holders Over Time</Text.h2>
        <LineWithBarGraph
          height={400}
          data={sampleHolders["rows"].map((r) => ({
            ...r,
          }))}
          line={{ dataKey: "Holders", name: "Holders" }}
          bar={{ dataKey: "change", name: "Change" }}
          xAxis={{
            label: "Date",
            dataKey: "Date",
            ticks: spacedTimestamps(
              moment(first(sampleHolders["rows"])!.Date).valueOf(),
              moment(last(sampleHolders["rows"])!.Date).valueOf(),
              { every: 1, period: "day" }
            ),
            formatter: (tick) => moment(tick).format("M/D/YY h:mma"),
          }}
          yAxis={{
            label: "Holders",
            minMax: true,
            formatter: (tick) => round(tick, 3),
          }}
        >
          <Tooltip />
        </LineWithBarGraph>
      </DisplayBox>
      <Grid columnGap="0.75rem" gridTemplateColumns="1fr 1fr">
        <DisplayBox className="flex flex-column items-center justify-center gap-2">
          <Text.titleSmall className="tc">
            Twitter Sentitment Score
          </Text.titleSmall>
          <Text.h1 className="tc">
            <span>
              {((0.75 || 0) * 100).toFixed(1)} {getTwitterSenitmentEmoji(0.75)}
            </span>
          </Text.h1>
          <Text.caption>
            Twitter users are posting postively about {fromHardCoded.name}
          </Text.caption>
        </DisplayBox>
        <DisplayBox>
          <BarGraph
            height={300}
            data={sampleGini["rows"]}
            dataKeys={[{ key: "gini", fill: "#0a04c3" }]}
            xAxis={{
              label: "Date",
              dataKey: "date",
              ticks: spacedTimestamps(
                moment(first(sampleGini["rows"])!.date).valueOf(),
                moment(last(sampleGini["rows"])!.date).valueOf(),
                { every: 1, period: "day" }
              ),
              formatter: (tick) => moment(tick).format("M/D/YY h:mma"),
            }}
            yAxis={{
              label: "Gini Coefficient",
              minMax: true,
              formatter: (tick) => round(tick, 3),
            }}
          >
            <Tooltip />
          </BarGraph>
        </DisplayBox>
      </Grid>
    </div>
  );
};

const getTwitterSenitmentEmoji = (score: number) => {
  if (score > 0.9) {
    return "🥳";
  }
  if (score >= 0.75) {
    return "😊";
  }
  if (score >= 0.5) {
    return "😐";
  }
  if (score >= 0.25) {
    return "🫤";
  }
  return "😞";
};

const socialSize = "20px";
const Socials = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Mail className="pointer" fontSize={socialSize} />
      <Telegram className="pointer" fontSize={socialSize} />
      <Twitter className="pointer" fontSize={socialSize} />
      <Discord className="pointer" fontSize={socialSize} />
    </div>
  );
};

type TwitterArgs = {
  skip?: boolean;
  keyword: string;
};
// sentitmentData
const useTwitterData = (args: TwitterArgs) => {
  const [loading, setLoading] = useState(!args.skip);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (args.skip) return;
    // setLoading(true);
    setError(null);
    getTwitterSentitment(args.keyword)
      .then((d) => setData(d))
      .catch(() => setError("Unable to fetch twitter data"))
      .finally(() => setLoading(false));
  }, [setData]);

  return {
    loading,
    error,
    data,
  };
};

// participation data

type PartArgs = {
  skip?: boolean;
  ensAddress: string;
};

const useParticipationData = (args: PartArgs) => {
  const [loading, setLoading] = useState(!args.skip);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SnapResult | null>(null);

  useEffect(() => {
    if (args.skip) return;
    // setLoading(true);
    setError(null);
    getSnapshot(args.ensAddress)
      .then((d) => setData(d))
      .catch(() => setError("Unable to fetch participation data"))
      .finally(() => setLoading(false));
  }, [setData]);

  return {
    loading,
    error,
    data,
  };
};

export default Visuals;
