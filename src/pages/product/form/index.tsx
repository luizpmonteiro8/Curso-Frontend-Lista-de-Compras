import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Product } from "../../../api/model/product";
import { productService } from "../../../api/services/productService";
import handleAxiosError from "../../../common/util/handleAxiosError";
import { Spinner } from "../../../components/spinner/styles";
import { Card } from "../../../styles-global";
import { Form } from "./form";

export const ProductForm = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
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
        const response = await productService.getProductById(id);
        if (response && response.image) {
          const image = await productService.serveImage(response.id!);
          if (image) response.imageFile = image as File;
        }

        setProduct(response);
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao buscar o id:" + id);
    }
    setIsLoading(false);
  };

  const onSubmit = async (
    values: Product,
    formOption: { reset: () => void }
  ) => {
    try {
      if (values.id && values.id > 0) {
        await productService.updateProduct(values.id!, values);
        toast.success("Alterado com sucesso!");
      } else {
        await productService.createProduct(values);
        toast.success("Criado com sucesso!");
        /*  for (let index = 0; index < 200; index++) {
          await productService.createProduct({
            ...values,
            name: values.name + index,
          });
        } */
      }
      formOption.reset();
    } catch (error) {
      handleAxiosError(error, "Erro ao salvar");
    }
  };

  const resetInitialValues = (values: Product) => {
    setProduct(values);
    navigate("/produto/formulario");
  };

  return (
    <Card title={id ? "Edição de produto" : "Cadastro de produto"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form
          formData={product}
          onSubmit={onSubmit}
          resetInitialValues={resetInitialValues}
        />
      )}
    </Card>
  );
};
