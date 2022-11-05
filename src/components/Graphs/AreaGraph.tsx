import React from "react";
import {
  Area,
  AreaChart,
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
};

type AreaGraphProps<T, X extends keyof T, Y extends keyof T> = {
  name?: string;
  height: string | number;
  data: T[];
  dataKey: Y;
  xAxis?: Axis<T, X>;
  yAxis?: Omit<Axis<T, Y>, "dataKey">;
  unit?: string;
  children?: React.ReactNode;
};

function AreaGraph<
  T extends Record<string, string | number>,
  X extends keyof T,
  Y extends keyof T
>({
  data,
  height,
  dataKey,
  xAxis,
  yAxis,
  unit,
  children,
}: AreaGraphProps<T, X, Y>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
        <Area
          type="monotone"
          dataKey={dataKey as any}
          stroke="#8884d8"
          fill="#8884d8"
          unit={unit}
        />
        {children}
      </AreaChart>
    </ResponsiveContainer>
  );
}
