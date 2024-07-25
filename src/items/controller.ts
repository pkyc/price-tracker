import { Context } from "../deps.ts";
import { addItemToDb, getItemsFromDb } from "./model.ts";

export const getItems = async (context: Context) => {
  try {
    const items = await getItemsFromDb();
    context.response.body = items;
  } catch (err) {
    context.response.status = 500;
    context.response.body = { error: err.message };
  }
};

export const addItem = async (context: Context) => {
  try {
    const body = await context.request.body().value;
    await addItemToDb(body);
    context.response.status = 201;
    context.response.body = { message: "Item added successfully" };
  } catch (err) {
    context.response.status = 500;
    context.response.body = { error: err.message };
  }
};
