import { defineEventHandler, readBody } from "h3";
import {createAssoc} from '../actions/associations';
export default defineEventHandler(async (event)=> {
    const body = await readBody<{assocId1:string, assocId2:string, score:number}>(event);
    const result = await  createAssoc({termId1:body.assocId1, termId2:body.assocId2, assocScore: body.score});
    return result;
});