import { FormikErrors, useFormik } from "formik";

import { PaginationParams } from "../../../api/model/pagination";
import { Product } from "../../../api/model/product";
import {
  ProductShoppingList,
  ShoppingList,
} from "../../../api/model/shoppingList";
import { marketService } from "../../../api/services/marketService";
import { productService } from "../../../api/services/productService";
import { CustomButton } from "../../../components/customButton";
import { CustomDropDownPaginated } from "../../../components/customDropDownPaginated";
import { CustomInput } from "../../../components/customInput";
import { ButtonRightLine, Card, DivLine } from "../../../styles-global";
import { schema } from "./validation";

interface Props {
  formData: ShoppingList | undefined;
  onSubmit: (values: ShoppingList, formOption: { reset: () => void }) => void;
  resetInitialValues: (values: ShoppingList) => void;
}

const initialValuesProduct: ProductShoppingList = {
  quantity: 0,
  productId: 0,
  priceUnit: 0,
  addInCart: false,
  product: { id: 0, name: "", categoryId: 0 },
};

const initialValues: ShoppingList = {
  id: 0,
  date: new Date(),
  total: 0,
  products: [initialValuesProduct],
  marketId: 0,
  market: {
    id: 0,
    name: "",
  },
};

export const Form = ({ formData, onSubmit, resetInitialValues }: Props) => {
  const formik = useFormik({
    initialValues: { ...initialValues, ...formData },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, { reset: resetForm });
    },
  });

  const formatDate = (date: Date | undefined) => {
    if (!date) date = new Date();
    const d = new Date(date);
    //correcao fuso horario
    d.setHours(d.getHours() + 3);

    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");

    //yyyy-mm-dd
    return `${d.getFullYear()}-${month}-${day}`;
  };

  console.log(formik.errors);

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomInput
        id="date"
        name="date"
        label="Data"
        type="date"
        value={formatDate(formik.values.date)}
        placeholder="Digite a data"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.date ? formik.errors.date : ""}
      />

      <CustomDropDownPaginated
        label="Mercado"
        value={
          formik.values.marketId == 0
            ? { value: 0, label: "Selecione" }
            : {
                value: formik.values.marketId,
                label: formik.values.market!.name,
              }
        }
        onChange={async (id) => {
          formik.setFieldValue("marketId", id);
          const market = await marketService.getMarketById(id as number);
          formik.setFieldValue("market", market);
        }}
        loadServicePagination={(params?: PaginationParams) =>
          marketService.paginationMarket(params)
        }
        error={formik.touched.market ? formik.errors.marketId : ""}
      />

      <DivLine>
        <p>Total itens: {formik.values.products.length}</p>
        <CustomButton
          type="button"
          color="primary"
          onClick={() => {
            formik.setFieldValue("products", [
              ...formik.values.products,
              { ...initialValuesProduct },
            ]);
          }}
        >
          Adicionar
        </CustomButton>
      </DivLine>

      {formik.values.products
        .slice()
        .reverse()
        .map((product, index) => {
          const reversedIndex = formik.values.products.length - 1 - index;

          return (
            <Card key={index} title="">
              <CustomDropDownPaginated
                label={"Produto" + (index + 1).toString()}
                value={
                  product.productId == 0
                    ? { value: 0, label: "Selecione" }
                    : { value: product.productId, label: product.product!.name }
                }
                loadServicePagination={(params?: PaginationParams) =>
                  productService.paginationProduct(params)
                }
                renderProductImage={true}
                onChange={async (id) => {
                  const productResult: Product =
                    (await productService.getProductById(
                      id as number
                    )) as Product;

                  const newProductList = [...formik.values.products];
                  newProductList[reversedIndex] = {
                    ...newProductList[reversedIndex],
                    product: productResult,
                    productId: id as number,
                  };
                  formik.setFieldValue("products", newProductList);
                }}
                error={
                  formik.touched.products &&
                  formik.touched.products[reversedIndex] &&
                  formik.errors.products &&
                  formik.errors.products[reversedIndex] &&
                  (
                    formik.errors.products[
                      reversedIndex
                    ] as FormikErrors<ProductShoppingList>
                  ).productId
                    ? "Campo obrigatório"
                    : ""
                }
              ></CustomDropDownPaginated>

              <CustomInput
                id={`product[${index}]-quantity`}
                name={`product[${index}]-quantity`}
                label="Quantidade"
                type="number"
                placeholder="Digite a quantidade"
                onBlur={formik.handleBlur}
                value={product.quantity.toString()}
                /* autoFocus */
                onChange={(e) => {
                  const newProductList = [...formik.values.products];
                  newProductList[reversedIndex] = {
                    ...newProductList[reversedIndex],
                    quantity: parseInt(e.target.value),
                  };
                  formik.setFieldValue("products", newProductList);
                }}
                error={
                  formik.touched.products &&
                  formik.touched.products[reversedIndex] &&
                  formik.errors.products &&
                  formik.errors.products[reversedIndex] &&
                  (
                    formik.errors.products[
                      reversedIndex
                    ] as FormikErrors<ProductShoppingList>
                  ).quantity
                    ? "Campo obrigatório"
                    : ""
                }
              />

              <CustomButton
                type="button"
                color="secondary"
                onClick={() => {
                  const newProductList = [...formik.values.products];
                  newProductList.splice(reversedIndex, 1);
                  formik.setFieldValue("products", newProductList);
                }}
              >
                Remover
              </CustomButton>
            </Card>
          );
        })}

      <ButtonRightLine>
        <CustomButton
          type="reset"
          color="secondary"
          style={{ marginRight: "15px" }}
          onClick={() => {
            resetInitialValues(initialValues);
            formik.resetForm();
          }}
        >
          Limpar
        </CustomButton>
        <CustomButton type="submit">Enviar</CustomButton>
      </ButtonRightLine>
    </form>
  );
};
