import { z } from "zod";

const CourseDTO = z
  .object({
    name: z.string().trim().min(1),
    teacher_id: z.int().positive(),
    type: z.enum(["core", "elective", "extra-curricular"]),
    level: z.enum(["OWL", "NEWT"]),
    school_year: z.int().min(1).max(7),
  })
  // OWL hører til 1.-5. år, NEWT hører til 6.-7. år
  .refine((course) => (course.level === "OWL" ? course.school_year <= 5 : course.school_year >= 6), {
    message: "OWL courses are year 1-5, NEWT courses are year 6-7",
    path: ["level"],
  });

export const CreateCourseDTO = CourseDTO;
export const UpdateCourseDTO = CourseDTO;

export const ChangeCourseTeacherDTO = z.object({
  teacher_id: z.int().positive(),
});

export const AddStudentToCourseDTO = z.object({
  student_id: z.int().positive(),
});
