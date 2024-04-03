import { useFormik } from "formik";
import { useRef } from "react";
import { Market } from "../../../api/model/market";
import { getAddressViaCep } from "../../../api/services/viaCepService";
import { cepMask } from "../../../common/util/cepMask";
import handleAxiosError from "../../../common/util/handleAxiosError";
import { CustomButton } from "../../../components/customButton";
import { CustomInput } from "../../../components/customInput";
import { ButtonRightLine } from "../../../styles-global";
import { schema } from "./validation";

interface Props {
  formData: Market | undefined;
  onSubmit: (values: Market, formOption: { reset: () => void }) => void;
  resetInitialValues: (values: Market) => void;
}

const initialValues: Market = {
  id: 0,
  name: "",
  zip: "",
  street: "",
  number: "",
  neighborhood: "",
  state: "",
  city: "",
};

export const Form = ({ formData, onSubmit, resetInitialValues }: Props) => {
  const numberRef = useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues: { ...initialValues, ...formData },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, { reset: resetForm });
    },
  });

  const checkZipCode = async (zip: string) => {
    try {
      const address = await getAddressViaCep(zip);

      if (address) {
        formik.setFieldValue("street", address.logradouro);
        formik.setFieldValue("neighborhood", address.bairro);
        formik.setFieldValue("city", address.localidade);
        formik.setFieldValue("state", address.uf);

        if (numberRef.current) {
          numberRef.current.focus();
        }
      }
    } catch (error) {
      handleAxiosError(error, "Erro ao verificar o cep.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomInput
        id="name"
        name="name"
        label="Nome"
        value={formik.values.name}
        placeholder="Digite o nome"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name ? formik.errors.name : ""}
      />

      <CustomInput
        id="zip"
        name="zip"
        label="Cep"
        autoComplete="off" //remover
        value={cepMask(formik.values.zip || "")}
        placeholder="Digite o cep"
        onChange={(e) => {
          formik.handleChange(e);
          const value = e.target.value;
          if (value.length == 9) {
            checkZipCode(value);
          }
        }}
        onBlur={formik.handleBlur}
        error={formik.touched.zip ? formik.errors.zip : ""}
      />

      <CustomInput
        id="street"
        name="street"
        label="Rua"
        value={formik.values.street || ""}
        placeholder="Digite a rua"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.street ? formik.errors.street : ""}
      />

      <CustomInput
        id="number"
        name="number"
        label="Número"
        customRef={numberRef}
        value={formik.values.number || ""}
        placeholder="Digite o número"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.number ? formik.errors.number : ""}
      />

      <CustomInput
        id="neighborhood"
        name="neighborhood"
        label="Bairro"
        value={formik.values.neighborhood || ""}
        placeholder="Digite o bairro"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.neighborhood ? formik.errors.neighborhood : ""}
      />

      <CustomInput
        id="city"
        name="city"
        label="Bairro"
        value={formik.values.city || ""}
        placeholder="Digite a cidade"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.city ? formik.errors.city : ""}
      />

      <CustomInput
        id="state"
        name="state"
        label="Estado"
        value={formik.values.state || ""}
        placeholder="Digite a estado"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.state ? formik.errors.state : ""}
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
