import { z } from "zod";

export const SigninFormSchema = z.object({
  identifier: z
    .string()
    .min(3, "Username or email must be at least 3 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be less than 100 characters")
      .regex(
        strongPasswordRegex,
        "La contraseña debe incluír al menos una letra en mayúscula, una letra en minúscula y un número.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .transform((data) => ({
    username: data.username,
    email: data.email,
    password: data.password,
  }));

export type SigninFormValues = z.infer<typeof SigninFormSchema>;

export type SignupFormValues = z.infer<typeof SignupFormSchema>;

export type FormState = {
  success?: boolean;
  message?: string;
  data?: {
    identifier?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  strapiErrors?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  zodErrors?: {
    identifier?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  } | null;
};
