import { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } from "../repositories/teachers.repository.js";

export const getTeachers = async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    res.status(200).json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const teacher = await getTeacherById(req.params.id);
    if (!teacher) return res.sendStatus(404);
    res.status(200).json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const addTeacher = async (req, res) => {
  try {
    const { name, house_id } = req.body;
    if (!name || !house_id) return res.sendStatus(400);
    const teacher = await createTeacher(name, house_id);
    res.status(201).json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const editTeacher = async (req, res) => {
  try {
    const { name, house_id } = req.body;
    if (!name || !house_id) return res.sendStatus(400);
    const teacher = await updateTeacher(req.params.id, name, house_id);
    if (!teacher) return res.sendStatus(404);
    res.status(200).json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const removeTeacher = async (req, res) => {
  try {
    const teacher = await deleteTeacher(req.params.id);
    if (!teacher) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};
