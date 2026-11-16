# Objektdesign – Hogwarts 2.0

Her står hvordan objekterne ser ud, når de kommer **ind** i backenden (request body) og **ud** af backenden (response).

## Generelle valg

- Felterne hedder det samme i JSON som i databasen (snake_case, fx `house_id`, `school_year`). Så kan repositories bruge `RETURNING *` direkte, og man skal ikke oversætte navne frem og tilbage.
- Relationer sendes som id'er (`house_id`, `teacher_id`, `course_id`, `student_id`). Karakteren i en exam sendes som bogstavet (`"grade": "O"`), fordi bogstavet er primary key i `grades`.
- Datoer sendes som tekst i formatet `"YYYY-MM-DD"`.
- `id` sendes aldrig ind i bodyen. Det laver databasen selv (`SERIAL`), og ved PUT/DELETE står det i routen.
- Alt der kommer ind, valideres af en Zod-DTO (`src/dtos/`) i controlleren, før det sendes videre til repository. Ugyldige data giver `400`.
- PUT erstatter hele objektet, så alle felter skal med (samme DTO som POST).

## Houses (kun læsning)

Ud:
```json
{ "id": 1, "name": "Gryffindor", "founder": "Godric Gryffindor", "primary_color": "Scarlet", "secondary_color": "Gold" }
```

## Teachers

Ind (POST / PUT):
```json
{ "name": "Minerva McGonagall", "house_id": 1, "employment_start": "1956-12-01", "currently_active": true, "deceased": false }
```
Ud:
```json
{ "id": 1, "name": "Minerva McGonagall", "house_id": 1, "employment_start": "1956-12-01", "currently_active": true, "deceased": false }
```
Regler:
- `currently_active` kan ikke være `true`, hvis `employment_start` ligger i fremtiden (tjekkes i DTO og som CHECK i databasen).
- `deceased` og `currently_active` er uafhængige af hinanden.

## Students

Ind (POST / PUT):
```json
{ "name": "Harry Potter", "house_id": 1, "birthday": "1980-07-31", "school_year": 5 }
```
Ud:
```json
{ "id": 1, "name": "Harry Potter", "house_id": 1, "birthday": "1980-07-31", "school_year": 5 }
```
Regler:
- `school_year` er 1-7.
- Der er bevidst ingen sammenhæng mellem `birthday` og `school_year` (omgængere, orlov osv.).

## Courses

Ind (POST / PUT):
```json
{ "name": "Potions", "teacher_id": 4, "type": "core", "level": "OWL", "school_year": 5 }
```
Ud:
```json
{ "id": 4, "name": "Potions", "teacher_id": 4, "type": "core", "level": "OWL", "school_year": 5 }
```
Regler:
- `type` er `"core"`, `"elective"` eller `"extra-curricular"`.
- `level` er `"OWL"` eller `"NEWT"`.
- `school_year` er 1-7, og skal passe med `level`: OWL = 1.-5. år, NEWT = 6.-7. år.
- `teacher_id` bliver `null`, hvis underviseren slettes.

Skift lærer – ind (PUT /courses/:id/teacher):
```json
{ "teacher_id": 2 }
```
Tilføj elev – ind (POST /courses/:id/students):
```json
{ "student_id": 3 }
```
Tilføj elev – ud:
```json
{ "course_id": 2, "student_id": 3 }
```

## Exams

Ind (POST / PUT):
```json
{ "course_id": 4, "student_id": 1, "grade": "E" }
```
Ud:
```json
{ "id": 11, "course_id": 4, "student_id": 1, "grade": "E" }
```
Regler:
- `grade` skal findes i `grades` (foreign key). Små bogstaver laves om til store.
- En elev kan kun have én karakter pr. fag (`UNIQUE (course_id, student_id)`), ellers `409`.

## Grades (kun læsning)

Ud:
```json
{ "letter": "P", "name": "Poor", "description": "You have narrowly failed. This may have been due to factors outside your control.", "passed": false }
```
Grades kan ikke oprettes, ændres eller slettes fra klienten – der findes kun GET-routes.

## Fejl

```json
{ "error": "Invalid data", "issues": [{ "field": "level", "message": "OWL courses are year 1-5, NEWT courses are year 6-7" }] }
```
| Status | Hvornår |
|---|---|
| 400 | Ugyldig body (Zod), ugyldig JSON, id der ikke findes i en anden tabel (foreign key), brud på en CHECK-regel, id der ikke er et tal |
| 404 | Elementet med det id findes ikke |
| 409 | Findes allerede (fx samme navn på course, eller samme elev to gange på et fag) |
| 500 | Uventet fejl |
