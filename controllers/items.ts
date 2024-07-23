// controllers/items.ts
import { Client } from "../deps.ts";
const client = new Client({
  user: "pricetrack_owner",
  database: "pricetrack",
  hostname: "ep-rough-grass-a5p716hl.us-east-2.aws.neon.tech",
  password: "Rd1xtVBE0kQU",
  port: 5432,
  });


try {
  await client.connect();
  console.log("Database connection successful");
} catch (err) {
  console.error("Error connecting to the database:", err);
  throw err;
}

export const getItems = async ({ response }: { response: any }) => {
  try {
    const result = await client.queryObject("SELECT * FROM items");
    response.body = result.rows;
  } catch (err) {
    console.error("C Error fetching items:", err);
    response.status = 500;
    response.body = { message: "fetch error", error: err.message };
  }
};

export const addItem = async ({ request, response }: { request: any; response: any }) => {
  try {
    console.log("addItem called");
    const body = await request.body().value;
    console.log("Received data:", body);  // Log the received data
    const { name, price, quantity, unit_price, merchandizer } = body;
    
    console.log("Data to be inserted:", {
      name,
      price,
      quantity,
      unit_price,
      merchandizer,
      date: new Date(),
    });

    await client.queryObject(
      "INSERT INTO items (name, price, quantity, unit_price, merchandizer, date) VALUES ($1, $2, $3, $4, $5, $6)",
      name, price, quantity, unit_price, merchandizer, new Date(),
    );
    console.log("C Item added successfully");  // Log success message
    response.status = 201;
    response.body = { message: "Item added" };
  } catch (err) {
    console.error("Error adding item:", err);  // Log any errors
    response.status = 500;
    response.body = { message: "additem error", error: err.message };
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
    response.body = { message: "update error", error: err.message };
  }
};