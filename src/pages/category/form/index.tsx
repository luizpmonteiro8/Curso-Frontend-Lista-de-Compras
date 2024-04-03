import { toast } from "react-toastify";
import { Category } from "../../../api/model/category";
import { categoryService } from "../../../api/services/categoryService";
import { Form } from "./form";
import handleAxiosError from "../../../common/util/handleAxiosError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "../../../components/spinner/styles";
import { Card } from "../../../styles-global";

export const CategoryForm = () => {
  const [category, setCategory] = useState<Category | undefined>(undefined);
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
        const response = await categoryService.getCategoryById(id);
        setCategory(response);
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao buscar o id:" + id);
    }
    setIsLoading(false);
  };

  const onSubmit = async (
    values: Category,
    formOption: { reset: () => void }
  ) => {
    try {
      if (values.id && values.id > 0) {
        await categoryService.updateCategory(values.id!, values);
        toast.success("Alterado com sucesso!");
      } else {
        await categoryService.createCategory(values);
        toast.success("Criado com sucesso!");
      }
      formOption.reset();
    } catch (error) {
      handleAxiosError(error, "Erro ao salvar");
    }
  };

  const resetInitialValues = (values: Category) => {
    setCategory(values);
    navigate("/categoria/formulario");
  };

  return (
    <Card title={id ? "Edição de categoria" : "Cadastro de categoria"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form
          formData={category}
          onSubmit={onSubmit}
          resetInitialValues={resetInitialValues}
        />
      )}
    </Card>
  );
};
