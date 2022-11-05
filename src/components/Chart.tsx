import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Line,
} from "recharts";
import moment from "moment";

export const generateXTicks = ({
  startTime,
  endTime,
  spacing: { every, period },
}: any) => {
  const firstMoment = moment(startTime);
  const firstTick = firstMoment.clone().startOf(period).add(1, period);

  const ticks = [firstTick.valueOf()];

  while (ticks[ticks.length - 1] < endTime) {
    let currentTick = ticks[ticks.length - 1];
    let nextTick = moment(currentTick).add(every, period).valueOf();
    if (nextTick > endTime) break;
    ticks.push(nextTick);
  }

  return ticks;
};

const formatTimestamp = (tick: any, format: any) => moment(tick).format(format);
const Chart = ({ data }: any) => {
  const timestampFormat = "DD/MM/YYYY HH:mm";
  const xTickFormat = "Do MMM 'YY";

  const startTime = data[0].time;
  const endTime = data[data.length - 1].time;
  const xTickSpacing = { every: 1, period: "day" };

  const xTicks = generateXTicks({ startTime, endTime, spacing: xTickSpacing });
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
      >
        <defs>
          <linearGradient id="temperature" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#540d6e" />
            <stop offset="25%" stopColor="#c14bbb" />
            <stop offset="50%" stopColor="#ff0000" />
            <stop offset="75%" stopColor="#ff8317" />
            <stop offset="100%" stopColor="#ffdd21" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          type="number"
          dataKey="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(tick) => formatTimestamp(tick, xTickFormat)}
          ticks={xTicks}
        >
          <Label
            value={"Time"}
            position="bottom"
            style={{ textAnchor: "middle" }}
          />
        </XAxis>
        <YAxis>
          <Label
            value={"Temperature (°C)"}
            position="left"
            angle={-90}
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip
          labelFormatter={(tick) => formatTimestamp(tick, timestampFormat)}
        />
        <Line
          dataKey="temperature"
          name="Temperature"
          unit={"°C"}
          dot={false}
          type={"natural"}
          stroke="url(#temperature)"
          strokeWidth="4px"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
