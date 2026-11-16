import * as coursesRepository from "../repositories/courses.repository.js";
import { CreateCourseDTO, UpdateCourseDTO, ChangeCourseTeacherDTO, AddStudentToCourseDTO } from "../dtos/courses.dto.js";
import { HTTPError } from "../errors/HTTPError.js";

// hent alle courses
export async function getCourses(req, res) {
  const courses = await coursesRepository.getAllCourses();
  res.status(200).json(courses);
}

// hent enkelt course
export async function getCourse(req, res) {
  const id = req.params.id;
  const course = await coursesRepository.getCourseById(id);
  if (!course) throw new HTTPError(404, "Course not found");
  res.status(200).json(course);
}

// opret nyt course
export async function addCourse(req, res) {
  const data = req.body;
  const course = CreateCourseDTO.parse(data);
  const newCourse = await coursesRepository.createCourse(course);
  res.status(201).json(newCourse);
}

// opdater et course
export async function editCourse(req, res) {
  const id = req.params.id;
  const data = req.body;
  const course = UpdateCourseDTO.parse(data);
  const updatedCourse = await coursesRepository.updateCourse(id, course);
  if (!updatedCourse) throw new HTTPError(404, "No course to update");
  res.status(200).json(updatedCourse);
}

// slet et course
export async function removeCourse(req, res) {
  const id = req.params.id;
  const deletedCourse = await coursesRepository.deleteCourse(id);
  if (!deletedCourse) throw new HTTPError(404, "No course to delete");
  res.sendStatus(204);
}

// tilføj en student til et course
export async function addStudentToCourse(req, res) {
  const course_id = req.params.id;
  const data = req.body;
  const { student_id } = AddStudentToCourseDTO.parse(data);
  const courseStudent = await coursesRepository.addStudentToCourse(course_id, student_id);
  res.status(201).json(courseStudent);
}

// fjern en student fra et course
export async function removeStudentFromCourse(req, res) {
  const course_id = req.params.id;
  const student_id = req.params.studentId;
  const removed = await coursesRepository.removeStudentFromCourse(course_id, student_id);
  if (!removed) throw new HTTPError(404, "Student is not on this course");
  res.sendStatus(204);
}

// skift course teacher
export async function changeCourseTeacher(req, res) {
  const course_id = req.params.id;
  const data = req.body;
  const { teacher_id } = ChangeCourseTeacherDTO.parse(data);
  const course = await coursesRepository.changeCourseTeacher(course_id, teacher_id);
  if (!course) throw new HTTPError(404, "Course not found");
  res.status(200).json(course);
}
