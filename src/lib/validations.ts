import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const petInfoSchema = z.object({
  name: z.string().min(1, 'Pet name is required'),
  type: z.enum(['dog', 'cat', 'bird', 'rabbit', 'other']),
  breed: z.string().min(1, 'Breed is required'),
  age: z.number().min(0, 'Age must be positive').max(30, 'Age seems too high'),
  weight: z.number().min(0.1, 'Weight must be positive').max(200, 'Weight seems too high'),
  specialNeeds: z.string().optional(),
})

export const bookingSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
  petInfo: petInfoSchema,
  specialRequests: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type PetInfoFormData = z.infer<typeof petInfoSchema>
export type BookingFormData = z.infer<typeof bookingSchema>
