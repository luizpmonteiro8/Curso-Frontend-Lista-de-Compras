/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Bar,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../../theme";

interface Props {
  data: {
    month: string;
    total: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const monthString = (label as string).split("-");
    return (
      <div
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <p
          style={{
            color: theme.colors.text,
          }}
        >
          Mês e ano:{monthString[1] + "-" + monthString[0]}
        </p>
        Total:
        <p style={{ color: theme.colors.text }}>
          {payload[0].value?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    );
  }

  return null;
};

export const BarChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="total" fill={theme.colors.secondary} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
