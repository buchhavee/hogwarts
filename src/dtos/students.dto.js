import { z } from "zod";

// school_year er ikke koblet til birthday – en elev kan godt gå på en anden årgang end alderen passer til
const StudentDTO = z.object({
  name: z.string().trim().min(1),
  house_id: z.int().positive(),
  birthday: z.iso.date(),
  school_year: z.int().min(1).max(7),
});

export const CreateStudentDTO = StudentDTO;
export const UpdateStudentDTO = StudentDTO;
