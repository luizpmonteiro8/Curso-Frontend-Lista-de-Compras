import * as yup from "yup";

export const productSchema = yup.object({
  quantity: yup
    .number()
    .required("Quantidade obrigatória")
    .positive("Quantidade obrigatória"),
  addInCart: yup.boolean(),
  productId: yup
    .number()
    .required("Produto obrigatório")
    .positive("Produto obrigatório"),
  priceUnit: yup.number().nullable(),
});

export const schema = yup.object({
  date: yup.date().required("Data obrigatório"),
  marketId: yup
    .number()
    .positive("Mercado obrigatório")
    .required("Mercado obrigatório"),
  total: yup.number().nullable(),
  products: yup.array().of(productSchema),
});
