import { useFormik } from "formik";
import { Product } from "../../../api/model/product";
import { categoryService } from "../../../api/services/categoryService";
import { CustomButton } from "../../../components/customButton";
import { CustomDropDownPaginated } from "../../../components/customDropDownPaginated";
import { CustomInput } from "../../../components/customInput";
import { ButtonRightLine } from "../../../styles-global";
import { schema } from "./validation";

interface Props {
  formData: Product | undefined;
  onSubmit: (values: Product, formOption: { reset: () => void }) => void;
  resetInitialValues: (values: Product) => void;
}

const initialValues: Product = {
  id: 0,
  name: "",
  image: "",
  imageFile: undefined,
  categoryId: 0,
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

      {formik.values.imageFile && (
        <img
          src={URL.createObjectURL(formik.values.imageFile as File)}
          width={200}
          height={200}
          alt="Imagem do produto"
          style={{ objectFit: "contain" }}
        />
      )}

      <CustomInput
        id="image"
        name="image"
        label="Imagem"
        type="file"
        value=""
        onBlur={formik.handleBlur}
        onChange={(e) => {
          const imageFile = e.target.files;
          formik.handleChange(e);

          if (imageFile) {
            formik.setFieldValue("imageFile", imageFile[0]);
          }
        }}
        error={formik.touched.imageFile ? formik.errors.imageFile : ""}
      />

      <CustomDropDownPaginated
        label="Categoria"
        loadServicePagination={categoryService.paginationCategory}
        value={
          formik.values.category
            ? {
                value: formik.values.category.id!,
                label: formik.values.category.name,
              }
            : undefined
        }
        onChange={async (e) => {
          const category = await categoryService.getCategoryById(e as number);
          if (!category) return;
          formik.setFieldValue("category", category);
          formik.setFieldValue("categoryId", category.id);
        }}
        error={formik.errors.categoryId}
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
