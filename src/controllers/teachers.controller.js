import { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } from "../repositories/teachers.repository.js";

export async function getTeachers(req, res) {
  try {
    const teachers = await getAllTeachers();
    res.status(200).json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getTeacher(req, res) {
  try {
    const teacher = await getTeacherById(req.params.id);
    if (!teacher) return res.sendStatus(404);
    res.status(200).json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function addTeacher(req, res) {
  try {
    const { name, house_id } = req.body;
    if (!name || !house_id) return res.sendStatus(400);
    const teacher = await createTeacher(name, house_id);
    res.status(201).json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function editTeacher(req, res) {
  try {
    const { name, house_id } = req.body; // henter de nye data
    if (!name || !house_id) return res.sendStatus(400); // mangler noget så 400
    const teacher = await updateTeacher(req.params.id, name, house_id);
    if (!teacher) return res.sendStatus(404); // findes id 2 ikke så 404
    res.status(200).json(teacher); // ellers 200 + den opdaterede teacher
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function removeTeacher(req, res) {
  try {
    const teacher = await deleteTeacher(req.params.id);
    if (!teacher) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}
