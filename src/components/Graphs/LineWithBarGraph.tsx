import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import LineGradient from "./Gradient";

type Axis<T, X extends keyof T> = {
  dataKey: X;
  type?: "number" | "category";
  label?: string;
  formatter?: (tick: T[X]) => React.ReactNode;
  ticks?: (string | number)[];
  minMax?: boolean;
};

type Chart<T, V extends keyof T> = {
  dataKey: V;
  name?: string;
  unit?: string;
};

type Props<T, X extends keyof T, L extends keyof T, B extends keyof T> = {
  height: string | number;
  data: T[];
  line: Chart<T, L>;
  bar: Chart<T, B> & { size?: number };
  xAxis?: Axis<T, X>;
  yAxis?: Omit<Axis<T, L | B>, "dataKey">;
  children?: React.ReactNode;
};

function LineWithBarGraph<
  T extends Record<string, string | number>,
  X extends keyof T,
  L extends keyof T,
  B extends keyof T
>({ height, line, bar, xAxis, yAxis, data, children }: Props<T, X, L, B>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart
        data={data}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
      >
        <defs>
          <LineGradient id="line-gradient" />
        </defs>
        <CartesianGrid vertical={false} />
        {xAxis && (
          <XAxis
            type={xAxis.type}
            dataKey={xAxis.dataKey as any}
            domain={["dataMin", "dataMax"]}
            tickFormatter={xAxis.formatter as any}
            ticks={xAxis.ticks}
          >
            {xAxis.label && (
              <Label
                value={xAxis.label}
                position="bottom"
                style={{ textAnchor: "middle" }}
              />
            )}
          </XAxis>
        )}
        {yAxis && (
          <YAxis
            type={yAxis.type}
            tickFormatter={yAxis.formatter as any}
            ticks={yAxis.ticks}
            domain={yAxis.minMax ? ["dataMiin", "dataMax"] : undefined}
          >
            {yAxis.label && (
              <Label
                value={yAxis.label}
                position="left"
                angle={-90}
                style={{ textAnchor: "middle" }}
              />
            )}
          </YAxis>
        )}
        <Bar
          isAnimationActive={false}
          dataKey={bar.dataKey as any}
          barSize={bar.size}
          name={bar.name}
          unit={bar.unit}
          fill="#0a04c3"
        />
        <Line
          isAnimationActive={false}
          dataKey={line.dataKey as any}
          name={line.name}
          unit={line.unit}
          dot={false}
          type="natural"
          stroke="url( #line-gradient )"
          strokeWidth="4px"
        />
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default LineWithBarGraph;
