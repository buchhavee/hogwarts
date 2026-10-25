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

INSERT INTO houses (name, founder, primary_color, secondary_color) VALUES
  ('Gryffindor', 'Godric Gryffindor', 'Scarlet', 'Gold'),
  ('Hufflepuff', 'Helga Hufflepuff', 'Yellow', 'Black'),
  ('Ravenclaw', 'Rowena Ravenclaw', 'Blue', 'Bronze'),
  ('Slytherin', 'Salazar Slytherin', 'Green', 'Silver');

INSERT INTO teachers (name, house_id) VALUES
  ('Minerva McGonagall', 1),
  ('Pomona Sprout', 2),
  ('Filius Flitwick', 3),
  ('Severus Snape', 4);

INSERT INTO students (name, house_id) VALUES
  ('Harry Potter', 1),
  ('Hermione Granger', 1),
  ('Ron Weasley', 1),
  ('Cedric Diggory', 2),
  ('Luna Lovegood', 3),
  ('Cho Chang', 3),
  ('Draco Malfoy', 4),
  ('Pansy Parkinson', 4);

INSERT INTO courses (name, teacher_id) VALUES
  ('Transfiguration', 1),
  ('Herbology', 2),
  ('Charms', 3),
  ('Potions', 4);

INSERT INTO course_students (course_id, student_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 7),
  (2, 2), (2, 4), (2, 5),
  (3, 1), (3, 5), (3, 6),
  (4, 1), (4, 2), (4, 7), (4, 8);