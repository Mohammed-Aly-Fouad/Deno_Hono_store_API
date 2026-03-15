import postgres from "postgres";

// 1. SSL Configuration
const ssl = { rejectUnauthorized: true };

try {
  const caCert = await Deno.readTextFile("./db/ca.pem");
  ssl.ca = caCert;
  console.log("🔒 SSL CA Certificate loaded.");
} catch (_err) {
  console.warn("⚠️ ca.pem not found. Using default SSL settings.");
  // If your DB doesn't support SSL (local dev), uncomment the line below:
  // ssl = false;
}

// 2. Database Connection Options (The Pool)
const options = {
  host: Deno.env.get("DB_HOST"),
  port: Number(Deno.env.get("DB_PORT")) || 5432,
  database: Deno.env.get("DB_NAME"),
  username: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
  ssl: ssl,
  
  // Pool Settings
  max: 10,                 // Max number of connections in the pool
  idle_timeout: 20,        // Idle connections close after 20 seconds
  connect_timeout: 30,     // Give up connecting after 30 seconds
};

// 3. Create the SQL instance (This is your Pool)
// This single instance is shared across your whole app
export const sql = postgres(options);

/**
 * query helper (Generic version)
 */
export const query = async (sqlString, params = []) => {
  return await sql.unsafe(sqlString, params);
};

console.log(`🚀 Connection pool initialized for ${options.host}`);