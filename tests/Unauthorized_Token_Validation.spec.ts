// Validate response when user pass invalid token data.... 401 (unauth)




import { test, expect, APIResponse } from "@playwright/test";


test.use({
    ignoreHTTPSErrors: true
});
test(" This is a PutPatchCall ", async function ({ request }) {

    const authData: any = {
        "username": "admin",
        "password": "password12"
        // "password": "password123"
    }

    const res: APIResponse = await request.post("https://restful-booker.herokuapp.com/auth", { headers: { "Content-Type": "application/json" }, data: authData });
    const resJson = await res.json();
    console.log(resJson);
    const sts = res.status();
    const ststext = res.statusText();

    console.log("status code is " + sts);
    console.log("Status text is : " + ststext);


    const str = "Bad credentials";
    if(resJson.reason == str)
    {

        expect(sts).toBe(200);
        expect(resJson.reason).toBe("Bad credentials");
    }


    
    const authToken = resJson.token + '1234';
    // const authToken = resJson.token;
    // const authToken = resJson.reason;
    console.log("Token is " + authToken);

    const newBookingData = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2026-01-01"
        }
    }
    const newBookingRes: APIResponse = await request.post("https://restful-booker.herokuapp.com/booking", { headers: { "Content-Type": "application/json" }, data: newBookingData })
    const newBookingResJson = await newBookingRes.json();
    console.log(newBookingResJson);

    const bookingId: any = newBookingResJson.bookingid;
    // console.log(newBookingResJson);
    console.log("new Booking ", bookingId);

    const updatedData = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 200,
        "depositpaid": false,
        "bookingdates": {
            "checkin": "2026-03-01",
            "checkout": "2026-03-01"
        }
    }


    const updatedRes: APIResponse = await request.put("https://restful-booker.herokuapp.com/booking/" + bookingId, { headers: { "Content-Type": "application/json", "Accept": "application/json", "Cookie": "token=" + authToken }, data: updatedData });

    // const updatedResJson = await updatedRes.json();
    // console.log(updatedResJson)
    const stsRes = updatedRes.status();
    const stsRestext = updatedRes.statusText();

    console.log(stsRes);
    console.log(stsRestext);

    if (stsRes === 403) {

        expect(stsRes).toBe(403);
        expect(stsRestext).toBe('Forbidden');
    }
    else {
        expect(stsRes).toBe(404);
        expect(stsRestext).toBe('Unauthorized');

    }



})