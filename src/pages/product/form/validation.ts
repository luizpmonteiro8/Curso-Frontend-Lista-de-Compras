import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  categoryId: yup
    .number()
    .required("Categoria obrigatória")
    .positive("Categoria obrigatória"),
});
