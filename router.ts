import { Router } from "https://deno.land/x/oak/mod.ts";
import {
    getPeople,
    getOnePerson,
    addPerson,
    updatePerson,
    deletePerson
} from "./Controller/PersonController.ts";

const router = new Router();

router
    .get("/people", getPeople)
    .get("/people/:id", getOnePerson)
    .post("/people", addPerson)
    .put("/people/:id", updatePerson)
    .delete("/people/:id", deletePerson)

export default router;