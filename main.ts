import { Application, Router, send } from "./deps.ts";
import router from "./routes/routes.ts";

const app = new Application();

// Middleware for logging
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Middleware for calculating response time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Middleware for serving static files
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.response.status === 404) {
      await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/public`,
        index: "index.html",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on port 8000");
await app.listen({ port: 8000 });
