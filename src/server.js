import "dotenv/config";
import express from "express";
import teachersRouter from "./routes/teachers.route.js";
import studentsRouter from "./routes/students.route.js";
import housesRouter from "./routes/houses.route.js";
import coursesRouter from "./routes/courses.route.js";
import examsRouter from "./routes/exams.route.js";
import gradesRouter from "./routes/grades.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/teachers", teachersRouter);
app.use("/students", studentsRouter);
app.use("/houses", housesRouter);
app.use("/courses", coursesRouter);
app.use("/exams", examsRouter);
app.use("/grades", gradesRouter);

// skal stå til sidst, så den fanger fejl fra alle routes
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
