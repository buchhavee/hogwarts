import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } from "../repositories/students.repository.js";

export const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) return res.sendStatus(404);
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { name, house_id } = req.body;
    if (!name || !house_id) return res.sendStatus(400);
    const student = await createStudent(name, house_id);
    res.status(201).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const editStudent = async (req, res) => {
  try {
    const { name, house_id } = req.body;
    if (!name || !house_id) return res.sendStatus(400);
    const student = await updateStudent(req.params.id, name, house_id);
    if (!student) return res.sendStatus(404);
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const removeStudent = async (req, res) => {
  try {
    const student = await deleteStudent(req.params.id);
    if (!student) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};
