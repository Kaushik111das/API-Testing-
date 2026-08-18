import { test, expect, APIResponse } from "@playwright/test";
test.use({
    ignoreHTTPSErrors: true
});
test("delete call ", async function ({ request }) {

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
    console.log("new Booking ID id - ", bookingId);

    // Performing delete operation on a specific Booking ID
    const deleteRes: APIResponse = await request.delete("https://restful-booker.herokuapp.com/booking/" + bookingId, { headers: { "Content-Type": "application/json", "Cookie": "token=" + authToken } })
    
    // Checking the deleting Status
    console.log("Checking the deleting Status ")
    console.log(deleteRes.status());
    expect(deleteRes.status()).toBe(201)

    console.log(deleteRes.statusText());
    expect(deleteRes.statusText()).toBe("Created");

    const getRes: APIResponse = await request.get("https://restful-booker.herokuapp.com/booking/" + bookingId)

    console.log("Checking the status after performing delete operation using GetCall ")
    console.log(getRes.status());
    console.log(getRes.statusText());
})