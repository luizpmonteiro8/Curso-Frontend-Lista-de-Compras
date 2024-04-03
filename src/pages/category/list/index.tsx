/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Category } from "../../../api/model/category";
import { categoryService } from "../../../api/services/categoryService";
import { toast } from "react-toastify";
import { Container, Title, Wrapper } from "../../../styles-global";
import { CustomButton } from "../../../components/customButton";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/customPagination";
import { CustomTable } from "../../../components/customTable";
import handleAxiosError from "../../../common/util/handleAxiosError";

export const CategoryList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [data, setData] = useState<Category[]>([]);

  const headers = ["ID", "Nome"];
  const formattedData: any[][] = data.map((category) => [
    category.id,
    category.name,
  ]);

  useEffect(() => {
    loadData(1);
  }, []);

  const loadData = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await categoryService.paginationCategory({
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

    navigate(`/categoria/formulario/${id}`);
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
        <span>Deseja deletar categoria com id: {id}?</span>
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
      await categoryService.removeCategory(id);

      const newCategoryList = data.filter((item) => item.id !== id);
      setData(newCategoryList);
      toast.dismiss();
      toast.success("Categoria removido com sucesso");
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
        <Title>Lista de categoria</Title>
        <CustomButton
          onClick={() => {
            navigate("/categoria/formulario");
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
