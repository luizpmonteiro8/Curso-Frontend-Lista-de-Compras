import handleAxiosError from "../../common/util/handleAxiosError";
import { useState } from "react";
import ReportModel from "../../api/model/report";
import { Form, FormData } from "./form";
import reportService from "../../api/services/reportService";
import { CombinedChartTable } from "./combinedChartTable";

export const ReportsForm = () => {
  const [data, setData] = useState<ReportModel[] | undefined>(undefined);
  const [total, setTotal] = useState(0);

  const onSubmit = async (data: FormData) => {
    try {
      if (data.type === "Mercado") {
        const result = await reportService.marketReport(
          data.marketId!,
          data.dateStart,
          data.dateEnd
        );
        const dataFormatted = [];

        const monthlyTotal = result.monthlyTotal;

        for (const month in monthlyTotal) {
          const total = monthlyTotal[month];
          dataFormatted.push({
            month,
            total,
          });
        }

        setData(dataFormatted);
        setTotal(result.totalItems);
      } else {
        const result = await reportService.productReport(
          data.productId!,
          data.dateStart,
          data.dateEnd
        );
        const dataFormatted = [];

        const monthlyTotal = result.monthlyTotal;

        for (const month in monthlyTotal) {
          const total = monthlyTotal[month];
          dataFormatted.push({
            month,
            total,
          });
        }

        setData(dataFormatted);
        setTotal(result.totalItems);
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao salvar");
    }
  };

  console.log(data);

  const resetInitialValues = () => {
    setData(undefined);
    setTotal(0);
  };

  return (
    <div>
      <h1>Relatórios</h1>
      <Form resetInitialValues={resetInitialValues} onSubmit={onSubmit} />
      {data && data.length > 0 && total && total > 0 && (
        <h1>Total de registros: {total}</h1>
      )}
      {data && data.length > 0 && total && total > 0 && (
        <CombinedChartTable chartData={data}></CombinedChartTable>
      )}
    </div>
  );
};
