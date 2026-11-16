import { z } from "zod";

// grade er bogstavet fra grades-tabellen, fx "O" eller "P".
// Databasen tjekker med en foreign key at bogstavet findes.
const ExamDTO = z.object({
  course_id: z.int().positive(),
  student_id: z.int().positive(),
  grade: z.string().trim().toUpperCase().length(1),
});

export const CreateExamDTO = ExamDTO;
export const UpdateExamDTO = ExamDTO;
