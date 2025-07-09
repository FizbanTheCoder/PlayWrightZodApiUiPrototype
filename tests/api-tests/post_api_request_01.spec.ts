// Load playwright module
// const {test, expect} = require('@playwright/test')
import { test, expect } from '@playwright/test';

// Write a test
test('Create POST api request using static request body', async ({ request }) => {
    // Create post api request
    const postAPIResponse = await request.post('/booking', {
        data: {
            "firstname": "John",
            "lastname": "Doe",
            "totalprice": 123,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-10-01",
                "checkout": "2023-10-10"
            },
            "additionalneeds": "Breakfast"
        }
    })

    // Validate status code
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    // Validate JSON api response
    expect(postAPIResponseBody.booking.firstname).toBe("John");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Doe");
    expect(postAPIResponseBody.booking).toHaveProperty("totalprice", 123);
    expect(postAPIResponseBody.booking.lastname).toBe("Doe");

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2023-10-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2023-10-10");
});


