DROP TABLE IF EXISTS course_students, courses, students, teachers, houses CASCADE;

CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  founder TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL
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