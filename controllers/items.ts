// controllers/items.ts
import { Client } from "../deps.ts";
const client = new Client({
  user: "price_owner",
  database: "price",
  hostname: "ep-blue-sky-a59p5ldd.us-east-2.aws.neon.tech",
  password: "J0tIYybHzg5Q",
  port: 5432,
});

client.connect();

try {
  await client.connect();
  console.log("Database connection successful");
} catch (err) {
  console.error("Error connecting to the database:", err);
}

export const getItems = async ({ response }: { response: any }) => {
  try {
    const result = await client.queryObject("SELECT * FROM items");
    response.body = result.rows;
  } catch (err) {
    console.error("Error fetching items:", err);
    response.status = 500;
    response.body = { message: "Error fetching items" };
  }
};

export const addItem = async ({ request, response }: { request: any; response: any }) => {
  try {
    const body = await request.body().value;
    const { name, price, quantity, unit_price, merchandizer } = body;
    console.log("Received data:", body);  // Log the received data
    await client.queryObject(
      "INSERT INTO items (name, price, quantity, unit_price, merchandizer, date) VALUES ($1, $2, $3, $4, $5, $6)",
      name, price, quantity, unit_price, merchandizer, new Date(),
    );
    console.log("Item added successfully");  // Log success message
    response.status = 201;
    response.body = { message: "Item added" };
  } catch (err) {
    console.error("Error adding item:", err);  // Log any errors
    response.status = 500;
    response.body = { message: "Error adding item" };
  }
};

export const updateItem = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
  try {
    const body = await request.body().value;
    const { name, price, quantity, unit_price, merchandizer } = body;
    await client.queryObject(
      "UPDATE items SET name=$1, price=$2, quantity=$3, unit_price=$4, merchandizer=$5, date=$6 WHERE id=$7",
      name, price, quantity, unit_price, merchandizer, new Date(), params.id,
    );
    console.log("Item updated successfully");  // Log success message
    response.body = { message: "Item updated" };
  } catch (err) {
    console.error("Error updating item:", err);  // Log any errors
    response.status = 500;
    response.body = { message: "Error updating item" };
  }
};