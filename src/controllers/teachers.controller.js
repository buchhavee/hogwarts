import * as teachersRepository from "../repositories/teachers.repository.js";
import { CreateTeacherDTO, UpdateTeacherDTO } from "../dtos/teachers.dto.js";
import { HTTPError } from "../errors/HTTPError.js";

// Fejl (fx ZodError fra .parse eller fejl fra databasen) bliver sendt videre
// til errorHandler af Express, så der er ingen try/catch her.

export async function getTeachers(req, res) {
  const teachers = await teachersRepository.getAllTeachers();
  res.status(200).json(teachers);
}

export async function getTeacher(req, res) {
  const id = req.params.id;
  const teacher = await teachersRepository.getTeacherById(id);
  if (!teacher) throw new HTTPError(404, "Teacher not found");
  res.status(200).json(teacher);
}

export async function addTeacher(req, res) {
  const data = req.body;
  const teacher = CreateTeacherDTO.parse(data); // ugyldig data -> 400
  const newTeacher = await teachersRepository.createTeacher(teacher);
  res.status(201).json(newTeacher);
}

export async function editTeacher(req, res) {
  const id = req.params.id;
  const data = req.body;
  const teacher = UpdateTeacherDTO.parse(data);
  const updatedTeacher = await teachersRepository.updateTeacher(id, teacher);
  if (!updatedTeacher) throw new HTTPError(404, "No teacher to update");
  res.status(200).json(updatedTeacher);
}

export async function removeTeacher(req, res) {
  const id = req.params.id;
  const deletedTeacher = await teachersRepository.deleteTeacher(id);
  if (!deletedTeacher) throw new HTTPError(404, "No teacher to delete");
  res.sendStatus(204);
}
