import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

router
  .get("/", (context) => {
    context.response.body = "Welcome to person web service";
  })


const port = 8000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`INFO: Listening to port ${port}...`);

await app.listen({ port });