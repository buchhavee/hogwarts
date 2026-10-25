import express from "express";
import teachersRouter from "./routes/teachers.route.js";
import studentsRouter from "./routes/students.route.js";
import housesRouter from "./routes/houses.route.js";

const app = express();

app.use(express.json());
app.use("/teachers", teachersRouter);
app.use("/students", studentsRouter);
app.use("/houses", housesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
