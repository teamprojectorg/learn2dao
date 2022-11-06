import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type Axis<T, X extends keyof T> = {
  dataKey: X;
  type?: "number" | "category";
  label?: string;
  formatter?: (tick: T[X]) => React.ReactNode;
  ticks?: (string | number)[];
  minMax?: boolean;
};

type BarGraphProps<T, X extends keyof T, Y extends keyof T> = {
  name?: string;
  height: number;
  data: T[];
  dataKeys: { fill: string; key: Y; name?: string; unit?: string }[];
  xAxis?: Axis<T, X>;
  yAxis?: Omit<Axis<T, Y>, "dataKey">;
  children?: React.ReactNode;
};

function BarGraph<
  T extends Record<string, string | number>,
  X extends keyof T,
  Y extends keyof T
>({ height, data, dataKeys, xAxis, yAxis, children }: BarGraphProps<T, X, Y>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
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
            domain={yAxis.minMax ? ["dataMin", "dataMax"] : undefined}
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
        {children}
        {dataKeys.map((k) => (
          <Bar
            key={k.key as any}
            dataKey={k.key as any}
            fill={k.fill}
            unit={k.unit}
            name={k.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarGraph;
