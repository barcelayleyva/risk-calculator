import { z } from "zod";

const SEX_OPTIONS = ['male', 'female'] as const;
const DESITION_OPTIONS = ['yes', 'no'] as const;
export type SexType = typeof SEX_OPTIONS[number];
export type DesitionType = typeof DESITION_OPTIONS[number];

export const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  age: z.number().min(18, {
    message: "Debes tener al menos 18 años.",
  }),
  hdl: z
  .number({ required_error: "El HDL es un campo obligatorio." })
  .min(0, { message: "El HDL debe ser al menos 0." }),
  cholesterol: z
    .number({ required_error: "El colesterol es un campo obligatorio." })
    .min(100, { message: "El colesterol debe ser al menos 100." })
    .max(500, { message: "El colesterol no puede ser mayor a 500." }),    
  systolic: z
    .number({ required_error: "La tensión sistólica es un campo obligatorio." })
    .min(100, { message: "La tensión sistólica debe ser al menos 100." })
    .max(250, { message: "La tensión sistólica no puede ser mayor a 250." }),
  smoking: z.enum(DESITION_OPTIONS, {
    required_error: "Por favor indica si fumas.",
  }),
  diabetes: z.enum(DESITION_OPTIONS, {
    required_error: "Por favor indica si tienes diabetes.",
  }),
  sex: z.enum(SEX_OPTIONS, {
    required_error: "Por favor selecciona tu sexo.",
  }),
})

export type FormDataType = z.infer<typeof FormSchema>;