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

export const getItems = async ({ response }: { response: any }) => {
  const result = await client.query("SELECT * FROM items");
  response.body = result.rows;
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
    response.status = 201;
    response.body = { message: "Item added" };
  } catch (err) {
    console.error("Error adding item:", err);  // Log any errors
    response.status = 500;
    response.body = { message: "Error adding item" };
  }
};


export const updateItem = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
  const body = await request.body();
  const updatedItem = await body.value;
  await client.query(
    "UPDATE items SET name=$1, price=$2, quantity=$3, unit_price=$4, merchandizer=$5, date=$6 WHERE id=$7",
    updatedItem.name, updatedItem.price, updatedItem.quantity, updatedItem.unit_price, updatedItem.merchandizer, new Date(), params.id,
  );
  response.body = { message: "Item updated" };
};
