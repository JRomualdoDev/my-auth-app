import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string()
     .min(1, { message: "Name is required!" }),
    lastname: z.string()
    .min(1, { message: "Lastname is required!" }),
    email: z.string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Invalid email format!"}),    
    password: z.string()
      .min(1, { message: "Password is required!" })
      .min(6),
    confirmation_password: z.string()
     .min(1, { message: "Confirmation password is required!" })
     .min(6)
  }).refine((data) => data.password === data.confirmation_password, {
    message: "Passwords do not match!",
    path: ["confirmation_password"],
  });