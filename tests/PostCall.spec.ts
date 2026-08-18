import { test, expect, APIResponse } from '@playwright/test'

test.use({
    ignoreHTTPSErrors: true
});
test("Post call", async function ({ request }) {

    const Sdata: any = {
        userId: 11,
        id: 11,
        title: 'Playwright',
        body: 'API Testing with TypeScript'
    }
    
    // const Sdata: any = {
    //     "username" :"admin",
    //     "password" : "password123"
    // }
    // const response: APIResponse = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"},data : Sdata})
    const response: APIResponse = await request.post("https://jsonplaceholder.typicode.com/posts" , {data : Sdata});
    console.log(response.status());
   const resData =  await response.json();
   console.log(resData);
   expect(resData.token).not.toBeNull()
})