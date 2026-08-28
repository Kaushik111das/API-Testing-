// validate rs code or msg when user pass invalid job id ….(404) ------------like search data

import {test , expect, APIResponse} from '@playwright/test';

test.use({
    ignoreHTTPSErrors: true
});

test("Pass invalid job Id " , async ({request}) =>{


    const authData: any = {
        "username": "admin",
        "password": "password123"
    }

    const res: APIResponse = await request.post("https://restful-booker.herokuapp.com/auth", { headers: { "Content-Type": "application/json" }, data: authData });
    const resJson = await res.json();
    console.log(resJson);

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
    console.log("new Booking ID_id_1 - ", bookingId);
    // ----------------------------------------------------
    // another booking id 
    const newBookingData2 = {
        "firstname": "Kaushik",
        "lastname": "Das",
        "totalprice": 100,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-08-21",
            "checkout": "2026-08-22"
        }
    }

    const newBookingRes2: APIResponse = await request.post("https://restful-booker.herokuapp.com/booking", { headers: { "Content-Type": "application/json" }, data: newBookingData2 })
    const newBookingResJson2 = await newBookingRes2.json();
    console.log(newBookingResJson2);

    const bookingId2: any = newBookingResJson2.bookingid;
    // console.log(newBookingResJson);
    console.log("new Booking ID_id_2 - ", bookingId2);



    // --------------------------------------------------------------------
    // Performing delete operation on a specific Booking ID
    const deleteRes: APIResponse = await request.delete("https://restful-booker.herokuapp.com/booking/" + bookingId, { headers: { "Content-Type": "application/json", "Cookie": "token=" + authToken } })
    
    // Checking the deleting Status
    // console.log("Checking the deleting Status ")
    // console.log(deleteRes.status());
    // expect(deleteRes.status()).toBe(201)

    // console.log(deleteRes.statusText());
    // expect(deleteRes.statusText()).toBe("Created");
// --------------------------------------------------------------------------


    const getRes: APIResponse = await request.get("https://restful-booker.herokuapp.com/booking/" + bookingId)

    console.log("Checking the status after performing delete operation using GetCall ")
    console.log("Response code when user pass invalid job id : "+ getRes.status());
    console.log(getRes.statusText());

    expect(getRes.status()).toBe(404);
    expect(getRes.statusText()).toBe("Not Found");

    // const d = await getRes.json();
    // console.log("data --");
    // console.log(d);



    const getRes2: APIResponse = await request.get("https://restful-booker.herokuapp.com/booking/" + bookingId2)
    
    console.log("Response code when user pass valid job id : " + getRes2.status());
    console.log(getRes2.statusText());
    
    const d = await getRes2.json();
    // console.log("data --");
    // console.log(d);
    
    expect(d.firstname).toBe(newBookingData2.firstname)
    expect(d.lastname).toBe(newBookingData2.lastname)
    expect(d.totalprice).toBe(newBookingData2.totalprice)
    expect(d.depositpaid).toBe(newBookingData2.depositpaid)
    expect(d.bookingdates.checkin).toBe(newBookingData2.bookingdates.checkin)
    

    // invalid Endpoint
    const invalid_Endpoint : APIResponse = await request.get("https://restful-booker.herokuapp.com/booking-invalid/");
    console.log("Response code for invalid endpoint : "+ invalid_Endpoint.status());
    console.log(invalid_Endpoint.statusText());

    expect(invalid_Endpoint.status()).toBe(404);


})