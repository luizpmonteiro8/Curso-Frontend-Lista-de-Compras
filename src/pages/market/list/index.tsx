/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Market } from "../../../api/model/market";
import { marketService } from "../../../api/services/marketService";
import { toast } from "react-toastify";
import { Container, Title, Wrapper } from "../../../styles-global";
import { CustomButton } from "../../../components/customButton";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/customPagination";
import { CustomTable } from "../../../components/customTable";
import handleAxiosError from "../../../common/util/handleAxiosError";

export const MarketList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [data, setData] = useState<Market[]>([]);

  const formattedAddress = (market: Market) => {
    const address = market.street
      ? market.street +
        "," +
        market.number +
        "," +
        market.neighborhood +
        "," +
        market.city +
        "," +
        market.state
      : "";
    return address;
  };

  const headers = ["ID", "Nome", "Cep", "Endereço"];
  const formattedData: any[][] = data.map((market) => [
    market.id,
    market.name,
    market.zip,
    formattedAddress(market),
  ]);

  useEffect(() => {
    loadData(1);
  }, []);

  const loadData = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await marketService.paginationMarket({
        page: page - 1,
      });
      setData(response.results);
      setCurrentPage(page);
      setLastPage(response.pagination.lastPage);
    } catch (error) {
      console.log(error);
      handleAxiosError(error, "Ocorreu um erro");
    }

    setIsLoading(false);
  };

  const onEdit = (rowIndex: number) => {
    const id = data[rowIndex].id;
    if (!id) return;

    navigate(`/mercado/formulario/${id}`);
  };

  const CustomDelete = ({
    id,
    closeToast,
    onConfirmDelete,
  }: {
    id: number;
    closeToast: () => void;
    onConfirmDelete: (id: number) => Promise<void>;
  }) => {
    return (
      <div>
        <span>Deseja deletar mercado com id: {id}?</span>
        <CustomButton
          color="secondary"
          style={{ marginRight: "15px" }}
          onClick={closeToast}
        >
          Não
        </CustomButton>
        <CustomButton onClick={() => onConfirmDelete(id)}>Sim</CustomButton>
      </div>
    );
  };

  const onConfirmDelete = async (id: number) => {
    try {
      await marketService.removeMarket(id);

      const newMarketList = data.filter((item) => item.id !== id);
      setData(newMarketList);
      toast.dismiss();
      toast.success("Mercado removido com sucesso");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      handleAxiosError(error, "Ocorreu um erro ao remover");
    }
  };

  const onDelete = (rowIndex: number) => {
    const id = data[rowIndex].id;
    if (!id) return;

    toast.dismiss();
    toast.warning(
      <CustomDelete
        id={id}
        closeToast={() => toast.dismiss()}
        onConfirmDelete={onConfirmDelete}
      />,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };

  return (
    <Wrapper>
      <Container>
        <Title>Lista de mercado</Title>
        <CustomButton
          onClick={() => {
            navigate("/mercado/formulario");
          }}
        >
          Cadastrar
        </CustomButton>
      </Container>
      <CustomTable
        headers={headers}
        data={formattedData}
        isLoading={isLoading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {lastPage !== null && lastPage > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={lastPage + 1}
          onPageChange={loadData}
        />
      )}
    </Wrapper>
  );
};
