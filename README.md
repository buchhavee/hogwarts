# HOGWARTS COURSE MANAGEMENT SYSTEM (Aflevering)

## Beskrivelse

Projektet er et REST API til Hogwarts databasen, som håndterer houses, teachers, students og courses med CRUD-funktioner.
API'et er lavet med Node.js og Express, og data gemmes i en PostgreSQL database, som er sat op med SQL.
Man kan hente houses, oprette, rette og slette teachers, students og courses, skifte lærer på et kursus samt tilføje og fjerne elever fra et kursus.

## Opsætning

Kør install `npm install`
Opret en database i pgAdmin og indsæt indholdet i `database/hogwarts.sql` i en query
Kopier `.env.example` og udfyld værdierne `.env`
Kør `npm run dev`

## Endpoints

### Houses
| Metode | Route | Beskrivelse |
|---|---|---|
| GET | /houses | Hent alle houses |
| GET | /houses/:id | Hent et house |

### Teachers
| Metode | Route | Beskrivelse |
|---|---|---|
| GET | /teachers | Hent alle teachers |
| GET | /teachers/:id | Hent en teacher |
| POST | /teachers | Opret en teacher |
| PUT | /teachers/:id | Opdater en teacher |
| DELETE | /teachers/:id | Slet en teacher |

### Students
| Metode | Route | Beskrivelse |
|---|---|---|
| GET | /students | Hent alle students |
| GET | /students/:id | Hent en student |
| POST | /students | Opret en student |
| PUT | /students/:id | Opdater en student |
| DELETE | /students/:id | Slet en student |

### Courses
| Metode | Route | Beskrivelse |
|---|---|---|
| GET | /courses | Hent alle courses |
| GET | /courses/:id | Hent et course |
| POST | /courses | Opret et course |
| PUT | /courses/:id | Opdater et course |
| DELETE | /courses/:id | Slet et course |
| PUT | /courses/:id/teacher | Skift lærer på et course |
| POST | /courses/:id/students | Tilføj en student til et course |
| DELETE | /courses/:id/students/:studentId | Fjern en student fra et course |

## Test med Bruno

Alle endpoints kan testes med Bruno. Samlingen ligger i mappen `hogwarts/` i roden af projektet.

1. Kør `database/hogwarts.sql` i pgAdmin, så databasen er nulstillet med testdata.
2. Start serveren med `npm run dev`. Den kører på `http://localhost:3000`, så `PORT=3000` skal stå i `.env`.
3. Åbn Bruno og åben mappen `hogwarts/`.
4. Kør requesten med pilen i adresselinjen