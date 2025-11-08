const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || process.env.DB_HOST || "localhost",
  user: process.env.PGUSER || process.env.DB_USER || "postgres",
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD || "",
  database: process.env.PGDATABASE || process.env.DB_NAME || "postgres",
  port: process.env.PGPORT || process.env.DB_PORT || 5432,
});

async function init() {
  const createTable = `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );`;
  await pool.query(createTable);
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  init,
};
