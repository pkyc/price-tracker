import { Client, config } from "../deps.ts";

config();  // Load .env file

const client = new Client({
  user: Deno.env.get("DB_USER") || "default_user",
  database: Deno.env.get("DB_DATABASE") || "default_db",
  hostname: Deno.env.get("DB_HOST") || "localhost",
  password: Deno.env.get("DB_PASSWORD") || "default_password",
  port: parseInt(Deno.env.get("DB_PORT") || "5432", 10),
  tls: { enforce: true },
});

export const getItemsFromDb = async () => {
  try {
    await client.connect();
    const result = await client.queryObject("SELECT * FROM items");
    await client.end();
    return result.rows;
  } catch (error) {
    console.error("Error getting items from DB:", error);
    throw error;
  }
};

export const addItemToDb = async (item: any) => {
  try {
    await client.connect();
    await client.queryObject(
      "INSERT INTO items (name, price, quantity, unit_price, merchandizer, date) VALUES ($1, $2, $3, $4, $5, $6)",
      item.name, item.price, item.quantity, item.unit_price, item.merchandizer, new Date(),
    );
    await client.end();
  } catch (error) {
    console.error("Error adding item to DB:", error);
    throw error;
  }
};
