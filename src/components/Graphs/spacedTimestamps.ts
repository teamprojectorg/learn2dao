import moment from "moment";

type Opts = {
  every: number;
  period: "day" | "week" | "month" | "year";
};

const spacedTimestamps = (startTime: number, endTime: number, opts: Opts) => {
  const firstMoment = moment(startTime);
  const firstTick = firstMoment
    .clone()
    .startOf(opts.period)
    .add(1, opts.period);

  const ticks = [firstTick.valueOf()];

  while (ticks[ticks.length - 1] < endTime) {
    let currentTick = ticks[ticks.length - 1];
    let nextTick = moment(currentTick).add(opts.every, opts.period).valueOf();
    if (nextTick > endTime) break;
    ticks.push(nextTick);
  }

  return ticks;
};

export default spacedTimestamps;
