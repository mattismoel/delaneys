import z from "zod";

export const registerForm = z
  .object({
    email: z.email().nonempty(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    password: z.string().nonempty().min(8),
    passwordConfirm: z.string(),
  })
  .refine(
    ({ password, passwordConfirm }) => password === passwordConfirm,
    "Adgangskoder stemmer ikke overens",
  );

export const loginForm = z.object({
  email: z.email(),
  password: z.string(),
});

export type RegisterForm = z.infer<typeof registerForm>;
export type LoginForm = z.infer<typeof loginForm>;
