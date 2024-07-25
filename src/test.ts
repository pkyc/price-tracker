import { Client, config } from "./deps.ts";

config();

const client = new Client({
  user: Deno.env.get("DB_USER") || "default_user",
  database: Deno.env.get("DB_DATABASE") || "default_db",
  hostname: Deno.env.get("DB_HOST") || "localhost",
  password: Deno.env.get("DB_PASSWORD") || "default_password",
  port: parseInt(Deno.env.get("DB_PORT") || "5432", 10),
  tls: { enforce: true },
});

const testConnection = async () => {
  try {
    await client.connect();
    console.log("Connection successful!");
    await client.end();
  } catch (error) {
    console.error("Connection failed:", error);
  }
};

testConnection();
