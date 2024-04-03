import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Market } from "../../../api/model/market";
import { marketService } from "../../../api/services/marketService";
import handleAxiosError from "../../../common/util/handleAxiosError";
import { Spinner } from "../../../components/spinner/styles";
import { Card } from "../../../styles-global";
import { Form } from "./form";

export const MarketForm = () => {
  const [market, setMarket] = useState<Market | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const response = await marketService.getMarketById(id);
        setMarket(response);
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao buscar o id:" + id);
    }
    setIsLoading(false);
  };

  const onSubmit = async (
    values: Market,
    formOption: { reset: () => void }
  ) => {
    try {
      if (values.id && values.id > 0) {
        await marketService.updateMarket(values.id!, values);
        toast.success("Alterado com sucesso!");
      } else {
        await marketService.createMarket(values);
        toast.success("Criado com sucesso!");
      }
      formOption.reset();
    } catch (error) {
      handleAxiosError(error, "Erro ao salvar");
    }
  };

  const resetInitialValues = (values: Market) => {
    setMarket(values);
    navigate("/mercado/formulario");
  };

  return (
    <Card title={id ? "Edição de mercado" : "Cadastro de mercado"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form
          formData={market}
          onSubmit={onSubmit}
          resetInitialValues={resetInitialValues}
        />
      )}
    </Card>
  );
};
