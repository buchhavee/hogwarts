import { ZodError } from "zod";
import { HTTPError } from "../errors/HTTPError.js";

// Express kalder denne funktion, når en controller kaster en fejl.
// Her oversættes fejlen til den rigtige statuskode.
export function errorHandler(err, req, res, next) {
  // fejl vi selv har kastet, fx 404
  if (err instanceof HTTPError) {
    return res.status(err.status).json({ error: err.message });
  }

  // DTO'en (Zod) har afvist dataene fra bodyen
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Invalid data",
      issues: err.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })),
    });
  }

  // bodyen er ikke gyldig JSON
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  // fejl fra PostgreSQL
  switch (err.code) {
    case "23503": // foreign key findes ikke, fx et house_id der ikke er i houses
      return res.status(400).json({ error: "Referenced row does not exist", code: err.code });
    case "23505": // unique / primary key findes allerede
      return res.status(409).json({ error: "Already exists", code: err.code });
    case "23514": // en CHECK constraint er brudt
      return res.status(400).json({ error: "Data breaks a database rule", code: err.code });
    case "22P02": // forkert type, fx /teachers/abc
    case "22003": // tal uden for interval
      return res.status(400).json({ error: "Invalid input", code: err.code });
  }

  // alt andet er en uventet fejl
  console.log(err);
  res.status(500).json({ error: "Database error", code: err.code });
}
