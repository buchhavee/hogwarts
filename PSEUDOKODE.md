Get all teachers:
GET /teachers
hent alle teachers fra databasen
lav listen om til json, returner den med en 200
Hvis der sker en fejl i databasen - return 500

Get single teacher:
GET /teachers/:id
find id'et fra routen (requesten)
find det element i databasen med det id
Hvis der ikke var noget - return 404
Ellers: lav elementet om til json, returner det med en 200

Create/add teacher:
POST /teachers
find name og house_id fra bodyen (requesten)
Hvis name eller house_id mangler - return 400
opret element i databasen med name og house_id
Hvis house_id ikke findes i houses - return 400
Ellers så lav det nye element om til json, returner det med en 200
Hvis der sker en uventet fejl i databasen - return 500

Update single teacher:
PUT /teachers/:id
find id'et fra routen (requesten)
find name og house_id fra bodyen (requesten)
Hvis name eller house_id mangler - return 400
opdater elementet i databasen med det id
Hvis der ikke var noget med det id - return 404
Hvis house_id ikke findes i houses - return 400
Ellers: lav det opdaterede element om til json, returner det med en 200
Hvis der sker en uventet fejl i databasen - return 500

Delete single teacher:
DELETE /teachers/:id
find id'et fra routen (requesten)
slet elementet i databasen med det id
Hvis der ikke var noget med det id - return 404
Ellers: returner en 204 uden indhold
Hvis der sker en uventet fejl i databasen - return 500

Change teacher on course:
PUT /courses/:id/teacher
find kursets id fra routen (requesten)
find teacher_id fra bodyen (requesten)
Hvis teacher_id mangler - return 400
opdater kursets teacher_id i databasen
Hvis der ikke var noget kursus med det id - return 404
Hvis teacher_id ikke findes i teachers - return 400
Ellers: lav kurset om til json, returner det med en 200
Hvis der sker en uventet fejl i databasen - return 500

Add student to course:
POST /courses/:id/students
find kursets id fra routen (requesten)
find student_id fra bodyen (requesten)
Hvis student_id mangler - return 400
opret en ny række i course_students med kursets id og student_id
Hvis kurset eller eleven ikke findes - return 400
Hvis eleven allerede er på kurset - return 409
Ellers: lav rækken om til json, returner den med en 201
Hvis der sker en uventet fejl i databasen - return 500

Remove student from course:
DELETE /courses/:id/students/:studentId
find kursets id og elevens id fra routen (requesten)
slet rækken i course_students med de to id'er
Hvis der ikke var nogen række - return 404
Ellers: returner en 204 uden indhold
Hvis der sker en uventet fejl i databasen - return 500

Fælles for alle endpoints i 2.0:
Hvis bodyen ikke passer til DTO'en (Zod) - return 400
Hvis et id i bodyen ikke findes i den anden tabel (foreign key) - return 400
Hvis dataene bryder en regel i databasen (CHECK) - return 400
Hvis noget allerede findes (UNIQUE) - return 409
Hvis der sker en uventet fejl - return 500
Fejlene kastes i controlleren og fanges af errorHandler

Create/add course:
POST /courses
find dataene fra bodyen (requesten)
tjek dataene med CreateCourseDTO (name, teacher_id, type, level, school_year)
Hvis level er OWL og school_year er over 5, eller level er NEWT og school_year er under 6 - return 400
opret elementet i databasen
lav det nye element om til json, returner det med en 201

Create/add exam:
POST /exams
find dataene fra bodyen (requesten)
tjek dataene med CreateExamDTO (course_id, student_id, grade)
opret elementet i databasen
Hvis course_id, student_id eller grade ikke findes - return 400
Hvis eleven allerede har en karakter i faget - return 409
Ellers: lav det nye element om til json, returner det med en 201

Update single exam:
PUT /exams/:id
find id'et fra routen (requesten)
find dataene fra bodyen og tjek dem med UpdateExamDTO
opdater elementet i databasen med det id
Hvis der ikke var noget med det id - return 404
Ellers: lav det opdaterede element om til json, returner det med en 200

Delete single exam:
DELETE /exams/:id
find id'et fra routen (requesten)
slet elementet i databasen med det id
Hvis der ikke var noget med det id - return 404
Ellers: returner en 204 uden indhold

Get all grades:
GET /grades
hent alle grades fra databasen
lav listen om til json, returner den med en 200

Get single grade:
GET /grades/:letter
find bogstavet fra routen (requesten) og lav det til stort bogstav
find den grade i databasen med det bogstav
Hvis der ikke var noget - return 404
Ellers: lav elementet om til json, returner det med en 200
(Der er ingen POST, PUT eller DELETE på grades - karaktersystemet må ikke ændres fra klienten)
