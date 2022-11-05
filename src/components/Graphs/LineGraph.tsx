import React from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
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
};

type LineGraphProps<T, X extends keyof T, Y extends keyof T> = {
  name?: string;
  height: string | number;
  data: T[];
  dataKey: Y;
  xAxis?: Axis<T, X>;
  yAxis?: Omit<Axis<T, Y>, "dataKey">;
  unit?: string;
  children?: React.ReactNode;
};

function LineGraph<
  T extends Record<string, string | number>,
  X extends keyof T,
  Y extends keyof T
>({
  height,
  dataKey,
  xAxis,
  yAxis,
  data,
  name,
  unit,
  children,
}: LineGraphProps<T, X, Y>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
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
        <Line
          dataKey={dataKey as any}
          name={name}
          unit={unit}
          dot={false}
          type="natural"
          stroke="url( #line-gradient )"
          strokeWidth="4px"
        />
        {children}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
