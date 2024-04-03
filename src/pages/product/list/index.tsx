/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Product } from "../../../api/model/product";
import { productService } from "../../../api/services/productService";
import handleAxiosError from "../../../common/util/handleAxiosError";
import { CustomButton } from "../../../components/customButton";
import CustomPagination from "../../../components/customPagination";
import { CustomTable } from "../../../components/customTable";
import { Container, Title, Wrapper } from "../../../styles-global";
import { Image } from "./styles";

export const ProductList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [data, setData] = useState<Product[]>([]);

  const headers = ["ID", "Image", "Nome", "Categoria"];
  console.log(data);

  const formattedData: any[][] = data.map((product) => [
    product.id,
    product.image ? (
      <Image
        src={
          product.imageFile
            ? URL.createObjectURL(product.imageFile as File)
            : ""
        }
        alt="Imagem do produto"
        width={250}
        height={250}
        loading="lazy"
      />
    ) : (
      ""
    ),
    product.name,
    product.category && product.category.name,
  ]);

  useEffect(() => {
    loadData(1);
  }, []);

  const loadData = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await productService.paginationProduct({
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

    navigate(`/produto/formulario/${id}`);
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
        <span>Deseja deletar produto com id: {id}?</span>
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
      await productService.removeProduct(id);

      const newProductList = data.filter((item) => item.id !== id);
      setData(newProductList);
      toast.dismiss();
      toast.success("Produto removido com sucesso");
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
        <Title>Lista de produto</Title>
        <CustomButton
          onClick={() => {
            navigate("/produto/formulario");
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
