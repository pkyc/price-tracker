// routes.ts
import { Router } from "./deps.ts";
import { getItems, addItem, updateItem } from "./controllers/items.ts";

const router = new Router();
router
  .get("/items", getItems)
  .post("/items", addItem)
  .put("/items/:id", updateItem);

export default router;
