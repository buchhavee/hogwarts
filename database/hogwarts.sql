DROP TABLE IF EXISTS course_students, courses, students, teachers, house_colors, houses CASCADE;

CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  founder TEXT NOT NULL
);

CREATE TABLE house_colors (
  house_id INT NOT NULL REFERENCES houses(id),
  color TEXT NOT NULL,
  PRIMARY KEY (house_id, color)
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INT NOT NULL REFERENCES houses(id)
); 

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INT NOT NULL REFERENCES houses(id)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL
);

CREATE TABLE course_students (
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);