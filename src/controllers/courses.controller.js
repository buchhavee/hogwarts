import * as coursesRepository from "../repositories/courses.repository.js";

const course = await coursesRepository.getCourseById(id);
