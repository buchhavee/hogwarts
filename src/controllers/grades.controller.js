import * as gradesRepository from "../repositories/grades.repository.js";
import { HTTPError } from "../errors/HTTPError.js";

// Grades kan kun læses fra klienten, så der er kun GET

export async function getGrades(req, res) {
  const grades = await gradesRepository.getAllGrades();
  res.status(200).json(grades);
}

export async function getGrade(req, res) {
  const letter = req.params.letter.toUpperCase();
  const grade = await gradesRepository.getGradeByLetter(letter);
  if (!grade) throw new HTTPError(404, "Grade not found");
  res.status(200).json(grade);
}
