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
  const body = await request.body();
  const item = await body.value;
  await client.query(
    "INSERT INTO items (name, price, quantity, unit_price, merchandizer, date) VALUES ($1, $2, $3, $4, $5, $6)",
    item.name, item.price, item.quantity, item.unit_price, item.merchandizer, new Date(),
  );
  response.status = 201;
  response.body = { message: "Item added" };
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
