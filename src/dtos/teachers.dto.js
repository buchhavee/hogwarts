import { z } from "zod";

// dagens dato som "YYYY-MM-DD", så den kan sammenlignes med employment_start
function today() {
  return new Date().toISOString().slice(0, 10);
}

const TeacherDTO = z
  .object({
    name: z.string().trim().min(1),
    house_id: z.int().positive(),
    employment_start: z.iso.date(),
    currently_active: z.boolean(),
    deceased: z.boolean(),
  })
  // en underviser kan ikke være aktiv før vedkommende er startet
  .refine((teacher) => !teacher.currently_active || teacher.employment_start <= today(), {
    message: "A teacher cannot be active before their employment start",
    path: ["currently_active"],
  });

export const CreateTeacherDTO = TeacherDTO;
export const UpdateTeacherDTO = TeacherDTO;
