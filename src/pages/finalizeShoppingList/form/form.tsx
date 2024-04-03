import { FormikErrors, useFormik } from "formik";
import {
  ProductShoppingList,
  ShoppingList,
} from "../../../api/model/shoppingList";
import CustomCheckbox from "../../../components/customCheckBox";
import { CustomInput } from "../../../components/customInput";
import {
  ContainerBottomTotal,
  ContainerShoppingItems,
  ContainerShoppingPrice,
  DivLine,
  ProductTitle,
  Wrapper,
} from "./styles";
import { schema } from "./validation";

interface Props {
  formData: ShoppingList | undefined;
  onSaveChange: (values: ShoppingList) => void;
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

export const Form = ({ formData, onSaveChange }: Props) => {
  const formik = useFormik({
    initialValues: { ...initialValues, ...formData },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSaveChange(values);
    },
  });

  const total =
    formik.values.products
      .map((product) =>
        product.addInCart ? product.quantity * product.priceUnit : 0
      )
      .reduce((a, b) => a + b, 0) ?? 0;

  return (
    <Wrapper>
      <ContainerShoppingItems>
        {formik.values.products.map(
          (product, index) =>
            product.id && (
              <div key={product.id}>
                <ProductTitle>{product.product?.name}</ProductTitle>
                <DivLine>
                  <CustomInput
                    id="quantity"
                    name="quantity"
                    label="Quantidade"
                    value={product.quantity.toString()}
                    onChange={() => {}}
                    placeholder="Quantidade"
                    type="number"
                    error={
                      formik.touched.products &&
                      formik.touched.products[index] &&
                      formik.errors.products &&
                      (
                        formik.errors.products[
                          index
                        ] as FormikErrors<ProductShoppingList>
                      )?.quantity
                        ? "Campo obrigatório"
                        : ""
                    }
                  />

                  <p style={{ marginRight: "15px" }} />

                  <CustomInput
                    id="priceUnit"
                    name="priceUnit"
                    label="Preço unitário"
                    value={product.priceUnit.toString()}
                    onChange={(e) => {
                      const newProductList = [...formik.values.products];
                      newProductList[index] = {
                        ...newProductList[index],
                        priceUnit: parseInt(e.target.value),
                      };
                      formik.setFieldValue("products", newProductList);
                    }}
                    placeholder="Preço unitário"
                    type="number"
                    error={
                      formik.touched.products &&
                      formik.touched.products[index] &&
                      formik.errors.products &&
                      (
                        formik.errors.products[
                          index
                        ] as FormikErrors<ProductShoppingList>
                      )?.quantity
                        ? "Campo obrigatório"
                        : ""
                    }
                  />
                </DivLine>
                <CustomCheckbox
                  label="Adicionar no carrinho"
                  checked={product.addInCart}
                  onChange={() => {
                    const newProductList = [...formik.values.products];
                    newProductList[index] = {
                      ...newProductList[index],
                      addInCart: !product.addInCart,
                    };
                    formik.setFieldValue("products", newProductList);
                    onSaveChange({
                      ...formik.values,
                      products: newProductList,
                    });
                  }}
                />
              </div>
            )
        )}
      </ContainerShoppingItems>
      <ContainerShoppingPrice>
        {formik.values.products.map(
          (product, index) =>
            product.id &&
            product.addInCart && (
              <div key={"finalize" + product.id}>
                <p>Nome:{product.product?.name}</p>
                <p>Quantidade:{product.quantity}</p>
                <p>
                  Preço unitário:{" "}
                  {product.priceUnit.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  {/* {product.priceUnit.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })} */}
                </p>
                <p>
                  Ultimo valor:
                  {product.product?.priceLast?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p>
                  Total:
                  {(product.quantity * (product.priceUnit ?? 0)).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </p>
                {index < formik.values.products.length - 1 && <hr />}
              </div>
            )
        )}
      </ContainerShoppingPrice>
      <ContainerBottomTotal>
        Total:
        {total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </ContainerBottomTotal>
    </Wrapper>
  );
};
