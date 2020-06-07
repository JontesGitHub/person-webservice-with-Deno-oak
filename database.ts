import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const client = new MongoClient();
client.connectWithUri(`mongodb+srv://${config().DB_USER}:${config().DB_PASS}@${config().DB_HOST}?retryWrites=true&w=majority`);

const db = client.database(`person_webservice_db`);

console.log("INFO: Connected to Database");

export default db;