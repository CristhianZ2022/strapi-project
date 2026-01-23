"use server";

import { registerUserService } from "@/lib/strapi";
import { SignupFormSchema, type FormState } from "@/validations/auth";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  domain: process.env.HOST ?? "localhost",
};

export async function registerUserAction(
  prevState: FormState,
  formdData: FormData,
): Promise<FormState> {
  console.log("Hello from registerUserAction");

  const fields = {
    username: formdData.get("username") as string,
    email: formdData.get("email") as string,
    password: formdData.get("password") as string,
  };

  const validateFields = SignupFormSchema.safeParse(fields);

  if (!validateFields.success) {
    const flattenedErrors = z.flattenError(validateFields.error);

    return {
      success: false,
      message: "Validation error",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  const response = await registerUserService(validateFields.data);

  if (!response || response.error) {
    return {
      success: false,
      message: "Registration error",
      strapiErrors: response?.error,
      zodErrors: null,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", response.jwt, cookieConfig);
  redirect("/dashboard");
}
