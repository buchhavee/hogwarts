import * as studentsRepository from "../repositories/students.repository.js";
import { CreateStudentDTO, UpdateStudentDTO } from "../dtos/students.dto.js";
import { HTTPError } from "../errors/HTTPError.js";

export async function getStudents(req, res) {
  const students = await studentsRepository.getAllStudents();
  res.status(200).json(students);
}

export async function getStudent(req, res) {
  const id = req.params.id;
  const student = await studentsRepository.getStudentById(id);
  if (!student) throw new HTTPError(404, "Student not found");
  res.status(200).json(student);
}

export async function addStudent(req, res) {
  const data = req.body;
  const student = CreateStudentDTO.parse(data);
  const newStudent = await studentsRepository.createStudent(student);
  res.status(201).json(newStudent);
}

export async function editStudent(req, res) {
  const id = req.params.id;
  const data = req.body;
  const student = UpdateStudentDTO.parse(data);
  const updatedStudent = await studentsRepository.updateStudent(id, student);
  if (!updatedStudent) throw new HTTPError(404, "No student to update");
  res.status(200).json(updatedStudent);
}

export async function removeStudent(req, res) {
  const id = req.params.id;
  const deletedStudent = await studentsRepository.deleteStudent(id);
  if (!deletedStudent) throw new HTTPError(404, "No student to delete");
  res.sendStatus(204);
}
