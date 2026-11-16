import * as examsRepository from "../repositories/exams.repository.js";
import { CreateExamDTO, UpdateExamDTO } from "../dtos/exams.dto.js";
import { HTTPError } from "../errors/HTTPError.js";

export async function getExams(req, res) {
  const exams = await examsRepository.getAllExams();
  res.status(200).json(exams);
}

export async function getExam(req, res) {
  const id = req.params.id;
  const exam = await examsRepository.getExamById(id);
  if (!exam) throw new HTTPError(404, "Exam not found");
  res.status(200).json(exam);
}

export async function addExam(req, res) {
  const data = req.body;
  const exam = CreateExamDTO.parse(data);
  const newExam = await examsRepository.createExam(exam);
  res.status(201).json(newExam);
}

export async function editExam(req, res) {
  const id = req.params.id;
  const data = req.body;
  const exam = UpdateExamDTO.parse(data);
  const updatedExam = await examsRepository.updateExam(id, exam);
  if (!updatedExam) throw new HTTPError(404, "No exam to update");
  res.status(200).json(updatedExam);
}

export async function removeExam(req, res) {
  const id = req.params.id;
  const deletedExam = await examsRepository.deleteExam(id);
  if (!deletedExam) throw new HTTPError(404, "No exam to delete");
  res.sendStatus(204);
}
