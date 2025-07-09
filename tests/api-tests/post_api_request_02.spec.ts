// Load playwright module
// const {test, expect} = require('@playwright/test')
import { test, expect } from '@playwright/test';

const bookingAPIRequestBody = require('../../test-data/post_request_body.json');

// Write a test
test('Create POST api request using static JSON file', async ({ request }) => {
    // Create post api request
    const postAPIResponse = await request.post('/booking', {
        data: bookingAPIRequestBody
    })

    const postAPIResponseBody = await postAPIResponse.json();

    // Validate status code
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    // Validate JSON api response
    expect(postAPIResponseBody.booking.firstname).toBe("John");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Doe");
    expect(postAPIResponseBody.booking).toHaveProperty("totalprice", 123);
    expect(postAPIResponseBody.booking.lastname).toBe("Doe");

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2023-10-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2023-10-10");
});


