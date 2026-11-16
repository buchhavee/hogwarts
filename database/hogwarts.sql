DROP TABLE IF EXISTS exams, grades, course_students, courses, students, teachers, houses CASCADE;

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
  house_id INT NOT NULL REFERENCES houses(id),
  birthday DATE NOT NULL,
  -- årgang 1-7. Behøver ikke passe med alderen (omgængere, orlov osv.)
  school_year INT NOT NULL CHECK (school_year BETWEEN 1 AND 7)
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INT NOT NULL REFERENCES houses(id),
  employment_start DATE NOT NULL,
  currently_active BOOLEAN NOT NULL DEFAULT false,
  deceased BOOLEAN NOT NULL DEFAULT false,
  -- en underviser kan ikke være aktiv før vedkommende er startet
  CHECK (currently_active = false OR employment_start <= CURRENT_DATE)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('core', 'elective', 'extra-curricular')),
  level TEXT NOT NULL CHECK (level IN ('OWL', 'NEWT')),
  school_year INT NOT NULL CHECK (school_year BETWEEN 1 AND 7),
  -- OWL hører til 1.-5. år, NEWT hører til 6.-7. år
  CHECK (
    (level = 'OWL' AND school_year BETWEEN 1 AND 5) OR
    (level = 'NEWT' AND school_year BETWEEN 6 AND 7)
  )
);

CREATE TABLE course_students (
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);

-- Karaktersystemet. Kan kun læses fra klienten (der er kun GET-routes)
CREATE TABLE grades (
  letter TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  passed BOOLEAN NOT NULL
);

-- En elevs karakter i et fag. Én karakter pr. elev pr. fag
CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  grade TEXT NOT NULL REFERENCES grades(letter),
  UNIQUE (course_id, student_id)
);

INSERT INTO houses (name, founder, primary_color, secondary_color) VALUES
  ('Gryffindor', 'Godric Gryffindor', 'Scarlet', 'Gold'),
  ('Hufflepuff', 'Helga Hufflepuff', 'Yellow', 'Black'),
  ('Ravenclaw', 'Rowena Ravenclaw', 'Blue', 'Bronze'),
  ('Slytherin', 'Salazar Slytherin', 'Green', 'Silver');

INSERT INTO teachers (name, house_id, employment_start, currently_active, deceased) VALUES
  ('Minerva McGonagall', 1, '1956-12-01', true, false),
  ('Pomona Sprout', 2, '1970-09-01', true, false),
  ('Filius Flitwick', 3, '1975-09-01', true, false),
  ('Severus Snape', 4, '1981-09-01', true, false),
  ('Sybill Trelawney', 3, '1980-09-01', true, false),
  ('Rolanda Hooch', 2, '1985-09-01', true, false),
  ('Quirinus Quirrell', 3, '1991-09-01', false, true);

INSERT INTO students (name, house_id, birthday, school_year) VALUES
  ('Harry Potter', 1, '1980-07-31', 5),
  ('Hermione Granger', 1, '1979-09-19', 5),
  ('Ron Weasley', 1, '1980-03-01', 5),
  ('Cedric Diggory', 2, '1977-09-01', 7),
  ('Luna Lovegood', 3, '1981-02-13', 4),
  ('Cho Chang', 3, '1979-04-07', 6),
  ('Draco Malfoy', 4, '1980-06-05', 5),
  ('Pansy Parkinson', 4, '1980-02-20', 5);

INSERT INTO courses (name, teacher_id, type, level, school_year) VALUES
  ('Transfiguration', 1, 'core', 'OWL', 5),
  ('Herbology', 2, 'core', 'OWL', 5),
  ('Charms', 3, 'core', 'OWL', 5),
  ('Potions', 4, 'core', 'OWL', 5),
  ('Divination', 5, 'elective', 'OWL', 3),
  ('Flying', 6, 'extra-curricular', 'OWL', 1),
  ('Advanced Potions', 4, 'core', 'NEWT', 6);

INSERT INTO course_students (course_id, student_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 7),
  (2, 2), (2, 4), (2, 5),
  (3, 1), (3, 5), (3, 6),
  (4, 1), (4, 2), (4, 7), (4, 8),
  (5, 1), (5, 3),
  (6, 1), (6, 7),
  (7, 6);

INSERT INTO grades (letter, name, description, passed) VALUES
  ('O', 'Outstanding', 'The highest grade. Shows exemplary skill and a formidable knowledge of the subject.', true),
  ('E', 'Exceeds Expectations', 'Well done - a most creditable performance.', true),
  ('A', 'Acceptable', 'The lowest passing grade. Demonstrates real magical potential.', true),
  ('P', 'Poor', 'You have narrowly failed. This may have been due to factors outside your control.', false),
  ('D', 'Dreadful', 'You have failed.', false),
  ('T', 'Troll', 'The lowest grade. The exam was failed completely or abandoned.', false);

INSERT INTO exams (course_id, student_id, grade) VALUES
  (1, 1, 'E'), (1, 2, 'O'), (1, 3, 'A'), (1, 7, 'E'),
  (2, 2, 'O'), (2, 4, 'E'), (2, 5, 'A'),
  (3, 1, 'E'), (3, 5, 'O'), (3, 6, 'E'),
  (4, 1, 'E'), (4, 2, 'O'), (4, 7, 'E'), (4, 8, 'P'),
  (5, 1, 'P'), (5, 3, 'T');
