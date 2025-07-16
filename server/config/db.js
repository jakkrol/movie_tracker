const pkg = require("pg");
const { Pool } = pkg;
const dotenv = require("dotenv");
dotenv.config();

const config = {};

if (process.env.DATABASE_URL) {
  config.connectionString = process.env.DATABASE_URL;
  config.ssl = {
    rejectUnauthorized: false, // needed for Supabase or any SSL DB with self-signed cert
  };
} else {
  config.user = process.env.DB_USER;
  config.host = process.env.DB_HOST;
  config.database = process.env.DB_NAME;
  config.password = process.env.DB_PASSWORD;
  config.port = process.env.DB_PORT;
}

const pool = new Pool(config);

pool.on("connect", () => {
  console.log("Connection pool established with DB");
});

module.exports = pool;