import { Button, Tag } from "@web3uikit/core";
import { useParams } from "react-router-dom";
import DisplayBox from "../components/DisplayBox";
import ErrorPage from "../components/ErrorPage";
import { Grid } from "../components/Grid";
import Text from "../components/Text";
import { hardcodedLookup } from "../hardcoded";
import idk from "../../gini_coeff_6_months_APECOIN.json";
import LineGraph from "../components/Graphs/LineGraph";
import spacedTimestamps from "../components/Graphs/spacedTimestamps";
import moment from "moment";
import { first, last, round } from "lodash";
import BarGraph from "../components/Graphs/BarGraph";
import holders from "../../holders_over_time_Gnosis.json";
import LineWithBarGraph from "../components/Graphs/LineWithBarGraph";
import { Tooltip } from "recharts";

const Visuals = () => {
  const { id: governanceContractAddress } = useParams<{ id: string }>();

  const fromHardCoded =
    governanceContractAddress && hardcodedLookup[governanceContractAddress];

  if (!fromHardCoded) {
    return <ErrorPage code={404} message="Page not found" />;
  }

  const giniData = idk["rows"];

  return (
    <div className="mt3">
      <Grid
        justifyContent="space-between"
        columnGap="0.75rem"
        gridTemplateColumns="1fr 200px"
        className="mb4"
      >
        <DisplayBox className="flex flex-row items-center justify-between">
          <Text.h2>{fromHardCoded.name}</Text.h2>
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
      <Grid className="mb4" columnGap="0.75rem" gridTemplateColumns="800px 1fr">
        <DisplayBox className="flex flex-column gap-3">
          <div>
            <Text.h3 className="mb2">About:</Text.h3>
            <Text.bodySmall>{fromHardCoded.about}</Text.bodySmall>
          </div>
        </DisplayBox>
        <DisplayBox>
          <Text.h2>Live Peer Video</Text.h2>
        </DisplayBox>
      </Grid>
      <Grid columnGap="0.75rem" gridTemplateColumns="1fr 1fr">
        <DisplayBox>
          <BarGraph
            height={300}
            data={idk["rows"]}
            dataKeys={[{ key: "gini", fill: "#8884d8" }]}
            xAxis={{
              label: "Date",
              dataKey: "date",
              ticks: spacedTimestamps(
                moment(first(idk["rows"])!.date).valueOf(),
                moment(last(idk["rows"])!.date).valueOf(),
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
        <DisplayBox>
          <LineWithBarGraph
            height={300}
            data={holders["rows"]}
            line={{ dataKey: "Holders", name: "Holders" }}
            bar={{ dataKey: "change", name: "Change" }}
            xAxis={{
              label: "Date",
              dataKey: "Date",
              ticks: spacedTimestamps(
                moment(first(holders["rows"])!.Date).valueOf(),
                moment(last(holders["rows"])!.Date).valueOf(),
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
          </LineWithBarGraph>
        </DisplayBox>
      </Grid>
    </div>
  );
};

export default Visuals;
