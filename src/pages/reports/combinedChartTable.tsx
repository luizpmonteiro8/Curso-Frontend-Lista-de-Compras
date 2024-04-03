import { CustomTable } from "../../components/customTable";
import { BarChart } from "./components/barChart";

interface Props {
  chartData: { month: string; total: number }[];
}

export const CombinedChartTable = ({ chartData }: Props) => {
  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const formattedDate = `${
      monthNames[date.getMonth()+1]
    } de ${date.getFullYear()}`;

    return formattedDate;
  };

  const formattedData = chartData.map((item) => [
    convertDate(item.month),
    item.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
  ]);

  return (
    <>
      <CustomTable headers={["Mês", "Total"]} data={formattedData} />
      <BarChart data={chartData} />
    </>
  );
};
