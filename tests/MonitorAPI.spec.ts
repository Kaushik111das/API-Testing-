import {test , expect, APIRequest, APIResponse} from "@playwright/test"
import { constants } from "node:buffer";

test("Monitor Api responses" , async ({request}) =>{


    // test.setTimeout(0);

    // while(true)
    while(false)
    {
        const startTime  = Date.now();

        const healthRes : APIResponse = await request.get("https://restful-booker.herokuapp.com/ping");
        const endTime  = Date.now();

        const duration  = endTime - startTime;
        
        // if(duration > 100)
        if(duration > 2000)
        {
            throw new Error(`API response is slow ${duration}`);
        }
        else
        {
            console.log(`Total dutaion of the response is  ${duration}`);
        }

        // console.log(`Total duration of the response : ${duration}`);
        const sts = healthRes.status();
        console.log(`Response code from API is : ${sts}`);

        expect(sts).toBe(201);

        
    }
})