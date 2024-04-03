import { toast } from "react-toastify";
import { ShoppingList } from "../../../api/model/shoppingList";
import { shoppingListService } from "../../../api/services/shoppingListService";
import { Form } from "./form";
import handleAxiosError from "../../../common/util/handleAxiosError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "../../../components/spinner/styles";
import { Card } from "../../../styles-global";

export const ShoppingListForm = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingList | undefined>(
    undefined
  );
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
        const response = await shoppingListService.getShoppingListById(id);
        setShoppingList(response);
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao buscar o id:" + id);
    }
    setIsLoading(false);
  };

  const onSubmit = async (
    values: ShoppingList,
    formOption: { reset: () => void }
  ) => {
    try {
      if (values.id && values.id > 0) {
        await shoppingListService.updateShoppingList(values.id!, values);
        toast.success("Alterado com sucesso!");
      } else {
        await shoppingListService.createShoppingList(values);
        toast.success("Criado com sucesso!");
      }
      formOption.reset();
    } catch (error) {
      handleAxiosError(error, "Erro ao salvar");
    }
  };

  const resetInitialValues = (values: ShoppingList) => {
    setShoppingList(values);
    navigate("/compra/formulario");
  };

  return (
    <Card title={id ? "Edição de compra" : "Cadastro de compra"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form
          formData={shoppingList}
          onSubmit={onSubmit}
          resetInitialValues={resetInitialValues}
        />
      )}
    </Card>
  );
};
