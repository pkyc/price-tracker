import { Application, send } from "./deps.ts";
import itemsRouter from "./items/routes.ts";

const app = new Application();

// Use the router for item-related routes
app.use(itemsRouter.routes());
app.use(itemsRouter.allowedMethods());

// Serve static files from the public directory
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

// Start the server
console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });
