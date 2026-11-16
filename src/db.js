import pg from "pg";
const { Pool, types } = pg;

// DATE-kolonner (type 1082) skal komme ud som tekst, fx "1980-07-31",
// i stedet for et JavaScript Date-objekt med klokkeslæt og tidszone
types.setTypeParser(1082, (value) => value);

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

export { pool };
