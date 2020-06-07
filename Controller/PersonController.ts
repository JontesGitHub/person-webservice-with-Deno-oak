import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from '../database.ts';

const peopleCollection = db.collection("people");

interface Person {
    firstname: string;
    lastname: string;
    email: string;
}

const getPeople: any  = async (c: RouterContext)=> {
    try {
        const fetchedPeople: Person[] = await peopleCollection.find();
        c.response.body = fetchedPeople;
        c.response.status = 200;

    } catch (error) {
        console.log(`FROM CATCH: ${error}`);
        c.response.status = error.status | 500;
    }
}

const getOnePerson: any = async (c: RouterContext) => {
    try {
        const param: string | undefined = c.params.id; 
        if (param?.length != 24) {
            c.response.body = 'Unvalid "id" param.'
            c.response.status = 400;
            return;
        }

        const data: Person | undefined = await peopleCollection.findOne( {_id: {"$oid" : param}} );

        if(data){
            c.response.body = data;
            c.response.status = 200;
        } else {
            c.response.body = "not found";
            c.response.status = 204;
        }
    } catch (error) {
        console.log(`FROM CATCH: ${error}`);
        c.response.status = error.status | 500;
    }
}

const addPerson: any = async (c: RouterContext) => {
    const {value: {firstname, lastname, email}} =  await c.request.body();
    try {
        peopleCollection.insertOne({
            firstname,
            lastname,
            email
        });
        c.response.body = `${firstname} was added to db.`
        c.response.status = 201;
    } catch (error) {
        console.log(`FROM CATCH: ${error}`);
        c.response.status = error.status | 500;
    }
}

const updatePerson: any = async (c: RouterContext) => {
    try {
        const param: string | undefined = c.params.id; 
        if (param?.length != 24) {
            c.response.body = 'Unvalid "id" param.'
            c.response.status = 400;
            return;
        }

        const {value: {firstname, lastname, email}} =  await c.request.body();
        const { matchedCount, modifiedCount, upsertedId } = await peopleCollection.updateOne( {_id: {"$oid" : param}}, {
            firstname, 
            lastname, 
            email
        });

        c.response.body = { matchedCount, modifiedCount, upsertedId };
        c.response.status = 201;        
    } catch (error) {
        console.log(`FROM CATCH: ${error}`);
        c.response.status = error.status | 500;
    }
}

const deletePerson: any = async (c: RouterContext) => {

    try {
        const param: string | undefined = c.params.id; 
        if (param?.length != 24) {
            c.response.body = 'Unvalid "id" param.'
            c.response.status = 400;
            return;
        }
        const deletedCount: number = await peopleCollection.deleteOne( {_id: {"$oid" : param}} );
        if (deletedCount == 1) {
            c.response.body = `${param} was deleted.`;
            c.response.status = 200;
        } else {
            c.response.body = `${param} is not in database.`;
            c.response.status = 204;
        }
    } catch (error) {
        console.log(`FROM CATCH: ${error}`);
        c.response.status = error.status | 500;
    }
}

export { getPeople, getOnePerson, addPerson, updatePerson, deletePerson };
