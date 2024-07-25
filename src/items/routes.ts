import { Router } from "../deps.ts";
import { getItemsFromDb, addItemToDb } from "./model.ts";

const router = new Router();

router.get("/items", async (context) => {
  const items = await getItemsFromDb();
  context.response.body = items;
});

router.post("/items", async (context) => {
  const body = await context.request.body().value;
  await addItemToDb(body);
  context.response.body = { message: "Item added successfully" };
});

export default router;
