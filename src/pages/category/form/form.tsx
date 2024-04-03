import { useFormik } from "formik";
import { Category } from "../../../api/model/category";
import { CustomInput } from "../../../components/customInput";
import { CustomButton } from "../../../components/customButton";
import { ButtonRightLine } from "../../../styles-global";
import { schema } from "./validation";

interface Props {
  formData: Category | undefined;
  onSubmit: (values: Category, formOption: { reset: () => void }) => void;
  resetInitialValues: (values: Category) => void;
}

const initialValues: Category = {
  id: 0,
  name: "",
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
