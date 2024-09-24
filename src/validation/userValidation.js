import z from "zod";

//register user validation
export const registerUserValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be atleast 2 characters",
    })
    .max(100, { message: "Name must be atmost 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "Password must be atleast 6 characters",
    })
    .max(12, { message: "Password must be atmost 12 characters" }),
});

//login user validation
export const loginUserValidation = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim(),
});
