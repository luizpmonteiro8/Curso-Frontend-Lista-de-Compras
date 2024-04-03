import { useFormik } from "formik";
import { useState } from "react";
import ReactSelect from "react-select";
import { PaginationParams } from "../../api/model/pagination";
import { marketService } from "../../api/services/marketService";
import { productService } from "../../api/services/productService";
import { CustomButton } from "../../components/customButton";
import { CustomDropDownPaginated } from "../../components/customDropDownPaginated";
import { CustomInput } from "../../components/customInput";
import { ButtonRightLine } from "../../styles-global";
import { schema } from "./validation";

interface Props {
  onSubmit: (values: FormData, formOption: { reset: () => void }) => void;
  resetInitialValues: (values: FormData) => void;
}

export interface FormData {
  type: "Produto" | "Mercado";
  productId?: number;
  marketId?: number;
  dateStart: string;
  dateEnd: string;
}

const initialValues: FormData = {
  type: "Mercado",
  productId: undefined,
  marketId: undefined,
  dateStart: "",
  dateEnd: "",
};

export const Form = ({ onSubmit, resetInitialValues }: Props) => {
  const [itemSelected, setItemSelected] = useState<{
    value: number;
    label: string;
  }>({ value: 0, label: "Selecione" });

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, { reset: resetForm });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Tipo</label>
      <ReactSelect
        value={{ label: formik.values.type }}
        styles={{
          option: (baseStyles) => ({
            ...baseStyles,
            color: "black",
            backgroundColor: "white",
          }),
        }}
        onChange={(e) => {
          formik.setFieldValue("type", e?.label);
          setItemSelected({ value: 0, label: "Selecione" });
        }}
        options={[{ label: "Produto" }, { label: "Mercado" }]}
      />

      {formik.values.type === "Mercado" && (
        <>
          <CustomDropDownPaginated
            label="Mercado"
            renderProductImage={false}
            value={itemSelected}
            onChange={async (selectedOption) => {
              formik.setFieldValue("marketId", selectedOption);
              const market = await marketService.getMarketById(
                selectedOption as number
              );
              if (!market) return;
              setItemSelected({
                value: selectedOption as number,
                label: market.name,
              });
            }}
            error={formik.touched.marketId ? formik.errors.marketId : ""}
            loadServicePagination={(params?: PaginationParams) =>
              marketService.paginationMarket(params)
            }
          />
        </>
      )}

      {formik.values.type == "Produto" && (
        <>
          <CustomDropDownPaginated
            label="Produto"
            renderProductImage={true}
            value={itemSelected}
            onChange={async (selectedOption) => {
              formik.setFieldValue("productId", selectedOption);
              const product = await productService.getProductById(
                selectedOption as number
              );
              if (!product) return;
              setItemSelected({
                value: selectedOption as number,
                label: product.name,
              });
            }}
            error={formik.touched.productId ? formik.errors.productId : ""}
            loadServicePagination={(params?: PaginationParams) =>
              productService.paginationProduct(params)
            }
          />
        </>
      )}

      <CustomInput
        type="date"
        id="dateStart"
        name="dateStart"
        label="Data inicial"
        value={formik.values.dateStart}
        onChange={formik.handleChange}
        error={formik.touched.dateStart ? formik.errors.dateStart : ""}
      />

      <CustomInput
        type="date"
        id="dateEnd"
        name="dateEnd"
        label="Data final"
        value={formik.values.dateEnd}
        onChange={formik.handleChange}
        error={formik.touched.dateEnd ? formik.errors.dateEnd : ""}
      />

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
        <CustomButton>Enviar</CustomButton>
      </ButtonRightLine>
    </form>
  );
};
