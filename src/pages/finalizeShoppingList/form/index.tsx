import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingList } from "../../../api/model/shoppingList";
import { shoppingListService } from "../../../api/services/shoppingListService";
import handleAxiosError from "../../../common/util/handleAxiosError";
import { Spinner } from "../../../components/spinner/styles";
import { DivLine, Title } from "../../../styles-global";
import { Form } from "./form";

export const FinalizeShoppingListForm = () => {
  const [finalizeShoppingList, setFinalizeShoppingList] = useState<
    ShoppingList | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

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
        setFinalizeShoppingList(response);
        setIsLoading(false);
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao buscar o id:" + id);
      setIsLoading(false);
    }
  };

  const onSaveChange = async (values: ShoppingList) => {
    setIsSaving(true);
    try {
      if (values.id && values.id > 0) {
        await shoppingListService.updateShoppingList(values.id!, values);
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao salvar");
    }
    setIsSaving(false);
  };

  return (
    <div>
      <DivLine>
        <Title>Finalizar compra</Title>
        {isSaving && <Spinner />}
      </DivLine>
      <small>Mercado: {finalizeShoppingList?.market?.name}</small>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form formData={finalizeShoppingList} onSaveChange={onSaveChange} />
      )}
      <div id="footer" style={{ height: "100px" }}></div>
    </div>
  );
};
