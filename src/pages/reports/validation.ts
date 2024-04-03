import * as yup from "yup";

export const schema = yup.object({
  type: yup.string().required("Tipo obrigatório"),
  productId: yup
    .number()
    .nullable()
    .when("type", {
      is: "Produto",
      then: (schema) => schema.required("Produto obrigatório"),
    }),
  marketId: yup
    .number()
    .nullable()
    .when("type", {
      is: "Mercado",
      then: (schema) => schema.required("Mercado obrigatório"),
    }),
  dateStart: yup
    .string()
    /*  .required() */
    .test({
      test: function (value) {
        const { dateEnd } = this.parent;
        if (!value || !dateEnd) return true;
        const startDate = new Date(value);
        const endDate = new Date(dateEnd);
        return startDate < endDate;
      },
      message: "'Data de início' deve ser menor que 'data de fim'",
    }),
  dateEnd: yup
    .string()
    /* .required() */
    .test({
      test: function (value) {
        const { dateStart } = this.parent;
        if (!value || !dateStart) return true;
        const startDate = new Date(dateStart);
        const endDate = new Date(value);
        return endDate > startDate;
      },
      message: "'Data de fim' deve ser maior que 'data de início'",
    }),
});
