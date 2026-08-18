import { test, expect, APIResponse } from "@playwright/test";


test.use({
    ignoreHTTPSErrors: true
});
test(" This is a PutPatchCall ", async function ({ request }) {

    const authData: any = {
        "username": "admin",
        "password": "password123"
    }

    const res: APIResponse = await request.post("https://restful-booker.herokuapp.com/auth", { headers: { "Content-Type": "application/json" }, data: authData });
    const resJson = await res.json();
    // console.log(resJson);

    const authToken = resJson.token;
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

    const updatedResJson  = await updatedRes.json();
    console.log(updatedResJson)



})